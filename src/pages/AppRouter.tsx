import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import Dashboard from './Dashboard';
import ErrorPage from '../components/ErrorPage';

const AppRouter = () => (
  <Box display="flex" width="100%" height="100%">
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/team/:teamID" component={Dashboard} exact />
          <Route path="*" component={ErrorPage} exact />
        </Switch>
      </QueryParamProvider>
    </Router>
  </Box>
);
export default AppRouter;
