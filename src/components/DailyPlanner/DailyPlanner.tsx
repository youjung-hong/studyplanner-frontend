import React, { useState, useEffect } from 'react';
import {PlannerHeader} from './PlannerHeader';
import { TaskList } from './TaskList/TaskList';
import moment from 'moment';
import { TaskTimePopup } from './TaskTimePopup';
import * as TaskTimeApiUtil from '../../utils/TaskTimeApiUtil';
import { TaskTimeFormData, TaskTime } from '../../models/TaskTime';
import { Subject } from '../../models/Subject';
import { getTasks, createTask, updateTask, deleteTask } from '../../utils/TaskApiUtil';
import { getTaskMeta } from '../../utils/TaskMetaApiUtil';
import { TaskStatus, TaskFormData } from '../../models/Task';

export function DailyPlanner() {
  const [date, setDate] = useState(moment().startOf('day').toDate());
  const [plannerData, setPlannerData] = useState({
    subjects: [],
    subjectMap: new Map(),
    tasks: [],
    taskTimes: [],
    isLoading: false,
  });
  const [modalData, setModalData] = useState({
    show: false,
    taskId: 0,
    taskTime: null,
  });

  useEffect(() => {
    console.log(`[TaskList].useEffect`)
    setPlannerData({
      ...plannerData,
      isLoading: true
    })

    getTaskMeta(date)
      .then(res => {
        const subjectMap = new Map<number, Subject>();
        res.subjects.forEach((subject: Subject) => {
          subjectMap.set(subject.id, subject);
        })
        setPlannerData({
          isLoading: false,
          subjectMap,
          subjects: res.subjects,
          tasks: res.tasks || [],
          taskTimes: [],
        })
      }).catch(() => {
        setPlannerData({ ...plannerData, isLoading: false })
      })
  }, [date]);

  const getTaskTimeList = () => {
    return TaskTimeApiUtil.getTaskTimes(date);
  }

  const onCreateTime = (taskId: number, data: TaskTimeFormData) => {
    setPlannerData({
      ...plannerData,
      isLoading: true,
    })

    TaskTimeApiUtil.createTaskTime(taskId, data)
      .then(getTaskTimeList)
      .then(taskTimes => {
        setPlannerData({
          ...plannerData,
          isLoading: false,
          taskTimes
        })
        setModalData({
          show: false,
          taskId: 0,
          taskTime: null,
        })
      }).catch(() => {
        alert('에러가 발생했습니다.');
        setPlannerData({
          ...plannerData,
          isLoading: false
        })
      });
  }

  const onUpdateTime = (taskTime: TaskTime) => {
    setPlannerData({
      ...plannerData,
      isLoading: true,
    })

    TaskTimeApiUtil.updateTaskTime(taskTime)
      .then(getTaskTimeList)
      .then(taskTimes => {
        setPlannerData({
          ...plannerData,
          isLoading: false,
          taskTimes
        })
        setModalData({
          show: false,
          taskId: 0,
          taskTime: null,
        })
      }).catch(() => {
        alert('에러가 발생했습니다.');
        setPlannerData({
          ...plannerData,
          isLoading: false
        })
      });
  }

  const onDeleteTime = (taskId: number, id: number) => {
    setPlannerData({
      ...plannerData,
      isLoading: true,
    })

    TaskTimeApiUtil.deleteTaskTime(taskId, id)
      .then(getTaskTimeList)
      .then(taskTimes => {
        setPlannerData({
          ...plannerData,
          isLoading: false,
          taskTimes
        })
        setModalData({
          show: false,
          taskId: 0,
          taskTime: null,
        })
      }).catch(() => {
        alert('에러가 발생했습니다.');
        setPlannerData({
          ...plannerData,
          isLoading: false
        })
      });
  }

  const getTaskList = () => {
    return getTasks(date)
      .then(res => {
        const emptyTask = 10 - res.content.length;
        const tasks = res.content;
        for (let i = 0; i < emptyTask; i += 1) {
          tasks.push(null);
        }

        return tasks;
      })
  }

  const onCreate = (data: {
    subjectId: number;
    title: string;
    status: TaskStatus;
  }) => {
    setPlannerData({
      ...plannerData,
      isLoading: true
    })

    createTask({
      ...data,
      date
    })
      .then(getTaskList)
      .then((tasks) => {
        console.log('[TaskList].afterCreateTask: plannerData', plannerData)
        setPlannerData({ ...plannerData, tasks, isLoading: false })
      })
      .catch(() => {
        setPlannerData({ ...plannerData, isLoading: false })
      })
  }
  
  const onUpdate = (taskId: number, data: TaskFormData) => {
    setPlannerData({
      ...plannerData,
      isLoading: true
    })

    return updateTask(taskId, data)
      .then(getTaskList)
      .then((tasks) => {
        setPlannerData({ ...plannerData, tasks, isLoading: false })
      })
      .catch(() => {
        setPlannerData({ ...plannerData, isLoading: false })
      })
  }

  const onDelete = (taskId: number) => {
    setPlannerData({
      ...plannerData,
      isLoading: true
    })

    deleteTask(taskId)
      .then(getTaskList)
      .then((tasks) => {
        setPlannerData({ ...plannerData, tasks, isLoading: false })
      })
      .catch(() => {
        setPlannerData({ ...plannerData, isLoading: false })
      })
  }

  console.log(`[DailyPlanner] date: ${date}`);

  if (modalData.show) {
    return <TaskTimePopup
      taskId={modalData.taskId}
      taskTime={modalData.taskTime}
      onCreate={onCreateTime}
      onUpdate={onUpdateTime}
      onDelete={onDeleteTime}
      onClose={() => {
        setModalData({
          show: false,
          taskId: 0,
          taskTime: null,
        })
      }}
    />
  }

  return (<div>
    <PlannerHeader
      date={date}
      onChangeDate={setDate} 
    />
    <TaskList
      subjects={plannerData.subjects}
      subjectMap={plannerData.subjectMap}
      tasks={plannerData.tasks}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onClickCreateTime={(taskId) => { setModalData({
          show: true,
          taskId: taskId,
          taskTime: null
        });
      }}
    ></TaskList>
  </div>)
}