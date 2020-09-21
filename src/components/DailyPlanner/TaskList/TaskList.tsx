import React from 'react';
import { TaskItem } from './TaskItem';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { Subject } from '../../../models/Subject';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../../constants/RouterPath';

type TaskListProps = {
  subjects: Subject[],
  subjectMap: Map<number, Subject>,
  tasks: Task[],
  onCreate: (data: {subjectId: number, title: string, status: TaskStatus}) => void
  onUpdate: (taskId: number, data: TaskFormData) => Promise<void>,
  onDelete: (taskId: number) => void,
  onClickCreateTime: (taskId: number) => void
}

export function TaskList({ 
  subjects, 
  subjectMap,
  tasks, 
  onCreate,
  onUpdate,
  onDelete,
  onClickCreateTime
}: TaskListProps) {
  console.log(`[TaskList]`);
  const list: (Task|null)[] = tasks;
  const emptyItemCount = 10 - tasks.length;
  
  for (let i = 0; i < emptyItemCount; i += 1) {
    list.push(null);
  }

  return (<div>
    {subjects.length === 0 && <Link to={RouterPath.SUBJECT}>과목설정 먼저 해주세요.</Link>}
    <ul>
      {list.map((task, index) => {
        return (<div key={`task-item-div-${task ? `task-${task.id}` : `${index}`}`}>
          <TaskItem
            itemKey={`task-item-${task ? `task-${task.id}` : `${index}`}`}
            task={task || undefined}
            subjects={task && !subjectMap.has(task.subjectId) ? [{id: task.subjectId, title: task.subjectTitle}].concat(subjects) : subjects}
            onCreate={onCreate}
            onUpdate={onUpdate} 
            onDelete={onDelete}
            onClickCreateTime={onClickCreateTime}
          />
        </div>);
      })}
    </ul>
  </div>)
}