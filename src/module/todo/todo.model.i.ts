export interface Todo {
  todoId: number;
  todoName: string;
  description: string;
  status: string;
  deadline: Date;
  importance: string;
  created: Date;
  modified: Date;
  userId: number;
  todoCategoryId: number;
  userName? :string;
}
export interface TodoUpdate {
  todoName: string;
  description: string;
  status: string;
  deadline: Date;
  importance: string;
  todoCategoryId: number;
}
export class getParams {
  page: number;
  pageSize: number;
  search: string;
  sortName: string;
  sortBy: string;
  todoId: string;
  todoName: string;
  status: string;
  importance: string;
  todoCategoryId: string;
  userId: string;
  dateFrom: Date;
  dateTo: Date;
}
export class GetId {
  id: number;
}

export interface TodoDetail {
  todoId: number;
  todoName: string;
  description: string;
  status: string;
  deadline: Date;
  importance: string;
  created: Date;
  modified: Date;
  todoDetailUser?: UserDetailTodo;
  todoDetailCategory?: CategoryDetailTodo;
}

export interface TodoDetailResponse extends TodoDetail {
  userId: number;
  userName: string;
  fullName: string;
  todoCategoryId: number;
  todoCategoryName: string;
}
export interface UserDetailTodo {
  userId: number;
  userName: string;
  fullName: string;
}

export interface CategoryDetailTodo {
  todoCategoryId: number;
  todoCategoryName: string;
}
export interface AddReminder {
  notificationUrl?: string;
  eventType: number | string;
  eventTypeId: number;
  eventId: number;
  eventStartTime: Date;
  eventTitle: string;
  eventDescription: string;
  eventViewPath: string;
  reminders: UserNames[];
  beforeMinute?: number;
  isRepeat?: boolean;
  expireDate?: Date;
  repeatType?: string;
  repeatValue?: string;
}
export interface UserNames{
  userId: number;
  userName : string;
}
