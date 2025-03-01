import { useMatches, useRouteError } from 'react-router-dom';

import { parseQuery } from './query';

/** - get route meta */
export function useRoute<T = unknown, Q extends Record<string, string> = Record<string, string>>() {
  const matches = useMatches();

  const route = matches.at(-1) as Router.Route<T>;

  const { hash, pathname, search } = useLocation();

  const query = parseQuery(search) as Q;

  const error = useRouteError();

  return {
    ...route,
    error,
    fullPath: pathname + search + hash,
    matched: matches.slice(1) as Router.Route<T>[],
    query,
    search
  };
}
