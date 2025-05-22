import type { MenuInfo } from '@/service/model/auth-model';
import { localStg } from '@/utils/storage';

/** Get token */
export function getToken() {
  return localStg.get('token') || '';
}

export function getMenuRoles() {
  return localStg.get('menuRoles') || [];
}

export function getMenuBtns() {
  return localStg.get('menuBtns') || {};
}

/** Get user info */
export function getUserInfo() {
  const emptyInfo: Api.Auth.UserInfo = {
    businessStatus: 0,
    businessStatusName: '',
    createdTime: '',
    effectiveTime: '',
    email: '',
    externalUserId: '',
    id: 0,
    name: '',
    number: '',
    phone: '',
    platform: '',
    roleIdList: [],
    sex: 0,
    sexName: '',
    status: 0,
    statusName: '',
    uniqueId: []
  };
  const userInfo = localStg.get('userInfo') || emptyInfo;

  return userInfo;
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('refreshToken');
  localStg.remove('userInfo');
}

export function getMenuRolesAndBtns(menus: MenuInfo[]) {
  const menuRoles: string[] = [];
  const menuBtns: App.MenuBtns = {};

  menus.forEach(item => {
    menuRoles.push(item.key);

    if (item.btns && item.btns.length > 0) {
      menuBtns[item.key] = item.btns;
    }
    if (item.child && item.child.length > 0) {
      const { menuBtns: childMenuBtns, menuRoles: childMenuRoles } = getMenuRolesAndBtns(item.child);
      // 合并子菜单的角色
      menuRoles.push(...childMenuRoles);
      // 合并子菜单的按钮
      Object.assign(menuBtns, childMenuBtns);
    }
  });

  return {
    menuBtns,
    menuRoles
  };
}
