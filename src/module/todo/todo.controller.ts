import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { TodoListDecorator } from '../../common/decorator/todoList.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { IPaginationResponse } from '../../common/providers/mysql/mysql.service.i';
import { TodoGuard } from './todo.controller.guard';
import { getParams, Todo, TodoDetail, TodoUpdate } from './todo.model.i';
import { TodoService } from './todo.service';
@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
    private todoService: TodoService,
    private todoGuard: TodoGuard,
    private decorator: TodoListDecorator,
  ) {}
  @Get()
  getTodoList(
    @Query() params: getParams,
    @Req() req: any,
  ): Observable<IPaginationResponse<Todo>> {
    const userId = req.user?.id;
    params = {
      page: params.page ? params.page : 1,
      pageSize: params.pageSize ? params.pageSize : 20,
      search: params.search ? params.search : '',
      sortName: params.sortName ? params.sortName : '',
      sortBy: params.sortBy ? params.sortBy : '',
      todoId: params.todoId ? params.todoId : '',
      todoName: params.todoName ? params.todoName : '',
      status: params.status ? params.status : '',
      importance: params.importance ? params.importance : '',
      todoCategoryId: params.todoCategoryId ? params.todoCategoryId : '',
      userId: userId,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    };

    if (!this.todoGuard.isGetPagination(params)) {
      return throwError(
        new HttpException(
          MessageErrorConstant.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    return this.todoService.getTodoList$(params);
  }

  @Post()
  createNewTodo(@Body() todo: Todo, @Req() req: any): Observable<void> {
    todo.userId = req.user?.id;
    todo.userName = req.user?.userName;
    if (!this.todoGuard.isPostBody(todo))
      return throwError(
        new BadRequestException(MessageErrorConstant.BAD_REQUEST),
      );
    return this.todoService.createNewTodo$(todo);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Observable<TodoDetail> {
    /*code in here*/
    if (!this.todoGuard.isGetPath(id)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    return this.todoService.getTodoById$(Number(id)).pipe(
      map(response => {
        if (response == null) {
          throw new NotFoundException(MessageErrorConstant.NOT_FOUND_RESOURCE);
        }
        return response;
      }),
    );
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() todo: TodoUpdate,
  ): Observable<any> {
    if (!this.todoGuard.isGetPath(id)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    if (Object.keys(todo).length === 0) {
      return this.todoService.updateStatusTodo(Number(id));
    }
    if (!this.todoGuard.isPutBody(todo)) {
      return throwError(
        new BadRequestException(MessageErrorConstant.BAD_REQUEST),
      );
    }
    return this.todoService.updateTodo(Number(id), todo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Observable<any> {
    if (!this.todoGuard.isGetPath(id)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    return this.todoService.deleteTodo(Number(id));
  }
}
