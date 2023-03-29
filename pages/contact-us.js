import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePathAction } from '../store/activePage';

const ContactUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePathAction('/contact-us'));
  }, []);

  return <div>ContactUs</div>;
};

export default ContactUs;

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
