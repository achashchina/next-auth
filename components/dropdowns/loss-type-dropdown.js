import { useState } from 'react';
import { HiDotsVertical, HiOutlineLightBulb, HiOutlinePencil } from 'react-icons/hi';



const LossTypeDropdown = (props) => {
  const { current } = props;
  const [open, setOpen] = useState(false);

  const toggleDropdownHandler = () => {
    setOpen(!open);
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
                  onClick={() => {}}
                >
                  <div className="inline-flex items-center">View</div>
                </button>
              </li>
              <li className="flex items-center">
                <HiOutlinePencil size={20} />
                <button
                  type="button"
                  className="z-20 inline-flex w-full py-2 ml-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {}}
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
    </>
  );
};

export default LossTypeDropdown;
