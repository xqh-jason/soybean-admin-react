import { redirect } from 'react-router-dom';

const Manage = () => {
  return null;
};

export const handle = {
  constant: true,
  i18nKey: 'route.manage',
  order: 3,
  title: 'manage'
};

export const loader = () => {
  return redirect('user');
};

export default Manage;
