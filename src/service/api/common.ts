import type { UserListItem } from '../model/common-model';
import { request } from '../request';

export function getAllUser() {
  return request<UserListItem[]>({
    method: 'get',
    url: '/baseuser/all'
  });
}
