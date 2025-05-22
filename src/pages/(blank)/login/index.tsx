import { Input, Space } from 'antd';

import { useInitAuth } from '@/features/auth/auth';
import { SubmitEnterButton, useFormRules } from '@/features/form';

type AccountKey = 'admin' | 'super' | 'user';
interface Account {
  key: AccountKey;
  label: string;
  password: string;
  userName: string;
}

type LoginParams = Pick<Account, 'password' | 'userName'>;

const PwdLogin = () => {
  const { loading, toLogin } = useInitAuth();

  const [form] = AForm.useForm<LoginParams>();

  const {
    formRules: { userName: userNameRules }
  } = useFormRules();

  async function handleSubmit() {
    const params = await form.validateFields();
    toLogin(params);
  }

  return (
    <AForm
      className="pt-24px"
      form={form}
    >
      <AForm.Item
        name="userName"
        rules={userNameRules}
      >
        <Input />
      </AForm.Item>

      <AForm.Item name="password">
        <Input.Password autoComplete="password" />
      </AForm.Item>
      <Space
        className="w-full"
        direction="vertical"
        size={24}
      >
        <SubmitEnterButton
          block
          loading={loading}
          shape="round"
          size="large"
          type="primary"
          onClick={handleSubmit}
        >
          登录
        </SubmitEnterButton>
      </Space>
    </AForm>
  );
};

export const handle = {
  constant: true,
  i18nKey: 'route.(blank)_login',
  title: 'login'
};

export default PwdLogin;
