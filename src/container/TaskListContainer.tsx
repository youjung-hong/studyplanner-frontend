import React, { useContext } from 'react';
import TaskListContext from '../contexts/TaskListContext';
import TaskItem from '../components/TaskItem/TaskItem';

function TaskList() {
  const { state, actions } = useContext(TaskListContext)

  return (
    <ul className="TaskList">
      {state.taskList.map((item, idx) => (
        <li key={idx}>
          <TaskItem
            item={item}
            onClickSaveBtn={item => {
              state.taskList.splice(idx, 1, item)
              actions.setTaskList(state.taskList.slice())
            }}
            onClickDeleteBtn={item => {
              actions.setTaskList(state.taskList.filter(taskItem => taskItem !== item))
            }}
          ></TaskItem>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
