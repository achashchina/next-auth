import { useEffect, useState } from 'react';
import LossEnum from '../../utils/lossEnum';

const LossTypeDropdown = (props) => {
  const { current, readonly = true, onLossTypeChangeHandler } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setOptions(Object.values(LossEnum));
    const selectedValue = Object.values(LossEnum).find((o) => o.code === +current);
    setSelected(selectedValue ? selectedValue : { value: '', code: '' });
  }, [current]);

  const toggleDropdownHandler = () => {
    if (readonly) return;
    setOpen(!open);
  };

  const onOptionSelectHandler = (option) => {
    setSelected(option);
    setOpen(!open);
    onLossTypeChangeHandler(option.code)
  };

  return (
    <>
      <div className="flex relative w-full justify-center">
        <button
          className={`flex w-full items-center py-2.5 px-2 font-medium text-center text-gray-500 rounded-lg`}
          type="button"
          onClick={toggleDropdownHandler}
        >
          {selected.value ? ` ${selected.value} (${selected.code})` : ''}
        </button>
        {open ? (
          <div className="absolute left-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
            <ul className="py-2 pl-4 text-gray-700 z-20">
              {options.map((option) => (
                <li key={option.code} className="flex">
                  <button
                    type="button"
                    className="z-20 inline-flex w-full py-2 ml-3  text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onOptionSelectHandler(option);
                    }}
                  >
                    <div className="inline-flex text-start">
                      {option.value} ({option.code})
                    </div>
                  </button>
                </li>
              ))}
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
