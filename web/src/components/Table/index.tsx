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
  container: (props) => ({
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '50',
    padding: '10',
    margin: '10',
    ...props.matches ? {
      // To let nested sticky elements work as expected.
      height: '100%',
      display: 'initial',
    } : {
      height: 'calc(100vh - 200px)',
    },
  }),
  icon: {
    height: '16px',
    width: '16px',
    marginLeft: theme.spacing(2),
  },
  tableCell: {
    padding: '4px 0',
    verticalAlign: 'middle',
    fontSize: (props) => (props.matches ? '12px' : '16px'),
  },
  table: {
    minWidth: 340,
  },
  notificationCell: {
    whiteSpace: 'nowrap',
  },
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
}));

const DataTable = ({
  slotsList,
  stopNotifications = [],
  setStopNotifications,
  ageGroup,
}: Props) => {
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
        <TableHead className={classes.tableHead}>
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
            <TableCell className={clsx(classes.tableCell, classes.notificationCell)}>
              <Checkbox
                checked={notifyAll}
                name="notification"
                color="primary"
                onChange={onNotificationChange}
              />
              {
                matches ? 'NOTIF' : 'Notification'
              }
              <Tooltip title={`${matches ? 'Notification:' : ''}Uncheck this if you wish to stop notification for individual centers`} aria-label="Preview">
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
