import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegisterDisco from '../pages/RegisterDisco/RegisterDisco';
import EditDisco from '../pages/EditDisco/EditDisco';
import ListDisco from '../pages/ListDisco/ListDisco';
import NotFound from '../pages/NotFound/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/register" component={RegisterDisco} />
      <Route exact path="/disco" component={EditDisco} />
      <Route exact path="/" component={ListDisco} />
      <Route component={NotFound} />
    </Switch>
  );
}
