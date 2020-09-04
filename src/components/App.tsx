import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SubjectList from './SubjectList';

class App extends React.Component<{}, any, any> {  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Switch>
              <Route path="/subjects" component={SubjectList} />
              <Redirect path="*" to="/subjects" />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
