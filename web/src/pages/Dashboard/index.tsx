import React from 'react';
import { Box, Link, Typography, useMediaQuery } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Filter from '../../components/Filter';
import useDashboard from './dashboard-hook';
import Loader from '../../components/Loader/loader';
import COLORS from '../../variables/colors';
import ScrollTop from '../../components/ScrollTop';
import DataTable from '../../components/Table';

interface StyleProps {
  matches: boolean
}

const useStyles = makeStyles<Theme, Pick<StyleProps, 'matches'>>((theme: Theme) => createStyles({
  footer: {
    position: (props) => (props.matches ? 'relative' : 'fixed'),
    bottom: '40px',
    width: '100%',
    fontSize: (props) => (props.matches ? '10px' : '12px'),
  },
  footerFeedback: {
    position: (props) => (props.matches ? 'relative' : 'fixed'),
    bottom: (props) => (props.matches ? '10px' : '15px'),
    width: '100%',
    fontSize: (props) => (props.matches ? '10px' : '12px'),
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
    borderRadius: 0,
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
    alert,
    setAlert,
  } = useDashboard();
  const matches = useMediaQuery('(max-width:768px)');
  const classes = useStyles({ matches });
  return (
    <Box width="100%">
      {alert && (
        <Alert className={classes.topLabel} severity="warning" onClose={() => setAlert(false)}>
          Keep this page open in browser, enable the Voice and Push Notification. Whenever the slot is available within next 7 days you&#39;ll receive the notification.
          Click on push notification should take you to the
          {' '}
          <Link className={classes.linkClass} href="https://selfregistration.cowin.gov.in/">Co-Win</Link>
          {' '}
          Portal. This website does not collect your data. Best used in desktop/laptop browsers.
          For mobile users, mobile should be on and may not get push notification.
        </Alert>
      )}
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
        ageGroup={ageGroup}
      />
      <Typography align="center" className={classes.footer}>
        Handcrafted with
        {' '}
        <span style={{ color: '#ea4e4e' }}>&#9829;</span>
        {' '}
        by
        <Link className={classes.link} href="https://www.linkedin.com/in/mehulcse">Mehul</Link>
        ,
        <Link className={classes.link} href="https://www.linkedin.com/in/jitesh-manglani-full-stack">Jitesh</Link>
        ,
        <Link className={classes.link} href="https://www.linkedin.com/in/durgaprasad-budhwani">Durgaprasad</Link>
        ,
        <Link className={classes.link} href="https://www.linkedin.com/in/nitishkalra-uiaspects">Nitish</Link>
        {' '}
        &
        <Link className={classes.link} href="https://www.linkedin.com/in/abhishek-thorat-143aa2bb">Abhishek</Link>
      </Typography>
      <Typography align="center" className={classes.footerFeedback}>
        Please report the issues/suggestions
        <Link className={classes.link} href="https://github.com/mehulcse/findmyslot/issues">here</Link>
        {' '}
        or send an email to
        {' '}
        <Link href="mailto:mehulthakkar02@gmail.com">mehulthakkar02@gmail.com</Link>
      </Typography>
      <Loader open={loading} />
      {
        matches && (
          <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        )
      }
    </Box>
  );
};

export default Dashboard;
