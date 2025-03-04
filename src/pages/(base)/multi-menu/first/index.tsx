import { redirect } from 'react-router-dom';

export const handle = {
  constant: true,
  i18nKey: 'route.(base)_multi-menu_first',
  title: 'multi-menu_first'
};

export const loader = () => {
  return redirect('child');
};
