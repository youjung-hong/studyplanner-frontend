export enum TaskStatus {
  NOT_STARTED, STARTED, FINISHED, PUT_OFF
}

export type TaskTimeFormData = {
  startAt: Date;
  endAt: Date;
}

export class TaskTime {
  id: number;
  taskId: number;
  startAt: Date;
  endAt: Date;

  constructor(id: number, taskId: number, startAt: Date, endAt: Date) {
    this.id = id;
    this.taskId = taskId;
    this.startAt = startAt;
    this.endAt = endAt;
  }
}