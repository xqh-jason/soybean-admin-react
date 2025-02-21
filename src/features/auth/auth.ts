import { getIsLogin, selectUserInfo } from '@/features/auth/authStore';

export function useAuth() {
  const userInfo = useAppSelector(selectUserInfo);

  const isLogin = useAppSelector(getIsLogin);

  function hasAuth(codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return userInfo.buttons.includes(codes);
    }

    return codes.some(code => userInfo.buttons.includes(code));
  }

  return {
    hasAuth
  };
}
