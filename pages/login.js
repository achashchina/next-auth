import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import LayoutForm from '../layout/layout-form';

export default function Login() {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const onSubmit = async (values) => {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if(status.error) {
      setLoginError(status.error)
    }
    if (status.ok) router.push(status.url);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  const toggleShowHandler = () => {
    setShow(!show);
  };

  const handleGoogleSignin = async () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <LayoutForm>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-rose-400"> {loginError ? loginError: ''} </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input type="email" name="email" placeholder="Email" {...formik.getFieldProps('email')} className={styles.input_text} />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="password"
              {...formik.getFieldProps('password')}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiFingerPrint size={25} onClick={toggleShowHandler} />
            </span>
          </div>

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>
              <Image alt="Google" src={'/assets/google.svg'} width="20" height={20}></Image>
              Sign In with Google
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom} disabled>
              <Image alt="GitHub" src={'/assets/github.svg'} width="25" height={25}></Image>
              Sign In with GitHub
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          don't have an account yet?{' '}
          <Link href={'/register'}>
            {' '}
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </section>
    </LayoutForm>
  );
}
