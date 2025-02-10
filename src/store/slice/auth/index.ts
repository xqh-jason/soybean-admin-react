import { createSelector } from '@reduxjs/toolkit';

import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { localStg } from '@/utils/storage';

import { createAppSlice } from '../../createAppSlice';

import { getToken, getUserInfo } from './shared';

const initialState = {
  token: getToken(),
  userInfo: getUserInfo()
};

export const authSlice = createAppSlice({
  initialState,
  name: 'auth',
  reducers: create => ({
    login: create.asyncThunk(
      async ({ password, userName }: { password: string; userName: string }) => {
        const { data: loginToken, error } = await fetchLogin(userName, password);
        // 1. stored in the localStorage, the later requests need it in headers
        if (!error) {
          localStg.set('token', loginToken.token);
          localStg.set('refreshToken', loginToken.refreshToken);

          const { data: info, error: userInfoError } = await fetchGetUserInfo();

          if (!userInfoError) {
            // 2. store user info
            localStg.set('userInfo', info);
            return {
              token: loginToken.token,
              userInfo: info
            };
          }
        }

        return initialState;
      },

      {
        fulfilled: (state, { payload }) => {
          if (payload) {
            state.token = payload.token;
            state.userInfo = payload.userInfo;
          }
        }
      }
    ),
    resetAuth: create.reducer(() => initialState)
  }),
  selectors: {
    selectToken: auth => auth.token,
    selectUserInfo: auth => auth.userInfo
  }
});

export const { selectToken, selectUserInfo } = authSlice.selectors;

export const { login, resetAuth } = authSlice.actions;

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** Is static super role */
export const isStaticSuper = createSelector([selectUserInfo], userInfo => {
  const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

  return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
});
