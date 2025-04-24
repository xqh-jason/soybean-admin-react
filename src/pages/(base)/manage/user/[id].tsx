import type { DescriptionsProps } from 'antd';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import LookForward from '@/components/LookForward';
import { fetchGetUserList } from '@/service/api';

type Item<T> = T extends any[] ? T[number] : T;

type ValuesOf<T> = T[keyof T];

type Values = ValuesOf<Api.SystemManage.User>;

function transformDataToItem<T extends string, U extends Values>(
  tuple: [T, U]
): NonNullable<Item<DescriptionsProps['items']>> {
  return {
    children: tuple[1],
    key: tuple[0],
    label: tuple[0]
  };
}

// 这个页面仅仅是为了展示 react-router-dom 的 loader 的强大能力，数据是随机的对不上很正常
// This page is solely for demonstrating the powerful capabilities of react-router-dom's loader. The data is random and may not match.

const Component = () => {
  const data = useLoaderData() as Api.SystemManage.User | undefined;

  const { t } = useTranslation();

  if (!data) return <LookForward />;

  const items = Object.entries(data).map(transformDataToItem);

  return (
    <ACard
      className="h-full"
      title="User Info"
    >
      <ADescriptions
        bordered
        items={items}
      />
      <div className="mt-16px text-center text-18px">{t('page.manage.userDetail.explain')}</div>

      <div className="mt-16px text-center text-18px">{t('page.manage.userDetail.content')}</div>
    </ACard>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { data, error } = await fetchGetUserList();
  if (error) return null;

  const info = data.records.find(item => String(item.id) === params.id);
  return info;
}

export default Component;
