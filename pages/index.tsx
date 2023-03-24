import Head from 'next/head';
import Link from 'next/link';
import { getSession, useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { useEffect, useState } from 'react';
import LayoutLoggedinUsers from '../layout/loyout-loggedin-users';
import classes from '../styles/Home.module.css';
import { MenuDropdown } from '../components/menu-dropdown';

export default function Home(props: any) {
  const { data: session } = useSession();

  return (
    <div className={classes.container}>
      <Head>
        <title>Home Page</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </Head>

      {session ? User({ session }) : Guest()}
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
function User({ session }: { session: any }) {
  const { t } = useTranslation();
  const { localization, user } = session;
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    const words = user.name.split(' ');
    setUserInitials(`${words[0][0].toLocaleUpperCase()}${words[1] ? words[1][0].toLocaleUpperCase() : ''}`);
    i18n.changeLanguage(localization);
  }, []);

  return (
    <LayoutLoggedinUsers>
      <div className="bg-slate-600 h-12 text-gray-50 header-wrapper px-10">
        <div className="icons w-1/2 h-full flex float-right justify-end items-center">
          <MenuDropdown userInitials={userInitials}></MenuDropdown>
        </div>
      </div>
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold text-indigo-500"> {t('lbl_authUserPage')}</h3>

        <div className="details">
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>

        <div className="flex justify-center mt-3">
          <Link href={'/profile'}>
            <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">{t('lbl_profilePage')}</span>
          </Link>
        </div>

        {t('Welcome to React')}
      </main>
    </LayoutLoggedinUsers>
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
