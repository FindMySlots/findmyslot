import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import COLORS from '../../variables/colors';

const PrimaryButton = styled(Button)({
  color: COLORS.white,
  fontSize: 13,
  margin: 10,

  '&.Mui-disabled': {
    backgroundColor: COLORS.skyBlueDisabled,
  },
});

export default PrimaryButton;
