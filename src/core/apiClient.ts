import { CachePolicies } from 'use-http';

const GlobalOptions = {
  cachePolicy: CachePolicies.NO_CACHE,
  interceptors: {
    request: ({ options }: any) => ({
      ...options,
    }),
  },
};

export default GlobalOptions;
