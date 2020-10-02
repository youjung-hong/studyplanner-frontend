import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import SubjectList from './SubjectList';
import DailyPlanner from './DailyPlanner';
import { RouterPath } from '../constants/RouterPath';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function getPathname() {
  const { pathname } = window.location;

  if (pathname === RouterPath.SUBJECT) {
    return RouterPath.SUBJECT;
  }

  return RouterPath.PLANNER;
}

function App() {
  const [currentMenu, setCurrentMenu] = useState(getPathname())
  
  console.log(`[App]`);
  return (
    <Layout className="layout">
      <BrowserRouter>
        <Header className="App-header">
          <div className="logo" />
          <Menu mode="horizontal" onClick={e => setCurrentMenu(e.key as string)} selectedKeys={[currentMenu]}>
            <Menu.Item key={RouterPath.SUBJECT}><Link to={RouterPath.SUBJECT}>과목</Link></Menu.Item>
            <Menu.Item key={RouterPath.PLANNER}><Link to={RouterPath.PLANNER}>할일</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route path={RouterPath.SUBJECT} component={SubjectList} />
            <Route path={RouterPath.PLANNER} component={DailyPlanner} />
            <Redirect path="*" to={RouterPath.PLANNER} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Study Planner ©2020 Created by Youjung Hong</Footer>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
