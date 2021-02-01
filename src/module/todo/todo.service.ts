import { HttpService, Injectable } from '@nestjs/common';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TodoListDecorator } from '../../common/decorator/todoList.decorator';
import { ErrorCode } from '../../common/providers/mysql/client';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import {
  IClient,
  IPaginationResponse,
} from '../../common/providers/mysql/mysql.service.i';
import { ConfigService } from '../config';
import {
  AddReminder,
  getParams,
  Todo,
  TodoDetail,
  TodoDetailResponse,
  TodoUpdate,
} from './todo.model.i';

@Injectable()
export class TodoService {
  constructor(
    private mySqlService: MySqlService,
    private decorator: TodoListDecorator,
    public configService: ConfigService,
    private http: HttpService,
  ) {}

  getTodoList$(params: getParams): Observable<IPaginationResponse<Todo>> {
    let orderby = this.decorator.stringSqlOrderBy(
      params.sortName,
      params.sortBy,
    );
    let defaultOderBy = '';
    if (orderby === '') {
      defaultOderBy = 'order by created desc';
    } else defaultOderBy = orderby;
    let filterSqlTodoCategoryId = this.decorator.stringSqlFilter(
      'todo_category_id',
      this.decorator.convertFilter(params.todoCategoryId),
    );
    let filterSqlTodoName = this.decorator.stringSqlFilter(
      'todo_name',
      this.decorator.convertFilter(params.todoName),
    );
    let filterSqlTodoId = this.decorator.stringSqlFilter(
      'todo_id',
      this.decorator.convertFilter(params.todoId),
    );
    let filterSqlStatus = this.decorator.stringSqlFilter(
      'status',
      this.decorator.convertFilter(params.status),
    );
    let filterSqlImportance = this.decorator.stringSqlFilter(
      'importance',
      this.decorator.convertFilter(params.importance),
    );
    let filterSqlUserId = this.decorator.stringSqlFilter(
      'user_id',
      this.decorator.convertFilter(params.userId),
    );

    let dateSql = this.decorator.stringSqlFilterDate(
      params.dateFrom,
      params.dateTo,
    );
    const sqlString = `
        SELECT 
        td.todo_id as todoId,
        td.todo_name as todoName,
        td.status,
        td.description,
        td.deadline,
        td.importance,
        td.user_id as userId,
        td.todo_category_id as todoCategoryId,
        todo_category.name as todoCategoryName,
        td.created,
        td.modified
        FROM todo as td
        LEFT JOIN todo_category 
        ON td.todo_category_id = todo_category.todo_category_id
        where (td.todo_name like ? or td.description like ?)
        and td.user_id = ?
        ${filterSqlTodoCategoryId}
        ${filterSqlImportance}
        ${filterSqlStatus}
        ${filterSqlTodoId}
        ${filterSqlTodoName}
        ${filterSqlUserId}
        ${dateSql}
        ${defaultOderBy}
        limit ?
        offset ? `;

    const sqlStringCount = `(select count(*) as total from todo as td
        left join todo_category c 
        on td.todo_category_id = c.todo_category_id 
        where (td.todo_name like ? or td.description like ?)
        and td.user_id = ?
        ${filterSqlTodoCategoryId}
        ${filterSqlImportance}
        ${filterSqlStatus}
        ${filterSqlTodoId}
        ${filterSqlTodoName}
        ${filterSqlUserId}
        ${dateSql} )`;

    const placeHolder = [
      '%' + params.search + '%',
      '%' + params.search + '%',
      params.userId,
      params.pageSize,
      (params.page - 1) * params.pageSize,
    ];
    console.log(params.pageSize);
    const transaction$ = (client: IClient): Observable<any> =>
      zip(
        client.query$<any>(sqlString, placeHolder).pipe(
          map(res => {
            return res.records;
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
        client.query$<any>(sqlStringCount, placeHolder).pipe(
          map(res => {
            return res.records ? res.records[0].total : 0;
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
      ).pipe(
        map(rs => {
          let dataFinal: IPaginationResponse<Todo> = {
            data: rs[0],
            pageSize: params.pageSize,
            total: rs[1],
            page: params.page,
          };
          return dataFinal;
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }

  createNewTodo$(todo: Todo): Observable<any> {
    todo.created = new Date();
    todo.modified = new Date();
    if (todo.deadline == null) todo.deadline = new Date();
    todo.deadline = new Date(todo.deadline);
    todo.status = 'Incomplete';
    const sqlString = `INSERT INTO todo
    (todo_name, description, status, deadline, importance, created, modified, user_id, todo_category_id)
    VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const placeHoler = [
      todo.todoName,
      todo.description,
      todo.status,
      todo.deadline,
      todo.importance,
      todo.created,
      todo.modified,
      todo.userId,
      todo.todoCategoryId,
    ];

    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHoler).pipe(
        map(res => {
          return {
            id: res.records['insertId'],
          };
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService
      .controlTransaction$(this.configService.mySqlConfig(), transaction$)
      .pipe(
        map(data => {
          if (data.id) {
            let params: AddReminder = {
              eventType: 'Todo',
              eventTypeId: 2,
              eventId: Number(data.id),
              eventStartTime: todo.deadline,
              eventTitle: todo.todoName,
              eventDescription: todo.description ? todo.description : '',
              eventViewPath: '/todo/detail/',
              reminders: [
                {
                  userId: todo.userId,
                  userName: todo.userName,
                },
              ],
            };
            this.sendDataToReminder(params)
              .toPromise()
              .then(rs => {
                console.log(rs.data);
              });
            return params;
          }
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
  }

  private sendDataToReminder(data) {
    return this.http.post(
      this.configService.reminderConfig().urlReminder,
      data,
    );
  }
  getTodoById$(id: number): Observable<TodoDetail> {
    const sqlString = `SELECT  
                          s.todo_id todoId, 
                          s.todo_name todoName, 
                          s.status, 
                          s.description,
                          s.deadline deadline,
                          s.importance importance,
                          s.created,
                          s.modified, 
                          u2.user_id userId,
                          u2.username userName,
                          u2.full_name fullName,
                          tc.todo_category_id todoCategoryId,
                          tc.name todoCategoryName
                        FROM ems_schedule.todo s
                        INNER JOIN user u2 ON s.user_id = u2.user_id 
                        LEFT JOIN todo_category tc ON tc.todo_category_id = s.todo_category_id 
                        WHERE s.todo_id = ?; `;

    const placeHolder = [id];
    const transaction$ = (client: IClient): Observable<TodoDetail> =>
      client.query$<TodoDetailResponse>(sqlString, placeHolder).pipe(
        map(res => {
          console.log(res.count == 0);
          if (res.count == 0) {
            return null;
          } else {
            const todo: TodoDetailResponse = res.records[0];
            return {
              todoId: todo.todoId,
              todoName: todo.todoName,
              description: todo.description,
              status: todo.status,
              deadline: todo.deadline,
              importance: todo.importance,
              created: todo.created,
              modified: todo.modified,
              todoDetailUser: {
                userId: todo.userId,
                userName: todo.userName,
                fullName: todo.fullName,
              },
              todoDetailCategory: {
                todoCategoryId: todo.todoCategoryId,
                todoCategoryName: todo.todoCategoryName,
              },
            };
          }
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
  updateTodo(id: number, todo: TodoUpdate): Observable<any> {
    todo.deadline = new Date(todo.deadline);
    const sqlString = `
      UPDATE todo
      SET
        todo_name = ?
        ,description = ?
        ,status = ?
        ,deadline = ?
        ,importance =?
        ,modified = NOW()
        ,todo_category_id = ?
      WHERE todo_id = ?;`;
    const sqlSelectTodo = `
      SELECT 
        todo_id as todoId
        ,todo_name as todoName
        ,description
        ,status
        ,deadline
        ,importance
        ,created
        ,modified
        ,user_id as userId
        ,todo_category_id as todoCategoryId 
      FROM  todo
      WHERE todo_id = ?`;
    const placeHolderId = [id];
    const placeHolder = [
      todo.todoName,
      todo.description,
      todo.status,
      todo.deadline,
      todo.importance,
      todo.todoCategoryId,
      id,
    ];
    const transaction$ = (client: IClient): Observable<any> =>
      zip(
        client.query$<any>(sqlString, placeHolder).pipe(
          map(res => {
            return {
              ...res.records,
            };
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
        client.query$<any>(sqlSelectTodo, placeHolderId).pipe(
          map(res => {
            return {
              ...res.records[0],
            };
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
      ).pipe(
        map(rs => ({
          ...rs[1],
        })),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
  updateStatusTodo(id: number): Observable<any> {
    const sqlString = `
      UPDATE todo
      SET
        status = "Complete"
      WHERE todo_id = ${id};`;
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString).pipe(
        map(res => {
          return {
            id,
          };
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
  deleteTodo(id: number): Observable<any> {
    const sqlString = `
      DELETE FROM todo
      WHERE todo_id = ${id};`;
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString).pipe(
        map(res => {
          return {
            id,
          };
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
}
