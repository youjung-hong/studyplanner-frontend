import React from 'react';
import TaskItem from '../../classes/TaskItem';

function TaskSpan({ item, onClickEditBtn, onClickDeleteBtn } : {
  item: TaskItem,
  onClickEditBtn: () => void,
  onClickDeleteBtn: () => void
}) {
  return (
    <div className="TaskSapn">
      { item.todo }  { item.startAt?.toLocaleString() }  { item.endAt?.toLocaleDateString() }
      <button onClick={() => { onClickEditBtn() }}>수정</button>
      <button onClick={() => { onClickDeleteBtn() }}>삭제</button>
    </div>
  );
}

export default TaskSpan;
