import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/spinner/spinner';

const CustomerDetail = () => {
  const router = useRouter();
  const { customerList } = useSelector(({ customer }) => customer);
  const [customer, setCustomer] = useState();

  useEffect(() => {
    setCustomer(customerList.find((c) => c._id === router.query.id));
  }, []);
  return !customer ? <Spinner /> : <div>{customer.firstName}</div>;
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
