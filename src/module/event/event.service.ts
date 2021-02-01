import { ConfigService } from './../config/config.service';
import { Event } from './event.model.i';
import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { ErrorCode } from '../../common/providers/mysql/client';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import { IClient } from '../../common/providers/mysql/mysql.service.i';
import { GetId } from '../todo/todo.model.i';

@Injectable()
export class EventService {
  constructor(
    private mySqlService: MySqlService,
    public configService: ConfigService,
  ) {}

  getEventList$(userId: number): Observable<Event> {
    const sqlString = `
    select  et.event_type_id as eventId,
    et.event_type_name as eventName
    from event_type as et
    join notification as n on n.event_type_id = et.event_type_id
    join user_notification as un on un.notification_id = n.notification_id
    where un.user_id = ?
    group by et.event_type_id
    `;
    const placeHolder = [userId];
    const transaction$ = (client: IClient): Observable<any> =>
      client.query$<any>(sqlString, placeHolder).pipe(
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
