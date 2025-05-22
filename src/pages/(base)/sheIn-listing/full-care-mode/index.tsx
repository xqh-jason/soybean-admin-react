import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Divider, Input } from 'antd';

import { useProTableSizeObserver } from '@/features/pro-table/useProTableSizeObserver';
import { fetchFullCareModeList, shopList } from '@/service/api/shein-listing';
import type { ListingListItem } from '@/service/model/shein-listing-model';

export type TableListItem = ListingListItem;
interface ActionButtonsFn {
  (buttonAuthKeys: string[], item: ListingListItem): React.ReactNode[];
}

const columns = (_buttonKeys: string[], _actionButtons: ActionButtonsFn): ProColumns<TableListItem>[] => [
  {
    dataIndex: 'skc',
    renderFormItem: () => {
      return (
        // value 和 onchange 会通过 form 自动注入。
        <Input.TextArea
          maxLength={3000}
          placeholder="输入多个，使用空行键分隔"
          rows={2}
          showCount={true}
        />
      );
    },
    title: 'SKC',
    valueType: 'textarea',
    width: 120
  },
  {
    dataIndex: 'skuCode',
    hideInTable: true,
    renderFormItem: () => {
      return (
        // value 和 onchange 会通过 form 自动注入。
        <Input.TextArea
          maxLength={3000}
          placeholder="输入多个，使用空行键分隔"
          rows={2}
          showCount={true}
        />
      );
    },
    title: 'SKUCode'
  },
  {
    dataIndex: 'supplierSku',
    hideInTable: true,
    renderFormItem: () => {
      return (
        // value 和 onchange 会通过 form 自动注入。
        <Input.TextArea
          maxLength={3000}
          placeholder="输入多个，使用空行键分隔"
          rows={2}
          showCount={true}
        />
      );
    },
    title: '供应商SKU'
  },
  {
    dataIndex: 'erpSku',
    hideInTable: true,
    renderFormItem: () => {
      return (
        // value 和 onchange 会通过 form 自动注入。
        <Input.TextArea
          maxLength={3000}
          placeholder="输入多个，使用空行键分隔"
          rows={2}
          showCount={true}
        />
      );
    },
    title: '系统SKU'
  },
  {
    hideInSearch: true,
    render: (_, record) => {
      const { sheinListingVariantsDOList } = record;
      return sheinListingVariantsDOList
        ? sheinListingVariantsDOList.map((item, index) => (
            <div key={item.id}>
              <div>
                SKUcode:{item.skuCode}
                <br />
                供应商sku:{item.supplierSku}
                <br />
                系统SKU:{item.erpSkuStr}
                <br />
              </div>
              {sheinListingVariantsDOList[index + 1] && <Divider />}
            </div>
          ))
        : '';
    },
    title: 'SKUcode/供应商sku/系统SKU',
    width: 250
  },
  {
    hideInSearch: true,
    render: (_, record) => {
      const { sheinListingVariantsDOList } = record;
      return sheinListingVariantsDOList
        ? sheinListingVariantsDOList.map((item, index) => (
            <div key={item.id}>
              <div>{item.attribute}</div>
              {sheinListingVariantsDOList[index + 1] && <Divider />}
            </div>
          ))
        : '';
    },
    title: '变体属性',
    width: 180
  },
  {
    dataIndex: 'shopIdList',
    fieldProps: {
      allowClear: true,
      mode: 'multiple',
      placeholder: '请选择账号'
    },
    hideInTable: true,
    request: async () => {
      const res = await shopList();
      return (
        res.data?.list.map(item => ({
          label: item.shopName,
          value: item.id
        })) || []
      );
    },
    title: '账号',
    valueType: 'select'
  },
  {
    dataIndex: 'shopName',
    hideInSearch: true,
    title: '账号',
    width: 180
  },
  {
    dataIndex: 'createTime',
    hideInTable: true,
    title: '系统创建时间',
    valueType: 'dateRange',
    width: 180
  },
  {
    dataIndex: 'createTime',
    hideInSearch: true,
    title: '系统创建时间',
    width: 180
  },
  {
    dataIndex: 'updateTime',
    hideInTable: true,
    title: '系统更新时间',
    valueType: 'dateRange',
    width: 180
  },
  {
    dataIndex: 'updateTime',
    hideInSearch: true,
    title: '系统更新时间',
    width: 180
  }
];

async function listApi(params: any) {
  const res = await fetchFullCareModeList(params);
  return {
    data: res.data?.list,
    success: true,
    total: res.data?.total
  };
}

export default function FullCareMode() {
  const actionRef = useRef<ActionType>(null);
  const { tableScrollY } = useProTableSizeObserver(actionRef);

  const buttonKeys: string[] = [];

  function toolBarButtons(_buttonAuthKeys: string[]) {
    const buttons: React.ReactNode[] = [];

    return buttons;
  }

  const toolButtons = toolBarButtons(buttonKeys);

  function actionButtons(_buttonAuthKeys: string[], _item: ListingListItem) {
    const buttons: React.ReactNode[] = [];

    return buttons;
  }

  return (
    <div className="h-full">
      <ProTable<TableListItem, Partial<TableListItem>>
        bordered
        actionRef={actionRef}
        columns={columns(buttonKeys, actionButtons)}
        dateFormatter="string"
        rowKey="id"
        scroll={{ y: tableScrollY }}
        toolbar={{}}
        toolBarRender={() => toolButtons}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true
        }}
        request={(params, _sorter, _filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const apiParams = {
            ...params,
            pn: params.current || 1,
            ps: params.pageSize || 10
          };

          if (apiParams.createTime && apiParams.createTime.length > 0) {
            Reflect.set(apiParams, 'createTimeStart', `${apiParams.createTime[0]} 00:00:00`);
            Reflect.set(apiParams, 'createTimeEnd', `${apiParams.createTime[1]} 23:59:59`);
            Reflect.deleteProperty(apiParams, 'createTime');
          }

          if (apiParams.updateTime && apiParams.updateTime.length > 0) {
            Reflect.set(apiParams, 'updateTimeStart', `${apiParams.updateTime[0]} 00:00:00`);
            Reflect.set(apiParams, 'updateTimeEnd', `${apiParams.updateTime[1]} 23:59:59`);
            Reflect.deleteProperty(apiParams, 'updateTime');
          }

          delete apiParams.current;
          delete apiParams.pageSize;
          return listApi(apiParams);
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100
        }}
      />
    </div>
  );
}
