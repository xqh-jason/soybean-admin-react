import { useRoute } from '@/features/router';

const ProjectsEditId = () => {
  const route = useRoute();

  return (
    <div>
      <div>{route.params.pid}</div>
      <div>{route.params.id}</div>
    </div>
  );
};

export const handle = {
  i18nKey: 'route.(base)_projects_[pid]_edit_[id]',
  title: '(base)_projects_[pid]_edit_[id]'
};

export default ProjectsEditId;
