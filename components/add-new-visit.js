import {  useFormik } from 'formik';
import StatusEnum from '../utils/statusEnum';
import CustomDropdown from './custom-dropdown';

const AddNewVisit = (props) => {
  const { customer } = props;

  const onSubmit = async (values) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    // const res = await fetch('/api/new-customer', options);

    // const data = await res.json();
    // if (data) {
    //   closeModalHandler();
    //   refresh();
    //   formik.resetForm();
    // }
  };

  const formik = useFormik({
    initialValues: {
      customerId: customer._id,
      visitDate: new Date().toISOString(),
      amount: 0,
      email: customer.email,
      phone: customer.phone,
      goods: [],
      status: StatusEnum.new,
    },

    onSubmit,
  });

  const updateStatusHandler = async(status) => {
    await formik.setFieldValue('status', status)
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="relative p-6 flex-auto">
          <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
            <div className="flex mb-2">
              <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Date</label>
              <input
                type="date"
                name="visitDate"
                {...formik.getFieldProps('visitDate')}
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
              />
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Email</label>
              <input {...formik.getFieldProps('email')} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Phone</label>
              <input {...formik.getFieldProps('phone')} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Amount</label>
              <input
                {...formik.getFieldProps('amount')}
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
              />
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 text-black text-sm font-bold mb-1 items-center flex">Status</label>
              <CustomDropdown visit={formik.initialValues} isNew={true} updateStatus={updateStatusHandler} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewVisit;
