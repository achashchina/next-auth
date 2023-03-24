const Sidebar = (props) => {
  const handleMenuOpen = () => {
    props.handleMenuOpen();
  };

  return <button onClick={handleMenuOpen}>{props.menuOpen ? 'Close' : 'Open'}</button>;
};

export default Sidebar;
