import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiAtSymbol, HiPhone } from 'react-icons/hi';
import SearchInput from '../components/search-input';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersList } from '../store/customer';
import { setActivePathAction } from '../store/activePage';
import Spinner from '../components/spinner/spinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customerList, isCustomersLoaded } = useSelector(({ customer }) => customer);
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  const cardClassName = 'w-30% h-52 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col p-3';

  useEffect(() => {
    refresh();
  }, [isCustomersLoaded]);

  useEffect(() => {
    dispatch(setActivePathAction('/dashboard'));
  }, []);

  const refresh = async () => {
    dispatch(getCustomersList());
    setCustomers(customerList);
  };

  const selectCustomerHandler = async (id) => {
    router.push({
      pathname: '/customer',
      query: { id },
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

  return !isCustomersLoaded ? (
    <Spinner />
  ) : (
    <div className="flex flex-col">
      <div>
        <SearchInput onSearchHandler={onSearchHandler} />
      </div>
      <div className="flex flex-wrap flex-3 gap-40 mt-7">
        {customers.map((c) => (
          <div key={c._id} className={cardClassName} onClick={() => selectCustomerHandler(c._id)}>
            <div className="my-2 text-cyan-800 font-bold">{`${c.firstName} ${c.lastName}`}</div>
            <div className="my-2 flex flex-col text-left">
              <div className="flex my-1">
                <HiAtSymbol size={20} className="text-slate-700 mr-3 align-middle" />
                {c.email}
              </div>
              <div className="flex my-1">
                <HiPhone size={20} className="text-slate-700 mr-3 align-middle" />
                {c.phone}
              </div>
            </div>
            <div className="my-2">
              <span>Last visit</span>
              <span className="ml-3">Last call</span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
