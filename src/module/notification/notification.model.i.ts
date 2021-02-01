export interface Notification {
  notificationId?: Number;
  title: String;
  description?: String;
  timeNotification: Date;
  created?: Date;
  modified?: Date;
  eventId: Number;
}

export class GetParams {
  offset: number;
  limit: number;
}
export class GetId {
  id: number;
}

export class IsRead {
  isRead: number;
  notificationId: number;
  userId: number;
}

export interface NotificationAdd {
  title: String;
  description?: String;
  timeNotification: Date;
  eventId: Number;
  eventPath: string;
  eventTypeId: number;
  eventStartTime: Date;
  eventEndTime: Date;
  userIds : Number[];
}  

export interface GetNotificationsParams {
  page?: string;
  pageSize?: string;
  search?: string;
  isRead?: string; // maybe must change to enum
  eventId?: string; // no use
  eventTypeName?: string; // event type schedule / todo / ....
  sort?: string;
  sortBy?: string;
  sortName?: string;
  userId?: number; // only get for current user
}
