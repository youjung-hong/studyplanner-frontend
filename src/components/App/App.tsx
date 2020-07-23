import React from 'react';
import TaskListContainer from '../../container/TaskListContainer';
import TimetableContainer from '../../container/TimetableContainer';

function App() {
  const today = new Date();
  const yyyyMMdd = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`

  return (
    <div className="App">
      <div className="App-left">
        <div className="date">{yyyyMMdd}</div>
        <TaskListContainer/>
      </div>
      <div className="App-right">
        <TimetableContainer />
      </div>
    </div>
  );
}

export default App;
