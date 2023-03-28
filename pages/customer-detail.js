import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CustomerDetail = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.id);
  }, []);
  return <div>CustomerDetail</div>;
};

export default CustomerDetail;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
