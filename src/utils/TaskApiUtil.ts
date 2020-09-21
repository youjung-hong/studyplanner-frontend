import ApiUtil from "./ApiUtil";
import { TaskStatus, TaskFormData } from "../models/Task";
import moment from 'moment';

export function getTasks(date: Date) {
  return ApiUtil.get(`/tasks?date=${moment(date).startOf("day").format('YYYY-MM-DD')}`);
}

export function createTask(data: { subjectId: number, date: Date, title: string, status: TaskStatus }) {
  console.log('createTask - date', data);
  return ApiUtil.post(`/tasks`, {
    ...data,
    date: moment(data.date).format("YYYY-MM-DD")
  });
}

export function updateTask(taskId: number, data: TaskFormData) {
  return ApiUtil.put(`/tasks/${taskId}`, data);
}

export function deleteTask(taskId: number) {
  return ApiUtil.delete(`/tasks/${taskId}`);
}
