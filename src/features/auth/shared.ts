import { localStg } from '@/utils/storage';

/** Get token */
export function getToken() {
  return localStg.get('token') || '';
}

/** Get user info */
export function getUserInfo() {
  const emptyInfo: Api.Auth.UserInfo = {
    btns: [],
    businessStatus: 0,
    businessStatusName: '',
    createdTime: '',
    effectiveTime: '',
    email: '',
    externalUserId: '',
    groupList: [],
    id: 0,
    menus: [],
    name: '',
    number: '',
    organizationList: [],
    phone: '',
    platform: '',
    positionList: [],
    roleIdList: [],
    roleList: [],
    sex: 0,
    sexName: '',
    status: 0,
    statusName: '',
    uniqueId: [],
    validIp: ''
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
