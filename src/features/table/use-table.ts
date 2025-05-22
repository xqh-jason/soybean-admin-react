import { useBoolean, useHookTable } from '@sa/hooks';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Form } from 'antd';

import { parseQuery } from '@/features/router/query';
import { getIsMobile } from '@/layouts/appStore';

type TableData = AntDesign.TableData;
type GetTableData<A extends AntDesign.TableApiFn> = AntDesign.GetTableData<A>;
type TableColumn<T> = AntDesign.TableColumn<T>;
export type Config<A extends AntDesign.TableApiFn> = AntDesign.AntDesignTableConfig<A> & {
  isChangeURL?: boolean;
};

export function useTable<A extends AntDesign.TableApiFn>(
  config: Config<A>,
  paginationConfig?: Omit<TablePaginationConfig, 'onChange' | 'pn' | 'ps' | 'total'>
) {
  const isMobile = useAppSelector(getIsMobile);

  const { apiFn, apiParams, immediate, isChangeURL = false, rowKey = 'id' } = config;

  const [form] = Form.useForm<AntDesign.AntDesignTableConfig<A>['apiParams']>();

  const { search } = useLocation();

  const query = parseQuery(search) as unknown as Parameters<A>[0];

  const {
    columnChecks,
    columns,
    data,
    empty,
    loading,
    pageNum,
    pageSize,
    resetSearchParams,
    searchParams,
    setColumnChecks,
    total,
    updateSearchParams
  } = useHookTable<A, GetTableData<A>, TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>>({
    apiFn,
    apiParams: { ...apiParams, ...query },
    columns: config.columns,
    getColumnChecks: cols => {
      const checks: AntDesign.TableColumnCheck[] = [];

      cols.forEach(column => {
        if (column.key) {
          checks.push({
            checked: true,
            key: column.key as string,
            title: column.title as string
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<string, TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>>();

      cols.forEach(column => {
        if (column.key) {
          columnMap.set(column.key as string, column);
        }
      });

      const filteredColumns = checks.filter(item => item.checked).map(check => columnMap.get(check.key));

      return filteredColumns as TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>[];
    },
    immediate,
    isChangeURL,
    transformer: (res, pn, ps) => {
      const { list: records = [], total: totalNum = 0 } = res.data || {};

      const recordsWithIndex = records.map((item, index) => {
        return {
          ...item,
          index: (pn - 1) * ps + index + 1
        };
      });

      return {
        data: recordsWithIndex,
        pageNum: pn,
        pageSize: ps,
        total: totalNum
      };
    }
  });

  // this is for mobile, if the system does not support mobile, you can use `pagination` directly
  const pagination: TablePaginationConfig = {
    current: pageNum,
    onChange: async (pn: number, ps: number) => {
      updateSearchParams({
        pn,
        ps
      });
    },
    pageSize,
    pageSizeOptions: ['10', '15', '20', '25', '30'],
    showSizeChanger: true,
    showTotal: (totalNum: number) => {
      return `共 ${totalNum} 条数据`;
    },
    simple: isMobile,
    total,
    ...paginationConfig
  };

  function reset() {
    form.resetFields();

    resetSearchParams();
  }

  async function run(isResetCurrent: boolean = true) {
    const res = await form.validateFields();

    if (res) {
      if (isResetCurrent) {
        const { pn = 1, ...rest } = res;
        updateSearchParams({ pn, ...rest });
      } else {
        updateSearchParams(res);
      }
    }
  }

  return {
    columnChecks,
    data,
    empty,
    run,
    searchParams,
    searchProps: {
      form,
      reset,
      search: run,
      searchParams: searchParams as NonNullable<Parameters<A>[0]>
    },
    setColumnChecks,
    tableProps: {
      columns,
      dataSource: data,
      loading,
      pagination,
      rowKey
    }
  };
}

export function useTableOperate<T extends TableData = TableData>(
  data: T[],
  getData: (isResetCurrent?: boolean) => Promise<void>,
  executeResActions: (res: T, operateType: AntDesign.TableOperateType) => void
) {
  const { bool: drawerVisible, setFalse: closeDrawer, setTrue: openDrawer } = useBoolean();

  const { t } = useTranslation();

  const [operateType, setOperateType] = useState<AntDesign.TableOperateType>('add');

  const [form] = Form.useForm<T>();

  function handleAdd() {
    setOperateType('add');
    openDrawer();
  }

  /** the editing row data */
  const [editingData, setEditingData] = useState<T>();

  function handleEdit(idOrData: T['id'] | T) {
    if (typeof idOrData === 'object') {
      form.setFieldsValue(idOrData);

      setEditingData(idOrData);
    } else {
      const findItem = data.find(item => item.id === idOrData);
      if (findItem) {
        form.setFieldsValue(findItem);

        setEditingData(findItem);
      }
    }

    setOperateType('edit');
    openDrawer();
  }

  /** the checked row keys of table */
  const [checkedRowKeys, setCheckedRowKeys] = useState<React.Key[]>([]);

  function onSelectChange(keys: React.Key[]) {
    setCheckedRowKeys(keys);
  }

  const rowSelection: TableProps<T>['rowSelection'] = {
    columnWidth: 48,
    fixed: true,
    onChange: onSelectChange,
    selectedRowKeys: checkedRowKeys,
    type: 'checkbox'
  };

  function onClose() {
    closeDrawer();

    form.resetFields();
  }

  /** the hook after the batch delete operation is completed */
  async function onBatchDeleted() {
    window.$message?.success(t('common.deleteSuccess'));
    setCheckedRowKeys([]);

    await getData(false);
  }

  /** the hook after the delete operation is completed */
  async function onDeleted() {
    window.$message?.success(t('common.deleteSuccess'));

    await getData(false);
  }

  async function handleSubmit() {
    const res = await form.validateFields();

    // request
    await executeResActions(res, operateType);

    window.$message?.success(t('common.updateSuccess'));

    onClose();
    getData();
  }

  return {
    checkedRowKeys,
    closeDrawer,
    drawerVisible,
    editingData,
    generalPopupOperation: {
      form,
      handleSubmit,
      onClose,
      open: drawerVisible,
      operateType
    },
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    onSelectChange,
    openDrawer,
    operateType,
    rowSelection
  };
}

export function useTableScroll(scrollX: number = 702) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const size = useSize(tableWrapperRef);

  function getTableScrollY() {
    const height = size?.height;

    if (!height) return undefined;

    return height - 160;
  }

  const scrollConfig = {
    x: scrollX,
    y: getTableScrollY()
  };

  return {
    scrollConfig,
    tableWrapperRef
  };
}
