import React, { useContext, useEffect, useState } from 'react';
import TaskListContext from '../contexts/TaskListContext';
import TaskItem from '../components/TaskItem/TaskItem';
import TaskItemModel from '../models/TaskItem';
import apiUtil from '../utils/apiUtil';

function TaskList() {
  const [ newTask, setNewTask ]  = useState("");
  const { state, actions } = useContext(TaskListContext)

  useEffect(() => { 
    apiUtil.get('http://localhost:8080/api/tasks')
      .then(data => {
        actions.setTaskList(data);
      })
  }, []);

  return (
    <div>
      <div>
        <input 
          value={newTask} 
          onChange={(e) => {setNewTask(e.target.value)}}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              apiUtil.post(
                'http://localhost:8080/api/tasks',
                new TaskItemModel(newTask)
              ).then(data => {
                const taskItem = new TaskItemModel(data.id, data.todo, data.color, data.completed);
                actions.setTaskList(state.taskList.concat(taskItem));
    
                setNewTask("");
              }).catch(() => {
                alert('에러!');
              })
            }
          }}
        ></input>
        <button onClick={() => { 
          if (!newTask) {
            return;
          }

          apiUtil.post(
            'http://localhost:8080/api/tasks',
            new TaskItemModel(newTask)
          ).then(data => {
            const taskItem = new TaskItemModel(data.id, data.todo, data.color, data.completed);
            actions.setTaskList(state.taskList.concat(taskItem));

            setNewTask("");
          }).catch(() => {
            alert('에러!');
          })
        }}>추가</button>
      </div>
      <ul className="TaskList">
        {state.taskList.map((taskItem) => 
          <li className="TaskListItem" key={taskItem.id}>
            <TaskItem
              item={taskItem}
              onUpdateItem={item => {
                apiUtil.put(`http://localhost:8080/api/tasks`, item)
                  .then(data => {
                    const taskItem = new TaskItemModel(data.id, data.todo, data.color, data.completed);
                    const index = state.taskList.indexOf(item);
                    state.taskList.splice(index, 1, taskItem);
                    console.log(state.taskList.map(taskItem => taskItem.id), index)
                    actions.setTaskList(state.taskList.slice())
                  }).catch((e) => {
                    alert('에러!');
                    console.log(e)
                  });
              }}
              onDeleteItem={item => {
                apiUtil.deleteOne('http://localhost:8080/api/tasks', item).then(() => {
                  const index = state.taskList.indexOf(item);
                  state.taskList.splice(index, 1);
                  console.log(state.taskList.map(taskItem => taskItem.id), index)
                  actions.setTaskList(state.taskList.slice());
                }).catch(() => {
                  alert('에러!');
                })
              }}
            ></TaskItem>
            <button onClick={() => {alert('시간기록')}}>시간 기록</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
