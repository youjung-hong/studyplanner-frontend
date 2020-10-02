import React, { useState } from 'react';
import moment from 'moment';
import { TaskTime, TaskTimeFormData } from '../../models/TaskTime';
import { Row, Col, DatePicker, Typography } from 'antd';
import { Task } from '../../models/Task';

const { Title } = Typography;

const { RangePicker } = DatePicker;

type TaskTimePopupProps = {
  task: Task
  taskTime: TaskTime|null,
  onCreate: (taskId: number, data: TaskTimeFormData) => void,
  onUpdate: (taskTime: TaskTime) => void,
  onDelete: (taskId: number, taskTimeId: number) => void,
  onClose: () => void
}

export function TaskTimePopup({ task, taskTime, onCreate, onUpdate, onDelete, onClose }: TaskTimePopupProps) {
  const [value, onChange] = useState([
    taskTime ? new Date(taskTime.startAt) : new Date(),
    taskTime ? new Date(taskTime.endAt) : moment().add(1, 'hour').toDate()
  ]);
  console.log(`[TaskTimePopup]`);

    return (<div className="TaskTimePopup">
      <div className="BtnClose" onClick={onClose}>X</div>
      <ul>
        <li><Row>
          <Col span={4}><Title level={3}>할 일.</Title></Col>
          <Col><Title level={3}>{task.title}</Title></Col>
        </Row></li>
        <li><Row>
          <Col span={4}><Title level={3}>작업시간.</Title></Col>
          <Col><RangePicker
            className="RangePicker"
            showTime={{ 
              format: 'HH:mm',
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
            }}
            format="YYYY-MM-DD HH:mm"
            defaultValue={[moment(value[0]), moment(value[1])]}
            onOk={(date) => {
              if (!date) {
                return;
              }

              // null이 들어올 때는 기존 값을 그대로 유지한다.
              const startAt = date[0]?.toDate() || value[0];
              const endAt = date[1]?.toDate() || value[1]

              onChange([startAt, endAt]);
            }}            
          /></Col>
        </Row></li>
      </ul>
      {taskTime && <button onClick={() => {
        onDelete(task.id, taskTime.id)
      }}>삭제</button>}
      <button onClick={() => {
        taskTime ? onUpdate({
          ...taskTime,
          startAt: value[0],
          endAt: value[1]
        }) : onCreate(task.id, {
          startAt: value[0],
          endAt: value[1]
        })
      }}>저장</button>
    </div>)
} 