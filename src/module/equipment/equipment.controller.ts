import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { checkFreeTimeParams } from './equipment.model.i';
import { EquipmentService } from './equipment.service';
import { EquipmentGuard } from './equipment.controller.guard';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';

@Controller('equipment')
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
    private guard: EquipmentGuard,
  ) {}

  /*test check freetime equipments*/
  @Post()
  checkEquipment(@Body() params: checkFreeTimeParams): Observable<any> {
    if (!this.guard.isPostBody(params)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.equipmentService.checkFreeTimeEquipments$(params);
  }
}
