import { encryptByMd5 } from '@/utils/cipher';

import { request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      passwd: encryptByMd5(password),
      uname: userName
    },
    method: 'post',
    url: '/dologin'
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/baseuser/info' });
}

export function fetchSystemMenuInfo(syskey: string) {
  return request<Api.Auth.SystemMenuInfo[]>({ params: { syskey }, url: '/basemenu/user/system' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      refreshToken
    },
    method: 'post',
    url: '/auth/refreshToken'
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ params: { code, msg }, url: '/auth/error' });
}
