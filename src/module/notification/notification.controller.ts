import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { AuthGuard } from '../../common/guards/auth.guard';
import { IPaginationResponse } from '../../common/providers/mysql/mysql.service.i';
import { GetId } from '../todo/todo.model.i';
import { GuardNotification } from './notification.controller.guard';
import {
  GetNotificationsParams,
  IsRead,
  Notification,
  NotificationAdd,
} from './notification.model.i';
import { NotificationService } from './notification.service';

@Controller('notification')
// @UseGuards(AuthGuard)
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private guard: GuardNotification,
  ) {}

  @Post()
  addNotification(@Body() data: NotificationAdd): Observable<any> {
    if (!this.guard.isPostBody(data)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.notificationService.addNotification(data);
  }

  @Get()
  @UseGuards(AuthGuard)
  public getAllNotificationByUser(
    @Query() queryParams: GetNotificationsParams,
    @Req() req: any,
  ): Observable<IPaginationResponse<Notification>> {
    /** user example in request.
     * We can get user from token when implemnt JWT
     * In this example, we just set userId === 1 for test
     */
    // this.logger.info("Enter GET /notification");
    if (!this.guard.isGetNotificationsParams(queryParams)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    const userId = req.user?.id;

    /** check, refactor query params */
    queryParams = {
      userId: userId,
      page: queryParams.page || '1',
      pageSize: queryParams.pageSize || '20',
      isRead: queryParams.isRead || '-1',
      eventTypeName: queryParams.eventTypeName || '%',
      search: queryParams.search ? `%${queryParams.search}%` : '%',
      sortName:
        queryParams.sortName === 'status'
          ? 'isRead'
          : queryParams.sortName || 'eventStartTime',
      sortBy: queryParams.sortBy || 'desc',
    };

    return this.notificationService.getAllNotificationByUser(queryParams);
  }

  @Put()
  updateIsRead(@Body() data: IsRead): Observable<any> {
    if (!this.guard.isPutBodyRead(data)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.notificationService.updateIsRead(data);
  }

  @Get('/total-unread')
  @UseGuards(AuthGuard)
  getNotificationUnread(@Query() id : number ,@Req()  req : any): Observable<any> {
    id = req.user?.id;
    return this.notificationService.getNotificationUnread(id);
  }
}
