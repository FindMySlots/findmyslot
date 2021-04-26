import React from 'react';
import { Box } from '@material-ui/core';
import Filter from '../../components/Filter';
import useDashboard from './dashboard-hook';
import { Teams } from '../../variables/types';

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
    onTeamChange,
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
      <Filter
        updatePageSize={updatePageSize}
        onTeamChange={onTeamChange}
        selectedCell={Teams.Dashboard}
      />
      {/* TODO: Render 4 tables based on the data, The individual loader should go in the same table. */}
      {/* We need to display loader only once and not for each re-fetch. */}
    </Box>
  );
};

export default Dashboard;
