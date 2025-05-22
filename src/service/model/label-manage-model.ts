export interface ProductLabelSearchParams extends Api.Common.CommonSearchParams {
  createById?: number;
  createTimeEnd?: string;
  createTimeStart?: string;
  erpSpuStr?: string;
  isDeleted?: number;
  status?: number;
  tagList?: string[];
  updateById?: number;
  updateTimeEnd?: string;
  updateTimeStart?: string;
}

export type ProductLabelList = Api.Common.PaginatingQueryRecord<ProductLabelListItem>;

export interface ProductLabelListItem {
  batteryCapacity: string;
  createBy: string;
  createById?: number;
  createTime: string;
  electronicPackageMaterial: string;
  erpSpu: string;
  euAgentAddress?: string;
  euAgentEmail?: string;
  euAgentName?: string;
  fccId: string;
  id: number;
  isDeleted: number;
  italianLogoMap: Record<string, string[]>;
  manufacturerAddress: string;
  manufacturerName: string;
  materialQuality: string;
  materialQualityProportion: string;
  packageMaterial: string;
  packageType: string;
  productName: string;
  sku?: string;
  status: number;
  tags: string;
  ukAgentAddress?: string;
  ukAgentEmail?: string;
  ukAgentName?: string;
  updateBy: string;
  updateById: number;
  updateTime: string;
}

export interface LogListItem {
  createId: number;
  createName: string;
  createTime: string;
  id: number;
  listId: number;
  remark: string;
}

export interface SpuInfo {
  manufacturerAddress: string;
  manufacturerName: string;
  productName: string;
}

export interface AddTagItem {
  batteryCapacity: string;
  electronicPackageMaterial: string;
  erpSpu: string;
  euAgentAddress: any;
  euAgentEmail: any;
  euAgentName: string;
  fccId: string;
  manufacturerAddress: string;
  manufacturerName: string;
  materialQuality: string;
  materialQualityProportion: string;
  packageMaterial: string;
  packageType: string;
  productName: string;
  tags: string;
  ukAgentAddress: any;
  ukAgentEmail: any;
  ukAgentName: any;
}

export interface UpdateTagItem extends AddTagItem {
  id: number;
}
