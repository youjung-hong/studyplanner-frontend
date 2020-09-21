import ApiUtil from "./ApiUtil";
import moment from 'moment-timezone';
import { TaskTimeFormData, TaskTime } from "../models/TaskTime";

export function getTaskTimes(date: Date) {
  console.log('getTaskTimes - date:', date);
  return ApiUtil.get(`/tasktimelogs?date=${moment(date).format('YYYY-MM-DD')}`);
}

export function createTaskTime(taskId: number, data: TaskTimeFormData) {
  console.log('createTaskTime - taskId:', taskId, ' - data:', data);
  return ApiUtil.post(`/tasks/${taskId}/logs`, {
    startAt: moment(data.startAt).format('YYYY-MM-DD HH:mm:ss'),
    endAt: moment(data.endAt).format('YYYY-MM-DD HH:mm:ss'),
  });
}

export function updateTaskTime(taskTime: TaskTime) {
  return ApiUtil.put(`/tasks/${taskTime.taskId}/logs/${taskTime.id}`, {
    startAt: moment(taskTime.startAt).format('YYYY-MM-DD HH:mm:ss'),
    endAt: moment(taskTime.endAt).format('YYYY-MM-DD HH:mm:ss'),
  });
}

export function deleteTaskTime(taskId: number, id: number) {
  return ApiUtil.delete(`/tasks/${taskId}/logs/${id}`);
}
