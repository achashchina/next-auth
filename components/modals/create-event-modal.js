import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { getEventsList } from '../../store/customer-events';

const CreateEventModal = (props) => {
  const { showModal, closeModalHandler, customer, refresh } = props;
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
   
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    };

    const res = await fetch('/api/customers/events', options);

    const data = await res.json();
    if (data.error) {
      setCustomerError(data.error);
    }
    if (data.status) {
      refresh()
      // await dispatch(getEventsList());
      onCloseModalButton();
    }
  };

  const onCloseModalButton = () => {
    formik.resetForm();
    closeModalHandler();
  };

  const formik = useFormik({
    initialValues: {
      customerId: customer._id,
      eventDate: new Date().toISOString(),
      note: '',
      nextEventDate: '',
    },

    onSubmit,
    validate: '',
  });

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
                      <div className="flex mb-2">
                        <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Date</label>
                        <input
                          name="eventDate"
                          type="date"
                          {...formik.getFieldProps('eventDate')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      <div className="flex mb-2">
                        <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Note</label>
                        <textarea
                          {...formik.getFieldProps('note')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
                      <div className="flex mb-2">
                        <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Next Event Date</label>
                        <input
                          name="nextEventDate"
                          type="date"
                          {...formik.getFieldProps('nextEventDate')}
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        />
                      </div>
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

export default CreateEventModal;
