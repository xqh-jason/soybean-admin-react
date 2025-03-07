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

export default ProjectsEditId;
