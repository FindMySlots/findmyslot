import React from 'react';
import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import times from 'lodash.times';
import clsx from 'clsx';
import SelectBox from '../Select';
import { District, State } from '../../variables/types';
import COLORS from '../../variables/colors';

interface Props {
  selectedState?: string | number,
  setSelectedState: Function,
  statesList: State[],
  districtsList: District[],
  selectedDistrict?: string | number,
  setSelectedDistrict: Function,
  refetchInterval: number,
  setRefetchInterval: Function,
  enableVoiceNotification: boolean,
  setEnableVoiceNotification: Function,
  enableNotification: boolean,
  setEnableNotification: Function,
  ageGroup: number | string,
  setAgeGroup: Function,
  setSearchByPin: Function,
  setSelectedPin: Function,
  searchByPin: boolean,
  selectedPin?: string;
}

interface StyleProps {
  matches: boolean
}

const useStyles = makeStyles<Theme, Pick<StyleProps, 'matches'>>((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: (props) => (props.matches ? `calc(50% - ${2 * theme.spacing(1)}px)` : 240),
    '& .MuiInputBase-root': {
      marginTop: theme.spacing(3),
      height: 32,
    },
  },
  formControlPin: {
    width: (props) => (props.matches ? `calc(100% - ${2 * theme.spacing(1)}px)` : 500),
  },
  label: {
    width: (props) => (props.matches ? 220 : 280),
    color: COLORS.black,
    fontSize: '18px',
    marginBottom: theme.spacing(2),
  },
  filterContainerDesktop: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  filterContainerMobile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  pinCodeNone: {
    marginTop: 22,
    marginRight: 30,
  },
  pinCodeBlocked: {
    marginTop: -5,
    marginRight: 30,
    width: '100%',
  },
  toggleButtons: {
    color: COLORS.fontBlack,
    // '&.Mui-selected': {
    //   backgroundColor: COLORS.skyBlue,
    //   color: COLORS.white,
    // },
  },
  active: {
    backgroundColor: COLORS.skyBlue,
    color: COLORS.violet,
  },
  boxWrapperMobile: {
    display: 'grid',
  },
  boxWrapper: {
    display: 'grid',
    justifyContent: 'space-around',
    width: '100%',
    alignContent: 'center',
    gridTemplateColumns: '30% 70%',
  },
  boxElement: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignContent: 'center',
  },
  boxElementMobile: {
    justifyContent: 'space-between',
    width: '100%',
    alignContent: 'center',
  },
}));

const Filter = ({
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
  ageGroup,
  setAgeGroup,
  selectedPin,
  searchByPin,
  setSelectedPin,
  setSearchByPin,
}: Props) => {
  const matches = useMediaQuery('(max-width:768px)');
  const classes = useStyles({ matches });
  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedState(event.target.value);
    setSelectedDistrict(0);
  };

  const handleDistrictChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDistrict(event.target.value);
  };

  const handleRefetchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRefetchInterval(event.target.value);
  };

  const handleNotificationChange = () => {
    setEnableNotification(!enableNotification);
  };

  const handleVoiceNotificationChange = () => {
    setEnableVoiceNotification(!enableVoiceNotification);
  };

  const handleSearchByPinChange = () => {
    setSearchByPin(!searchByPin);
  };

  const handlePinChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPin(event.target.value);
  };

  const handleAgeGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAgeGroup(event.target.value);
  };

  return (
    <Box className={clsx({
      [classes.filterContainerDesktop]: !matches,
      [classes.filterContainerMobile]: matches,
    })}
    >
      <Box mt={2}>
        <ToggleButtonGroup
          value={searchByPin}
          exclusive
          onChange={handleSearchByPinChange}
          aria-label="search by"
        >
          <ToggleButton value={false} aria-label="centered" className={classes.toggleButtons}>
            District
          </ToggleButton>
          <ToggleButton value aria-label="search by pin code" className={classes.toggleButtons}>
            Pin Code
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        className={clsx({
          [classes.boxWrapper]: !matches,
          [classes.boxWrapperMobile]: matches,
        })}
      >
        <Box className={clsx({
          [classes.boxElement]: !matches,
          [classes.boxElementMobile]: matches,
        })}
        >
          {
            searchByPin && (
              <FormControl className={clsx(classes.formControl, classes.formControlPin)}>
                <TextField id="outlined-pin" placeholder="Pin code comma separated(Max 6, No Spaces)" variant="outlined" value={selectedPin} onChange={handlePinChange} />
              </FormControl>
            )
          }
          {
            !searchByPin && (
              <>
                <FormControl className={classes.formControl}>
                  <InputLabel id="state" className={classes.label}>State</InputLabel>
                  <SelectBox
                    labelId="state"
                    disableUnderline
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <MenuItem value={0} key={0} disabled>----Select State----</MenuItem>
                    {statesList?.map((state: State) => (
                      <MenuItem value={state.state_id} key={state.state_id}>{state.state_name}</MenuItem>
                    ))}
                  </SelectBox>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="district" className={classes.label}>District</InputLabel>
                  <SelectBox
                    labelId="district"
                    disableUnderline
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <MenuItem value={0} key={0} disabled>-----Select District----</MenuItem>
                    {districtsList?.map((district: District) => (
                      <MenuItem value={district.district_id} key={district.district_id}>{district.district_name}</MenuItem>
                    ))}
                  </SelectBox>
                </FormControl>
              </>
            )
          }
        </Box>
        <Box className={clsx({
          [classes.boxElement]: !matches,
          [classes.boxElementMobile]: matches,
        })}
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="age" className={classes.label}>Age Group</InputLabel>
            <SelectBox
              labelId="age"
              disableUnderline
              value={ageGroup}
              onChange={handleAgeGroupChange}
            >
              <MenuItem value={0} key={0} disabled>--------Select Age Group--------</MenuItem>
              <MenuItem value={18} key={1}>18-45</MenuItem>
              <MenuItem value={45} key={2}>45+</MenuItem>
            </SelectBox>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="refreshTime" className={classes.label}>Refresh Time Interval</InputLabel>
            <SelectBox
              labelId="refreshTime"
              disableUnderline
              value={refetchInterval}
              onChange={handleRefetchChange}
            >
              <MenuItem value={0} key={0} disabled>-----Refresh Time Interval-----</MenuItem>
              <MenuItem value={15} key={1}>15 Second(s)</MenuItem>
              <MenuItem value={30} key={2}>30 Second(s)</MenuItem>
              <MenuItem value={45} key={3}>45 Second(s)</MenuItem>
              {times(30, (time: number) => (
                <MenuItem value={(time + 1) * 60} key={time + 4}>{`${time + 1} Minute(s)`}</MenuItem>
              ))}
            </SelectBox>
          </FormControl>
          <FormControlLabel
            control={(
              <Checkbox
                checked={enableVoiceNotification}
                onChange={handleVoiceNotificationChange}
                name="VoiceNotification"
                color="primary"
              />
            )}
            label="Voice Notification"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={enableNotification}
                onChange={handleNotificationChange}
                name="PushNotification"
                color="primary"
              />
            )}
            label="Push Notification"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
