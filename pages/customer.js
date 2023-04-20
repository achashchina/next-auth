import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../components/customer-card';
import ConfirmationModal from '../components/modals/confirmation-modal';
import Spinner from '../components/spinner/spinner';
import { getCustomersList, selectCustomerAction } from '../store/customer';
import { getEventsList } from '../store/customer-events';
import CustomerEventsTable from '../components/tables/customer-events-table';
import CreateEventModal from '../components/modals/create-event-modal';
import CustomerStatusDropdown from '../components/dropdowns/status-dropdown';

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedCustomer } = useSelector(({ customer }) => customer);

  const { events, isEventsLoaded } = useSelector(({ customerEvents }) =>
   ({...customerEvents, events:  customerEvents.events.filter((ev) => ev.customerId === selectedCustomer?._id)})
  );
  const [customer, setCustomer] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!selectedCustomer) {
      router.push({ pathname: '/dashboard' });
    }
    setCustomer(selectedCustomer);
    refresh();
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
        body: JSON.stringify({ email: customer.email }),
      };

      const res = await fetch('/api/customers', options);
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

  const onAddEventHandler = () => {
    toggleModalWindow();
  };

  const refresh = async () => {
    await dispatch(getEventsList());
  };

  return !customer ? (
    <Spinner />
  ) : (
    <>
      <CustomerCard customer={customer} />
      <CustomerStatusDropdown customer={customer} />

      <div className="flex px-2">
        <button
          className="text-white bg-teal-500 active:bg-teal-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={onAddEventHandler}
        >
          Add new event
        </button>
      </div>

      {isEventsLoaded ? <CustomerEventsTable customer={customer} eventsList={events} /> : ''}
      <CreateEventModal showModal={showModal} closeModalHandler={toggleModalWindow} customer={customer} refresh={refresh} />
      {false ? (
        <div className="w-1/5">
          <button className="font-bold text-pink-600 rounded inline-flex items-center" onClick={toggleModalWindow}>
            Remove Cusomer data <HiPlus className="rotate-45" size={25} />
          </button>
        </div>
      ) : (
        ''
      )}

      <ConfirmationModal showModal={false} setAnswer={onDeleteCustomerCardHandler} />
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
