import { styled } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

import COLORS from '../../variables/colors';

const SelectBox = styled(Select)({
  background: COLORS.white,
  boxShadow: COLORS.selectBoxShadow,
  borderRadius: 4,
  fontWeight: 'normal',
  fontSize: 12,
  color: COLORS.deepGray,
  paddingLeft: 10,
  minWidth: 81,
  '& .MuiSelect-select:focus ': {
    background: COLORS.white,
  },
  height: 32,
  '&.Mui-focused': {
    boxShadow: COLORS.focusBoxShadow,
  },
  '&.Mui-error': {
    border: `1px solid ${COLORS.violet}`,
  },
});

export default SelectBox;
