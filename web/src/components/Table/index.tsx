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
  useMediaQuery,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Row from './Row';
import { zIndex99 } from '../../variables/theme';

interface Props {
  slotsList: any[],
  stopNotifications: any[],
  setStopNotifications: Function,
  ageGroup: number,
}

interface StyleProps {
  matches: boolean
}

const useStyles = makeStyles<Theme, Pick<StyleProps, 'matches'>>((theme: Theme) => createStyles({
  container: {
    height: (props) => (props.matches ? 'calc(100vh - 300px)' : 'calc(100vh - 200px)'),
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
    fontSize: (props) => (props.matches ? '10px' : '14px'),
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    minWidth: 1000,
  },
  notificationCell: {
    whiteSpace: 'nowrap',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr 1fr 1fr 2fr 1fr',
    position: 'sticky',
    top: 0,
    zIndex: zIndex99,
  },
}));

const DataTable = ({
  slotsList,
  stopNotifications = [],
  setStopNotifications,
  ageGroup,
} : Props) => {
  const matches = useMediaQuery('(max-width:768px)');
  const classes = useStyles({ matches });

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
          <TableRow className={classes.row}>
            <TableCell className={classes.tableCell}>
              Center Name
            </TableCell>
            <TableCell className={classes.tableCell}>
              Address
            </TableCell>
            <TableCell className={classes.tableCell}>
              Pin Code
            </TableCell>
            <TableCell className={classes.tableCell}>
              Fee Type
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Session(s)
            </TableCell>
            <TableCell className={clsx(classes.tableCell, classes.notificationCell)}>
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
