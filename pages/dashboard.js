import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiViewGridAdd } from 'react-icons/hi';
import SearchInput from '../components/search-input';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersList, selectCustomerAction } from '../store/customer';
import { setActivePathAction } from '../store/activePage';
import Spinner from '../components/spinner/spinner';
import CreateCustomerModal from '../components/modals/create-customer-modal';
import CustomerCard from '../components/customer-card';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customerList, isCustomersLoaded } = useSelector(({ customer }) => customer);
  const [customers, setCustomers] = useState([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const cardClassName = 'w-30% h-52 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col p-3';

  useEffect(() => {
    refresh();
  }, [isCustomersLoaded, customerList.length]);

  useEffect(() => {
    dispatch(setActivePathAction('/dashboard'));
  }, []);

  const refresh = async () => {
    await dispatch(getCustomersList());
    setCustomers(customerList);
  };

  const selectCustomerHandler = async (id) => {
    await dispatch(selectCustomerAction(id));
    router.push({
      pathname: '/customer',
    });
  };

  const onSearchHandler = (searchValue) => {
    const filtredList = customerList.filter(
      (c) =>
        c.firstName.toLocaleLowerCase().includes(searchValue) ||
        c.lastName.toLocaleLowerCase().includes(searchValue) ||
        c.email.toLocaleLowerCase().includes(searchValue) ||
        c.phone.toLocaleLowerCase().includes(searchValue),
    );
    setCustomers(filtredList);
  };

  const addNewCustomerHandler = () => {
    toggleModalWindow();
  };

  const toggleModalWindow = () => {
    setShowModal(!showModal);
  };

  return !isCustomersLoaded ? (
    <Spinner />
  ) : (
    <>
      <div className="flex flex-col">
        <div className="flex w-full">
          <div className="w-11/12">
            <SearchInput onSearchHandler={onSearchHandler} />
          </div>
          <div className="w-1/12 flex justify-center align-middle">
            <button className="font-bold text-cyan-800 rounded inline-flex items-center" onClick={addNewCustomerHandler}>
              <HiViewGridAdd size={25} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap flex-3 gap-40 mt-7">
          {customers.map((c) => (
            <div key={c._id} className={cardClassName} >
              <CustomerCard customer={c} selectCustomer={() => selectCustomerHandler(c._id)}/>
            </div>
          ))}
        </div>
      </div>
      <CreateCustomerModal showModal={showModal} closeModalHandler={toggleModalWindow} refresh={refresh} />
    </>
  );
};

export default Dashboard;

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
