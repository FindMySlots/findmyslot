import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Checkbox,
  Tooltip,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Row from './Row';

interface Props {
  slotsList: any[],
  stopNotifications: any[],
  setStopNotifications: Function,
  ageGroup: number,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: 'calc(100vh - 300px)',
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '50',
    padding: '10',
    margin: '10',
  },
  icon: {
    height: '16px',
    width: '16px',
    marginLeft: theme.spacing(2),
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
  table: {
    minWidth: 340,
  },
}));

const DataTable = ({
  slotsList,
  stopNotifications = [],
  setStopNotifications,
  ageGroup,
} : Props) => {
  const classes = useStyles();

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
    <TableContainer className={classes.container}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>
              Center Name
            </TableCell>
            <TableCell className={classes.tableCell}>
              Address
            </TableCell>
            <TableCell className={classes.tableCell}>
              Sessions
            </TableCell>
            <TableCell className={classes.tableCell}>
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
            <Row
              ageGroup={ageGroup}
              setStopNotifications={setStopNotifications}
              slot={slot}
              stopNotifications={stopNotifications}
              key={slot.center_id}
            />
          )) : (<TableRow><TableCell colSpan={4} align="center">No slots are available as of now. Don&#39;t worry, I will notify you as soon as I find the slot.</TableCell></TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
