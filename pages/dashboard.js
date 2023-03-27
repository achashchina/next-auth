import { getSession } from "next-auth/react";

const Dashboard = () => {
  return <div>Dashboard</div>;
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
