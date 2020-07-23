import React, { useState } from 'react';
import TaskItem from '../../models/TaskItem';
import { EIDRM } from 'constants';

function TaskItemElement({
  item,
  onUpdateItem,
  onDeleteItem,
}: {
  item: TaskItem;
  onUpdateItem: (item: TaskItem) => void;
  onDeleteItem: (item: TaskItem) => void;
}) {
  const [completed, setCompleted] = useState(item.completed);
  const [todo, setTodo] = useState(item.todo);
  const [editable, setEditable] = useState(false);
  
  return (
    <div className="TaskItem">
      <span className="TaskItem-input input-completed">
        <input
          type="checkbox"
          checked={!!completed}
          onChange={(e) => {
            const checked = e.target.checked ? 1 : 0;
            setCompleted(checked)
            item.completed = checked;
            onUpdateItem(item);
          }}
        />
      </span>
      <span className="TaskItem-input input-todo">
        <input
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value || '');
          }}
          onFocus={() => setEditable(true)}
          onBlur={(e) => {
            if (e.relatedTarget && (e.relatedTarget as HTMLElement).classList.contains("btn-update")) {
              return;
            }

            setTodo(item.todo);
            setEditable(false);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              item.todo = todo;
              onUpdateItem(item);
              setEditable(false);
            }
          }}
        />
      </span>
      {editable ? (
        <button 
          className="TaskItem-btn btn-update"
          onClick={() => {
            item.todo = todo;
            onUpdateItem(item);
            setEditable(false);
          }}
        >
          수정
        </button>
      ) : (
      <button 
        className="TaskItem-btn btn-delete" 
        onClick={() => {
          onDeleteItem(item);
        }}
      >
        삭제
      </button>
      )
    }
    </div>
  );
}

export default TaskItemElement;
