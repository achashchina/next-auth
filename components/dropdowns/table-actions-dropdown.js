import { useState } from 'react';
import { HiDotsVertical, HiOutlineLightBulb, HiOutlinePencil } from 'react-icons/hi';
import LossItemModal from '../modals/loss-item-modal';

const ActionsDropdown = (props) => {
  const { lossId } = props;
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleDropdownHandler = () => {
    setOpen(!open);
  };

  const openLossModal = (mode) => {
    setEditMode(mode)
    toggleDropdownHandler();
    setShowModal(true);
  };

  return (
    <>
      <div className="flex relative w-full justify-center">
        <button
          className={`flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-500 rounded-lg`}
          type="button"
          onClick={toggleDropdownHandler}
        >
          <HiDotsVertical />
        </button>
        {open ? (
          <div className="absolute left-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 z-20">
              <li className="flex items-center">
                <HiOutlineLightBulb size={20} />
                <button
                  type="button"
                  className="z-20 inline-flex w-full py-2 ml-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={()=> openLossModal(false)}
                >
                  <div className="inline-flex items-center">View</div>
                </button>
              </li>
              <li className="flex items-center">
                <HiOutlinePencil size={20} />
                <button
                  type="button"
                  className="z-20 inline-flex w-full py-2 ml-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={()=> openLossModal(true)}
                >
                  <div className="inline-flex items-center">Edit</div>
                </button>
              </li>
            </ul>
            <div onClick={() => setOpen(false)} className="fixed left-0 top-0 h-full w-full z-10"></div>
          </div>
        ) : (
          ''
        )}
      </div>
      {showModal ? <LossItemModal editMode={editMode} lossId={lossId} setShowModal={setShowModal}/> : <></>}
    </>
  );
};

export default ActionsDropdown;
