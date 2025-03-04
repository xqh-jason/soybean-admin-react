import LookForward from '@/components/LookForward';

const HideChildOne = () => {
  return <LookForward />;
};

export const handle = {
  activeMenu: '/function/hide-child',
  hideInMenu: true,
  i18nKey: 'route.(base)_function_hide-child_one',
  icon: 'material-symbols:filter-list-off',
  title: 'function_hide-child_one'
};

export default HideChildOne;
