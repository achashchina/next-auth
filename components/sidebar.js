import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiHome, HiViewList, HiSearch, HiUserGroup, HiChat } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
  const { pathname } = useSelector(({ activePage }) => activePage);
  const [activeTab, setActiveTab] = useState();
  

  const { menuOpen } = props;

  useEffect(()=> {setActiveTab(pathname.replace('/','')); }, [pathname])

  const handleMenuOpen = () => {
    props.handleMenuOpen();
  };

  const toggleIcon = menuOpen ? <HiChevronDoubleLeft color="white" size={25} /> : <HiChevronDoubleRight color="white" size={25} />;
  const linkClassName = `text-gray-50 no-underline hover:text-gray-50 py-2 flex align-middle ${
    menuOpen ? 'justify-start pl-2' : 'justify-center'
  }`;

  const liClassName = `hover:bg-slate-400`

  return (
    <div className="flex flex-col">
      <button className="bg-grey-light font-bold py-4 px-4 rounded inline-flex items-center" onClick={handleMenuOpen}>
        {toggleIcon}
      </button>
      <ul className="text-gray-50 pl-0">
        <li className={`${liClassName} ${activeTab === '' ? 'bg-slate-400': ''}`}>
          <Link href={'/'} className={linkClassName}>
            <HiHome color="white" size={25} /> {menuOpen && <span className="pl-1">Home</span>}
          </Link>
        </li>
        <li className={`${liClassName} ${activeTab === 'dashboard' ? 'bg-slate-400': ''}`}>
          <Link href={'dashboard'} className={linkClassName}>
            <HiViewList color="white" size={25} /> {menuOpen && <span className="pl-1">Dashboard</span>}
          </Link>
        </li>
        <li className={`${liClassName} ${activeTab === 'search' ? 'bg-slate-400': ''}`}>
          <Link href={'search'} className={linkClassName}>
            <HiSearch color="white" size={25} /> {menuOpen && <span className="pl-1">Search</span>}
          </Link>
        </li>
        {/* <li className="hover:bg-slate-400">
          <Link href={'messenger'} className={liClassName}>
            <HiChat color="white" size={25} /> {menuOpen && <span className="pl-1">Messenger</span>}
          </Link>
        </li> */}
        <li className={`${liClassName} ${activeTab === 'contact-us' ? 'bg-slate-400': ''}`}>
          <Link href={'contact-us'} className={linkClassName}>
            <HiUserGroup color="white" size={25} /> {menuOpen && <span className="pl-1">Contact Us</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
