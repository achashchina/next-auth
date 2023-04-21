import moment from 'moment';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import ActionsDropdown from '../dropdowns/table-actions-dropdown';
import { useEffect } from 'react';
import { getLossList } from '../../store/loss-list';
import { useDispatch, useSelector } from 'react-redux';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row, {
    id: 'btns',
    cell: (info) => <ActionsDropdown loss={info.getValue()} />,
    header: () => <span></span>,
  }),
  columnHelper.accessor((row) => row.date, {
    id: 'date',
    cell: (info) => <span>{moment(info.getValue()).format('D MMMM YYYY')}</span>,
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor('lossType', {
    header: () => 'Loss type',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('amount', {
    header: () => 'Amount',
    cell: (info) => <span>{info.renderValue()}</span>,
  }),
];

const LossTable = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(({ lossList }) => lossList);

  useEffect(() => {
    getData();
  }, [list.length]);

  const getData = async () => {
    await dispatch(getLossList());
  };

  const table = useReactTable({
    data: list ? list : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
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
          <col style={{ width: '50%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>

        <tbody>
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
  );
};
export default LossTable;
