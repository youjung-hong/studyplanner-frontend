import React, { useState } from 'react';
import TaskItem from '../models/TaskItem';

interface TaskListContextValue {
  state: {
    rowCount: number,
    taskList: TaskItem[],
  },
  actions: {
    setRowCount: Function,
    setTaskList: Function,
  },
}

const TaskListContext = React.createContext<TaskListContextValue>({
  state: {
    rowCount: 24,
    taskList: [],
  },
  actions: {
    setRowCount: () => {},
    setTaskList: () => {},
  }
})

export function TaskListContextProvider({ children } : { children: JSX.Element }) {
  const [rowCount, setRowCount] = useState(24);
  const [taskList, setTaskList] = useState([]);
  const value = {
    state: {
      rowCount,
      taskList,
    },
    actions: {
      setRowCount,
      setTaskList,
    }
  }

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  )
}

export default TaskListContext;