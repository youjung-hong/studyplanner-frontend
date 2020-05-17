import React, { useContext } from 'react';
import TaskListContext from '../contexts/TaskListContext';
import TaskInput from '../components/TaskInput/TaskInput';

function NewTaskInputContainer() {
  const { state, actions } = useContext(TaskListContext)

  return (
    <TaskInput showCancelBtn={true} onClickSaveBtn={(taskItem) => {
      actions.setTaskList(state.taskList.concat([taskItem]))
    }}></TaskInput>
  );
}

export default NewTaskInputContainer;
