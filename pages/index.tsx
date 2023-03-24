import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getSession, useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { useEffect } from 'react';

export default function Home(props: any) {
  const { data: session } = useSession();

  const signoutHandler = () => {
    signOut();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, signoutHandler }) : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={'/login'}>
          <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Sign In</span>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, signoutHandler }: { session: any; signoutHandler: any }) {
  const { t } = useTranslation();
  const { localization } = session;
  
  useEffect(() => {
    i18n.changeLanguage(localization);
  }, [localization]);

  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold text-indigo-500"> {t('lbl_authUserPage')}</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={signoutHandler} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
          {t('lbl_signOut')}
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <Link href={'/profile'}>
          <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">{t('lbl_profilePage')}</span>
        </Link>
      </div>

      {t('Welcome to React')}
    </main>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
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
