import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';
import { PAGE_SIZE, RE_FETCH_INTERVAL } from '../../variables/constants';
import END_POINTS from '../../variables/endpoints';

const useDashboard = () => {
  const [pageSize, setPageSize] = useQueryParam('page-size', withDefault(NumberParam, PAGE_SIZE));
  const { data: dueToday, isFetching: dueTodayIsFetching } = useQuery(
    END_POINTS.DUE_TODAY.key,
    async () => {
      const res = await axios.get(END_POINTS.DUE_TODAY.url);
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: RE_FETCH_INTERVAL,
    },
  );

  const { data: dueLater, isFetching: dueLaterIsFetching } = useQuery(
    END_POINTS.DUE_LATER.key,
    async () => {
      const res = await axios.get(END_POINTS.DUE_LATER.url);
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: RE_FETCH_INTERVAL,
    },
  );

  const { data: sameDayShipping, isFetching: sameDayShippingIsFetching } = useQuery(
    END_POINTS.SAME_DAY_SHIPPING.key,
    async () => {
      const res = await axios.get(END_POINTS.SAME_DAY_SHIPPING.url);
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: RE_FETCH_INTERVAL,
    },
  );

  const { data: mustGo, isFetching: mustGoIsFetching } = useQuery(
    END_POINTS.MUST_GO.key,
    async () => {
      const res = await axios.get(END_POINTS.MUST_GO.url);
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: RE_FETCH_INTERVAL,
    },
  );

  const updatePageSize = (size: number | null) => () => {
    setPageSize(size);
  };

  console.log(pageSize);

  // TODO: Filter based on time window, page size and remove duplicate
  const getDueTodayData = () => dueToday;

  // TODO: Filter based on time window, page size and remove duplicate
  const getDueLaterData = () => dueLater;

  // TODO: Filter based on time window, page size and remove duplicate
  const getSameDayShippingData = () => sameDayShipping;

  // TODO: Filter based on time window, page size and remove duplicate
  const getmustGoDataData = () => mustGo;

  return {
    dueLaterIsFetching,
    dueTodayIsFetching,
    sameDayShippingIsFetching,
    mustGoIsFetching,
    dueTodayData: getDueTodayData,
    dueLaterData: getDueLaterData,
    sameDayShippingData: getSameDayShippingData,
    mustGoData: getmustGoDataData,
    updatePageSize,
  };
};

export default useDashboard;
