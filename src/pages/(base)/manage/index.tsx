import { redirect } from 'react-router-dom';

const Manage = () => {
  return null;
};

export const handle = {
  i18nKey: 'route.manage',
  icon: 'carbon:cloud-service-management',
  order: 8,
  roles: ['R_ADMIN'],
  title: 'manage'
};

export const loader = () => {
  return redirect('user');
};

export default Manage;
