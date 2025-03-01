import { redirect } from 'react-router-dom';

export const handle = {
  constant: true,
  i18nKey: 'route.multi-menu',
  title: 'multi-menu'
};

export const loader = () => {
  return redirect('first');
};
