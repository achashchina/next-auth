import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import classes from '../styles/Home.module.css';

const CustomToggle = React.forwardRef((props, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      props.onClick(e);
    }}
    className="no-underline"
  >
    <div className={`${classes.icon} bg-slate-200 p-1 rounded-full text-indigo-700`}>{props.userInitials}</div>
  </a>
));

export const MenuDropdown = (props) => {
  const router = useRouter();

  const onselectMenuItemHandler = (event) => {
    switch (event) {
      case 'signuot':
        signOut();
        break;
      case 'profile':
        router.push('./profile');
        break;

      default:
        break;
    }
  };

  return (
    <Dropdown onSelect={(e) => onselectMenuItemHandler(e)} autoClose="outside">
      <Dropdown.Toggle as={CustomToggle} userInitials={props.userInitials} id="dropdown-custom-components" />

      <Dropdown.Menu>
        <Dropdown.Item eventKey={'profile'}>Profile</Dropdown.Item>
        <Dropdown.Item eventKey={'signuot'}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
