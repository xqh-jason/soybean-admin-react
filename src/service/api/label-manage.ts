import type {
  AddTagItem,
  LogListItem,
  ProductLabelList,
  ProductLabelSearchParams,
  SpuInfo,
  UpdateTagItem
} from '../model/label-manage-model';
import { request } from '../request';

export function fetchGetLabelList(params: ProductLabelSearchParams) {
  return request<ProductLabelList>({
    data: params,
    method: 'post',
    url: '/listingshein/producttaglist/list'
  });
}

export function getTagList() {
  return request<string[]>({
    method: 'get',
    url: '/listingshein/producttaglist/getTagList'
  });
}

export function getLogList(id: number) {
  return request<LogListItem[]>({
    data: {
      listId: id
    },
    method: 'post',
    url: `/listingshein/producttaglog/listAll`
  });
}

export function batchDisabled(ids: number[]) {
  return request({
    data: ids,
    method: 'post',
    url: '/listingshein/producttaglist/batchDisable'
  });
}

export function batchEnabled(ids: number[]) {
  return request({
    data: ids,
    method: 'post',
    url: '/listingshein/producttaglist/batchEnable'
  });
}

export function getInfoBySpu(spu: string) {
  return request<SpuInfo>({
    method: 'get',
    params: {
      spu
    },
    url: '/listingshein/producttaglist/getInfoBySpu'
  });
}

export function getTags() {
  return request<string[]>({
    method: 'get',
    url: '/listingshein/producttaglist/getTagList'
  });
}

export function getPackageTypeList() {
  return request<string[]>({
    data: {
      tag: '环保标'
    },
    method: 'post',
    url: '/listingshein/producttaglist/getPackageTypeList'
  });
}

export function getElectronicPackageMaterialList() {
  return request<string[]>({
    data: {
      packageType: '',
      tag: '电子标签'
    },
    method: 'post',
    url: '/listingshein/producttaglist/getPackageMaterialList'
  });
}

export function getHbPackageMaterialList(packageType: string) {
  return request<string[]>({
    data: {
      packageType,
      tag: '环保标'
    },
    method: 'post',
    url: '/listingshein/producttaglist/getPackageMaterialList'
  });
}

export function addTag(data: AddTagItem) {
  return request<{ value: number }>({
    data,
    method: 'post',
    url: 'listingshein/producttaglist'
  });
}

export function updateTag(data: UpdateTagItem) {
  return request<{ value: number }>({
    data,
    method: 'put',
    url: 'listingshein/producttaglist'
  });
}
