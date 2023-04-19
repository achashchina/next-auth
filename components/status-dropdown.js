import { useState } from 'react';
import {
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineEmojiHappy,
  HiOutlineLightBulb,
  HiOutlinePhoneOutgoing,
  HiPaperClip,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi';

import StatusEnum from '../utils/statusEnum';

const options = [
  { name: 'New', icon: <HiPaperClip className="text-teal-700" size={30} /> },
  { name: 'Email', icon: <HiOutlineMail className="text-teal-700" size={30} /> },
  { name: 'Phone', icon: <HiOutlinePhoneOutgoing className="text-sky-700" size={30} /> },
  { name: 'Offer letter', icon: <HiOutlineDocumentText className="text-amber-700" size={30} /> },
  { name: 'Contract', icon: <HiOutlineEmojiHappy className="text-green-700" size={30} /> },
  { name: 'Orders', icon: <HiOutlineLightBulb className="text-green-700" size={30} /> },
  { name: 'Rejected', icon: <HiOutlineCurrencyDollar className="text-rose-700" size={30} /> },
];

const CustomerStatusDropdown = (props) => {
  const [open, setOpen] = useState(false);
  const { customer } = props;

  const [status, setStatus] = useState(customer.status ? customer.status : 'New');

  const toggleDropdownHandler = () => {
    setOpen(!open);
  };

  const changeStatusHandler = async (newStatus) => {
    toggleDropdownHandler();

    const updatedCustomer = { ...customer, status: newStatus };

    try {
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedCustomer }),
      };

      const res = await fetch('/api/customers', options);
      const data = await res.json();
      setStatus(data.result.status);
    } catch (e) {
      return console.error(e.message);
    }
  };

  const statusBgColor = [
    { name: StatusEnum.new, bg: 'bg-teal-100' },
    { name: StatusEnum.paid, bg: 'bg-cyan-100' },
    { name: StatusEnum.wip, bg: 'bg-amber-100' },
    { name: StatusEnum.done, bg: 'bg-lime-100' },
    { name: StatusEnum.rejected, bg: 'bg-rose-100' },
  ];

  return (
    <div className="flex relative w-full justify-center">
      <button
        className={`w-40 flex items-center py-2.5 px-2 text-sm font-medium text-center text-gray-500  border border-gray-300 rounded-lg ${
          statusBgColor.find((s) => s.name === status)?.bg
        }`}
        type="button"
        onClick={toggleDropdownHandler}
      >
        <span className="mr-3">{options.find((o) => o.name === status)?.icon}</span> {status}
      </button>
      {open ? (
        <div className="absolute top-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
          <ul className=" space-y-1 py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
              <li key={index} className="flex items-center">
                {option.icon}
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => changeStatusHandler(option.name)}
                >
                  <div className="inline-flex items-center">{option.name}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CustomerStatusDropdown;
