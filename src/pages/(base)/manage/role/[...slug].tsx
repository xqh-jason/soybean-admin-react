import { useRoute } from '@/features/router';

const Component = () => {
  const { params } = useRoute<null, null, { slug: string[] }>();

  console.log(
    params.slug,
    params.slug.find(item => item === '123')
  );

  return <div>Index</div>;
};

export default Component;
