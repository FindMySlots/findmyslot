import React from 'react';
import { Box } from '@material-ui/core';
import Filter from '../../components/Filter';
import useDashboard from './dashboard-hook';
import Loader from '../../components/Loader/loader';
import DataTable from '../../components/Table';

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
  return (
    <Box width="100%">
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
      <Loader open={loading} />
    </Box>
  );
};

export default Dashboard;
