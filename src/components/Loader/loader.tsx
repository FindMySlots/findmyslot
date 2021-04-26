import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from '../../variables/colors';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: COLORS.black,
  },
}));

type Props = {
  open: boolean
};

const Loader = ({ open }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default React.memo(Loader);
