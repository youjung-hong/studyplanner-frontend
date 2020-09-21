export enum TaskStatus {
  NOT_STARTED, STARTED, FINISHED, PUT_OFF
}

export type TaskFormData = {
  subjectId: number;
  date: Date;
  title: string;
  status: TaskStatus;
}

export class Task {
  id: number;
  subjectId: number;
  subjectTitle: string;
  date: Date;
  title: string;
  status: TaskStatus;

  constructor(id: number, subjectId: number, subjectTitle: string, date: Date, title: string, status: TaskStatus) {
    this.id = id;
    this.subjectId = subjectId;
    this.subjectTitle = subjectTitle;
    this.date = date;
    this.title = title;
    this.status = status;
  }
}