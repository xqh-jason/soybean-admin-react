import { redirect } from 'react-router-dom';

export const handle = {
  constant: true,
  i18nKey: 'route.multi-menu_first',
  title: 'multi-menu_first'
};

export const loader = () => {
  return redirect('child');
};
