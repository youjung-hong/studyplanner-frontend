export default class TaskItem {
  id: number = 0;
  todo: string;
  startAt: Date;
  endAt: Date;

  constructor(todo: string, startAt: Date, endAt: Date) {
    this.todo = todo;
    this.startAt = startAt;
    this.endAt = endAt;
  }
}