import { redirect } from 'react-router-dom';

const HideChild = () => {
  return null;
};

export const loader = () => {
  return redirect('one');
};

export default HideChild;
