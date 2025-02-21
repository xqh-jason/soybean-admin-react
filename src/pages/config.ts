import { redirect } from 'react-router-dom';

export const config = {
  constant: true,
  i18nKey: 'route.root',
  title: 'root'
};

export const loader = () => {
  return redirect(import.meta.env.VITE_ROUTE_HOME);
};
