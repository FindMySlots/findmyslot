import * as React from 'react';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { PAGE_SIZE, RE_FETCH_INTERVAL } from '../../variables/constants';
import END_POINTS from '../../variables/endpoints';
import { Teams } from '../../variables/types';

interface RouteProp {
  id: string
}

const useTeam = () => {
  const history = useHistory();
  const { id } = useParams<RouteProp>();
  const [pageSize, setPageSize] = useQueryParam('page-size', withDefault(NumberParam, PAGE_SIZE));
  const { data: teamData, isFetching } = useQuery(
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

  const updatePageSize = (size: number | null) => () => {
    setPageSize(size);
  };

  console.log(pageSize);

  // TODO: Filter based on time window, page size and remove duplicate
  const getData = () => teamData;

  const onTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    if (value !== Teams.Dashboard) {
      history.push(`/team/${value}`);
    } else {
      history.push('/');
    }
  };

  return {
    data: getData(),
    isFetching,
    updatePageSize,
    onTeamChange,
    team: id as Teams,
  };
};

export default useTeam;
