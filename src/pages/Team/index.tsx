import React from 'react';
import { Box } from '@material-ui/core';
import Filter from '../../components/Filter';
import useTeam from './team-hook';

const Team = () => {
  const {
    data,
    isFetching,
    updatePageSize,
    onTeamChange,
    team,
  } = useTeam();
  console.log({
    data,
    isFetching,
  });
  return (
    <Box width="100%">
      <Filter
        updatePageSize={updatePageSize}
        onTeamChange={onTeamChange}
        selectedCell={team}
      />
      {/* TODO: Render team table based on the data, The individual loader should go in the same table. */}
      {/* We need to display loader only once and not for each re-fetch. */}
    </Box>
  );
};

export default Team;
