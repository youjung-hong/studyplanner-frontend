import React, { useEffect, useRef } from 'react';
import Timetable, { TaskItem } from 'my-timetable';
import { TaskTime } from '../../models/TaskTime';

type TaskTimeTableProps = {
  taskTimes: TaskTime[],
  onUpdateOrDeleteTime: (taskTime: TaskTime) => void,
}

export function TaskTimeTable({ taskTimes, onUpdateOrDeleteTime }: TaskTimeTableProps) {
  const timetableRoot = useRef<HTMLDivElement>(null);
  let timetable: Timetable;

  const setTimetable = () => {
    const taskItems = taskTimes.map(taskTime => new TaskItem(taskTime.startAt, taskTime.endAt, taskTime ));
    timetable = new Timetable('timetableRoot', taskItems, onUpdateOrDeleteTime);
  }

  const resetTimetable = (timetableRoot: HTMLDivElement) => {
    if (!timetable) {
      return;      
    }
    for (const [element, onClick] of Object.entries(timetable.eventHanderMap)) {
      (element as unknown as HTMLDivElement).removeEventListener('click', onClick);
    }
    timetableRoot.innerHTML = '';
  }

  useEffect(() => {
    if (!timetableRoot.current) {
      return;
    }

    resetTimetable(timetableRoot.current);
    setTimetable();    
  }, [taskTimes]);

  return (<div id="timetableRoot" ref={timetableRoot} style={{width: '100px'}}></div>)
} 