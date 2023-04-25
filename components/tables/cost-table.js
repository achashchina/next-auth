import moment from 'moment';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import ActionsDropdown from '../dropdowns/table-actions-dropdown';
import { useEffect, useState } from 'react';
import { getCostList } from '../../store/cost-list';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import SearchInput from '../search-input';
import { HiViewGridAdd } from 'react-icons/hi';
import LossItemModal from '../modals/loss-item-modal';
import CostItemModal from '../modals/cost-item-modal';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row, {
    id: 'btns',
    cell: (info) => <ActionsDropdown loss={info.getValue()} />,
    header: () => <span></span>,
  }),
  columnHelper.accessor((row) => row.created.createdAt, {
    id: 'date',
    cell: (info) => <span>{moment(info.getValue()).format('MMMM')}</span>,
    header: () => <span>Period</span>,
  }),
  columnHelper.accessor('description', {
    header: () => 'Description',
    cell: (info) => <span>{info.renderValue()}</span>,
  }),
];

const CostTable = () => {
  const dispatch = useDispatch();
  const [filtredData, setFiltredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { list } = useSelector(({ costList }) => costList);

  useEffect(() => {
    getData();
  }, [JSON.stringify(list)]);

  const getData = async () => {
    await dispatch(getCostList());
    setFiltredData(list);
  };

  const table = useReactTable({
    data: filtredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSearchHandler = (searchValue) => {
    const filtred = list.filter(
      (item) => true,
    );
    setFiltredData(filtred);
  };

  const onAddNewCostHandler = () => {
    setShowModal(true);
  };

  return !list ? (
    <Spinner />
  ) : (
    <div className="flex flex-col">
      <div className="flex w-full">
        <div className="w-11/12">
          <SearchInput onSearchHandler={onSearchHandler} />
        </div>
        <div className="w-1/12 flex justify-end align-middle">
          <button className="font-bold text-cyan-800 rounded inline-flex items-center" onClick={onAddNewCostHandler}>
            <HiViewGridAdd size={25} />
          </button>
        </div>
      </div>
      <div className="py-2">
        <table className="w-full border border-slate-200 border-solid">
          <thead className="bg-slate-100 border border-slate-200 border-solid">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={headerGroup.customerId + index}>
                {headerGroup.headers.map((header, index) => (
                  <th className="border-r border-b border-t border-slate-300 py-2" key={`${index}${header.customerId}`}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>

          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, i) => (
              <tr key={`${row.customerId}${i}`}>
                {row.getVisibleCells().map((cell, index) => (
                  <td className="border-r border-b border-t border-slate-300 py-2 px-4" key={`${cell.customerId}${index}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
      </div>
      {showModal ? <CostItemModal editMode={false} setShowModal={setShowModal} isNew={true} /> : <></>}
    </div>
  );
};
export default CostTable;
