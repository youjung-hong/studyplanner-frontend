import React, { useState } from 'react';
import TaskInput from '../TaskInput/TaskInput'
import TaskItem from '../../classes/TaskItem'
import TaskSpan from '../TaskInput/TaskSpan'

function TaskItemElement({ item, onClickSaveBtn, onClickDeleteBtn }
  : { 
      item: TaskItem, 
      onClickSaveBtn: (item: TaskItem) => void,
      onClickDeleteBtn: (item: TaskItem) => void
    }) {
  const [editable, setEditable] = useState(false)
  return (
          <div className="taskItem">
            {item.id} -
            {editable ?
              <TaskInput 
                item={item}
                onClickSaveBtn={(item) => { 
                  setEditable(false)
                  onClickSaveBtn(item)
                }}
                onClickCancelBtn={() => {
                  setEditable(false)
                }}
              />
              : <TaskSpan 
                  item={item}
                  onClickEditBtn={() => { 
                    setEditable(true)
                  }}
                  onClickDeleteBtn={() => { onClickDeleteBtn(item) }}
                />
            }
          </div>
        );
}

export default TaskItemElement;
