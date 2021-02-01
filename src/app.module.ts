import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './module/todo/todo.module';
import { NotificationModule } from './module/notification/notification.module';
import { CategoryModule } from './module/category/category.module';
import { EventService } from './module/event/event.service';
import { EventModule } from './module/event/event.module';
import { ScheduleModule } from './module/schedule/schedule.module';
import { EquipmentModule } from './module/equipment/equipment.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    NotificationModule,
    ScheduleModule,
    TodoModule,
    CategoryModule,
    EventModule,
    EquipmentModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
