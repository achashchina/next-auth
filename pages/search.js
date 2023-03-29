import { getSession } from 'next-auth/react';
import SearchInput from '../components/search-input';

const Search = () => {
  const onSearchHandler = ()=> {}
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
