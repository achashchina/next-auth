import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActivePathAction } from '../store/activePage';
import LossComponent from '../components/pnl/loss/loss';
import CostComponent from '../components/pnl/loss/cost';

const tabs = [
  {
    label: `Loss`,
    value: 'loss',
    desc: ``,
  },
  {
    label: `Cost`,
    value: 'cost',
    desc: ``,
  },
];

const Manufacture = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('loss');
  const [activeTabStyle, setActiveTabStyle] = useState({ transition: 'left 0.51s ease', left: 0 });

  useEffect(() => {
    dispatch(setActivePathAction('/manufacture'));
  }, []);

  const setActiveTabHandler = (tab) => {
    setActiveTab(tab);
    setActiveTabStyle((current) => ({ ...current, left: tab === 'loss' ? '0' : '50%' }));
  };

  return (
    <>
      <div>Manufacture</div>
      <ul className="flex relative bg-slate-300  bg-opacity-50 rounded-lg p-1">
        {tabs.map(({ label, value }) => (
          <li
            role="tab"
            className="flex-1 grid place-items-center text-center w-full h-full relative bg-transparent p-1 text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer"
            key={value}
            value={value}
            onClick={() => setActiveTabHandler(value)}
          >
            <div className="z-20">{t(label)}</div>
          </li>
        ))}
        <div className="absolute top-0 left-0 right-0 z-10 h-full w-1/2 bg-white rounded-md shadow" style={activeTabStyle}></div>
      </ul>
      <div className="w-full h-max text-gray-700 p-4 antialiased font-sans text-base font-light leading-relaxed">
        {activeTab === 'loss' ? <div><LossComponent/></div> : <div><CostComponent/></div>}
      </div>
    </>
  );
};

export default Manufacture;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
