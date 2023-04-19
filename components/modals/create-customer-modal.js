import { useFormik } from 'formik';
import { new_customer_validate } from '../../lib/validate';
import { useEffect, useState } from 'react';

const CreateCustomerModal = (props) => {
  const [phone, setPhone] = useState('');
  const [customerError, setCustomerError] = useState('');
  const { showModal, closeModalHandler, refresh } = props;

  const onSubmit = async (values) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, phone }),
    };
    const res = await fetch('/api/customers', options);

    const data = await res.json();
    if (data.error) {
      setCustomerError(data.error);
    }
    if (data.status) {
      closeModalHandler();
      setPhone('');
      setCustomerError('');
      refresh();
      formik.resetForm();
    }
  };

  const onCloseModalButton = () => {
    formik.resetForm();
    closeModalHandler();
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      status: 'New',
    },

    onSubmit,
    validate: new_customer_validate,
  });

  const phoneValueMask = () => {
    if (phone.length > 12) return;
    const x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    const updatedPhone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    setPhone(updatedPhone);
  };

  useEffect(() => {
    phoneValueMask();
  }, [phone]);

  return (
    <>
      {showModal ? (
        <>
          <div className="bg-modalBackdrop flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-50">
              <form onSubmit={formik.handleSubmit}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <span className="text-rose-500 text-xl">{customerError}</span>
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Company</label>
                        <input
                          name="company"
                          {...formik.getFieldProps('company')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">First Name</label>
                        <input
                          name="firstname"
                          {...formik.getFieldProps('firstName')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Last Name</label>
                        <input
                          {...formik.getFieldProps('lastName')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      {formik.errors.name && (formik.touched.company || formik.touched.firstName || formik.touched.lastName) ? (
                        <div className="flex mb-2">
                          <div className="w-1/6"></div>
                          <div className="">
                            <span className="text-rose-500 text-xs">{formik.errors.name}</span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Email</label>
                        <input
                          {...formik.getFieldProps('email')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      {formik.errors.email && formik.touched.email ? (
                        <div className="flex mb-2">
                          <div className="w-1/6"></div>
                          <div className="">
                            <span className="text-rose-500 text-xs">{formik.errors.email}</span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Phone</label>
                        <input
                          placeholder="(000) 000-0000"
                          onChange={(e) => {
                            if (e.target.value.length > 14) return;
                            setPhone(e.target.value);
                          }}
                          value={phone}
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Address</label>
                        <input
                          {...formik.getFieldProps('address')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      {/* <div className="flex mb-2">
                        <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Note</label>
                        <textarea
                          {...formik.getFieldProps('note')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={onCloseModalButton}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CreateCustomerModal;
