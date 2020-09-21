import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SubjectList from './SubjectList';
import DailyPlanner from './DailyPlanner';
import { RouterPath } from '../constants/RouterPath';
import { Link } from 'react-router-dom';

function App() { 
  console.log(`[App]`);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-header">
          <Link to={RouterPath.SUBJECT}>과목</Link>&nbsp;
          <Link to={RouterPath.PLANNER}>할일</Link>
        </div>
        <div className="App-contents">
          <Switch>
            <Route path={RouterPath.SUBJECT} component={SubjectList} />
            <Route path={RouterPath.PLANNER} component={DailyPlanner} />
            <Redirect path="*" to={RouterPath.PLANNER} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
