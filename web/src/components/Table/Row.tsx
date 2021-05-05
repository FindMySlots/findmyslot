import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Checkbox,
} from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import COLORS from '../../variables/colors';

interface Props {
  slot: any,
  stopNotifications: any[],
  setStopNotifications: Function,
  ageGroup: number,
}

const useStyles = makeStyles(() => createStyles({
  red: {
    backgroundColor: COLORS.carnationOverlay,
  },
  green: {
    backgroundColor: COLORS.emeraldOverlay,
  },
  name: {
    width: '20%',
  },
  address: {
    width: '30%',
  },
  pinCode: {
    width: '10%',
  },
  fees: {
    width: '10%',
  },
  session: {
    width: '20%',
  },
  notificationCell: {
    width: '10%',
  },
}));

const DataTable = ({
  stopNotifications = [],
  setStopNotifications,
  ageGroup,
  slot,
} : Props) => {
  const classes = useStyles();

  const isChecked = (centerID: number) => stopNotifications.indexOf(centerID.toString()) === -1;

  const handleChange = (centerID: number) => {
    const currentIndex = stopNotifications.indexOf(centerID.toString());
    let updatedStopNotifications;
    if (currentIndex === -1) {
      updatedStopNotifications = [...stopNotifications, centerID];
    } else {
      updatedStopNotifications = [...stopNotifications];
      updatedStopNotifications.splice(currentIndex, 1);
    }
    setStopNotifications(updatedStopNotifications);
  };

  const getTotalSlots = () => slot.sessions?.reduce((total: number, session: any) => {
    if (session.min_age_limit === ageGroup) {
      // eslint-disable-next-line no-param-reassign
      total += session.available_capacity;
    }
    return total;
  }, 0);

  return (
    <TableRow>
      <TableCell className={classes.name}>
        {slot.name}
      </TableCell>
      <TableCell className={classes.address}>
        {slot.address}
      </TableCell>
      <TableCell className={classes.pinCode}>
        {slot.pincode}
      </TableCell>
      <TableCell className={classes.fees}>
        {slot.fee_type}
      </TableCell>
      <TableCell className={clsx(classes.session, getTotalSlots() > 0 ? classes.green : classes.red)}>
        {slot.sessions?.filter((session: any) => session.min_age_limit === ageGroup).map((session: any) => (
          <Typography key={session.session_id}>
            {`${session.date} - ${session.available_capacity} doses - ${session.vaccine}`}
          </Typography>
        ))}
      </TableCell>
      <TableCell className={clsx(classes.notificationCell)} align="center">
        <Checkbox
          checked={isChecked(slot.center_id)}
          onChange={() => handleChange(slot.center_id)}
          name="notification"
          color="primary"
        />
      </TableCell>
    </TableRow>
  );
};

export default DataTable;
