import { redirect } from 'react-router-dom';

const HideChild = () => {
  return null;
};

export const handle = {
  i18nKey: 'route.function_hide-child',
  icon: 'material-symbols:filter-list-off',
  order: 2,
  title: 'function_hide-child'
};

export const loader = () => {
  redirect('one');
};

export default HideChild;
