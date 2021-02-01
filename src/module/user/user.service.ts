import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorCode } from '../../common/providers/mysql/client';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import { IClient } from '../../common/providers/mysql/mysql.service.i';
import { ConfigService } from '../config';
import { LoginRequest, User } from './user.model.i';
@Injectable()
export class UserService {
  constructor(
    private mySqlService: MySqlService,
    public configService: ConfigService,
  ) {}

  getUserByUserNameAndPassword(login: LoginRequest): Observable<any> {
    const sqlStringGetUser = `
    SELECT user_id as userId,
           username as userName, 
           full_name as fullName,
           password 
    FROM user WHERE user.username = ?`;
    const placeHolder = [login.userName];

    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlStringGetUser, placeHolder).pipe(
        map(res => {
          if (res.count == 0) return { message: 'Username invalid' };
          if (bcrypt.compareSync(login.password, res.records[0].password)) {
            let user: User = {
              id: res.records[0].userId,
              userName: res.records[0].userName,
              fullName: res.records[0].fullName,
              password: res.records[0].password,
            };

            return user;
          }
          return { message: 'Password invalid' };
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
  getAllUser() : Observable<User[]>{ 
    const sqlString = `select user_id as id,
      username as userName,
      full_name as fullName
      from user`
 
    const transaction$ = (client: IClient): Observable<User[]> =>
      client.query$<any>(sqlString).pipe(
        map(res => {
           {
             return res.records
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
}
