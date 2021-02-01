import { Module } from '@nestjs/common';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { ConfigServiceModule } from '../config';
import { EquipmentController } from './equipment.controller';
import { EquipmentGuard } from './equipment.controller.guard';
import { EquipmentService } from './equipment.service';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentGuard],
  imports: [MySqlServiceModule, ConfigServiceModule],
})
export class EquipmentModule {}
