import { useMatches, useRouteError } from 'react-router-dom';

import { parseQuery } from './query';

function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/** - get route meta */
export function useRoute<T = unknown, Q extends Record<string, string> = Record<string, string>>() {
  const matches = useMatches();

  const routes = matches.at(-1) as Router.Route<T>;

  const { hash, pathname, search } = useLocation();

  const fullPath = pathname + search + hash;

  const query = parseQuery(search) as Q;

  const error = useRouteError() as Error | null;

  const route = {
    ...routes,
    error,
    fullPath,
    hash,
    matched: matches.slice(1) as Router.Route<T>[],
    pathname,
    query,
    redirect: null,
    search
  } as Router.Route<T, Q>;

  const previousRoute = usePrevious(route);

  route.redirect = previousRoute;

  return useMemo(() => route, [route.fullPath]);
}
