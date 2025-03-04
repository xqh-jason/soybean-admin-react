import { useRoute } from '@/features/router';

const Pid = () => {
  const route = useRoute();

  return <div>{route.params.pid}</div>;
};

export const handle = {
  i18nKey: 'route.(base)_projects_[pid]',
  icon: 'material-symbols-light:attachment',
  title: '(base)_projects_[pid]'
};

export default Pid;
