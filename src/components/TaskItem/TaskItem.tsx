import React, { useState } from 'react';
import TaskItem from '../../models/TaskItem'

function TaskItemElement({ item, onCreateItem, onUpdateItem, onDeleteItem }
  : { 
      item: TaskItem, 
      onCreateItem: (todo: string) => void,
      onUpdateItem: (item: TaskItem) => void,
      onDeleteItem: (item: TaskItem) => void
    }) {
  const [completed, setCompleted] = useState(item?.completed || false)
  const [todo, setTodo] = useState(item?.todo || '')
  const [editable, setEditable] = useState(false)
  return (
          <div className="TaskItem">
            <span className="TaskItem-input input-completed">
              <input type="checkbox" checked={completed} onChange={e => setCompleted(!!e.target.checked)} disabled={!item}/>
            </span>
            <span className="TaskItem-input input-todo">
              <input 
                value={todo}
                onChange={e => {
                  setTodo(e.target.value || '')
                }}
                onFocus={() => setEditable(true)}
                onBlur={() => {
                  setEditable(false);

                  if (!item) {
                    onCreateItem(todo)
                    return;
                  }

                  item.completed = completed;
                  item.todo = todo;
                  onUpdateItem(item)
                }}
              />
            </span>
            {editable ? 
              <button className="TaskItem-btn btn-cancel" onClick={() => setEditable(false) }>취소</button> :
              <button className="TaskItem-btn btn-delete" onClick={() => {
                if (!item) {
                  return;
                }

                onDeleteItem(item) 
              }}>삭제</button>
            }
          </div>
        );
}

export default TaskItemElement;
