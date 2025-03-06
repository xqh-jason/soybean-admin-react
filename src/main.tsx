import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { store } from '@/store';

import FallbackRender from '../ErrorBoundary.tsx';

import App from './App.tsx';
import './plugins/assets';
import { setupI18n } from './locales';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';

async function setupApp() {
  await setupI18n();

  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  setupAppVersionNotification();

  const container = document.getElementById('root');

  if (!container) return;

  const root = createRoot(container);

  root.render(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ErrorBoundary fallbackRender={FallbackRender}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
}

setupApp();
