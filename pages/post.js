import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { title, quantity } = router.query;

  const sentence = `${title}: ${quantity}`;

  return <p>{sentence}</p>;
};

export default Post;
