import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { getToken, getUserInfo } from './shared';

// 定义 InitialStateType 类型
interface InitialStateType {
  roleBtns: string[];
  roles: string[];
  token: string | null;
  userInfo: Api.Auth.UserInfo | null;
}

const initialState: InitialStateType = {
  roleBtns: [],
  roles: [],
  token: getToken(),
  userInfo: getUserInfo()
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setRoleBtns: (state, { payload }: PayloadAction<string[]>) => {
      state.roleBtns = payload;
    },
    setRoles: (state, { payload }: PayloadAction<string[]>) => {
      state.roles = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<Api.Auth.UserInfo>) => {
      state.userInfo = payload;
    }
  },
  selectors: {
    selectRoleBtns: auth => auth.roleBtns,
    selectRoles: auth => auth.roles,
    selectToken: auth => auth.token,
    selectUserInfo: auth => auth.userInfo
  }
});

export const { resetAuth, setRoleBtns, setRoles, setToken, setUserInfo } = authSlice.actions;

export const { selectRoleBtns, selectRoles, selectToken, selectUserInfo } = authSlice.selectors;

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** Is static super role */
export const isStaticSuper = createSelector([selectRoles], roles => {
  const { VITE_AUTH_ROUTE_MODE } = import.meta.env;

  return VITE_AUTH_ROUTE_MODE === 'static' && roles.includes(import.meta.env.VITE_STATIC_SUPER_ROLE);
});
