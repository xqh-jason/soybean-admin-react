import { redirect } from 'react-router-dom';

const Function = () => {
  return null;
};

export const handle = {
  i18nKey: 'route.(base)_function',
  icon: 'icon-park-outline:all-application',
  order: 6,
  title: 'function'
};

export const loader = () => {
  redirect('event-bus');
};

export default Function;
