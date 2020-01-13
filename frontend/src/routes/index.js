import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import New from '../pages/New';
import Edit from '../pages/Edit';
import Task from '../pages/Task';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/tasks/new" component={New} isPrivate />
      <Route path="/tasks/:id/edit" component={Edit} isPrivate />
      <Route path="/tasks/:id" exact component={Task} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
}
