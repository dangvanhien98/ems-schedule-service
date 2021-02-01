import { ConfigService } from './../config/config.service';
import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { Observable, of, scheduled, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import * as moment from 'moment';
import { format } from "date-fns";
import {
  GetAllScheduleParams,
  GetByDayUser,
  Schedule,
  ScheduleDetail,
  ScheduleUpdate,
  GetParamDelete,
  GetParamListWeek,
  ScheduleOfUser,
} from './schedule.model.i';
import {
  IClient,
  IClientResponse,
  IPaginationResponse,
} from '../../common/providers/mysql/mysql.service.i';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { ErrorCode } from '../../common/providers/mysql/client';
import { title } from 'process';
import { O_NOFOLLOW } from 'constants';
import { AddReminder, UserNames } from '../todo/todo.model.i';
import { MySqlConfig } from 'src/common/environment/mysql';

@Injectable()
export class ScheduleService {
  constructor(
    private mySqlService: MySqlService,
    public configService: ConfigService,
    private http: HttpService,
  ) {}
  /** Don't implement now */
  public getAllSchedules$(
    params: GetAllScheduleParams,
  ): Observable<IClientResponse<Schedule>> {
    return of({
      count: 0,
      records: [],
    });
  }
  /** Use this service to get all Schedule by one user
   * Require: userId
   * from : default -> start of current week
   * to : default -> end of current week
   * keyword: No need implement on first
   */
  public getSchedulesByUser$(
    params: GetAllScheduleParams,
  ): Observable<IClientResponse<Schedule>> {
    let sqlDate = '';
    let sqlday = this.getSQL(params.from, params.to);
    console.log('Ngày bắt đầu và ngày tới: ', sqlday);

    sqlDate =
      ' AND ' +
      "'" +
      sqlday.from +
      "'" +
      ' BETWEEN (s.time_start AND s.due_time) AND s.due_time <=' +
      "'" +
      sqlday.to +
      "'";
    const sqlString = `SELECT 
        s.schedule_id scheduleId, 
        s.title, 
        s.description, 
        s.time_start timeStart, 
        s.due_time dueTime, 
        s.created_by createdBy,
        u.username userName,
        s.schedule_category_id scheduleCategoryId,
        s.all_day allDay,
        s.type_repeat as typeRepeat,
        s.value_repeat as valueRepeat,
        sc.name scheduleCategoryName,
        s.repeat_start_time as repeatStartTime,
        s.repeat_due_time as repeatDueTime,
        (SELECT json_arrayagg(
          json_object(
            'userId', us.user_id,
            'userName',u2.full_name))
        FROM user_schedule us 
        INNER JOIN user u2 ON us.user_id = u2.user_id 
        WHERE us.schedule_id = s.schedule_id ) AS users
      FROM ems_schedule.schedule s
      INNER JOIN user_schedule us ON s.schedule_id = us.schedule_id
      INNER JOIN schedule_category sc ON s.schedule_category_id = sc.schedule_category_id
      INNER JOIN user u ON s.created_by = u.user_id
      WHERE us.user_id = ? and s.title like ? and s.is_delete = 'false'
      ${sqlDate}
      GROUP BY s.schedule_id;`;
    // const sqlStringCount = `SELECT COUNT(*) as total,
    //     (SELECT json_arrayagg(
    //       json_object(
    //         'userId', us.user_id,
    //         'userName',u2.full_name))
    //     FROM user_schedule us
    //     INNER JOIN user u2 ON us.user_id = u2.user_id
    //   WHERE us.schedule_id = s.schedule_id ) AS users
    //   FROM ems_schedule.schedule s
    //   INNER JOIN user_schedule us ON s.schedule_id = us.schedule_id
    //   WHERE us.user_id = ? and s.title like ?
    //   ${dateSql}
    //   GROUP BY s.schedule_id;`;
    const placeHolder = [params.userId, '%' + params.keyword + '%'];
    return this.mySqlService.getClient$(this.configService.mySqlConfig()).pipe(
      mergeMap((client: IClient) => client.query$<any>(sqlString, placeHolder)),
      map((res: IClientResponse<any>) => {
        return res;
      }),
      catchError(err => {
        return throwError(ErrorCode.categorize(err));
      }),
    );
  }

  getDayOfMonth(day: Date, isDayStart: boolean) {
    const formatDate = new Date(day);
    let fromMoment = '';
    let toMoment = '';
    if (formatDate && isDayStart) {
      fromMoment = moment
        .utc(day)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      toMoment = moment
        .utc(formatDate)
        .endOf('month')
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      return { fromMoment, toMoment };
    } else if (formatDate && isDayStart == false) {
      fromMoment = moment
        .utc(formatDate)
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss');
      toMoment = moment
        .utc(day)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      return { fromMoment, toMoment };
    }
  }
  getSQL(from: Date, to: Date) {
    if (from || to) {
      if (from && to) {
        return { from, to };
      } else
        return from
          ? {
              from: this.getDayOfMonth(from, true).fromMoment,
              to: this.getDayOfMonth(from, true).toMoment,
            }
          : {
              from: this.getDayOfMonth(to, false).fromMoment,
              to: this.getDayOfMonth(to, false).toMoment,
            };
    } else if (from == null && to == null) {
      let fromNow = moment
        .utc()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss');
      let toNow = moment
        .utc()
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss');
      return { from: fromNow, to: toNow };
    }
  }

  public getScheduleByDayUser$(
    params: GetByDayUser,
  ): Observable<IClientResponse<Schedule>> {
    let endOfDayNow = moment.utc(params.day).format('YYYY-MM-DD');
    let orderBy = this.stringSqlOrderBy(params.sortName, params.sortBy);
    const sqlString = `SELECT 
      s.schedule_id scheduleId, 
      s.title, 
      s.description, 
      s.time_start timeStart, 
      s.due_time dueTime, 
      s.created_by createdBy,
      u.username userName,
      s.schedule_category_id scheduleCategoryId,
      s.all_day allDay,
      s.type_repeat as typeRepeat,
      s.value_repeat as valueRepeat,
      s.repeat_start_time as repeatStartTime,
      s.repeat_due_time as repeatDueTime,
      sc.name scheduleCategoryName,
      (SELECT json_arrayagg(
        json_object(
          'userId', us.user_id,
          'userName',u2.full_name))
      FROM user_schedule us 
      INNER JOIN user u2 ON us.user_id = u2.user_id 
    WHERE us.schedule_id = s.schedule_id ) AS users
    FROM ems_schedule.schedule s
    INNER JOIN user_schedule us ON s.schedule_id = us.schedule_id
    INNER JOIN schedule_category sc ON s.schedule_category_id = sc.schedule_category_id
    INNER JOIN user u ON s.created_by = u.user_id
    WHERE us.user_id = ? AND Date(s.time_start) <= ? AND Date(s.due_time) >= ? AND s.is_delete = 'false'
    GROUP BY s.schedule_id
    ${orderBy}`;

    // EXTRACT(DAY FROM s.due_time) = ?
    const placeHolder = [params.userId, endOfDayNow, endOfDayNow];

    return this.mySqlService.getClient$(this.configService.mySqlConfig()).pipe(
      mergeMap((client: IClient) => client.query$<any>(sqlString, placeHolder)),
      map((res: IClientResponse<any>) => {
        return res;
      }),
      catchError(err => {
        return throwError(ErrorCode.categorize(err));
      }),
    );
  }

  stringSqlOrderBy(sortName: string, sortBy: string) {
    const fieldName = [
      'scheduleId',
      'title',
      'description',
      'timeStart',
      'dueTime',
      'createdBy',
      'userName',
      'scheduleCategoryId',
      'allDay',
      'scheduleCategoryName',
      'users',
    ];
    const sortType = ['asc', 'desc'];
    let orderby = '';
    if (fieldName.includes(sortName) == true && sortType.includes(sortBy)) {
      if (sortName !== '' && sortBy !== '')
        orderby = orderby + 'order by ' + sortName + ' ' + sortBy;
    }
    return orderby;
  }

  public getScheduleById$(
    id: number,
  ): Observable<IClientResponse<ScheduleDetail>> {
    const sqlString = `SELECT 
                      s.schedule_id scheduleId, 
                      s.title,
                      s.description,
                      s.repeat_start_time timeStartRepeat,
                      s.repeat_due_time timeDueRepeat, 
                      s.time_start startDate,
                      s.due_time dueDate,
                      s.importance important,
                      s.place,
                      s.created,
                      s.modified,
                      s.is_delete isDelete, 
                      s.created_by createdBy,
                      u.username createdByName,
                      u.full_name createByFullName,
                      s.schedule_category_id scheduleCategoryId,
                      sc.name scheduleCategoryName,
                      s.type_repeat type,
                      s.value_repeat valueRepeat,
                      (SELECT json_arrayagg(
                        json_object(
                          'userName', u2.full_name,
                          'userId', u2.user_id))
                      FROM user_schedule us 
                      INNER JOIN user u2 ON us.user_id = u2.user_id 
                      WHERE us.schedule_id = ? 
                      ) 
                      AS userNames,
                      (SELECT json_arrayagg(
                        json_object(
                          'equipmentId', e.equipment_id,
                          'equipmentName', e.equipment_name,
                          'startTime', eu.start_time,
                          'dueTime', eu.due_time))
                      FROM equipment_used eu 
                      INNER JOIN equipment e ON eu.equipment_id = e.equipment_id 
                      WHERE eu.schedule_id = ? 
                      ) 
                      AS equipmentNames
                    FROM ems_schedule.schedule s
                    INNER JOIN schedule_category sc ON s.schedule_category_id = sc.schedule_category_id
                    INNER JOIN user u ON s.created_by = u.user_id
                    WHERE s.schedule_id = ? and s.is_delete = 0`;

    const placeHolder = [id, id, id];
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        map(res => {
          if (res.count == 0) {
            return null;
          }
          return res.records[0];
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
  public addSchedule$(schedule: Schedule): Observable<any> {
    let sqlString = '';
    let placeHolder = [];

    if (schedule.typeRepeat == 'normal') {
      sqlString = `INSERT INTO schedule 
                  (title
                  , description
                  , time_start
                  , due_time
                  , importance
                  , place
                  , is_delete
                  , created
                  , modified
                  , schedule_category_id
                  , created_by
                  , type_repeat
                  ) VALUES( ?, ?, ?, ?, ?, ?, 0, Now(), Now(), ?, ?, ? ); `;
      placeHolder = [
        schedule.title,
        schedule.description,
        schedule.timeStart,
        schedule.dueDate,
        schedule.important,
        schedule.place,
        schedule.scheduleCategoryId,
        schedule.createBy,
        schedule.typeRepeat,
      ];
    } else {
      sqlString = `INSERT INTO schedule 
                  (title
                  , description
                  , repeat_start_time
                  , repeat_due_time
                  , time_start
                  , due_time
                  , importance
                  , place
                  , is_delete
                  , created
                  , modified
                  , schedule_category_id
                  , created_by
                  , value_repeat
                  , type_repeat
                  ) VALUES( ?, ?, ?, ?,?, ?, ?, ?, 0, Now(), Now(), ?, ?, ?, ? ); `;
      placeHolder = [
        schedule.title,
        schedule.description,
        schedule.timeStartRepeat,
        schedule.timeDueRepeat,
        schedule.timeStart,
        schedule.dueDate,
        schedule.important,
        schedule.place,
        schedule.scheduleCategoryId,
        schedule.createBy,
        schedule.valueRepeat,
        schedule.typeRepeat,
      ];
    }

    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        tap(res => {
          console.log('id schedule: ', res.records['insertId']);
        }),
        mergeMap(inserted => {
          const scheduleId = inserted.records['insertId'];
          let insertString = '';
          if (schedule.equipmentName && schedule.equipmentName.length > 0) {
            let insertEUSqlString =
              'INSERT INTO equipment_used(schedule_id, equipment_id, start_time, due_time) VALUES';
            let valueStrings = schedule.equipmentName
              .map(
                item =>
                  `(${scheduleId},  ${item.equipmentId}, 
                    '${moment(item.timeStart || schedule.timeStart).format(
                      'YYYY-MM-DD hh:mm:ss',
                    )}', 
                    '${moment(item.timeDue || schedule.dueDate).format(
                      'YYYY-MM-DD hh:mm:ss',
                    )}')`,
              )
              .join(',');
            insertString += insertEUSqlString + valueStrings + ';';
          }
          let insertUSSqlString =
            'INSERT INTO user_schedule(created, modified, user_id, schedule_id) VALUES';
          const valueStrings = schedule.userIds
            .map(userId => `(Now(),Now(), ${userId}, ${scheduleId} )`)
            .join(',');
          insertString += insertUSSqlString + valueStrings + ';';

          insertString += `
          SELECT u.user_id userId, u.username userName
          FROM ems_schedule.user u
          WHERE u.user_id IN (?);
          `;
          const placeHolderUser = [schedule.userIds];

          return client.query$<any>(insertString, placeHolderUser).pipe(
            map(rs => {
              return {
                getUser: rs.records[2],
                scheduleId: scheduleId,
              };
            }),
          );
        }),
        map(insertedUserList => {
          return insertedUserList;
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService
      .controlTransaction$(this.configService.mySqlConfig(), transaction$)
      .pipe(
        map(data => {
          if (data.scheduleId) {
            let params: AddReminder = {
              eventType: 'Schedule',
              eventTypeId: 1,
              eventId: Number(data.scheduleId),
              eventStartTime: schedule.timeStart,
              eventTitle: schedule.title,
              eventDescription: schedule.description
                ? schedule.description
                : '',
              eventViewPath: '/schedule/detail/',
              reminders: data.getUser,
              expireDate: schedule.dueDate,
              repeatType: schedule.typeRepeat,
              isRepeat: schedule.typeRepeat === 'normal' ? false : true,
              repeatValue:
                schedule.typeRepeat === 'monthly' ||
                schedule.typeRepeat === 'weekly'
                  ? schedule.valueRepeat
                  : undefined,
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
  public updateSchedule$(
    id: number,
    schedule: ScheduleUpdate,
  ): Observable<any> {
    let sqlString = '';
    let placeHolder = [];

    if (schedule.typeRepeat == 'normal') {
      sqlString = `UPDATE schedule SET 
      title = ?,
      description = ?,
      time_start = ?,
      due_time = ?,
      importance = ?,
      place = ?,
      modified = Now(),
      schedule_category_id = ?,
      type_repeat = ?
      WHERE schedule_id= ?`;
      placeHolder = [
        schedule.title,
        schedule.description,
        schedule.timeStart,
        schedule.dueDate,
        schedule.important,
        schedule.place,
        schedule.scheduleCategoryId,
        schedule.typeRepeat,
        id,
      ];
    } else {
      sqlString = `UPDATE schedule SET 
      title = ?,
      description = ?,
      repeat_start_time = ?,
      repeat_due_time = ?,
      time_start = ?,
      due_time = ?,
      importance = ?,
      place = ?,
      modified = Now(),
      schedule_category_id = ?,
      value_repeat = ?,
      type_repeat = ?
      WHERE schedule_id= ?`;
      placeHolder = [
        schedule.title,
        schedule.description,
        schedule.timeStartRepeat,
        schedule.timeDueRepeat,
        schedule.timeStart,
        schedule.dueDate,
        schedule.important,
        schedule.place,
        schedule.scheduleCategoryId,
        schedule.valueRepeat,
        schedule.typeRepeat,
        id,
      ];
    }
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        tap(res => {
          console.log('id schedule: ', res);
        }),
        mergeMap(updated => {
          let updateTempTableString = '';
          let insertString = '';

          if (schedule.equipmentName && schedule.equipmentName.length > 0) {
            let deleteEUString =
              'DELETE FROM equipment_used WHERE schedule_id = ' + id + ';';
            let insertEUSqlString =
              'INSERT INTO equipment_used( schedule_id, equipment_id, start_time, due_time) VALUES ';
            let valueStrings = schedule.equipmentName
              .map(
                item =>
                  `(${id},  ${item.equipmentId}, 
                  '${moment(item.timeStart || schedule.timeStart).format(
                    'YYYY-MM-DD hh:mm:ss',
                  )}', 
                  '${moment(item.timeDue || schedule.dueDate).format(
                    'YYYY-MM-DD hh:mm:ss',
                  )}')`,
              )
              .join(',');
            insertEUSqlString += valueStrings + ';';
            insertString += insertEUSqlString;
            updateTempTableString += deleteEUString + insertString;
          }

          let deleteUserString =
            'DELETE FROM user_schedule WHERE schedule_id = ' + id + ';';
          let insertUSSqlString =
            'INSERT INTO user_schedule( created, modified, user_id, schedule_id ) VALUES';
          let valueStrings = schedule.userIds
            .map(userId => `(Now(),Now(),${userId}, ${id} )`)
            .join(',');
          insertUSSqlString += valueStrings + ';';
          insertString += insertUSSqlString;
          updateTempTableString += deleteUserString + insertUSSqlString;

          return client.query$<any>(updateTempTableString);
        }),
        map(updatedUserList => {
          return MessageErrorConstant.ADD_SUCCESS;
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
  public deleteScheduleById$(param: GetParamDelete): Observable<any> {
    const sqlString = `UPDATE schedule s JOIN user_schedule us ON s.schedule_id = us.schedule_id 
    SET s.is_delete = 1 \
    WHERE s.schedule_id = ? AND us.user_id = ?`;
    const sqlSelect = `SELECT title from schedule WHERE schedule_id = ?`;
    const placeHolder = [param.scheduleId, param.userId];

    const transaction$ = (client: IClient): Observable<any> =>
      zip(
        client.query$<any>(sqlString, placeHolder).pipe(
          map(res => {
            return {
              message: MessageErrorConstant.DELETE_SUCCESS,
              scheduleId: param.scheduleId,
              userId: param.userId,
              title: '',
            };
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
        client.query$<any>(sqlSelect, placeHolder).pipe(
          map(res => {
            return res.records[0];
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
      ).pipe(
        map(rs => {
          rs[0].title = rs[1].title;
          return rs[0];
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
  public undoDeleteScheduleById$(param: GetParamDelete): Observable<any> {
    const sqlString = `UPDATE schedule s JOIN user_schedule us ON s.schedule_id = us.schedule_id 
    SET is_delete = 0 \
    WHERE s.schedule_id = ? AND us.user_id = ?`;
    const sqlSelect = `SELECT title from schedule WHERE schedule_id = ?`;
    const placeHolder = [param.scheduleId, param.userId];

    const transaction$ = (client: IClient): Observable<any> =>
      zip(
        client.query$<any>(sqlString, placeHolder).pipe(
          map(res => {
            return {
              message: MessageErrorConstant.DELETE_SUCCESS,
              scheduleId: param.scheduleId,
              userId: param.userId,
              title: '',
            };
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
        client.query$<any>(sqlSelect, placeHolder).pipe(
          map(res => {
            return res.records[0];
          }),
          catchError(err => {
            return throwError(ErrorCode.categorize(err));
          }),
        ),
      ).pipe(
        map(rs => {
          rs[0].title = rs[1].title;
          return rs[0];
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
  public getAllScheduleCategory$(): Observable<any> {
    const stringSql = `SELECT 
    sc.schedule_category_id scheduleCategoryId,
    sc.name,
    sc.description,
    sc.created,
    sc.modified
    FROM ems_schedule.schedule_category sc`;
    return this.mySqlService.getClient$(this.configService.mySqlConfig()).pipe(
      mergeMap((client: IClient) => client.query$<any>(stringSql)),
      map((res: IClientResponse<any>) => {
        return res;
      }),
      catchError(err => {
        return throwError(ErrorCode.categorize(err));
      }),
    );
  }
  private convertTypeRepeatEvents(data: any) {
    let arr = [];
    let endOfMonth = moment().endOf('month');

    let endOfWeekOfMonth = moment(endOfMonth).endOf('week');
    data.records?.map(rs => {
      switch (rs.typeRepeat) {
        case 'weekly':
          let week = moment(rs.timeStart);
          while (week.isBefore(rs.dueTime)) {
            let timeStart = moment(rs.repeatStartTime, 'hh:mm:ss');
            let timeEnd = moment(rs.repeatDueTime, 'hh:mm:ss');
            let data = {
              ...rs,
              timeStart: week
                .clone()
                .set({
                  h: timeStart.hours(),
                  minute: timeStart.minutes(),
                  second: timeStart.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
              dueTime: week
                .clone()
                .set({
                  h: timeEnd.hours(),
                  minute: timeEnd.minutes(),
                  second: timeEnd.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
            };
            arr.push(data);
            week = week.add(1, 'week');
          }
          break;
        case 'monthly':
          let month = moment(rs.timeStart);
          while (month.isBefore(rs.dueTime)) {
            let timeStart = moment(rs.repeatStartTime, 'hh:mm:ss');
            let timeEnd = moment(rs.repeatDueTime, 'hh:mm:ss');
            let dataMonthly = {
              ...rs,
              timeStart: month
                .clone()
                .set({
                  h: timeStart.hours(),
                  minute: timeStart.minutes(),
                  second: timeStart.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
              dueTime: month
                .clone()
                .set({
                  h: timeEnd.hours(),
                  minute: timeEnd.minutes(),
                  second: timeEnd.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
            };
            arr.push(dataMonthly);
            month = month.add(1, 'months');
          }
          break;

        case 'everyday':
          let day = moment(rs.timeStart);
          while (day.isBefore(rs.dueTime)) {
            let timeStart = moment(rs.repeatStartTime, 'hh:mm:ss');
            let timeEnd = moment(rs.repeatDueTime, 'hh:mm:ss');
            let dataEveryDay = {
              ...rs,
              timeStart: day
                .clone()
                .set({
                  h: timeStart.hours(),
                  minute: timeStart.minutes(),
                  second: timeStart.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
              dueTime: day
                .clone()
                .set({
                  h: timeEnd.hours(),
                  minute: timeEnd.minutes(),
                  second: timeEnd.seconds(),
                })
                .format('YYYY-MM-DD hh:mm:ss a'),
            };
            arr.push(dataEveryDay);
            day = day.add(1, 'days');
          }
          break;

        case 'normal':
          arr.push(rs);
        default:
          break;
      }
    });
    return {
      count: arr?.length,
      records: arr,
    };
  }
  
  public getSchedulesByFilter$(
    params: GetAllScheduleParams,
  ): Observable<IClientResponse<Schedule>> {
    let filterImportance='';

    let filterCategory = this.stringSqlFilter(
      'schedule_category_id',
      this.convertFilter(params.categoryId),
    );

    if(params.importance != null){
      filterCategory = `AND s.importance = '${params.importance}'`;
    }

    let sqlDate = this.stringSqlFilterDate(params.from, params.to);

    const fromAndWhere = `
      FROM ems_schedule.schedule s
        INNER JOIN user_schedule us ON s.schedule_id = us.schedule_id
        INNER JOIN schedule_category sc ON s.schedule_category_id = sc.schedule_category_id
        INNER JOIN user u ON s.created_by = u.user_id
        WHERE us.user_id = ? and s.title like ? and s.is_delete = 'false'
        ${filterCategory}
        ${filterImportance}
        ${sqlDate}`;

    const sqlString = `
    SELECT 
      s.schedule_id scheduleId, 
      s.title, 
      s.description, 
      s.time_start timeStart, 
      s.due_time dueTime,
      s.importance importance, 
      s.place place,
      s.type_repeat typeRepeat,  
      u.username userName,
      s.schedule_category_id scheduleCategoryId,
      sc.name scheduleCategoryName,
      (SELECT json_arrayagg(
        json_object(
          'userId', us.user_id,
          'userName',u2.full_name))
        FROM user_schedule us 
        INNER JOIN user u2 ON us.user_id = u2.user_id 
        WHERE us.schedule_id = s.schedule_id ) AS users
      ${fromAndWhere}
      GROUP BY s.schedule_id
      ORDER BY ${params.sortName} ${params.sortBy}
      LIMIT ? OFFSET ?;`;

    const sqlCountString = `
      SELECT count(*) as total
      ${fromAndWhere}`;
      
    const placeHolder = [
      params.userId, 
      '%' + params.keyword + '%',
      parseInt(params.pageSize),
      (parseInt(params.page) - 1) * parseInt(params.pageSize),];

    const transaction$ = (client: IClient): Observable<any> =>
    zip(
      client.query$<Schedule>(sqlString, placeHolder).pipe(
        map(res => {
          return res.records;
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      ),
      client.query$<any>(sqlCountString, placeHolder).pipe(
        map(res => {
          return res.records ? res.records[0].total : 0;
        }),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      ),
    ).pipe(
      map(rs => ({
        page: parseInt(params.page),
        total: rs[1],
        pageSize: parseInt(params.pageSize),
        data: rs[0],
      })),
    );

  return this.mySqlService.controlTransaction$(
    this.configService.mySqlConfig(),
    transaction$,
  )}
  stringSqlFilterDate(dateFrom: Date, dateTo: Date) {
    let dateSql = '';
    if (dateFrom != null && dateTo != null) {
      if (dateFrom.toString() == '' && dateTo.toString() == '') return dateSql;
      if (dateFrom.toString() == '' && dateTo.toString() != '')
        return (dateSql = dateSql + 'and ' + "s.time_start <= "+ "'" + dateTo + "'");
      if (dateFrom.toString() != '' && dateTo.toString() == '')
        return (dateSql = dateSql + 'and ' + "s.time_start >= "+ "'" + dateFrom + "'");
      if (dateFrom.toString() != '' && dateTo.toString() != '')
        return (dateSql =
          dateSql +
          ' AND ' +
          "'" +
          dateFrom +
          "'" +
          '<= s.due_time' +
          ' AND' +
          "'" +
          dateTo +
          "'"+
          '>= s.time_start' +
          ' AND'+
          "'" +dateFrom +"'" +'<='+"'" +dateTo +"'"
          );
    }
    if (dateFrom == null && dateTo != null && dateTo.toString() != '')
      dateSql = dateSql + 'and ' + "s.time_start <= "+ "'" + dateTo + "'";
    else if (dateTo == null && dateFrom != null && dateFrom.toString() != '')
      dateSql = dateSql + 'and ' + "s.time_start >= "+ "'" + dateFrom + "'";
    else if (dateFrom != null && dateTo != null)
      dateSql =
          ' AND ' +
          "'" +
          dateFrom +
          "'" +
          '<= s.due_time' +
          ' AND' +
          "'" +
          dateTo +
          "'"+
          '>= s.time_start' +
          ' AND'+
          "'" +dateFrom +"'" +'<='+"'" +dateTo +"'";

    return dateSql;
  }
  stringSqlFilter(field: string, content: string[]) {
    let filterSql = '';
    if (content[0] === '') return filterSql;
    if (content != []) {
      filterSql += ' and ( ';
      for (var i = 0; i < content.length; i++) {
        filterSql = filterSql + 's.' + field + " = '" + content[i] + "'";
        if (i < content.length - 1) filterSql += ' or ';
      }
      filterSql += ')';
    }
    return filterSql;
  }
  convertFilter(field: string) {
    let a: string[] = [];
    a = field.toString().split(',');
    return a;
}
getSchedulesGroupUser(
  params: GetParamListWeek,
): Observable<IPaginationResponse<ScheduleOfUser>> {
  const sqlString = `SELECT 
    json_object(
      'userId', u.user_id, 
      'userName', u.username, 
      'fullName', u.full_name
    ) AS detailUser, 
    (SELECT json_arrayagg( json_object(
      'scheduleId', s.schedule_id,
      'title', s.title,
      'timeStart', s.time_start,
      'dueTime', s.due_time,
      'typeRepeat', s.type_repeat,
      'typeSchedule', sc.name,
      'users', (SELECT json_arrayagg( json_object(
                  'categoryName', u2.full_name,
                  'categoryId', u2.user_id))
                FROM user_schedule us 
                INNER JOIN user u2 ON us.user_id = u2.user_id 
                WHERE us.schedule_id = s.schedule_id
      )))
    FROM schedule s 
    INNER JOIN schedule_category sc on s.schedule_category_id = sc.schedule_category_id
    INNER JOIN user_schedule us ON us.schedule_id = s.schedule_id
    WHERE us.user_id = u.user_id  && (date(s.time_start) <= ? && date(s.due_time) >= ? && s.due_time > s.time_start) && s.is_delete = 0
    ) AS detailSchedule
  FROM  user u
  GROUP BY u.user_id
  ORDER BY u.user_id <> ? AND u.user_id <> ? AND u.user_id < 
    (SELECT u.user_id 
    FROM ems_schedule.user u 
    WHERE u.user_id <> ? AND u.user_id <> ? 
    LIMIT 1 OFFSET 0) desc,
    u.user_id = ? desc,
    u.user_id = ? desc,
    u.user_id asc
  LIMIT ? OFFSET ?`;

  const placeHolder = [
    format(params.endDate, 'yyyy-MM-dd'),
    format(params.startDate, 'yyyy-MM-dd'),
    params.userLogin,
    params.director,
    params.userLogin,
    params.director,
    params.userLogin,
    params.director,
    Number(params.pageSize),
    Number(params.page ? (params.page - 1) * params.pageSize : 0),
  ];

  const sqlCountUser = `SELECT count(*) AS total FROM user`;

  const transaction$ = (client: IClient): Observable<any> =>
    zip(
      client.query$<any>(sqlString, placeHolder).pipe(
        map(res => res.records),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      ),
      client
        .query$<any>(sqlCountUser, placeHolder)
        .pipe(map(res => (res.records ? res.records[0]['total'] : 0))),
    ).pipe(
      map(res => ({
        page: Number(params.page),
        pageSize: params.pageSize,
        data: res[0],
        total: res[1],
      })),
    );

  return this.mySqlService.controlTransaction$(
    this.configService.mySqlConfig(),
    transaction$,
  );
}
}
