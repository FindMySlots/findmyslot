import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Filter from '../../components/Filter';
import useDashboard from './dashboard-hook';
import Loader from '../../components/Loader/loader';
import DataTable from '../../components/Table';
import COLORS from '../../variables/colors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    position: 'fixed',
    bottom: '20px',
    width: '100%',
  },
  link: {
    marginLeft: theme.spacing(1),
  },
  topLabel: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: COLORS.fontBlack,
    color: COLORS.white,
    fontSize: '16px',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  linkClass: {
    color: COLORS.violet,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const {
    loading,
    selectedState,
    setSelectedState,
    statesList,
    districtsList,
    selectedDistrict,
    setSelectedDistrict,
    refetchInterval,
    setRefetchInterval,
    enableVoiceNotification,
    setEnableVoiceNotification,
    enableNotification,
    setEnableNotification,
    slotsList,
    stopNotifications,
    setStopNotifications,
    ageGroup,
    setAgeGroup,
  } = useDashboard();
  const classes = useStyles();
  return (
    <Box width="100%">
      <Typography className={classes.topLabel}>
        Keep this page open in browser, enable the Voice and Push Notification. Whenever the slot is available you&#39;ll receive the notification.
        Click on push notification should take you to the
        {' '}
        <Link className={classes.linkClass} href="https://selfregistration.cowin.gov.in/">Co-Win</Link>
        {' '}
        Portal. This website does not collect your data.
      </Typography>
      <Filter
        refetchInterval={refetchInterval}
        setRefetchInterval={setRefetchInterval}
        statesList={statesList}
        setSelectedState={setSelectedState}
        selectedState={selectedState}
        districtsList={districtsList}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        enableVoiceNotification={enableVoiceNotification}
        setEnableVoiceNotification={setEnableVoiceNotification}
        enableNotification={enableNotification}
        setEnableNotification={setEnableNotification}
        ageGroup={ageGroup}
        setAgeGroup={setAgeGroup}
      />
      <DataTable
        slotsList={slotsList}
        stopNotifications={stopNotifications}
        setStopNotifications={setStopNotifications}
      />
      <Typography align="center" className={classes.footer}>
        Handcrafted with
        {' '}
        <span style={{ color: '#ea4e4e' }}>&#9829;</span>
        {' '}
        by
        <Link className={classes.link} href="https://github.com/mehulcse">Mehul Thakkar</Link>
        {' '}
        &
        <Link className={classes.link} href="https://github.com/jjmanglani01">Jitesh Manglani</Link>
      </Typography>
      <Loader open={loading} />
    </Box>
  );
};

export default Dashboard;
