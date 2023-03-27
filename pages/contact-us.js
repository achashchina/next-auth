import { getSession } from "next-auth/react";

const ContactUs = () => {
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
