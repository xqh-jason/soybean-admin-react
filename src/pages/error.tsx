import { Button, Typography } from 'antd';

import { useRouter } from '@/features/router';
import { localStg } from '@/utils/storage';

const isDev = import.meta.env.DEV;

const theme = localStg.get('themeColor') || '#646cff';

const ErrorPage = ({ routeError }: any) => {
  // 可以在这里根据不同的业务逻辑处理错误或者上报给日志服务
  const { go } = useRouter();

  const { t } = useTranslation();

  function handleUpdate() {
    go(0);
  }

  return (
    <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="error" />
      </div>
      {isDev ? (
        <Typography.Text code>{routeError.message}</Typography.Text>
      ) : (
        <Typography.Title level={3}>{t('common.errorHint')}</Typography.Title>
      )}
      <Button
        style={{ backgroundColor: theme }}
        type="primary"
        onClick={handleUpdate}
      >
        {t('common.tryAlign')}
      </Button>
    </div>
  );
};

export default ErrorPage;
