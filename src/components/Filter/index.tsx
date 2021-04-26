import React from 'react';
import { Box } from '@material-ui/core';
import { PrimaryButton } from '../Buttons';
import { PAGE_SIZE } from '../../variables/constants';

interface Props {
  updatePageSize: Function,
}

const Filter = ({ updatePageSize } : Props) => (
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
    </Box>
  </Box>
);

export default Filter;
