import { useRoute } from '@/features/router';

const Pid = () => {
  const route = useRoute();

  return <div>{route.params.pid}</div>;
};

export default Pid;
