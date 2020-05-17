import React, { useContext } from 'react';
import TaskListContext from '../contexts/TaskListContext';
import Timetable from '../components/Timetable/Timetable';

function TimetableContainer() {
  const { state } = useContext(TaskListContext)

  return (
    <Timetable items={state.taskList} />
  )
}

export default TimetableContainer