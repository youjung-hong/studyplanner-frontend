import React, { useState } from 'react';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { TaskItemEditable } from './TaskItemEditable';
import { Subject } from '../../../models/Subject';

type TaskItemProps = {
  itemKey: string|number,
  task: Task|TaskFormData,
  subjects: Subject[],
  onCreate: (data: {subjectId: number, title: string, status: TaskStatus}) => void
  onUpdate: (taskId: number, data: TaskFormData) => Promise<void>
  onDelete: (taskId: number) => void
  onClickCreateTime: (taskId: number) => void
}

export function TaskItem({ itemKey, task, subjects, onCreate, onUpdate, onDelete, onClickCreateTime }: TaskItemProps) {
  const [editing, setEditing] = useState(false)

  console.log(`[TaskItem] itemKey: `, itemKey, 'task:', task, 'editing', editing);

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

  return (<li>
    <span>{task.subjectTitle}</span>
    <span>{task.title}</span>
    <span>{TaskStatus[task.status]}</span>
    <button onClick={() => setEditing(true)}>수정하기</button>
    <button onClick={() => onDelete(task.id)}>삭제</button>
    <button onClick={() => onClickCreateTime(task.id)}>시간기록</button>
  </li>)
}