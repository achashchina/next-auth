// import './index.css';

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import AddNewVisit from '../add-new-visit';
import CustomDropdown from '../custom-dropdown';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => <span>Customers Name</span>,
    show: false,
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor('phone', {
    cell: (info) => info.getValue(),
    header: () => <span>Phone</span>,
  }),
  columnHelper.accessor((row) => row.visitDate, {
    id: 'visitDate',
    cell: (info) => <span className="w-40">{info.getValue()}</span>,
    header: () => <span>Visit date</span>,
  }),
  columnHelper.accessor('amount', {
    header: () => 'Amount',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('goods', {
    header: () => 'Goods',
    cell: (info) => (
      <ul key={info.renderValue()} role="list" className="marker:text-sky-400 list-disc pl-5 space-y-1">
        {info.renderValue().map((i, index) => (
          <li key={i + index}>{i}</li>
        ))}
      </ul>
    ),
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: (info) => <CustomDropdown visit={info.row.original} />,
  }),
];

const CustomerTable = (props) => {
  const { customer, detailsPage } = props;
  const [data, setData] = useState([]);
  const [colVisible, setColVisible] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const getData = async () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await fetch('/api/visits', options);
    const data = await res.json();
    const customersData = data.response
      .filter((c) => c.customerId === customer._id)
      .map((c) => ({
        ...c,
        visitDate: new Date(c.visitDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      }));
    setData(customersData);
  };

  useEffect(() => {
    const rows = table.getRowModel().rows;
    if (rows.length) {
      setColVisible(rows[0].getVisibleCells());
    }
  }, [table.getRowModel().rows]);

  useEffect(() => {
    getData();

    table.getAllLeafColumns().map((column) => {
      if (detailsPage && (column.id === 'name' || column.id === 'email' || column.id === 'phone')) {
        column.toggleVisibility();
      }
    });
  }, []);

  const addnewVisitHandler = () => {};

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
          {colVisible.map((c, i, arr) => (
            <col key={i} style={{ width: i === arr.length - 1 ? '250px' : '' }} />
          ))}
        </colgroup>

        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={`${row.customerId}${i}`}>
              {row.getVisibleCells().map((cell, index) => (
                <td className="border-r border-b border-t border-slate-300" key={`${cell.customerId}${index}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />

      <button
        className="text-white bg-teal-500 active:bg-teal-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={addnewVisitHandler}
      >
        Add new visit
      </button>

      <div id="accordionExample">
        <div className="rounded-lg border-2 border-teal-500 bg-white">
          <h2 className="mb-0" id="headingOne">
            {/* <button
              className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
              type="button"
              data-te-collapse-init
              data-te-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
              <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button> */}
          </h2>
          <div>
            <div className="py-4 px-20">
              <AddNewVisit customer={customer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
