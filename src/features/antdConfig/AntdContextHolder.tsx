import { App } from 'antd';
import type { PropsWithChildren } from 'react';

import '@ant-design/v5-patch-for-react-19';
import { cacheTabs } from '@/store/slice/tab';
import { cacheThemeSettings } from '@/store/slice/theme';

function ContextHolder() {
  const { message, modal, notification } = App.useApp();
  window.$message = message;
  window.$modal = modal;
  window.$notification = notification;
  return null;
}

const AppProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEventListener(
    'beforeunload',
    () => {
      dispatch(cacheTabs());
      dispatch(cacheThemeSettings());
    },
    { target: window }
  );

  return (
    <App className="h-full">
      <ContextHolder />
      {children}
    </App>
  );
};

export default AppProvider;
