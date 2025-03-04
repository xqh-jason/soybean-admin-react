import { redirect } from 'react-router-dom';

const Second = () => {
  return null;
};

export const handle = {
  i18nKey: 'route.(base)_multi-menu_second',
  title: 'multi-menu_second'
};

export const loader = () => {
  return redirect('child');
};

export default Second;
