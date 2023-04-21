import { useFormik } from 'formik';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { getLossList } from '../../store/loss-list';
import LossTypeDropdown from '../dropdowns/loss-type-dropdown';
import { HiX } from 'react-icons/hi';

const LossItemModal = (props) => {
  const { loss, editMode, setShowModal, isNew = false } = props;
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setShowModal(false);
    if (editMode || !formik.dirty) return;
    try {
      const options = {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          modified: {
            modifiedBy: session.user.name,
            modifiedAt: new Date(),
          },
          created: isNew ? { createdAt: new Date(), createdBy: session.user.name } : { ...values.created },
        }),
      };

      const res = await fetch('/api/pnl/loss', options);
      const data = await res.json();
      if (data.status) {
        dispatch(getLossList());
      }
    } catch (e) {
      return console.error(e.message);
    }
  };

  const formik = useFormik({
    initialValues: isNew
      ? {
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
        }
      : loss,
    enableReinitialize: true,
    onSubmit,
    validate: '',
  });

  const onLossTypeChangeHandler = (value) => {
    formik.setFieldValue('lossType', value);
    formik.setFieldTouched('lossType', true);
  };

  const editable = !editMode ? 'shadow border' : 'bg-gray-100';

  return (
    <>
      <div className="bg-modalBackdrop flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          onClick={() => setShowModal(false)}
          className="absolute h-8 w-8 rounded-full flex justify-center items-center bg-white"
          style={{ top: '24%', right: '23%' }}
        >
          <HiX size={20} />
        </div>
        <div className="relative w-50">
          <form onSubmit={formik.handleSubmit}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Loss type</label>
                    <div className="border w-full bg-white py-2 px-1 rounded">
                      <LossTypeDropdown
                        current={formik.values.lossType}
                        readonly={isNew || !editMode ? false : true}
                        onLossTypeChangeHandler={onLossTypeChangeHandler}
                      />
                    </div>
                    {/* <input
                      name="lossType"
                      type="text"
                      readOnly={editMode}
                      {...formik.getFieldProps('lossType')}
                      className={`${editable} appearance-none outline-none rounded w-full py-2 px-1 text-black`}
                    /> */}
                  </div>
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Amount</label>
                    <input
                      name="amount"
                      type="number"
                      readOnly={editMode}
                      {...formik.getFieldProps('amount')}
                      className={`${editable} appearance-none outline-none rounded w-full py-2 px-1 text-black`}
                    />
                  </div>
                  <div className="flex mb-2">
                    <label className="w-1/4 text-black text-sm font-bold mb-1 items-center flex">Description</label>
                    <textarea
                      readOnly={editMode}
                      name="description"
                      {...formik.getFieldProps('description')}
                      className={`${editable} appearance-none outline-none rounded w-full py-2 px-1 text-black`}
                    />
                  </div>

                  <div className="flex flex-col">
                    {!isNew ? (
                      <>
                        <span className="text-left text-xs">{`Created: ${formik.values.created?.createdBy}  / ${moment(
                          formik.values.created?.createdAt,
                        ).format('LLL')}`}</span>
                        <span className="text-left text-xs">{`Last update:  ${formik.values.modified?.modifiedBy} / ${moment(
                          formik.values.modified?.modifiedAt,
                        ).format('LLL')}`}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                >
                  {editMode || !formik.dirty ? 'CLOSE' : 'SAVE'}
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
