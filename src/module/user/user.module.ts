import { Module, UseGuards } from '@nestjs/common';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { ConfigServiceModule } from '../config';
import { UserController } from './user.controller';
import { UserGuard } from './user.controller.guard';
import { UserService } from './user.service';
@Module({
  imports: [MySqlServiceModule, ConfigServiceModule],
  controllers: [UserController],
  providers: [UserService,UserGuard],
})
export class UserModule {}
