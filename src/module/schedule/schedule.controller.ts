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
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageErrorConstant } from '../../common/constants/messageErrorConstant';
import { AuthGuard } from '../../common/guards/auth.guard';
import { IClientResponse, IPaginationResponse } from '../../common/providers/mysql/mysql.service.i';
import { ScheduleGuard } from './schedule.controller.guard';
import {
  GetAllScheduleParams,
  GetByDayUser,
  GetParamDelete,
  GetParamListWeek,
  Schedule,
  ScheduleDetail,
  ScheduleOfUser,
  ScheduleUpdate,
} from './schedule.model.i';
import { ScheduleService } from './schedule.service';
import * as moment from 'moment';

@Controller('schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private guard: ScheduleGuard,
  ) {}
  @Get('/category')
  getAllScheduleCategory(): Observable<any> {
    return this.scheduleService.getAllScheduleCategory$();
  }
  @Get('/filter')
  getSchedulesByFilter(
    @Query() params: GetAllScheduleParams,
    @Req() req: any,
  ): Observable<any> {
    params = {
      userId: req.user?.id,
      keyword: params.keyword ? params.keyword : '',
      from: params.from,
      to: params.to,
      page: params.page || '1',
      pageSize: params.pageSize || '10',
      sortBy: params.sortBy || 'asc',
      sortName: params.sortName || 'timeStart',
      categoryId: params.categoryId || '',
      importance: params.importance,
    };
    if (!this.guard.isGetScheduleParamsFilter(params)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    return this.scheduleService.getSchedulesByFilter$(params);
  }
  @Get()
  getSchedulesByUser(
    @Query() params: GetAllScheduleParams,
    @Req() req: any,
  ): Observable<any> {
    params = {
      userId: req.user?.id,
      keyword: params.keyword ? params.keyword : '',
      from: params.from,
      to: params.to,
    };
    if (!this.guard.isGetAllScheduleParams(params)) {
      return throwError(
        new HttpException(
          MessageErrorConstant.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    return this.scheduleService.getSchedulesByUser$(params);
  }

  @Get('/group')
  getScheduleWeek(
    @Query() params: GetParamListWeek,
    @Req() req: any,
  ): Observable<IPaginationResponse<ScheduleOfUser>> {
    if (!this.guard.isGetScheduleWeekParams(params) || params.page == 0) {
      return throwError(
        new HttpException(
          MessageErrorConstant.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    
    params = {
      ...params,
      userLogin: req.user?.id,
      startDate: new Date(params.startDate),
      endDate: new Date(params.endDate),
      pageSize: Number(params.pageSize ? params.pageSize : 10),
    };

    return this.scheduleService.getSchedulesGroupUser(params);
  }

  @Get('/day')
  getScheduleNowDay(
    @Query() params: GetByDayUser,
    @Req() req: any,
  ): Observable<any> {
    params = {
      userId: req.user?.id,
      day: params.day,
      sortName: params.sortName ? params.sortName : '',
      sortBy: params.sortBy ? params.sortBy : '',
    };
    return this.scheduleService.getScheduleByDayUser$(params);
  }
  @Get(':id')
  getScheduleById(
    @Param('id') id: string,
  ): Observable<IClientResponse<ScheduleDetail>> {
    /*code in here*/
    if (!this.guard.isGetPath(id)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    return this.scheduleService.getScheduleById$(Number(id)).pipe(
      map(response => {
        if (response == null) {
          throw new NotFoundException(MessageErrorConstant.NOT_FOUND_RESOURCE);
        }
        return response;
      }),
    );
  }
  @Post()
  addSchedule(@Body() schedule: Schedule, @Req() req: any): Observable<any> {
    schedule.createBy = req.user?.id;
    if (!this.guard.isPostBody(schedule)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }

    schedule.timeStart = new Date(schedule.timeStart);
    schedule.dueDate = new Date(schedule.dueDate);

    if (
      schedule.typeRepeat == 'normal' &&
      (schedule.timeStart < new Date() || schedule.timeStart > schedule.dueDate)
    ) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }

    if (
      schedule.typeRepeat != 'normal' &&
      (schedule.dueDate < new Date() ||
        new Date('10/10/2020 ' + schedule.timeStartRepeat) >
          new Date('10/10/2020 ' + schedule.timeDueRepeat))
    ) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    /*code in here*/
    return this.scheduleService.addSchedule$(schedule);
  }
  @Put(':id')
  updateSchedule(
    @Param('id') id: string,
    @Body() schedule: ScheduleUpdate,
  ): Observable<any> {
    if (!this.guard.isPutPath(id)) {
      throw new BadRequestException(MessageErrorConstant.NOT_FOUND);
    }
    if (!this.guard.isPutBody(schedule)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    schedule.timeStart = new Date(schedule.timeStart);
    schedule.dueDate = new Date(schedule.dueDate);

    if (
      schedule.typeRepeat == 'normal' &&
      (schedule.timeStart < new Date() || schedule.timeStart > schedule.dueDate)
    ) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }

    if (
      schedule.typeRepeat != 'normal' &&
      (schedule.dueDate < new Date() ||
        new Date('01/01/2020 ' + schedule.timeStartRepeat) >
          new Date('01/01/2020 ' + schedule.timeDueRepeat))
    ) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.scheduleService.updateSchedule$(Number(id), schedule);
  }
  @Delete()
  deleteSchedule(
    @Query() param: GetParamDelete,
    @Req() req: any,
  ): Observable<any> {
    param = {
      scheduleId: param.scheduleId,
      userId: req.user?.id,
    };
    if (!this.guard.isGetParamDelete(param)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.scheduleService.deleteScheduleById$(param);
  }
  @Delete('/undoDelete')
  undoDeleteSchedule(
    @Query() param: GetParamDelete,
    @Req() req: any,
  ): Observable<any> {
    param = {
      scheduleId: param.scheduleId,
      userId: req.user?.id,
    };
    if (!this.guard.isGetParamDelete(param)) {
      throw new BadRequestException(MessageErrorConstant.BAD_REQUEST);
    }
    return this.scheduleService.undoDeleteScheduleById$(param);
  }
}
