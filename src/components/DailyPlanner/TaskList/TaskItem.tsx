import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { TaskItemEditable } from './TaskItemEditable';
import { Subject } from '../../../models/Subject';
import { Row, Col, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';


type TaskItemProps = {
  itemKey: string|number,
  task: Task|TaskFormData,
  subjects: Subject[],
  onCreate: (data: {subjectId: number, title: string, status: TaskStatus}) => void
  onUpdate: (taskId: number, data: TaskFormData) => Promise<void>
  onDelete: (taskId: number) => void
  onClickCreateTime: (taskId: number) => void
}

function StatusFilter(status: TaskStatus) {
  switch(status) {
    case TaskStatus.NOT_STARTED:
      return '-';
    case TaskStatus.STARTED: 
      return '△';
    case TaskStatus.FINISHED:
      return '○';
    case TaskStatus.PUT_OFF: 
      return '≫';
  }
}
export function TaskItem({ itemKey, task, subjects, onCreate, onUpdate, onDelete, onClickCreateTime }: TaskItemProps) {
  const [editing, setEditing] = useState(false)
  const [showMore, setShowMore] = useState(false)
  let timeoutId = 0;

  console.log(`[TaskItem] itemKey: `, itemKey, 'task:', task, 'editing', editing);

  useEffect(() => {
    setShowMore(false)
  }, [editing])

  if (editing || !('id' in task)) {
    return <TaskItemEditable
      itemKey={itemKey}
      task={task}
      subjects={subjects} 
      onCreate={onCreate}
      onUpdate={(taskId, data) => {
        onUpdate(taskId, data)
        .then(() => {
          setEditing(false)
        });
      }}
      onCancel={() => setEditing(false)}
    />
  }

  return (<li className="TaskItem">
    <Row className="Row">
      <Col span={5} className="ColTextVCenter"><span>{task.subjectTitle}</span></Col>
      <Col span={10} className="ColTextVCenter"><span>{task.title}</span></Col>
      <Col span={5} className="ColTextVCenter"><span>{StatusFilter(task.status)}</span></Col>
      <Col span={3}>
        <Button 
          className="BtnShowMore"
          icon={<MoreOutlined/>}
          onClick={() => { 
            setShowMore(true)
          }}
          onBlur={() => { 
            const timerId = setTimeout(() => {
              setShowMore(false)
            }, 1000);
            timeoutId = timerId as unknown as number;
          }}
        >
        </Button>
        {showMore && <div className="PopoverShowMore">
          <Button 
            type="text"
            onClick={() => {
              clearTimeout(timeoutId);
              setEditing(true)
          }}>수정</Button>
          <Button 
            type="text"
            onClick={() => {
              clearTimeout(timeoutId);
              onDelete(task.id)
            }}
          >삭제</Button>
          <Button 
            type="text"
            onClick={() => {
              clearTimeout(timeoutId);
              onClickCreateTime(task.id);
            }}
          >기록</Button>
          </div>}
      </Col>
    </Row>
  </li>)
}