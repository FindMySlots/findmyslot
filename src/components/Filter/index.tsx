import React from 'react';
import { Box, MenuItem } from '@material-ui/core';
import { PrimaryButton } from '../Buttons';
import { PAGE_SIZE, TEAMS } from '../../variables/constants';
import SelectBox from '../Select';
import { Teams } from '../../variables/types';

interface Props {
  updatePageSize: Function,
  onTeamChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  selectedCell: Teams
}

const Filter = ({ updatePageSize, onTeamChange, selectedCell } : Props) => (
  <Box
    justifyContent="space-between"
    display="flex"
    flexDirection="row"
    width="100%"
  >
    <Box>
      Clock
    </Box>
    <Box>
      <PrimaryButton
        onClick={updatePageSize(PAGE_SIZE)}
        variant="contained"
        color="primary"
      >
        Default
      </PrimaryButton>
      <PrimaryButton
        onClick={updatePageSize(null)}
        variant="contained"
        color="primary"
      >
        Expanded
      </PrimaryButton>
      <SelectBox
        disableUnderline
        value={selectedCell}
        onChange={onTeamChange}
      >
        {TEAMS.map((team) => (<MenuItem value={team.value} key={team.value}>{team.label}</MenuItem>))}
      </SelectBox>
    </Box>
  </Box>
);

export default Filter;
