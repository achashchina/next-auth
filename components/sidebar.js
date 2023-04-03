import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiHome, HiViewList, HiSearch, HiUserGroup, HiChat } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
  const { pathname } = useSelector(({ activePage }) => activePage);
  const [activeTab, setActiveTab] = useState();

  const { menuOpen } = props;

  useEffect(() => {
    setActiveTab(pathname.replace('/', ''));
  }, [pathname]);

  const handleMenuOpen = () => {
    props.handleMenuOpen();
  };

  const toggleIcon = menuOpen ? <HiChevronDoubleLeft color="white" size={25} /> : <HiChevronDoubleRight color="white" size={25} />;
  const linkClassName = `text-gray-50 no-underline hover:text-gray-50 py-2 flex align-middle ${
    menuOpen ? 'justify-start pl-2' : 'justify-center'
  }`;

  const liClassName = `hover:bg-slate-50`;
  const textGradient = 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 pl-1';

  return (
    <div className="flex flex-col">
      <button className="bg-grey-light font-bold py-4 px-4 rounded inline-flex items-center text-te" onClick={handleMenuOpen}>
        {toggleIcon}
      </button>
      <ul className="text-gray-50 pl-0">
        <li className={`${liClassName} ${activeTab === '' ? 'bg-slate-50' : ''}`}>
          <Link href={'/'} className={linkClassName}>
            <HiHome className={!activeTab === '' ? 'text-slate-50' : 'text-teal-500'} size={25} />{' '}
            {menuOpen && <span className={textGradient}>Home</span>}
          </Link>
        </li>
        <li className={`${liClassName} ${activeTab === 'dashboard' ? 'bg-slate-50' : ''}`}>
          <Link href={'dashboard'} className={linkClassName}>
            <HiViewList className={!activeTab === '' ? 'text-slate-50' : 'text-teal-500'} size={25} />{' '}
            {menuOpen && <span className={textGradient}>Dashboard</span>}
          </Link>
        </li>
        <li className={`${liClassName} ${activeTab === 'search' ? 'bg-slate-50' : ''}`}>
          <Link href={'search'} className={linkClassName}>
            <HiSearch className={!activeTab === '' ? 'text-slate-50' : 'text-teal-500'} size={25} />{' '}
            {menuOpen && <span className={textGradient}>Search</span>}
          </Link>
        </li>
        {/* <li className="hover:bg-slate-400">
          <Link href={'messenger'} className={liClassName}>
            <HiChat className={!activeTab === '' ? 'text-slate-50' : 'text-teal-500'} size={25} /> {menuOpen && <span className={textGradient}>Messenger</span>}
          </Link>
        </li> */}
        <li className={`${liClassName} ${activeTab === 'contact-us' ? 'bg-slate-50' : ''}`}>
          <Link href={'contact-us'} className={linkClassName}>
            <HiUserGroup className={!activeTab === '' ? 'text-slate-50' : 'text-teal-500'} size={25} />{' '}
            {menuOpen && <span className={textGradient}>Contact Us</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
