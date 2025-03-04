const UserManage = () => {
  return <AInput />;
};

export const handle = {
  i18nKey: 'route.(base)_manage_user',
  icon: 'ic:round-manage-accounts',
  order: 1,
  roles: ['R_ADMIN'],
  title: 'manage_user'
};

export default UserManage;
