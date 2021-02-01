import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorCode } from '../../common/providers/mysql/client';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import { IClient } from '../../common/providers/mysql/mysql.service.i';
import { Category } from './category.model.i';
import { ConfigService } from '../config';

@Injectable()
export class CategoryService {
  constructor(
    private mySqlService: MySqlService,
    private configService: ConfigService,
  ) {}

  getCategoryList$(userId : number): Observable<Category> {
    const sqlString = `
    select distinct 
    tc.todo_category_id as categoryId,
    tc.name as categoryName ,
    t.user_id
    from todo_category as tc
    join todo as t 
    on tc.todo_category_id = t.todo_category_id
    where t.user_id = ?`;
    const placeHolder = [userId];
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString,placeHolder).pipe(
        map(res => {
          return res.records;
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
