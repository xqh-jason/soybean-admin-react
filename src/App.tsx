import type { WatermarkProps } from 'antd';

import { getThemeSettings } from '@/store/slice/theme';

import AppProvider from './components/stateful/AppProvider';
import { AntdConfig, ThemeProvider } from './features';

const watermarkProps: WatermarkProps = {
  font: {
    fontSize: 16
  },
  height: 128,
  offset: [12, 60],
  rotate: -15,
  width: 240,
  zIndex: 9999
};

const App = () => {
  const themeSettings = useAppSelector(getThemeSettings);

  return (
    <ThemeProvider>
      <AntdConfig>
        <AppProvider>
          <AWatermark
            className="h-full"
            content={themeSettings.watermark.visible ? themeSettings.watermark?.text || 'Soybean' : ''}
            {...watermarkProps}
          />
        </AppProvider>
      </AntdConfig>
    </ThemeProvider>
  );
};

export default App;
