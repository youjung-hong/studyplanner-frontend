import React, { useContext } from 'react';
import TaskListContext from '../contexts/TaskListContext';
import TaskItem from '../components/TaskItem/TaskItem';
import TaskItemModel from '../models/TaskItem';

function TaskList() {
  const { state, actions } = useContext(TaskListContext)

  return (
    <ul className="TaskList">
      {(() => {
        const taskItems = []
        for (let i = 0; i < state.rowCount; i += 1) {
          taskItems.push(<li key={i}>
            <TaskItem
              item={state.taskList[i]}
              onCreateItem={todo => {
                const now = Date.now();
                state.taskList[i] = new TaskItemModel(todo, new Date(now), new Date(now + 600000));
                actions.setTaskList(state.taskList.slice())
              }}
              onUpdateItem={item => {
                state.taskList[i] = item

                actions.setTaskList(state.taskList.slice())
              }}
              onDeleteItem={item => {
                delete state.taskList[i];
                actions.setTaskList(state.taskList.slice())
              }}
            ></TaskItem>
          </li>)
        }

        return taskItems;
      })()}
    </ul>
  );
}

export default TaskList;
