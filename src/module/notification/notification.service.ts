import { BadRequestException, Injectable } from '@nestjs/common';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { ErrorCode } from '../../common/providers/mysql/client';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import { IClient } from '../../common/providers/mysql/mysql.service.i';
import { ConfigService } from '../config';
import {
  GetNotificationsParams,
  IsRead,
  Notification,
  NotificationAdd
} from '../notification/notification.model.i';
import { GetId } from '../todo/todo.model.i';
import { IPaginationResponse } from './../../common/providers/mysql/mysql.service.i';

@Injectable()
export class NotificationService {
  constructor(
    private mySqlService: MySqlService,
    public configService: ConfigService,
  ) {}

  addNotification(data: NotificationAdd): Observable<NotificationAdd> {
    data.timeNotification = new Date(data.timeNotification);
    data.eventStartTime = new Date(data.eventStartTime);
    data.eventEndTime = new Date(data.eventEndTime);
    const sqlString =
      'INSERT INTO notification (\
      title, \
      description, \
      time_notification, \
      created, modified, \
      event_id, event_path, \
      event_type_id, \
      event_start_time, \
      event_end_time \
      ) VALUES( ?, ?, ?, Now(), Now(), ?, ?, ?, ?, ? ); ';
    const placeHolder = [
      data.title,
      data.description,
      data.timeNotification,
      data.eventId,
      data.eventPath,
      data.eventTypeId,
      data.eventStartTime,
      data.eventEndTime,
    ];

    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        mergeMap(insertNotification => {
          const notificationId = insertNotification.records['insertId'];
          let insertSqlUserNotification = '';
          if (data.userIds != undefined || data.userIds.length != 0) {
            let insertUsersNotification =
              'INSERT INTO user_notification (is_read, created, modified,  user_id, notification_id) VALUES';
            let valueInsertUsersNotification = data.userIds
              .map(userId => `(0, Now(), Now(),${userId},${notificationId})`)
              .join(',');
            insertSqlUserNotification =
              insertUsersNotification + valueInsertUsersNotification + ';';
            console.log(
              'insertSqlUserNotification' + insertSqlUserNotification,
            );
          }
          return client.query$<any>(insertSqlUserNotification).pipe(
            map(() => ({
              notificationId,
            })),
          );
        }),
        map(id => id),
        catchError(err => {
          return throwError(ErrorCode.categorize(err));
        }),
      );
    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }

  public getAllNotificationByUser(
    params: GetNotificationsParams,
  ): Observable<IPaginationResponse<Notification>> {
    let isUnRead = -1;
    switch (params.isRead) {
      case '0':
        isUnRead = 1;
        break;
      case '1':
        isUnRead = 0;
        break;
      default:
        isUnRead = -1;
        break;
    }
    /** Query string */
    const fromAndWhere = `
      FROM ems_schedule.notification n
      INNER JOIN ems_schedule.user_notification un  ON n.notification_id = un.notification_id 
      INNER JOIN ems_schedule.event_type et ON n.event_type_id = et.event_type_id
      WHERE 
        un.user_id = ?
        AND un.is_read <> ?
        AND COALESCE(et.event_type_name , '') LIKE ?
        AND (
          n.title LIKE ?
          OR COALESCE(n.description , '') LIKE ?
        )
    `;
    const sqlString = `
      SELECT 
        n.notification_id as notificationId
        , n.title as title
        , n.description as description
        , n.event_id as eventId
        , n.event_path as eventPath
        , n.event_start_time as eventStartTime
        , n.event_end_time as eventEndTime
        , COALESCE(et.event_type_name, '') as eventTypeName
        , CONVERT (un.is_read , SIGNED) as isRead
      ${fromAndWhere}
      ORDER BY ${params.sortName} ${params.sortBy}
      LIMIT ? OFFSET ?
    `;
    const sqlCountString = `
      SELECT count(*) as total
      ${fromAndWhere}
    `;
    /** The placeHolder use same for count query. If can't binding data, only remove some row */
    const placeHolder = [
      params.userId,
      isUnRead,
      params.eventTypeName,
      params.search,
      params.search,
      parseInt(params.pageSize),
      (parseInt(params.page) - 1) * parseInt(params.pageSize),
    ];

    const transaction$ = (client: IClient): Observable<any> =>
      zip(
        client.query$<Notification>(sqlString, placeHolder).pipe(
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
    );
  }

  updateIsRead(data: IsRead): Observable<any> {
    const sqlString =
      "UPDATE user_notification SET is_read = b'?' WHERE notification_id = ? AND user_id = ? ";
    const placeHolder = [data.isRead, data.notificationId, data.userId];
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        map(res => {
          return {
            message: MessageErrorConstant.UPDATE_SUCCESS,
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

  getNotificationUnread(id: number): Observable<any> {
    const sqlString = `
    SELECT COUNT(*) AS TOTAL 
    FROM user_notification 
    WHERE (is_read = 0 AND user_id = ?)`;
    const placeHolder = [id];

    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
        map(res => {
          return res.records[0].TOTAL;
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
