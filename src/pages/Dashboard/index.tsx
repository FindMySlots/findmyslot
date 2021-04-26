import React from 'react';
import { Box } from '@material-ui/core';
import Filter from '../../components/Filter';
import useDashboard from './dashboard-hook';

const Dashboard = () => {
  const {
    dueLaterIsFetching,
    dueTodayIsFetching,
    sameDayShippingIsFetching,
    mustGoIsFetching,
    dueTodayData,
    dueLaterData,
    sameDayShippingData,
    mustGoData,
    updatePageSize,
  } = useDashboard();
  console.log({
    dueLaterIsFetching,
    dueTodayIsFetching,
    sameDayShippingIsFetching,
    mustGoIsFetching,
    dueTodayData,
    dueLaterData,
    sameDayShippingData,
    mustGoData,
  });
  return (
    <Box width="100%">
      <Filter updatePageSize={updatePageSize} />
    </Box>
  );
};

export default Dashboard;
