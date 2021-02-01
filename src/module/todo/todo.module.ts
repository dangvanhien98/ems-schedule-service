import { HttpModule, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MySqlServiceModule } from '../../common/providers/mysql/mysql.service.module';
import { TodoGuard } from './todo.controller.guard';
import { TodoListDecorator } from '../../common/decorator/todoList.decorator';
import { ConfigServiceModule } from '../config';
@Module({
  imports: [MySqlServiceModule, ConfigServiceModule ,HttpModule],
  providers: [TodoService, TodoGuard, TodoListDecorator],
  controllers: [TodoController],
})
export class TodoModule {}
