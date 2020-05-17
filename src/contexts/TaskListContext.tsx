import React, { useState } from 'react';
import TaskItem from '../classes/TaskItem';

interface TaskListContextValue {
  state: {
    taskList: TaskItem[],
    currentTask: TaskItem|null,
  },
  actions: {
    setTaskList: Function,
    setCurrentTask: Function,
  },
}

const TaskListContext = React.createContext<TaskListContextValue>({
  state: {
    taskList: [],
    currentTask: null,
  },
  actions: {
    setTaskList: () => {},
    setCurrentTask: () => {}
  }
})

export function TaskListContextProvider({ children } : { children: JSX.Element }) {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const value = {
    state: {
      taskList,
      currentTask
    },
    actions: {
      setTaskList,
      setCurrentTask
    }
  }

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  )
}

export default TaskListContext;