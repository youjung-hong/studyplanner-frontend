import React, { useState } from 'react';
import moment from 'moment';
import { TaskTime, TaskTimeFormData } from '../../models/TaskTime';
// @ts-ignore
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

type TaskTimePopupProps = {
  taskId: number,
  taskTime: TaskTime|null,
  onCreate: (taskId: number, data: TaskTimeFormData) => void,
  onUpdate: (taskTime: TaskTime) => void,
  onDelete: (taskId: number, taskTimeId: number) => void,
  onClose: () => void
}

export function TaskTimePopup({ taskId, taskTime, onCreate, onUpdate, onDelete, onClose }: TaskTimePopupProps) {
  const [value, onChange] = useState([
    taskTime ? taskTime.startAt : new Date(),
    taskTime ? taskTime.endAt : moment().add(1, 'hour').toDate()
  ]);
  console.log(`[TaskTimePopup]`);

    return (<div className="TaskTimePopup">
      <div onClick={onClose}>X</div>
      <ul>
        <li>TaskId: {taskTime ? taskTime.taskId : taskId}</li>
        {taskTime && <li>ID: {taskTime.id}</li>}
        <li>작업시간: <DateTimeRangePicker
            onChange={onChange}
            value={value}
          />
        </li>
      </ul>
      {taskTime && <button onClick={() => {
        onDelete(taskTime.taskId, taskTime.id)
      }}>삭제</button>}
      <button onClick={() => {
        taskTime ? onUpdate({
          ...taskTime,
          startAt: value[0],
          endAt: value[1]
        }) : onCreate(taskId, {
          startAt: value[0],
          endAt: value[1]
        })
      }}>저장</button>
    </div>)
} 