/* eslint-disable react/jsx-props-no-spreading */
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

const Alert = (props: any) => <MuiAlert elevation={6} variant="filled" {...props} />;

export default Alert;
