const UserManage = () => {
  return <AInput />;
};

export const handle = {
  i18nKey: 'route.manage_user',
  icon: 'ic:round-manage-accounts',
  order: 1,
  roles: ['R_ADMIN'],
  title: 'manage_user'
};

export default UserManage;
