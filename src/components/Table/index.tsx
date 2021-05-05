import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
  Checkbox,
  Tooltip,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {Check} from "@material-ui/icons";

interface Props {
  slotsList: any[],
  stopNotifications: any[],
  setStopNotifications: Function,
  ageGroup: number,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  tableContainer: {
    maxHeight: '90vh',
  },
  icon: {
    height: '16px',
    width: '16px',
    marginLeft: theme.spacing(2),
  },
}));

const DataTable = ({
  slotsList,
  stopNotifications = [],
  setStopNotifications,
  ageGroup,
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

  const notifyAll = stopNotifications?.length === 0;

  const onNotificationChange = () => {
    if (notifyAll) {
      const centers = slotsList?.map((center: any) => center.center_id) || [];
      setStopNotifications(centers);
    } else {
      setStopNotifications([]);
    }
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              Center Name
            </TableCell>
            <TableCell>
              Address
            </TableCell>
            <TableCell>
              Sessions
            </TableCell>
            <TableCell>
              <Checkbox
                checked={notifyAll}
                name="notification"
                color="primary"
                onChange={onNotificationChange}
              />
              Notification
              <Tooltip title="Uncheck this if you wish to stop notification for individual centers" aria-label="Preview">
                <HelpOutlineIcon className={classes.icon} />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slotsList?.length > 0 ? slotsList?.map((slot: any) => (
            <TableRow key={slot.center_id}>
              <TableCell>
                {slot.name}
              </TableCell>
              <TableCell>
                <Typography>
                  {slot.address}
                </Typography>
                <Typography>
                  {slot.pincode}
                </Typography>
              </TableCell>
              <TableCell>
                {slot.sessions?.filter((session: any) => session.min_age_limit === ageGroup).map((session: any) => (
                  <Typography key={session.session_id}>
                    {`${session.date} - ${session.available_capacity} doses - ${session.vaccine}`}
                  </Typography>
                ))}
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={isChecked(slot.center_id)}
                  onChange={() => handleChange(slot.center_id)}
                  name="notification"
                  color="primary"
                />
              </TableCell>
            </TableRow>
          )) : (<TableRow><TableCell colSpan={4} align="center">No slots are available as of now. Don&#39;t worry, I will notify you as soon as I find the slot.</TableCell></TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
