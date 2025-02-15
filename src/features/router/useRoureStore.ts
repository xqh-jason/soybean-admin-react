import { selectRouteHomePath } from './routeStore';

export function useGetRouteHomePath() {
  return useAppSelector(selectRouteHomePath);
}

export function useInitAuthRoutes() {
  const routeHomePath = useGetRouteHomePath();

  const { authRoutes } = useGetRoutes();
}
