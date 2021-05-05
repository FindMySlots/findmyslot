import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import theme from './variables/theme';
import Notifier from './components/Notifier';
import AppRouter from './pages/AppRouter';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notifier />
        <AppRouter />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </QueryClientProvider>
);

export default App;
