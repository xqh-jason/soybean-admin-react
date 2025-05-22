import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { getMenuBtns, getMenuRoles, getToken, getUserInfo } from './shared';

const initialState = {
  menuBtns: getMenuBtns(),
  menuRoles: getMenuRoles(),
  token: getToken(),
  userInfo: getUserInfo()
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setMenuBtns: (state, { payload }: PayloadAction<Record<string, string[]>>) => {
      state.menuBtns = payload;
    },
    setMenuRoles: (state, { payload }: PayloadAction<string[]>) => {
      state.menuRoles = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<Api.Auth.UserInfo>) => {
      state.userInfo = payload;
    }
  },
  selectors: {
    selectMenuBtns: auth => auth.menuBtns,
    selectMenuRoles: auth => auth.menuRoles,
    selectToken: auth => auth.token,
    selectUserInfo: auth => auth.userInfo
  }
});

export const { resetAuth, setMenuBtns, setMenuRoles, setToken, setUserInfo } = authSlice.actions;

export const { selectMenuBtns, selectMenuRoles, selectToken, selectUserInfo } = authSlice.selectors;

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** Is static super role */
export const isStaticSuper = createSelector([selectMenuRoles], menuRoles => {
  const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

  return VITE_AUTH_ROUTE_MODE === 'static' && menuRoles.includes(VITE_STATIC_SUPER_ROLE);
});
