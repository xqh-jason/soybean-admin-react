import { useRoute } from '@/features/router';

const ProjectsEditId = () => {
  const route = useRoute();
  console.log(route, 'route');

  return <div>ProjectsEditId</div>;
};

export const handle = {
  i18nKey: 'route.projects_[pid]_[id]',
  title: 'projects_[pid]_[id]'
};

export default ProjectsEditId;
