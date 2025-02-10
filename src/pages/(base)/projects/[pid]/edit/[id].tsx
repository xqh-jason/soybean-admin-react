import React from 'react';

import { useRoute } from '@/features/router';

const ProjectsEditId = () => {
  const route = useRoute();
  console.log(route, 'route');

  return <div>ProjectsEditId</div>;
};

export default ProjectsEditId;
