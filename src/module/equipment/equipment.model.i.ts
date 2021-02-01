export interface checkFreeTimeParams {
  startTime: Date;
  dueTime: Date;
  equipmentId: number[];
}

export interface CheckFreeTimeRespone {
  equipmentId: number;
}
