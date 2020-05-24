import React from 'react';
import TaskListContainer from '../../container/TaskListContainer';
import TimetableContainer from '../../container/TimetableContainer';

function App() {
  return (
    <div className="App">
      <div className="App-left">
        <TaskListContainer/>
      </div>
      <div className="App-right">
        <TimetableContainer />
      </div>
    </div>
  );
}

export default App;
