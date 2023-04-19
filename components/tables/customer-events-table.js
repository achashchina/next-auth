import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row.eventDate, {
    id: 'eventDate',
    cell: (info) => <span className="w-40">{info.getValue()}</span>,
    header: () => <span>Event date</span>,
  }),
  columnHelper.accessor('note', {
    header: () => 'Notes',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('nextEventDate', {
    header: () => 'Next event date',
    cell: (info) => <span>{info.renderValue()}</span>,
  }),
];

const CustomerEventsTable = (props) => {
  const {  eventsList } = props;

  const table = useReactTable({
    data: eventsList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full border border-slate-200 border-solid">
        <thead className="bg-slate-200 border border-slate-400 border-solid">
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.customerId + index}>
              {headerGroup.headers.map((header, index) => (
                <th className="border-r border-b border-t border-slate-400 py-2" key={`${index}${header.customerId}`}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <colgroup>
          <col style={{ width: '25%' }} />
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
export default CustomerEventsTable;
