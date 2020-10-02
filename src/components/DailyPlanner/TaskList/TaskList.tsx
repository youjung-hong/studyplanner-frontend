import React, { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { Subject } from '../../../models/Subject';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../../constants/RouterPath';

type TaskListProps = {
  date: Date,
  subjects: Subject[],
  subjectMap: Map<number, Subject>,
  tasks: Task[],
  onCreate: (data: {subjectId: number, title: string, status: TaskStatus}) => void
  onUpdate: (taskId: number, data: TaskFormData) => Promise<void>,
  onDelete: (taskId: number) => void,
  onClickCreateTime: (taskId: number) => void
}

type TaskListListState = (Task|TaskFormData)[]

export function TaskList({ 
  date,
  subjects, 
  subjectMap,
  tasks, 
  onCreate,
  onUpdate,
  onDelete,
  onClickCreateTime
}: TaskListProps) {
  let [list, setList] = useState<TaskListListState>([]);

  useEffect(() => {
    console.log(`[TaskList]`);
    const list: (Task|TaskFormData)[] = tasks;
    const emptyItemCount = 10 - tasks.length;
    console.log(`[TaskList] emptyItemCount: ${emptyItemCount}, list: ${tasks.length}`)

    let subjectId = -1;
    if (subjects.length) {
      subjectId = subjects[0].id
    }

    for (let i = 0; i < emptyItemCount; i += 1) {
      list.push({ subjectId, title: '', status: TaskStatus.NOT_STARTED, date: date });
    }

    setList(list)
  }, [tasks, subjects])

  return (<div className="TaskList">
    <ul>
      {list.map((task, index) => {
        const key = 'id' in task ? task.id : index;
        const subjectList = 'id' in task && !subjectMap.has(task.subjectId) ? [{id: task.subjectId, title: task.subjectTitle}].concat(subjects) : subjects;
        
        return (
          <TaskItem
            key={key}
            itemKey={key}
            task={task}
            subjects={subjectList}
            onCreate={onCreate}
            onUpdate={onUpdate} 
            onDelete={onDelete}
            onClickCreateTime={onClickCreateTime}
          />);
      })}
    </ul>
  </div>)
}