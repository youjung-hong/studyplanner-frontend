export default class TaskItem {
  id: number = 0;
  todo: string = '';
  completed: boolean = false;
  startAt: Date;
  endAt: Date;

  constructor(todo: string, startAt: Date, endAt: Date) {
    this.todo = todo;
    this.completed = false;
    this.startAt = startAt;
    this.endAt = endAt;
  }
}