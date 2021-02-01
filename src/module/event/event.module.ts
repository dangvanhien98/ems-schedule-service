import { ConfigServiceModule } from './../config/config.service.module';
import { EventService } from './event.service';
import { MySqlServiceModule } from './../../common/providers/mysql/mysql.service.module';
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';

@Module({
  controllers: [EventController],
  imports: [MySqlServiceModule, ConfigServiceModule],
  providers: [EventService],
})
export class EventModule {}
