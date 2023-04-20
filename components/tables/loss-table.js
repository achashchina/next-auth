import moment from 'moment';
import { HiDotsVertical } from 'react-icons/hi';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import ActionsDropdown from '../dropdowns/table-actions-dropdown';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: 'btns',
    cell: (info) => <ActionsDropdown lossId={info.getValue()} />,
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

const LossTable = (props) => {
  const { eventsList } = props;

  const table = useReactTable({
    data: [
      {
        id: '1111',
        date: new Date(),
        lossType: 'Test',
        amount: 3000,
        created: {
          createdBy: 'Test',
          createdAt: new Date(),
        },
        modified: {
          modifiedBy: 'Est',
          modifiedAt: '',
        },
      },
      {
        id: '222',
        date: new Date(),
        lossType: 'Test test',
        amount: 5000,
        created: {
          createdBy: 'Test',
          createdAt: new Date(),
        },
        modified: {
          modifiedBy: 'Est',
          modifiedAt: '',
        },
      },
    ],
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
