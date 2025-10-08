import React from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';
import { GetMyTime } from '@/functions/getMyTime';
import { timeSince } from '@/functions/timeSince';
import moment from 'jalali-moment'
import { formatSmallNumber } from '@/functions/formatSmallNumber';
import Pagination from '@/components/Pagination/Pagination';

const AddressTransactions = () => {


  const DateRow = (row) => {
    return (
      <p className='p-0 m-0'>
        {
          row.Date !== null ?
            true ?
              <span style={{ margin: "0px" }}>{(GetMyTime(row.Date).hour + ':' + GetMyTime(row.Date).minute + ' - ' + moment(GetMyTime(row.Date).year + '-' + GetMyTime(row.Date).month + '-' + GetMyTime(row.Date).day, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))} ({timeSince(row.Date)})</span>
              :
              <span style={{ margin: "0px" }}>{(GetMyTime(row.Date).hour + ':' + GetMyTime(row.Date).minute + ' - ' + GetMyTime(row.Date).year + '/' + GetMyTime(row.Date).month + '/' + GetMyTime(row.Date).day)} ({timeSince(row.Date)})</span>
            :
            <span style={{ margin: "0px" }}>_</span>
        }

      </p>
    );
  };
  const Type = (rowData) => {
    if (rowData.mode) {
      return (
        <div className='py-1 px-2 rounded-2xl m-0 text-TextGreen bg-BgGreen' style={{ textAlign: 'center' }}>
          ورودی
          {/* <CornerLeftDown size={15} style={{ marginRight: "4px" }} /> */}
        </div>
      )
    } else {
      return (
        <div className='py-1 px-2 rounded-2xl m-0 text-TextRed bg-BgRed' style={{ textAlign: 'center' }}>
          خروجی
          {/* <CornerUpRight size={15} style={{ marginRight: "4px" }} /> */}
        </div>
      )
    }
  }
  const TokenInfo = (rowData) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span className='mr-1'>{rowData.symbole !== 'BSC' ? rowData.symbole : 'BNB'}</span>
        <img style={{ width: "24px" }} src={`/images/${rowData.symbole}.png`} className='inline-block' />
      </div>
    )
  }
  const TrValue = (rowData) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span>
          {
            formatSmallNumber(rowData.value)
          }
        </span>

        <small style={{}} className='ml-1'>
          {rowData.symbole !== 'BSC' ? rowData.symbole : 'BNB'}
        </small>
      </div>
    )
  }
  const TrFee = (rowData) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span>
          {
            formatSmallNumber(rowData.fee)
          }
        </span>

        <small style={{}} className='ml-1'>
          {rowData.symbole !== 'BSC' ? rowData.symbole : 'BNB'}
        </small>
      </div>
    )
  }
  const columns = [
    {
      header: "تاریخ",
      accessorKey: "logo",
      cell: (row) => (
        DateRow(row)
      ),
    },
    {
      header: "شناسه تراکنش", accessorKey: "hash",

      cell: (row) => (
        <div>
          {AddressFormat(row.hash, 8, 'transaction', 'TRX', true)}
        </div>
      ),
    },
    {
      header: "نوع", accessorKey: "legal_name",
      cell: (row) => (
        <div className='p-0'>
          {Type(row)}
        </div>
      ),
    },
    {
      header: "نوع ارز", accessorKey: "TokenInfo",
      cell: (row) => (
        <div className='p-0'>
          {TokenInfo(row)}
        </div>
      ),
    },
    {
      header: "حجم تراکنش", accessorKey: "website",
      cell: (row) => (
        <div className='p-0'>
          {TrValue(row)}
        </div>
      ),
    },
    {
      header: "کارمزد", accessorKey: "website",
      cell: (row) => (
        <div className='p-0'>
          {TrFee(row)}
        </div>
      ),
    },
  ];

  const filteredData = [
    {
      Date: 1723849201,
      hash: 'TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG',
      mode: true,
      symbole: 'TRX',
      value: 1422.24,
      fee: 1.25,
    },
    {
      Date: 1723849201,
      hash: 'TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG',
      mode: false,
      symbole: 'TRX',
      value: 1422.24,
      fee: 1.25,
    },
    {
      Date: 1723849201,
      hash: 'TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG',
      mode: true,
      symbole: 'TRX',
      value: 1422.24,
      fee: 1.25,
    },
    {
      Date: 1723849201,
      hash: 'TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG',
      mode: true,
      symbole: 'TRX',
      value: 1422.24,
      fee: 0.00000025,
    },
    {
      Date: 1723849201,
      hash: 'TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG',
      mode: true,
      symbole: 'TRX',
      value: 1422.24,
      fee: 1.25,
    },
  ]
  const First = 0
  return (
    <div>
      <ExpandableTable
        data={filteredData.slice((First * 10), (First * 10) + 10)}          // ← فقط دیتای فیلترشده را بده
        columns={columns}
        rowDetailsMode="row"
        rowDetailsClassName="rounded-xl p-3"
      />
      <Pagination
        rtl
        totalItems={143}
        pageSize={10}
        currentPage={First + 1}
        onPageChange={
          (e) => {
            SetFirst(e - 1)
          }
        }
      />
    </div>
  )
}

export default AddressTransactions
