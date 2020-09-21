import ApiUtil from "./ApiUtil";
import moment from 'moment';

export function getTaskMeta(date: Date) {
  console.log('date', date)
  return ApiUtil.get(`/taskmeta?date=${moment(date).format('YYYY-MM-DD')}`);
}

