import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';

import { useAuth } from '@/features/auth';
import { useProTableSizeObserver } from '@/features/pro-table/useProTableSizeObserver';
import { getAllUser } from '@/service/api/common';
import { batchDisabled, batchEnabled, fetchGetLabelList, getTagList } from '@/service/api/label-manage';
import type { ProductLabelListItem, ProductLabelSearchParams } from '@/service/model/label-manage-model';

import AddOrEditModal from './_components/add-or-edit-modal';
import LogModal from './_components/log-modal';
import { TypeEnum } from './_components/types';

export type TableListItem = ProductLabelListItem;
interface ActionButtonsFn {
  (buttonAuthKeys: string[], item: ProductLabelListItem): React.ReactNode[];
}

interface AddOrEditModalState {
  data?: ProductLabelListItem;
  open: boolean;
  type: TypeEnum;
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

async function listApi(params: ProductLabelSearchParams) {
  const res = await fetchGetLabelList(params);
  return {
    data: res.data?.list,
    success: true,
    total: res.data?.total
  };
}

export default function ProductLabels() {
  const actionRef = useRef<ActionType>(null);
  const { tableScrollY } = useProTableSizeObserver(actionRef);
  const { hasButtonAuth } = useAuth();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logId, setLogId] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addOrEditModalState, setAddOrEditModalState] = useSetState<AddOrEditModalState>({
    data: undefined,
    open: false,
    type: TypeEnum.ADD
  });

  const buttonKeys: string[] = [];
  if (hasButtonAuth('ProductLabels', 'add')) buttonKeys.push('add');
  if (hasButtonAuth('ProductLabels', 'start')) buttonKeys.push('start');
  if (hasButtonAuth('ProductLabels', 'close')) buttonKeys.push('close');
  if (hasButtonAuth('ProductLabels', 'edit')) buttonKeys.push('edit');
  if (hasButtonAuth('ProductLabels', 'log')) buttonKeys.push('log');
  if (hasButtonAuth('ProductLabels', 'downloadTags')) buttonKeys.push('downloadTags');

  function handleBatchModifyStatus(status: boolean) {
    if (selectedRowKeys.length === 0) {
      window.$message?.warning('请至少选择一条数据');
      return;
    }

    window.$modal?.confirm({
      content: `确认${status ? '开启' : '禁用'}选中的${selectedRowKeys.length}条数据吗？`,
      okText: '确认',
      onOk: async () => {
        await (status ? batchEnabled(selectedRowKeys as number[]) : batchDisabled(selectedRowKeys as number[]));
        setSelectedRowKeys([]);
        window.$message?.success('操作成功');
        actionRef.current?.reload();
      },
      title: '提示'
    });
  }

  function toolBarButtons(buttonAuthKeys: string[]) {
    const buttons: React.ReactNode[] = [];

    if (buttonAuthKeys.includes('add')) {
      buttons.push(
        <Button
          key="add"
          type="primary"
          onClick={() => {
            setAddOrEditModalState({
              open: true,
              type: TypeEnum.ADD
            });
          }}
        >
          新增
        </Button>
      );
    }

    if (buttonAuthKeys.includes('start')) {
      buttons.push(
        <Button
          key="enable"
          type="primary"
          onClick={() => handleBatchModifyStatus(true)}
        >
          开启
        </Button>
      );
    }
    if (buttonAuthKeys.includes('close')) {
      buttons.push(
        <Button
          key="disable"
          type="primary"
          onClick={() => handleBatchModifyStatus(false)}
        >
          禁用
        </Button>
      );
    }

    return buttons;
  }

  const toolButtons = toolBarButtons(buttonKeys);

  function handleLogOpen(id: number) {
    setLogId(id);
    setIsLogModalOpen(true);
  }

  function actionButtons(buttonAuthKeys: string[], item: ProductLabelListItem) {
    const buttons: React.ReactNode[] = [];
    if (buttonAuthKeys.includes('edit')) {
      buttons.push(
        <Button
          key="edit"
          type="link"
          onClick={() => {
            setAddOrEditModalState({
              data: item,
              open: true,
              type: TypeEnum.EDIT
            });
          }}
        >
          编辑
        </Button>
      );
    }

    if (buttonAuthKeys.includes('log')) {
      buttons.push(
        <Button
          key="delete"
          type="link"
          onClick={() => handleLogOpen(item.id)}
        >
          日志
        </Button>
      );
    }

    if (buttonAuthKeys.includes('downloadTags')) {
      buttons.push(
        <Button
          key="delete"
          type="link"
        >
          下载PDF标签
        </Button>
      );
    }

    return buttons;
  }

  return (
    <div className="h-full">
      <LogModal
        id={logId}
        open={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />
      <AddOrEditModal
        editData={addOrEditModalState.data}
        open={addOrEditModalState.open}
        type={addOrEditModalState.type}
        onClose={() =>
          setAddOrEditModalState({
            data: undefined,
            open: false
          })
        }
        onReload={() => {
          actionRef.current?.reload();
        }}
      />
      <ProTable<TableListItem, TableListItem>
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
          Reflect.deleteProperty(apiParams, 'current');
          Reflect.deleteProperty(apiParams, 'pageSize');

          if (params.erpSpu) {
            Reflect.set(apiParams, 'erpSpuStr', params.erpSpu);
            Reflect.deleteProperty(apiParams, 'erpSpu');
          }

          if (params.tags) {
            Reflect.set(apiParams, 'tagList', params.tags);
            Reflect.deleteProperty(apiParams, 'tags');
          }

          if (apiParams.createTime && apiParams.createTime.length > 0) {
            Reflect.set(apiParams, 'createTimeStart', apiParams.createTime[0]);
            Reflect.set(apiParams, 'createTimeEnd', apiParams.createTime[1]);
            Reflect.deleteProperty(apiParams, 'createTime');
          }

          if (apiParams.updateTime && apiParams.updateTime.length > 0) {
            Reflect.set(apiParams, 'updateTimeStart', apiParams.updateTime[0]);
            Reflect.set(apiParams, 'updateTimeEnd', apiParams.updateTime[1]);
            Reflect.deleteProperty(apiParams, 'updateTime');
          }

          return listApi(apiParams);
        }}
        rowSelection={{
          onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys);
          },
          selectedRowKeys,
          type: 'checkbox'
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100
        }}
      />
    </div>
  );
}
