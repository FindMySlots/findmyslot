import { useEffect, useRef, useState } from 'react';
import { NumberParam, useQueryParam, withDefault, BooleanParam, ArrayParam, StringParam } from 'use-query-params';
import axios from 'axios';
import {
  useQuery,
  useQueries,
  focusManager,
  UseQueryResult,
} from 'react-query';
import { format } from 'date-fns';
import END_POINTS from '../../variables/endpoints';
import useSpeechSynthesis from '../../util/useSpeechSynthesis';

const useDashboard = () => {
  const [selectedState, setSelectedState] = useQueryParam('state', withDefault(NumberParam, 0));
  const [searchByPin, setSearchByPin] = useQueryParam('searchByPin', withDefault(BooleanParam, false));
  const [selectedPin, setSelectedPin] = useQueryParam('pin', withDefault(StringParam, ''));
  const [selectedDistrict, setSelectedDistrict] = useQueryParam('district', withDefault(NumberParam, 0));
  const [refetchInterval, setRefetchInterval] = useQueryParam('interval', withDefault(NumberParam, 60));
  const [enableVoiceNotification, setEnableVoiceNotification] = useQueryParam('voice', withDefault(BooleanParam, true));
  const [enableNotification, setEnableNotification] = useQueryParam('notification', withDefault(BooleanParam, true));
  const [stopNotifications, setStopNotifications] = useQueryParam('stopNotifications', withDefault(ArrayParam, []));
  const [ageGroup, setAgeGroup] = useQueryParam('age', withDefault(NumberParam, 18));
  const [alert, setAlert] = useQueryParam('alert', withDefault(BooleanParam, true));
  const [warning, setWarning] = useState(true);
  const { speak } = useSpeechSynthesis({});
  const date = useRef(format(new Date(), 'dd-MM-yyyy'));
  const { data: statesList, isFetching: loadingStates } = useQuery(
    END_POINTS.State.key,
    async () => {
      try {
        const res = await axios.get(END_POINTS.State.url);
        return res.data;
      } catch (e) {
        console.log('error:', { e });
        return {};
      }
    },
    {
      enabled: !searchByPin,
    },
  );

  const { data: districts, isFetching: loadingDistrict } = useQuery(
    [END_POINTS.District.key, selectedState],
    async () => {
      try {
        const res = await axios.get(`${END_POINTS.District.url}/${selectedState}`);
        return res.data;
      } catch (e) {
        console.log('error: ', { e });
        return {};
      }
    },
    {
      enabled: !!selectedState && !searchByPin,
    },
  );

  const { data: slotsListByDistrict, isFetching: loadingSlots } = useQuery(
    [END_POINTS.Calendar.key, selectedState, selectedDistrict, ageGroup],
    async () => {
      try {
        const res = await axios.get(`${END_POINTS.Calendar.url}${selectedDistrict}&date=${date.current}`);
        const targetSlot = res.data?.centers?.filter((center: any) => center.sessions.find((session: any) => session.min_age_limit === (ageGroup || 18)));
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
              window.location.href = 'https://selfregistration.cowin.gov.in/';
            };
          }
        }
        return targetSlot;
      } catch (e) {
        console.log('error: ', e);
        return [];
      }
    },
    {
      // Refetch the data every second
      refetchInterval: 1000 * refetchInterval,
      enabled: !!selectedDistrict && !searchByPin,
    },
  );

  const pincodes = searchByPin ? selectedPin.split(',', 6) : [];

  const fetchByPin = async ({ queryKey } : any) => {
    try {
      const res = await axios.get(`${END_POINTS.Pin.url}${queryKey?.[2]}&date=${date.current}`);
      const targetSlot = res.data?.centers?.filter((center: any) => center.sessions.find((session: any) => session.min_age_limit === (ageGroup || 18)));
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
            window.location.href = 'https://selfregistration.cowin.gov.in/';
          };
        }
      }
      return targetSlot;
    } catch (e) {
      console.log('error: ', { e });
      return [];
    }
  };

  const results: UseQueryResult[] = useQueries(
    [
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[0], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[0] && searchByPin, refetchInterval: 1000 * refetchInterval },
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[1], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[1] && searchByPin, refetchInterval: 1000 * refetchInterval },
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[2], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[2] && searchByPin, refetchInterval: 1000 * refetchInterval },
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[3], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[3] && searchByPin, refetchInterval: 1000 * refetchInterval },
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[4], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[4] && searchByPin, refetchInterval: 1000 * refetchInterval },
      { queryKey: [END_POINTS.Pin.key, searchByPin, pincodes?.[5], ageGroup], queryFn: fetchByPin, enabled: !!pincodes?.[5] && searchByPin, refetchInterval: 1000 * refetchInterval },
    ],
  );

  let slotsListByPin: any[] = [];
  let loadingPin = false;
  const { length } = results;
  for (let i = 0; i < length; i += 1) {
    slotsListByPin = slotsListByPin.concat(results[i]?.data ?? []);
    loadingPin = loadingPin || !!results[i]?.isFetching;
  }

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
    selectedPin,
    searchByPin,
    setSelectedState,
    setSearchByPin,
    setSelectedPin,
    statesList: statesList?.states || [],
    enableVoiceNotification,
    setEnableVoiceNotification,
    enableNotification,
    setEnableNotification,
    slotsList: searchByPin ? slotsListByPin : slotsListByDistrict,
    ageGroup,
    setAgeGroup,
    alert,
    setAlert,
    warning,
    setWarning,
  };
};

export default useDashboard;
