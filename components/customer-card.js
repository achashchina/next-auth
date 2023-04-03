import { HiAtSymbol, HiPhone } from 'react-icons/hi';

const CustomerCard = (props) => {
  const { customer } = props;
  return (
    <>
      <div className="my-2 text-cyan-800 font-bold">{`${customer.firstName} ${customer.lastName}`} </div>
      <div className="my-2 flex flex-col text-left">
        <div className="flex my-1">
          <HiAtSymbol size={20} className="text-slate-700 mr-3 align-middle" />
          {customer.email}
        </div>
        <div className="flex my-1">
          <HiPhone size={20} className="text-slate-700 mr-3 align-middle" />
          {customer.phone}
        </div>
      </div>
      <div className="my-2">
        {/* <span>Last visit</span>
              <span className="ml-3">Last call</span> */}
      </div>
    </>
  );
};

export default CustomerCard;
