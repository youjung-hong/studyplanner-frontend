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
import { TaskStatus, TaskFormData, Task } from '../../models/Task';
import { TaskTimeTable } from './TaskTimeTable';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../constants/RouterPath';
import { count } from 'console';

type DailyPlannerPlannerDataStateType = {
  subjects: Subject[],
  subjectMap: Map<number, Subject>,
  tasks: Task[],
  taskTimes: TaskTime[],
  isLoading: boolean
}
type DailyPlannerModalDataStateType = {
  show: boolean,
  taskId: number,
  taskTime: TaskTime|null
}

export function DailyPlanner() {
  const [date, setDate] = useState(moment().startOf('day').toDate());
  const [plannerData, setPlannerData] = useState<DailyPlannerPlannerDataStateType>({
    subjects: [],
    subjectMap: new Map(),
    tasks: [],
    taskTimes: [],
    isLoading: false,
  });
  const [modalData, setModalData] = useState<DailyPlannerModalDataStateType>({
    show: false,
    taskId: 0,
    taskTime: null,
  });

  useEffect(() => {
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
          taskTimes: res.taskTimeLogs || [],
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
        return res.content;
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

    let newTasks: Task[] = [];
    deleteTask(taskId)
      .then(getTaskList)
      .then((tasks) => {
        newTasks = tasks;
      }).then(getTaskTimeList)
      .then((taskTimes) => {
        setPlannerData({ ...plannerData, 
          tasks: newTasks, 
          taskTimes,
          isLoading: false
        });
      })
      .catch(() => {
        setPlannerData({ ...plannerData, isLoading: false })
      })
  }

  console.log(`[DailyPlanner] date: ${date}`);

  if (modalData.show) {
    const task = plannerData.tasks.filter(task => task.id === modalData.taskId)[0];
    
    return <TaskTimePopup
      task={task}
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

  return (<div className="DailyPlanner">
    <PlannerHeader
      date={date}
      onChangeDate={setDate} 
    />
    <Divider></Divider>
    <div className="PlannerContent">
      {plannerData.subjects.length === 0 ? <Link to={RouterPath.SUBJECT}>과목 설정 먼저 해주세요.</Link> :
        <div className="PlannerContentArea">
          <TaskList
            date={date}
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
          <TaskTimeTable 
            taskTimes={plannerData.taskTimes}
            onUpdateOrDeleteTime={(taskTime) => {
              const filtered = plannerData.taskTimes.filter(data => data.taskId === taskTime.taskId);

              if (!filtered.length) {
                alert('TaskId가 잘못되어 띄울 수가 없습니다.');
                return;
              }

              setModalData({
                show: true,
                taskId: taskTime.taskId,
                taskTime: filtered[0]
              }) 
            }}
          ></TaskTimeTable>
        </div>}
    </div>
  </div>)
}