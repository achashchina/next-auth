import { useState } from 'react';
import Sidebar from '../components/sidebar';
import { MenuDropdown } from '../components/menu-dropdown';
import { useSession } from 'next-auth/react';


export default function MainLayout({ children }) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (data) => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`h-screen bg-slate-50 rounded-md grid ${menuOpen ? 'lg:grid-cols-[250px_auto]' : 'lg:grid-cols-[70px_auto]'}`}>
      <div className="bg-slate-700 z-10">
        <Sidebar menuOpen={menuOpen} handleMenuOpen={handleMenuOpen}></Sidebar>
      </div>
      <div className="flex flex-col">
        <div className="bg-slate-50 shadow-[0px_14px_20px_0px_#cbd5e0] h-12 text-slate-700 header-wrapper px-10">
          <div className="icons w-1/2 h-full flex float-right justify-end items-center">
            {session ? <MenuDropdown session={session}></MenuDropdown> : ''}
          </div>
        </div>
        <main className="mx-0 text-center px-10 mt-2">{children}</main>
      </div>
    </div>
  );
}
