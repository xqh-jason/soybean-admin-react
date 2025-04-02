import { request } from "../request";

export function fetchGetFullcaremodeList(
  params?: Api.SystemManage.RoleSearchParams,
) {
  return request<Api.SystemManage.RoleList>({
    method: "post",
    data: params,
    url: "/listingshein/sheinlisting/list",
  });
}
