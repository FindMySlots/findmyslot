import { useEffect, useRef } from 'react';
import { NumberParam, useQueryParam, withDefault, BooleanParam, ArrayParam } from 'use-query-params';
import axios from 'axios';
import {
  useQuery,
  focusManager,
} from 'react-query';
import { format } from 'date-fns';
import END_POINTS from '../../variables/endpoints';
import useSpeechSynthesis from '../../util/useSpeechSynthesis';

const useDashboard = () => {
  const [selectedState, setSelectedState] = useQueryParam('state', withDefault(NumberParam, 0));
  const [selectedDistrict, setSelectedDistrict] = useQueryParam('district', withDefault(NumberParam, 0));
  const [refetchInterval, setRefetchInterval] = useQueryParam('interval', withDefault(NumberParam, 1));
  const [enableVoiceNotification, setEnableVoiceNotification] = useQueryParam('voice', withDefault(BooleanParam, false));
  const [enableNotification, setEnableNotification] = useQueryParam('notification', withDefault(BooleanParam, false));
  const [stopNotifications, setStopNotifications] = useQueryParam('stopNotifications', withDefault(ArrayParam, []));
  const [ageGroup, setAgeGroup] = useQueryParam('age', withDefault(NumberParam, 18));
  const { speak } = useSpeechSynthesis({});
  const date = useRef(format(new Date(), 'dd-MM-yyyy'));
  const { data: statesList, isFetching: loadingStates } = useQuery(
    END_POINTS.State.key,
    async () => {
      const res = await axios.get(END_POINTS.State.url);
      return res.data;
    },
  );

  const { data: districts, isFetching: loadingDistrict } = useQuery(
    [END_POINTS.District.key, selectedState],
    async () => {
      const res = await axios.get(`${END_POINTS.District.url}/${selectedState}`);
      return res.data;
    },
    {
      enabled: !!selectedState,
    },
  );

  const { data: slotsList, isFetching: loadingSlots } = useQuery(
    [END_POINTS.Calendar.key, selectedState, selectedDistrict, ageGroup],
    async () => {
      const res = await axios.get(`${END_POINTS.Calendar.url}${selectedDistrict}&date=${date.current}`);
      const available = res.data?.centers?.filter((center: any) => center.sessions.find((session: any) => session.min_age_limit === (ageGroup || 18) && session.available_capacity > 0));
      // @ts-ignore
      const availableForNotification = available.filter((center: any) => stopNotifications.indexOf(center.center_id.toString()) === -1);
      if (availableForNotification?.length > 0) {
        if (enableVoiceNotification) {
          speak({ text: 'The Vaccine is available. Hurry!' });
          const audio = new Audio(
            'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3',
          );
          audio.play();
        }
        if (enableNotification) {
          const notification = new Notification('Vaccine available');
          notification.onclick = () => {
            window.location.href = 'https://www.cowin.gov.in/home';
          };
        }
      }
      return available;
    },
    {
      // Refetch the data every second
      refetchInterval: 1000 * 60 * refetchInterval,
      enabled: !!selectedDistrict,
    },
  );

  useEffect(() => {
    focusManager.setFocused(true);
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return {
    stopNotifications,
    setStopNotifications,
    loading: loadingStates || loadingSlots || loadingDistrict,
    refetchInterval,
    setRefetchInterval,
    districtsList: districts?.districts || [],
    selectedDistrict,
    setSelectedDistrict,
    selectedState,
    setSelectedState,
    statesList: statesList?.states || [],
    enableVoiceNotification,
    setEnableVoiceNotification,
    enableNotification,
    setEnableNotification,
    slotsList,
    ageGroup,
    setAgeGroup,
  };
};

export default useDashboard;
