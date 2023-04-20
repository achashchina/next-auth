import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';

const initLoss = {
  id: '',
  date: '',
  lossType: '',
  amount: 0,
  created: {
    createdBy: '',
    createdAt: '',
  },
  modified: {
    modifiedBy: '',
    modifiedAt: '',
  },
  description: '',
};

// {

//   }

const LossItemModal = (props) => {
  const { lossId, editMode, setShowModal } = props;
  const [lossItem, setLossItem] = useState(initLoss);

  const onSubmit = async (values) => {};

  const formik = useFormik({
    initialValues: lossItem,
    enableReinitialize: true,
    onSubmit,
    validate: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLossItem({
      id: '1111',
      date: new Date(),
      lossType: 'Test',
      amount: 3000,
      created: {
        createdBy: 'Test',
        createdAt: new Date(),
      },
      modified: {
        modifiedBy: 'Est',
        modifiedAt: '',
      },
      description: '',
    });
  };

  const onButtonsClickHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-modalBackdrop flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-50">
          <form onSubmit={formik.handleSubmit}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Date</label>
                    <input
                      name="date"
                      type="date"
                      {...formik.getFieldProps('date')}
                      className="shadow appearance-none border outline-none rounded w-full py-2 px-1 text-black"
                    />
                  </div>
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Loss type</label>
                    <input
                      name="lossType"
                      type="text"
                      {...formik.getFieldProps('lossType')}
                      className="shadow appearance-none border outline-none rounded w-full py-2 px-1 text-black"
                    />
                  </div>
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Amount</label>
                    <input
                      name="amount"
                      type="number"
                      {...formik.getFieldProps('amount')}
                      className="shadow appearance-none border outline-none rounded w-full py-2 px-1 text-black"
                    />
                  </div>
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Description</label>
                    <textarea
                      name="description"
                      {...formik.getFieldProps('description')}
                      className="shadow appearance-none outline-none rounded w-full py-2 px-1 text-black"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-left text-xs">{`Created: ${formik.values.created.createdBy}  / ${moment(
                      formik.values.created.createdAt,
                    ).format('D MMMM YYYY')}`}</span>
                    <span className="text-left text-xs">{`Last update:  ${formik.values.modified.modifiedBy} / ${moment(
                      formik.values.modified.modifiedAt,
                    ).format('D MMMM YYYY')}`}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => onButtonsClickHandler(true)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LossItemModal;
