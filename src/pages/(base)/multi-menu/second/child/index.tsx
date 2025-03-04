import { redirect } from 'react-router-dom';

const Child = () => {
  return null;
};

export const handle = {
  i18nKey: 'route.(base)_multi-menu_second_child',
  title: 'multi-menu_second_child'
};

export const loader = () => {
  return redirect('home');
};

export default Child;
