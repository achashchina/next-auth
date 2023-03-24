import { useState } from 'react';
import Sidebar from '../components/sidebar';

export default function LayoutLoggedinUsers({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (data) => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`h-screen bg-slate-50 rounded-md grid ${menuOpen ? 'lg:grid-cols-[250px_auto]' : 'lg:grid-cols-[50px_auto]'}`}>
      <div className="bg-slate-300">
        <Sidebar menuOpen={menuOpen} handleMenuOpen={handleMenuOpen}></Sidebar>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
