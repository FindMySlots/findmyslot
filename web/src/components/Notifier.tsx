/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { NotifierType } from '../variables/types';
import Alert from './Alert';

let openSnackbarFn: Function;

interface State {
  open: boolean;
  message: string;
  variant: NotifierType;
}

class Notifier extends React.Component<{}, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    open: false,
    message: '',
    variant: NotifierType.Info,
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
      variant: NotifierType.Info,
    });
  };

  openSnackbar = (
    { message }: { message: string },
    variant: NotifierType,
  ) => {
    this.setState({ open: true, message, variant });
  };

  render() {
    const { open, message, variant } = this.state;

    return (
      <Snackbar open={open} autoHideDuration={10000} onClose={this.handleSnackbarClose}>
        <Alert severity={variant} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export const openSnackbar = (
  { message }: { message: string }, variant: NotifierType,
) => {
  openSnackbarFn({ message }, variant);
};

export default Notifier;
