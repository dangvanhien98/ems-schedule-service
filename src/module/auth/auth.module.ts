import { Module } from '@nestjs/common';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { ConfigServiceModule } from '../config';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ MySqlServiceModule, ConfigServiceModule],
  providers: [AuthService , UserService],
  controllers: [AuthController],
})
export class AuthModule {}
