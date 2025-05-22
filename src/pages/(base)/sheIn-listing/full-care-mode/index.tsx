import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';

import { useAuth } from '@/features/auth';
import { useProTableSizeObserver } from '@/features/pro-table/useProTableSizeObserver';
import { getAllUser } from '@/service/api/common';
import { fetchGetLabelList, getTagList } from '@/service/api/label-manage';
import type { ProductLabelListItem } from '@/service/model/label-manage-model';

export type TableListItem = ProductLabelListItem;
interface ActionButtonsFn {
  (buttonAuthKeys: string[], item: ProductLabelListItem): React.ReactNode[];
}

const columns = (buttonKeys: string[], actionButtons: ActionButtonsFn): ProColumns<TableListItem>[] => [
  {
    dataIndex: 'erpSpu',
    title: 'ERP SPU',
    valueType: 'textarea',
    width: 150
  },
  {
    dataIndex: 'productName',
    hideInSearch: true,
    title: '产品名称',
    width: 150
  },
  {
    dataIndex: 'manufacturerName',
    hideInSearch: true,
    title: '制造商名称',
    width: 180
  },
  {
    dataIndex: 'manufacturerAddress',
    hideInSearch: true,
    title: '制造商地址',
    width: 300
  },
  {
    dataIndex: 'tags',
    fieldProps: {
      mode: 'multiple',
      showSearch: true
    },
    render: (_, record) => {
      const { tags } = record;
      if (tags) {
        const tagList: string[] = JSON.parse(tags);
        return (
          <div className="tags">
            {tagList.map(tag => (
              <div
                className="tag"
                key={tag}
              >
                <Tag color="blue">{tag}</Tag>
              </div>
            ))}
          </div>
        );
      }
      return '';
    },
    request: async () => {
      const tagList = await getTagList();
      return tagList.data
        ? tagList.data.map(item => ({
            label: item,
            value: item
          }))
        : [];
    },
    title: '标签信息',
    valueType: 'select',
    width: 150
  },
  {
    dataIndex: 'status',
    fieldProps: {
      options: [
        { label: '待完善', value: 0 },
        { label: '已完善', value: 1 }
      ],
      showSearch: true
    },
    title: '完善数据状态',
    valueType: 'select',
    width: 150
  },
  {
    dataIndex: 'createById',
    fieldProps: {
      showSearch: true
    },
    hideInTable: true,
    request: async () => {
      const res = await getAllUser();
      return res.data
        ? res.data.map(item => ({
            label: item.name,
            value: item.id
          }))
        : [];
    },
    title: '创建人',
    valueType: 'select'
  },
  {
    dataIndex: 'updateById',
    fieldProps: {
      showSearch: true
    },
    hideInTable: true,
    request: async () => {
      const res = await getAllUser();
      return res.data
        ? res.data.map(item => ({
            label: item.name,
            value: item.id
          }))
        : [];
    },
    title: '更新人',
    valueType: 'select'
  },
  {
    dataIndex: 'isDeleted',
    fieldProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 }
      ]
    },
    title: '使用状态',
    valueType: 'select',
    width: 100
  },
  {
    dataIndex: 'createTime',
    hideInTable: true,
    title: '创建时间',
    valueType: 'dateRange'
  },
  {
    dataIndex: 'updateTime',
    hideInTable: true,
    title: '系统更新时间',
    valueType: 'dateRange'
  },
  {
    dataIndex: 'createBy',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div className="create-info">
          <div className="name">{record.createBy}</div>
          <div className="time">{record.createTime}</div>
        </div>
      );
    },
    title: '创建人/时间',
    width: 180
  },
  {
    dataIndex: 'updateBy',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div className="update-info">
          <div className="name">{record.updateBy}</div>
          <div className="time">{record.updateTime}</div>
        </div>
      );
    },
    title: '更新人/时间',
    width: 180
  },
  {
    dataIndex: 'action',
    fixed: 'right',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <>
          {actionButtons(buttonKeys, record).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </>
      );
    },
    title: '操作',
    width: 150
  }
];

async function listApi(params: any) {
  const res = await fetchGetLabelList(params);
  return {
    data: res.data?.list,
    success: true
  };
}

export default function ProductLabels() {
  const actionRef = useRef<ActionType>(null);
  const { tableScrollY } = useProTableSizeObserver(actionRef);
  const { hasButtonAuth } = useAuth();

  const buttonKeys: string[] = [];
  if (hasButtonAuth('ProductLabels', 'add')) buttonKeys.push('add');
  if (hasButtonAuth('ProductLabels', 'start')) buttonKeys.push('start');
  if (hasButtonAuth('ProductLabels', 'close')) buttonKeys.push('close');
  if (hasButtonAuth('ProductLabels', 'edit')) buttonKeys.push('edit');
  if (hasButtonAuth('ProductLabels', 'log')) buttonKeys.push('log');
  if (hasButtonAuth('ProductLabels', 'downloadTags')) buttonKeys.push('downloadTags');

  function toolBarButtons(_buttonAuthKeys: string[]) {
    const buttons: React.ReactNode[] = [];

    return buttons;
  }

  const toolButtons = toolBarButtons(buttonKeys);

  function actionButtons(_buttonAuthKeys: string[], _item: ProductLabelListItem) {
    const buttons: React.ReactNode[] = [];

    return buttons;
  }

  return (
    <div className="h-full">
      <ProTable<TableListItem>
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
          params.pn = params.current;
          params.ps = params.pageSize;
          params.tagList = params.tags;

          if (params.createTime && params.createTime.length > 0) {
            params.createTimeStart = `${params.createTime[0]} 00:00:00`;
            params.createTimeEnd = `${params.createTime[1]} 23:59:59`;
            delete params.createTime;
          }
          if (params.updateTime && params.updateTime.length > 0) {
            params.updateTimeStart = `${params.updateTime[0]} 00:00:00`;
            params.updateTimeEnd = `${params.updateTime[1]} 23:59:59`;
            delete params.updateTime;
          }
          delete params.tags;
          delete params.current;
          delete params.pageSize;
          return listApi(params);
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100
        }}
      />
    </div>
  );
}
