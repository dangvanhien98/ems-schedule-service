import { HttpModule, Module } from '@nestjs/common';
import { from } from 'rxjs';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { ConfigServiceModule } from '../config';
import { ScheduleController } from './schedule.controller';
import { ScheduleGuard } from './schedule.controller.guard';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [MySqlServiceModule, ConfigServiceModule, HttpModule],
  providers: [ScheduleService, ScheduleGuard],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
