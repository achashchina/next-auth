import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../components/customer-card';
import ConfirmationModal from '../components/modals/confirmation-modal';
import Spinner from '../components/spinner/spinner';
import { getCustomersList, selectCustomerAction } from '../store/customer';

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedCustomer } = useSelector(({ customer }) => customer);
  const [customer, setCustomer] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(!selectedCustomer) {
      router.push({ pathname: '/dashboard' });
    }
    setCustomer(selectedCustomer);
    return () => {
      dispatch(selectCustomerAction(null));
    };
  }, []);

  const onDeleteCustomerCardHandler = async (answer) => {
    toggleModalWindow();
    if (answer) {
      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: selectedCustomer.email}),
      };

      const res = await fetch('/api/remove-customer', options);
      const data = await res.json();
      if (data.status) {
        await dispatch(getCustomersList());
        router.push({ pathname: '/dashboard' });
      }
    }
  };

  const toggleModalWindow = () => {
    setShowModal(!showModal);
  };

  return !customer ? (
    <Spinner />
  ) : (
    <>
      <CustomerCard customer={customer} />
      <div className="w-1/5">
        <button className="font-bold text-pink-600 rounded inline-flex items-center" onClick={toggleModalWindow}>
          Remove Cusomer data <HiPlus className="rotate-45" size={25} />
        </button>
      </div>

      <ConfirmationModal showModal={showModal} setAnswer={onDeleteCustomerCardHandler} />
    </>
  );
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
