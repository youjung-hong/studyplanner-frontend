export default class TaskItem {
  id: number|undefined;
  todo: string;
  color: string;
  completed: number;

  constructor(...args: ([string] | [number, string, string, number])) {
    if (arguments.length === 1) {
      this.todo = arguments[0];
      this.color = '#123456';
      this.completed = 0;
    } else if (arguments.length === 4) {
      this.id = arguments[0];
      this.todo = arguments[1];
      this.color = arguments[2];
      this.completed = arguments[3];
    } else {
      this.todo = '';
      this.color = '#123456';
      this.completed = 0;
    }
  }

  toString() {
    return `${this.id}-${this.todo}-${this.color}-${this.completed}`
  }
}