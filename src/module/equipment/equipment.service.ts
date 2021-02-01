import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import {
  IClient,
  IClientResponse,
} from 'src/common/providers/mysql/mysql.service.i';
import { ConfigService } from '../config';
import { checkFreeTimeParams, CheckFreeTimeRespone } from './equipment.model.i';

@Injectable()
export class EquipmentService {
  constructor(
    private mySqlService: MySqlService,
    private configService: ConfigService,
  ) {}

  /*check free time equipments*/
  checkFreeTimeEquipments$(
    params: checkFreeTimeParams,
  ): Observable<IClientResponse<CheckFreeTimeRespone>> {
    const sqlString = `SELECT DISTINCT equipment_id FROM equipment_used where ((? >= start_time and ? <= due_time) or 
    (? >= start_time and ? <= due_time) or 
    (? <= start_time and ? >= due_time))  and equipment_id IN(${params.equipmentId.join(
      ',',
    )})`;
    const placeHoler = [
      params.startTime,
      params.startTime,
      params.dueTime,
      params.dueTime,
      params.startTime,
      params.dueTime,
    ];

    const transaction$ = (
      client: IClient,
    ): Observable<IClientResponse<CheckFreeTimeRespone>> =>
      client.query$<CheckFreeTimeRespone>(sqlString, placeHoler);

    return this.mySqlService.controlTransaction$(
      this.configService.mySqlConfig(),
      transaction$,
    );
  }
}
