import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LocalizationProvider } from '@material-ui/pickers';
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
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notifier />
        <AppRouter />
      </ThemeProvider>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default App;
