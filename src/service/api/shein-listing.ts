import type { ListingList, ListingSearchParams, ShopList } from '../model/shein-listing-model';
import { request } from '../request';

export function fetchFullCareModeList(params?: ListingSearchParams) {
  return request<ListingList>({
    data: params,
    method: 'post',
    url: '/listingshein/sheinlisting/list'
  });
}

export function shopList() {
  return request<ShopList>({
    data: {
      platformId: 31,
      pn: 1,
      ps: 10000
    },
    method: 'post',
    url: '/basicinformation/shop/list'
  });
}
