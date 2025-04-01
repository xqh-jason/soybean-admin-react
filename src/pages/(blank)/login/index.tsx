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

const INITIAL_VALUES = {
  password: '123456',
  userName: '0141'
};

const PwdLogin = () => {
  const { t } = useTranslation();

  const { loading, toLogin } = useInitAuth();

  const [form] = AForm.useForm<LoginParams>();

  const {
    formRules: { pwd, userName: userNameRules }
  } = useFormRules();

  async function handleSubmit() {
    const params = await form.validateFields();
    toLogin(params);
  }

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
        initialValues={INITIAL_VALUES}
      >
        <AForm.Item
          name="userName"
          rules={userNameRules}
        >
          <Input />
        </AForm.Item>

        <AForm.Item
          name="password"
          rules={pwd}
        >
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
            {t('common.confirm')}
          </SubmitEnterButton>
        </Space>
      </AForm>
    </>
  );
};

export const handle = {
  constant: true,
  i18nKey: 'route.(blank)_login',
  title: 'login'
};

export default PwdLogin;
