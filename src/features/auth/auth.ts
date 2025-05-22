import { useLoading } from '@sa/hooks';

import { getIsLogin, setMenuBtns, setMenuRoles } from '@/features/auth/authStore';
import { usePreviousRoute, useRouter } from '@/features/router';
import { fetchGetUserInfo, fetchLogin, fetchLogout, fetchMenuInfo } from '@/service/api';
import { localStg } from '@/utils/storage';

import { useCacheTabs } from '../tab/tabHooks';

import { resetAuth as resetAuthAction, selectMenuBtns, setToken, setUserInfo } from './authStore';
import { clearAuthStorage, getMenuRolesAndBtns } from './shared';

export function useAuth() {
  const isLogin = useAppSelector(getIsLogin);

  const menuBtns = useAppSelector(selectMenuBtns);

  function hasButtonAuth(menuKey: string, codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return menuBtns[menuKey]?.includes(codes);
    }

    return codes.some(code => menuBtns[menuKey]?.includes(code));
  }

  return {
    hasButtonAuth
  };
}

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { navigate } = useRouter();

  const redirectUrl = searchParams.get('redirect');

  async function toLogin({ password, userName }: { password: string; userName: string }, redirect = true) {
    if (loading) return;

    startLoading();
    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      localStg.set('token', loginToken.number);
      localStg.set('refreshToken', loginToken.number);

      const { data: info, error: userInfoError } = await fetchGetUserInfo();

      if (!userInfoError) {
        const { data: menuInfo } = await fetchMenuInfo(import.meta.env.VITE_SYSTEM_CODE);
        const { menuBtns, menuRoles } = getMenuRolesAndBtns(menuInfo || []);
        dispatch(setMenuRoles(menuRoles));
        dispatch(setMenuBtns(menuBtns));
        localStg.set('menuRoles', menuRoles);
        localStg.set('menuBtns', menuBtns);

        // 2. store user info
        localStg.set('userInfo', info);

        dispatch(setToken(loginToken.number));
        dispatch(setUserInfo(info));

        if (redirect) {
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate('/');
          }
        }

        window.$notification?.success({
          description: t('page.login.common.welcomeBack', { userName: info.name }),
          message: t('page.login.common.loginSuccess')
        });
      }
    }

    endLoading();
  }

  return {
    loading,
    toLogin
  };
}

export function useResetAuth() {
  const dispatch = useAppDispatch();

  const previousRoute = usePreviousRoute();

  const cacheTabs = useCacheTabs();

  const { navigate, push, resetRoutes } = useRouter();

  function resetAuth() {
    clearAuthStorage();

    dispatch(resetAuthAction());

    resetRoutes();

    cacheTabs();

    fetchLogout();

    if (!previousRoute?.handle?.constant) {
      if (previousRoute?.fullPath) {
        push('/login', { redirect: previousRoute.fullPath }, null, true);
      } else {
        navigate('/login', { replace: true });
      }
    }
  }

  return resetAuth;
}
