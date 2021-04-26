import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PrimaryButton } from '../../components/Buttons';
import COLORS from '../../variables/colors';

export const WelcomeMessage = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: 8,
});

export const StyledButton = styled(PrimaryButton)({
  height: '50px',
});
export const CardLabel = styled(Typography)({
  fontSize: 14,
  color: COLORS.lightGray,
  fontWeight: 500,
});
export const ActionButton = styled(PrimaryButton)({
  height: 19,
  borderRadius: 4,
  background: COLORS.lightGray2,
  width: 135,
  fontSize: 11,
  paddingLeft: 7,
  paddingBottom: 2,
  paddingRight: 7,
  paddingTop: 2,
  fontWeight: 'normal',
  letterSpacing: '0.25px',
  margin: 0,
  boxShadow: 'none',
  border: `1px solid ${COLORS.lightGray2}`,
  boxSizing: 'content-box',
});
export const CurrencyLabel = styled(Typography)({
  margin: 0,
  fontSize: 16,
  color: COLORS.medGray,
});
export const CompletedTasksLabel = styled(Typography)({
  margin: 0,
  fontSize: 11,
  fontWeight: 500,
  color: COLORS.lightGray,
  lineHeight: 2,
});
