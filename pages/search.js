import { getSession } from "next-auth/react";

const Search = () => {
  return <div>Search</div>;
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
