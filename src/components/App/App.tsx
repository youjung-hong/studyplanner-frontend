import React from 'react';
import TaskListContainer from '../../container/TaskListContainer';
import NewTaskInputContainer from '../../container/NewTaskInputContainer';
import './App.css';
import TimetableContainer from '../../container/TimetableContainer';

function App() {
  return (
    <div className="App">
      <div className="App-left">
        <NewTaskInputContainer/>
        <TaskListContainer/>
      </div>
      <div className="App-right">
        <TimetableContainer />
      </div>
    </div>
  );
}

export default App;
