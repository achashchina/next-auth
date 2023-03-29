import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import classes from '../styles/Form.module.css';

const SearchInput = (props) => {
  const [value, setValue] = useState('');

  const onChangeInputHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    props.onSearchHandler(e.target.value);
  };

  return (
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <HiSearch size={20} />
        </span>
        <span className="sr-only">Search</span>
        <input
          value={value}
          onChange={onChangeInputHandler}
          type="text"
          name="search"
          className={classes.input_text_search}
          placeholder="Search for anything..."
        />
      </label>
  );
};

export default SearchInput;
