import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { register_validate } from '../lib/validate';
import { useRouter } from 'next/router';
import LayoutForm from '../layout/layout-form';

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      cpassword: '',
      email: '',
    },
    onSubmit,
    validate: register_validate,
  });

  const onSubmit = async (values) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    const res = await fetch('/api/auth/signup', options);

    const data = await res.json();
    if (data) router.push('/');
  };

  return (
    <LayoutForm>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-2">Register</h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input type="text" name="Username" placeholder="Username" {...formik.getFieldProps('username')} className={styles.input_text} />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input type="email" name="email" placeholder="Email" {...formik.getFieldProps('email')} className={styles.input_text} />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-500 text-xs">{formik.errors.email}</span> : <></>} */}
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
            <input
              type={`${show.password ? 'text' : 'password'}`}
              name="password"
              placeholder="password"
              {...formik.getFieldProps('password')}
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4" onClick={() => setShow({ ...show, password: !show.password })}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500 text-xs">{formik.errors.password}</span>
          ) : (
            <></>
          )} */}

          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? 'text' : 'password'}`}
              name="cpassword"
              {...formik.getFieldProps('cpassword')}
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4" onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500 text-xs">{formik.errors.cpassword}</span>
          ) : (
            <></>
          )}

          {/* sign up buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account?{' '}
          <Link href={'/login'}>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </p>
      </section>
    </LayoutForm>
  );
}
