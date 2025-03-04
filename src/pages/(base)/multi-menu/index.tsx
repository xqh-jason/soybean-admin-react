import { redirect } from 'react-router-dom';

export const handle = {
  constant: true,
  i18nKey: 'route.(base)_multi-menu',
  order: 5,
  title: 'multi-menu'
};

export const loader = () => {
  return redirect('first');
};
