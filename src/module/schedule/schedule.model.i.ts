import { IClientResponse } from "../../common/providers/mysql/mysql.service.i";
import { User, userInfo } from "../user/user.model.i";

export interface Schedule {
  scheduleId?: number;
  title: string;
  timeStart: Date;
  dueDate: Date;
  timeStartRepeat: string;
  timeDueRepeat: string;
  createBy: number;
  isDelete?: boolean;
  status?: boolean;
  description?: string;
  important?: string;
  place?: string;
  created?: Date;
  modified?: Date;
  scheduleCategoryId?: number;
  equipmentName: Equipment[];
  userIds: GetId[];
  typeRepeat: string;
  valueRepeat: string;
}

export interface ScheduleUpdate {
  scheduleId?: number;
  title: string;
  timeStart: Date;
  dueDate: Date;
  timeStartRepeat: string;
  timeDueRepeat: string;
  createBy?: number;
  isDelete?: boolean;
  status?: boolean;
  description?: String;
  important?: string;
  place?: string;
  created?: Date;
  modified?: Date;
  scheduleCategoryId?: number;
  equipmentName: Equipment[];
  userIds: GetId[];
  typeRepeat: string;
  valueRepeat: string;
}

export interface ScheduleDetail {
  scheduleId?: number;
  title: string;
  description?: String;
  timeStartRepeat : string,
  timeDueRepeat : string,
  startDate: Date;
  dueDate: Date;
  important?: string;
  place?: string;
  isDelete?: boolean;
  createBy: number;
  createdByName : string;
  createByFullName : string;
  scheduleCategoryId? : number;
  type : string;
  valueRepeat : string;
  scheduleCategoryName?: string;
  created: Date,
  modified: Date,
  equipmentNames: EquipmentDetail[];
  userNames: UserDetail[];
}


export interface ScheduleOfUser{
  userId: userInfo,
  schedules: ScheduleGroup[]
}

export interface ScheduleGroup{
  scheduleId: number;
  title: string;
  startTime: Date;
  endTime: Date;
  repeatStartTime: string;
  repeatEndTime: string;
  typeRepeat: string;
  valueRepeat: string;
  typeSchedule: string;
  users: userInfo
}

export interface GetAllScheduleParams {
  userId: number; // For now we just get schedule of one user. Will implement search and group for all user affter
  from?: Date; // defaul => get schedule of current week
  to?: Date;
  keyword?: string; // only text search for title now
  sort?: string;
  sortBy?: string;
  sortName?: string;
  page?: string;
  pageSize?: string;
  importance?: string;
  categoryId?: string;
  /** Don't implement on this sprint */
  // status: string;
  // scheduleCategoryId: number;
  // important: string;
}
export interface GetId {
  id: number;
}

export class Equipment {
  equipmentId: number;
  timeStart?: Date;
  timeDue?: Date;
}

export interface EquipmentDetail {
  equipmentId: number;
  equipmentName: string;
  timeStart?: Date;
  timeDue?: Date;
}

export interface UserDetail {
  userId: number;
  userName: string;
}
export interface GetByDayUser {
  userId: number;
  day?: Date;
  sortName?: string;
  sortBy?: string;
}

export interface GetParamDelete {
  scheduleId: number;
  userId: number;
}

export interface GetParamListWeek{
  startDate: Date;
  endDate: Date;
  userLogin: number;
  director: number;
  page: number;
  pageSize: number;
}
