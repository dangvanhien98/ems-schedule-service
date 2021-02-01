import { ConfigServiceModule } from './../config/config.service.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';

@Module({
  imports: [MySqlServiceModule, ConfigServiceModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
