import { Module } from '@nestjs/common';
import { NotificationController } from '../notification/notification.controller';
import { NotificationService } from '../notification/notification.service';
import { GuardNotification } from './notification.controller.guard';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { MySqlService } from '../../common/providers/mysql/mysql.service';
import { ConfigServiceModule } from '../config';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, GuardNotification, MySqlService],
  imports: [MySqlServiceModule, ConfigServiceModule],
})
export class NotificationModule {}
