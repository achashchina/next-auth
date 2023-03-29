import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchInput from '../components/search-input';
import { setActivePathAction } from '../store/activePage';

const Search = () => {
  const dispatch = useDispatch();
  const onSearchHandler = ()=> {}

  useEffect(() => {
    dispatch(setActivePathAction('/search'));
  }, []);

  return (
    <>
      <div>Search</div>
      <SearchInput onSearchHandler={onSearchHandler} />
    </>
  );
};

export default Search;

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
