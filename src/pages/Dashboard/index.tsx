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
    bottom: '40px',
    width: '100%',
  },
  footerFeedback: {
    position: 'fixed',
    bottom: '15px',
    width: '100%',
  },
  link: {
    marginLeft: theme.spacing(1),
  },
  topLabel: {
    width: '100%',
    justifyContent: 'center',
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
    date,
    setDate,
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
        date={date}
        setDate={setDate}
      />
      <DataTable
        slotsList={slotsList}
        stopNotifications={stopNotifications}
        setStopNotifications={setStopNotifications}
        ageGroup={ageGroup}
      />
      <Typography align="center" className={classes.footer}>
        Handcrafted with
        {' '}
        <span style={{ color: '#ea4e4e' }}>&#9829;</span>
        {' '}
        by
        <Link className={classes.link} href="https://github.com/mehulcse">Mehul</Link>
        {' '}
        ,
        <Link className={classes.link} href="https://github.com/jjmanglani01">Jitesh</Link>
        {' '}
        ,
        <Link className={classes.link} href="https://github.com/Durgaprasad-Budhwani">Durgaprasad</Link>
        {' '}
        &
        <Link className={classes.link} href="https://github.com/nitish-kalra-9">Nitish</Link>
      </Typography>
      <Typography align="center" className={classes.footerFeedback}>
        Please report the issues/suggestions
        {' '}
        <Link className={classes.link} href="https://github.com/mehulcse/findmyslot/issues">here</Link>
        {' '}
        or send an email to
        {' '}
        <Link href="mailto:mehulthakkar02@gmail.com">mehulthakkar02@gmail.com</Link>
      </Typography>
      <Loader open={loading} />
    </Box>
  );
};

export default Dashboard;
