import { useLoading } from '@sa/hooks';

import { useRouter } from '@/features/router';
import { getIsLogin, login } from '@/store/slice/auth';

/**
 * - 登录
 *
 * 这里为什么封装成一个hook 因为在 系统功能 中的 切换权限页面也是需要用的
 */
export function useLogin() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect');

  const isLogin = useAppSelector(getIsLogin);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { navigate } = useRouter();

  async function toLogin(params: { password: string; userName: string }, redirect = true) {
    startLoading();
    const res = await dispatch(login(params));

    const info = res.payload as Api.Auth.UserInfo;

    if (info.userName) {
      if (redirectUrl && redirect) {
        await navigate(redirectUrl);
      }

      window.$notification?.success({
        description: t('page.login.common.welcomeBack', { userName: info.userName }),
        message: t('page.login.common.loginSuccess')
      });
    }

    endLoading();
  }

  return {
    loading,
    toLogin
  };
}
