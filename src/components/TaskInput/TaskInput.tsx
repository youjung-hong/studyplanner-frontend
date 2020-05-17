import React, { useState } from 'react';
import TaskItem from '../../classes/TaskItem';

function to2digits(num: number) {
  return num < 10 ? '0' + num : '' + num;
}

function toHtmlDatetimeFormat(date: Date|null) {
  if (!date) {
    date = new Date()
  }

  return `${date.getFullYear()}-${to2digits(date.getMonth() + 1)}-${to2digits(date.getDate())}T${to2digits(date.getHours())}:${to2digits(date.getMinutes())}:${to2digits(date.getSeconds())}`
}

type TaskInputItem = {
  todo: string,
  startAt: Date,
  endAt: Date,
}
function TaskInput({ item = { todo: '', startAt: new Date(), endAt: new Date() }, showCancelBtn, onClickSaveBtn, onClickCancelBtn } : {
  item?: TaskItem|TaskInputItem,
  showCancelBtn?: boolean,
  onClickSaveBtn: (taskItem: TaskItem) => void,
  onClickCancelBtn?: () => void 
}) {
  const [ taskTodo, setTaskTodo ] = useState(item.todo);
  const [ taskStartAt, setTaskStartAt ] = useState(toHtmlDatetimeFormat(item.startAt))
  const [ taskEndAt, setTaskEndAt ] = useState(toHtmlDatetimeFormat(item.endAt))

  return (
    <div className="TaskInput">
      <input 
        className="TaskInput-taskTodo" 
        name="todo"
        value={taskTodo} 
        onChange={e => setTaskTodo(e.target.value)}
        placeholder="todo"
      ></input>
      <input 
        type="datetime-local"
        className="TaskInput-startAt" 
        name="startAt"
        value={taskStartAt} 
        onChange={e => setTaskStartAt(e.target.value)}
        placeholder="startAt"
      ></input>
      <input 
        type="datetime-local"
        className="TaskInput-endAt" 
        name="endAt"
        value={taskEndAt} 
        onChange={e => setTaskEndAt(e.target.value)}
        placeholder="endAt"
      ></input>
      <button onClick={() => {
        if (!taskTodo) {
          return;
        }

        onClickSaveBtn(new TaskItem(taskTodo, taskStartAt ? new Date(taskStartAt) : new Date(), taskEndAt ? new Date(taskEndAt) : new Date()))

        setTaskTodo('')
        setTaskStartAt('')
        setTaskEndAt('')
      }}>저장</button>
      {showCancelBtn && <button onClick={() => {
        if (!taskTodo) {
          return;
        }

        if (onClickCancelBtn) {
          onClickCancelBtn()
        }

        setTaskTodo('')
        setTaskStartAt('')
        setTaskEndAt('')
      }}>취소</button>}
    </div>
  );
}

export default TaskInput;
