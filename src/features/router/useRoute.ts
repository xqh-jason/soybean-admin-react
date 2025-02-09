import { useMatches } from 'react-router-dom';

/** - get route meta */
export function useRoute<T = unknown>() {
  const matches = useMatches();

  const route = matches.at(-1) as Router.Route<T>;

  return {
    ...route,
    matched: matches.slice(1) as Router.Route<T>[]
  };
}
