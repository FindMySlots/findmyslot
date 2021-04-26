import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import COLORS from '../../variables/colors';
import { StyledButton, WelcomeMessage } from '../../pages/Dashboard/Dashboard.styled';
import { ErrorPageType } from '../../variables/types';

interface Props {
  variant?: string;
}

const ErrorPage = ({ variant = ErrorPageType.Error }: Props) => (
  <Box
    bgcolor={COLORS.lighterBlue}
    height={172}
    display="flex"
    flexDirection="row"
    width="100%"
    alignSelf="center"
    borderRadius="4px"
    marginTop={6}
    p={0}
  >
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <img src="/images/banner.png" alt="rings banner" />
    </Box>
    <Box
      display="flex"
      maxWidth="650px"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      marginLeft="-50px"
    >
      <WelcomeMessage>{variant === ErrorPageType.NotFound ? 'ERROR 404' : 'Something Went Wrong'}</WelcomeMessage>
      <Typography>
        We’r are not sure what went wrong, you can go back, or visit the homepage.
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      marginLeft="-175px"
      marginTop="75px"
    >
      <img src="/images/get-started-arrow.svg" alt="arrow icon" />
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      ml="4px"
    >
      <StyledButton
        variant="contained"
        color="primary"
        href="/"
      >
        Homepage
      </StyledButton>
    </Box>
  </Box>
);

export default ErrorPage;
