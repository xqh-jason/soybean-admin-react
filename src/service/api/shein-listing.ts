import type { ListingList, ListingSearchParams } from '../model/shein-listing-model';
import { request } from '../request';

export function fetchFullCareModeList(params?: ListingSearchParams) {
  return request<ListingList>({
    data: params,
    method: 'post',
    url: '/listingshein/sheinlisting/list'
  });
}
