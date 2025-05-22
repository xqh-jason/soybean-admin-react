export interface ListingSearchParams extends Api.Common.CommonSearchParams {
  skc?: string;
}

export type ListingList = Api.Common.PaginatingQueryRecord<ListingListItem>;

export interface ListingListItem {
  createTime: string;
  id: number;
  sheinListingVariantsDOList: SheinListingVariantsDolist[];
  shopId: number;
  shopName: string;
  skc: string;
  updateTime: string;
}

export interface SheinListingVariantsDolist {
  attribute: string;
  createTime: string;
  designCode: string;
  erpSkuList: string;
  erpSkuStr: string;
  id: number;
  shopId: number;
  shopName: string;
  skc: string;
  skuCode: string;
  supplierSku: string;
  updateTime: string;
}
