import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Checkbox,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import COLORS from '../../variables/colors';

interface Props {
  slot: any,
  stopNotifications: any[],
  setStopNotifications: Function,
  ageGroup: number,
}

interface StyleProps {
  matches: boolean
}

const useStyles = makeStyles<Theme, Pick<StyleProps, 'matches'>>((_: Theme) => createStyles({
  red: {
    backgroundColor: COLORS.carnationOverlay,
  },
  green: {
    backgroundColor: COLORS.emeraldOverlay,
  },
  tableCell: {
    padding: (props) => (props.matches ? '2px' : 'auto'),
  },
  name: {
    width: (props) => (props.matches ? '30%' : '20%'),
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
    width: (props) => (props.matches ? '30%' : '20%'),
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
}: Props) => {
  const matches = useMediaQuery('(max-width:768px)');
  const classes = useStyles({ matches });

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
      {!matches && (
        <TableCell className={classes.name}>
          {slot.name}
        </TableCell>
      )}
      {matches && (
        <>
          <TableCell className={classes.name}>
            {slot.name}
            {' - '}
            <strong>
              {slot.pincode}
            </strong>
            {' - '}
            <strong>
              {slot.fee_type}
            </strong>
          </TableCell>
          <TableCell className={clsx(
            classes.tableCell,
            classes.session,
            [
              getTotalSlots() > 0 ? classes.green : classes.red,
            ],
          )}
          >
            {slot.sessions?.filter((session: any) => session.min_age_limit === ageGroup).map((session: any) => (
              <Typography key={session.session_id}>
                {`${session.date} - ${session.available_capacity} doses - ${session.vaccine}`}
              </Typography>
            ))}
          </TableCell>
        </>
      )}
      <TableCell className={classes.address}>
        {slot.address}
      </TableCell>
      {!matches && (
        <>
          <TableCell className={classes.pinCode}>
            {slot.pincode}
          </TableCell>
          <TableCell className={classes.fees}>
            {slot.fee_type}
          </TableCell>
          <TableCell className={clsx(
            classes.tableCell,
            classes.session,
            [
              getTotalSlots() > 0 ? classes.green : classes.red,
            ],
          )}
          >
            {slot.sessions?.filter((session: any) => session.min_age_limit === ageGroup).map((session: any) => (
              <Typography key={session.session_id}>
                {`${session.date} - ${session.available_capacity} doses - ${session.vaccine}`}
              </Typography>
            ))}
          </TableCell>
        </>
      )}
      <TableCell className={clsx(classes.notificationCell, classes.tableCell)} align="center">
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
