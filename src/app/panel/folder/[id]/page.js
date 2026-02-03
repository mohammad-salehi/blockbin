'use client'

import React, { useEffect, useState } from 'react'
import ExpandableTable from "@/components/ExpandableTable/ExpandableTable";
import Pagination from "@/components/Pagination/Pagination";
import { GetRequest } from '@/functions/GetRequest';
import { serverAddress } from '@/functions/ServerAddress';
import { useParams, usePathname, useRouter } from 'next/navigation'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';
import { utcToJalaliIran } from '@/functions/utcToJalali';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Page = () => {

  const params = useParams()

  const uuid = params.id

  const [Name, SetName] = useState('')
  const [LastUpdate, SetLastUpdate] = useState('')
  const [Note, SetNote] = useState('')
  const [Addresses, SetAddresses] = useState([])
  const [Transactions, SetTransactions] = useState([])
  const [Graphs, SetGraphs] = useState([])

  const [addressPage, setAddressPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);
  const [GraphPage, setGraphPage] = useState(1);

  const pageSize = 10;


  const Addresscolumns = [
    {
      header: "آدرس",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {AddressFormat(row.address_hash, 8, 'address', row.network, true)}
        </div>
      ),
    },
    {
      header: "شبکه",
      accessorKey: "logo",
      cell: (row) => (
        <div style={{ direction: "ltr" }}>
          <span className='mr-1'>{row.network}</span>
          <img style={{ width: "24px" }} src={`/images/${row.network}.png`} className='inline-block' />
        </div>
      ),
    },
    {
      header: "ریسک",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {row.risk}
        </div>
      ),
    },
    {
      header: "مالک",
      accessorKey: "logo",
      cell: (row) => (

        row.owner_name ?
          <div>
            {row.owner_name}
          </div>
          :
          <div>
            نامشخص
          </div>


      ),
    },
    {
      header: "موجودی",
      accessorKey: "logo",
      cell: (row) => (
        row.asset_volume ?

          <div>
            {row.asset_volume}<span className='ml-1'>{row.network}</span>
          </div>
          :
          <div>
            نامشخص
          </div>
      ),
    },
    {
      header: "تاریخ افزودن",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {
            utcToJalaliIran(row.date_created)
          }
        </div>
      ),
    },
  ];

  const Transactioncolumns = [
    {
      header: "شناسه تراکنش",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {AddressFormat(row.hash, 8, 'transaction', row.network_symbol, true)}
        </div>
      ),
    },
    {
      header: "شبکه",
      accessorKey: "logo",
      cell: (row) => (
        <div style={{ direction: "ltr" }}>
          <span className='mr-1'>{row.network_symbol}</span>
          <img style={{ width: "24px" }} src={`/images/${row.network_symbol}.png`} className='inline-block' />
        </div>
      ),
    },
    {
      header: "حجم تراکنش",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {row.volume}<span className='ml-1'>{row.network_symbol}</span>
        </div>
      ),
    },
    {
      header: "تاریخ افزودن",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {
            utcToJalaliIran(row.date_created)
          }
        </div>
      ),
    },
  ];

  const Graphcolumns = [
    {
      header: "عنوان",
      cell: (row) => (
        <div>
          <a href={`/panel/tracker/${row.graph_detail.network}/TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG/USDT/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/217`}>
            {row.graph_detail.title}
          </a>
        </div>
      ),
    },
    {
      header: "شبکه",
      accessorKey: "logo",
      cell: (row) => (
        <div style={{ direction: "ltr" }}>
          {row.graph_detail.network}
        </div>
      ),
    },
    {
      header: "توضیحات",
      accessorKey: "logo",
      cell: (row) => (
        <div>
          {row.graph_detail.Description}
        </div>
      ),
    }
  ];
  useEffect(() => {
    GetRequest(`${serverAddress}/case/management/${uuid}/`)
      .then((response) => {
        console.log(response.data.graphs)
        SetName(response.data.case_info.name)
        SetLastUpdate(response.data.case_info.modified_time)
        SetNote(response.data.case_info.note_detail)
        SetAddresses(response.data.addresses)
        SetTransactions(response.data.transactions)
        SetGraphs(response.data.graphs)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const sendValueTextarea = async () => {
    try {
      const response = await axios.put(`${serverAddress}/case/management/${uuid}/`, { note_detail: Note }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`,
        }
      });

      if (response.status === 200) {
        // setShowSuccess(true)
        return toast.success('یادداشت با موفقیت تغییر کرد', {
          position: 'bottom-left'
        })
      }
    } catch (error) {
      // setShowSuccess(false)
    }
  };

  const pagedAddresses = Addresses.slice(
    (addressPage - 1) * pageSize,
    addressPage * pageSize
  );

  const pagedTransactions = Transactions.slice(
    (transactionPage - 1) * pageSize,
    transactionPage * pageSize
  );


  return (
    <div>

      <div className='mt-5 border-b border-boxBorderColor pb-5'>
        <h5 className='text-textColor font-semibold text-xl'>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
            <path opacity="0.5" d="M18 10L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          پرونده {Name}
        </h5>
        <p className='mt-3 text-textColor'>
          آخرین به‌روزرسانی در {LastUpdate !== '' ? utcToJalaliIran(LastUpdate) : ''}
        </p>
      </div>

      <div className='mt-5'>
        <h5 className='text-textColor font-bold text-lg'>
          یادداشت
        </h5>
        <textarea
          value={Note}
          onChange={(e) => { SetNote(e.target.value) }}
          className="border border-boxBorderColor rounded-md mt-2 w-full outline-none px-4 py-2 text-textColor"
        ></textarea>
        <div className="w-full text-left">
          <button
            onClick={() => { sendValueTextarea() }}
            className="bg-primary border border-primary rounded-lg text-bgColor w-full max-w-[150px] py-1 cursor-pointer mt-4"
          >
            ثبت
          </button>
        </div>
      </div>

      <div className='mt-5'>
        <h5 className='text-textColor font-bold text-lg'>
          آدرس‌های افزوده‌شده
        </h5>
        <ExpandableTable
          data={pagedAddresses}
          columns={Addresscolumns}
          rowDetailsMode="row"
          rowDetailsClassName="rounded-xl p-3"
        />
        <Pagination
          rtl
          totalItems={Addresses.length}
          pageSize={pageSize}
          currentPage={addressPage}
          onPageChange={(page) => setAddressPage(page)}
        />


      </div>

      <div className='mt-5'>
        <h5 className='text-textColor font-bold text-lg'>
          تراکنش‌های افزوده‌شده
        </h5>
        <ExpandableTable
          data={pagedTransactions}
          columns={Transactioncolumns}
          rowDetailsMode="row"
          rowDetailsClassName="rounded-xl p-3"
        />
        <Pagination
          rtl
          totalItems={Transactions.length}
          pageSize={pageSize}
          currentPage={transactionPage}
          onPageChange={(page) => setTransactionPage(page)}
        />

      </div>

      <div className='mt-5'>
        <h5 className='text-textColor font-bold text-lg'>
          گراف‌های افزوده‌شده
        </h5>
        <ExpandableTable
          data={Graphs}
          columns={Graphcolumns}
          rowDetailsMode="row"
          rowDetailsClassName="rounded-xl p-3"
        />
        <Pagination
          rtl
          totalItems={Graphs.length}
          pageSize={pageSize}
          currentPage={GraphPage}
          onPageChange={(page) => setGraphPage(page)}
        />
      </div>
    </div>
  )
}

export default Page