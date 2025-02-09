import { getThemeSettings } from '@/store/slice/theme';

export function useThemeSettings() {
  const themeSettings = useAppSelector(getThemeSettings);

  return themeSettings;
}
