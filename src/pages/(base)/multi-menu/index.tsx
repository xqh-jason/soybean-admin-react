import { redirect } from 'react-router-dom';

const Layout = () => {
  return null;
};

export const loader = () => {
  return redirect('first');
};

export default Layout;
