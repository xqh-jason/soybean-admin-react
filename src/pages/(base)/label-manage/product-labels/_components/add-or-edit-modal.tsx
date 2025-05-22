import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Space } from 'antd';
import type { JSX, RefObject } from 'react';

import {
  addTag,
  getElectronicPackageMaterialList,
  getHbPackageMaterialList,
  getInfoBySpu,
  getPackageTypeList,
  getTags,
  updateTag
} from '@/service/api/label-manage';
import type { ProductLabelListItem } from '@/service/model/label-manage-model';

import type { TypeEnum } from './types';

interface Props {
  editData?: ProductLabelListItem;
  onClose: () => void;
  onReload: () => void;
  open: boolean;
  type: TypeEnum;
}

interface FormValue {
  batteryCapacity: string;
  electronicPackageMaterial: string;
  erpSpu: string;
  euAgentAddress: string;
  euAgentEmail: string;
  euAgentName: string;
  fccId: string;
  manufacturerAddress: string;
  manufacturerName: string;
  materialQuality: string;
  materialQualityProportion: string;
  packageMaterial: string;
  packageType: string;
  productName: string;
  tags: string[];
  ukAgentAddress: string;
  ukAgentEmail: string;
  ukAgentName: string;
}

// 标签对应的表单字段
const tagHasFieldsMap: Record<string, (keyof FormValue)[]> = {
  欧代标: ['euAgentName', 'euAgentAddress', 'euAgentEmail'],
  洗水标: ['materialQualityProportion', 'materialQuality'],
  环保标: ['packageType', 'packageMaterial'],
  电子标签: [
    'electronicPackageMaterial',
    'batteryCapacity',
    'fccId',
    'ukAgentName',
    'ukAgentAddress',
    'ukAgentEmail',
    'euAgentName',
    'euAgentAddress',
    'euAgentEmail'
  ],
  英代标: ['ukAgentName', 'ukAgentAddress', 'ukAgentEmail']
};

const formColumns: Record<string, JSX.Element> = {
  batteryCapacity: (
    <ProFormText
      colProps={{ span: 18 }}
      key="batteryCapacity"
      label="电池容量"
      name="batteryCapacity"
      fieldProps={{
        maxLength: 255,
        showCount: true
      }}
    />
  ),
  electronicPackageMaterial: (
    <ProFormSelect
      colProps={{ span: 18 }}
      key="electronicPackageMaterial"
      label="电子包装材质"
      name="electronicPackageMaterial"
      request={async () => {
        const res = await getElectronicPackageMaterialList();
        return (
          res.data?.map(item => ({
            label: item,
            value: item
          })) || []
        );
      }}
      rules={[
        {
          message: '请选择电子包装材质',
          required: true
        }
      ]}
    />
  ),
  euAgentAddress: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="euAgentAddress"
      label="欧代Address"
      name="euAgentAddress"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  ),
  euAgentEmail: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="euAgentEmail"
      label="欧代E-mail"
      name="euAgentEmail"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  ),
  euAgentName: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="euAgentName"
      label="欧代Name"
      name="euAgentName"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  ),
  fccId: (
    <ProFormText
      colProps={{ span: 18 }}
      key="fccId"
      label="FCC ID"
      name="fccId"
      fieldProps={{
        maxLength: 255,
        showCount: true
      }}
    />
  ),
  materialQualityProportion: (
    <Row
      gutter={18}
      key="materialQualityProportion"
    >
      <Col
        key="materialQualityProportionCol"
        span={12}
      >
        <Form.Item
          key="materialQualityProportionFormItem"
          label="百分比"
          name="materialQualityProportion"
          rules={[{ required: true }]}
        >
          <InputNumber
            addonAfter="%"
            min={0}
          />
        </Form.Item>
      </Col>
      <Col
        key="materialQualityCol"
        span={12}
      >
        <Form.Item
          key="materialQuality"
          label="材质"
          name="materialQuality"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
  ),
  packageMaterial: (
    <ProFormSelect
      colProps={{ span: 18 }}
      dependencies={['packageType']}
      key="packageMaterial"
      label="包装材质"
      name="packageMaterial"
      request={async ({ packageType }) => {
        if (!packageType) {
          return [];
        }

        const res = await getHbPackageMaterialList(packageType);
        return (
          res.data?.map(item => ({
            label: item,
            value: item
          })) || []
        );
      }}
      rules={[
        {
          message: '请选择包装材质',
          required: true
        }
      ]}
    />
  ),
  packageType: (
    <ProFormSelect
      colProps={{ span: 18 }}
      key="packageType"
      label="包装类型"
      name="packageType"
      request={async () => {
        const res = await getPackageTypeList();
        return (
          res.data?.map(item => ({
            label: item,
            value: item
          })) || []
        );
      }}
      rules={[
        {
          message: '请选择包装类型',
          required: true
        }
      ]}
    />
  ),
  ukAgentAddress: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="ukAgentAddress"
      label="英代Address"
      name="ukAgentAddress"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  ),
  ukAgentEmail: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="ukAgentEmail"
      label="英代E-mail"
      name="ukAgentEmail"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  ),
  ukAgentName: (
    <ProFormTextArea
      colProps={{ span: 18 }}
      key="ukAgentName"
      label="英代Name"
      name="ukAgentName"
      fieldProps={{
        maxLength: 150,
        rows: 3,
        showCount: true
      }}
    />
  )
};

function handleTagsChange(tags: string[], formRef: RefObject<ProFormInstance<FormValue>>) {
  // 清空不显示的表单字段
  const mapFields = Object.keys(tagHasFieldsMap);
  const cleanValue: Partial<FormValue> = {};
  mapFields.forEach(tag => {
    if (!tags?.length || !tags?.includes(tag)) {
      const fields = tagHasFieldsMap[tag];
      if (fields) {
        fields.forEach(field => {
          cleanValue[field] = undefined;
        });
      }
    }
  });
  formRef.current.setFieldsValue(cleanValue);
}

function getProFormItemByTags(tags: string[]) {
  const formItems: React.ReactNode[] = [];
  if (!tags?.length) {
    return formItems;
  }

  const hasFields = new Set<string>();
  tags.forEach(tag => {
    const fields = tagHasFieldsMap[tag];
    if (fields) {
      fields.forEach(field => {
        if (!hasFields.has(field)) {
          hasFields.add(field);

          formItems.push(formColumns[field]);
        }
      });
    }
  });

  return formItems;
}

const AddOrEditModal = memo(({ editData, onClose, onReload, open, type }: Props) => {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const formRef = useRef<ProFormInstance<FormValue>>(null);
  const [tagOptions, setTagOptions] = useState<CommonType.Option<string>[]>([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    getTags().then(res => {
      setTagOptions(
        res.data?.map(item => ({
          label: item,
          value: item
        })) || []
      );
    });
  }, []);

  useEffect(() => {
    if (editData) {
      setEditId(editData.id);
      const tags = JSON.parse(editData.tags);

      formRef.current?.setFieldsValue({
        ...editData,
        tags: tags || []
      });
    }
  }, [editData]);

  function handleGetSpuInfo() {
    const spu = formRef.current?.getFieldValue('erpSpu');
    if (spu) {
      setLoading(true);
      getInfoBySpu(spu)
        .then(res => {
          formRef.current?.setFieldsValue({
            manufacturerAddress: res.data?.manufacturerAddress,
            manufacturerName: res.data?.manufacturerName,
            productName: res.data?.productName
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function labelDisabled(label: string, tags: string[]) {
    if (label === '电子标签' && (tags.includes('欧代标') || tags.includes('英代标'))) {
      return true;
    } else if (label === '欧代标' && tags.includes('电子标签')) {
      return true;
    } else if (label === '英代标' && tags.includes('电子标签')) {
      return true;
    }

    return false;
  }

  function handleTagOptionsDisabled(tags: string[]) {
    const options = tagOptions.map(item => ({
      ...item,
      disabled: labelDisabled(item.label, tags)
    }));
    setTagOptions(options);
  }

  function handleSave() {
    formRef.current?.validateFields().then(async formValue => {
      setSaveLoading(true);
      const tags = formValue.tags || [];
      const params = {
        ...editData,
        ...formValue,
        tags: JSON.stringify(tags)
      };
      if (editId === 0) {
        await addTag(params);
      } else {
        await updateTag({
          ...params,
          id: editId
        });
      }
      setSaveLoading(false);
      window.$message?.success('保存成功');
      onClose();
      onReload();
    });
  }

  return (
    <Modal
      maskClosable={false}
      open={open}
      title={`${type === 'add' ? '新增' : '编辑'}商品标签`}
      width={700}
      afterClose={() => {
        setEditId(0);
        formRef.current?.resetFields();
      }}
      footer={
        <Space size={16}>
          <Button
            type="default"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            disabled={saveLoading}
            loading={saveLoading}
            type="primary"
            onClick={handleSave}
          >
            保存
          </Button>
        </Space>
      }
      styles={{
        body: { height: '500px', overflow: 'auto' },
        content: {},
        header: {}
      }}
      onCancel={onClose}
      onOk={onClose}
    >
      <Card>
        <ProForm<FormValue>
          autoFocusFirstInput={true}
          colon={false}
          formRef={formRef}
          grid={true}
          layout="horizontal"
          submitter={false}
          labelCol={{
            span: 6
          }}
        >
          <ProFormText
            colProps={{ span: 18 }}
            disabled={type === 'edit'}
            label="ERP SPU"
            name="erpSpu"
            rules={[
              {
                message: '请输入ERP SPU',
                required: true
              }
            ]}
          />
          <Button
            disabled={type === 'edit'}
            loading={loading}
            type="primary"
            onClick={handleGetSpuInfo}
          >
            加载引用
          </Button>
          <ProFormText
            label="产品名称"
            name="productName"
            colProps={{
              span: 18
            }}
            rules={[
              {
                message: '请输入产品名称',
                required: true
              }
            ]}
          />
          <ProFormTextArea
            colProps={{ span: 18 }}
            label="制造商名称"
            name="manufacturerName"
            fieldProps={{
              maxLength: 255,
              rows: 4,
              showCount: true
            }}
            rules={[
              {
                message: '请输入制造商名称',
                required: true
              }
            ]}
          />
          <ProFormTextArea
            colProps={{ span: 18 }}
            label="制造商地址"
            name="manufacturerAddress"
            fieldProps={{
              maxLength: 255,
              rows: 4,
              showCount: true
            }}
            rules={[
              {
                message: '请输入制造商地址',
                required: true
              }
            ]}
          />
          <ProFormSelect
            colProps={{ span: 18 }}
            label="标签信息"
            mode="multiple"
            name="tags"
            options={tagOptions}
            style={{ zIndex: 1000 }}
            rules={[
              {
                message: '请选择标签信息',
                required: true
              }
            ]}
            onChange={(tags: string[]) => {
              handleTagsChange(tags, formRef as RefObject<ProFormInstance<FormValue>>);
              handleTagOptionsDisabled(tags);
            }}
          />
          <ProFormDependency name={['tags']}>{({ tags }) => getProFormItemByTags(tags)}</ProFormDependency>
        </ProForm>
      </Card>
    </Modal>
  );
});

export default AddOrEditModal;
