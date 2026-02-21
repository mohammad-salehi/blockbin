import React, { useEffect, useState } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';
import { GetMyTime } from '@/functions/getMyTime';
import { timeSince } from '@/functions/timeSince';
import moment from 'jalali-moment'
import { formatSmallNumber } from '@/functions/formatSmallNumber';
import Pagination from '@/components/Pagination/Pagination';
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ExploreProcessor } from '@/functions/ExploreProcessor';
import { GetRequest } from '@/functions/GetRequest';
import { serverAddress } from '@/functions/ServerAddress';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { Networks } from '@/functions/Networks';
const AddressTransactions = ({ TokenTransfered, Miladi, TokenSelected, Transactions }) => {

  const [First, SetFirst] = useState(1)
  const [Loading, SetLoading] = useState(false)

  const params = useParams()

  const query = params.query
  const network = params.network
  const hash = params.hash

  const DateRow = (row) => {
    return (
      <p className='p-0 m-0'>
        {
          row.Date !== null ?
            Miladi === 1 ?
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
          {AddressFormat(row.hash, 8, 'transaction', params.network.toUpperCase(), true)}
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

  const [filteredData, SetFiltredData] = useState([])

  useEffect(() => {
    SetLoading(true)
    let address = '';
    if (TokenSelected === network) {
      if (Networks.find(item => item.symbole === network).type === 'utxo') {
        address = `${serverAddress}/explorer/utxo/address/${hash}/?network=${network}&page_number=${First}&page_size=10&sort_order=ascending`;
      } else {
        address = `${serverAddress}/explorer/evm/address/${hash}/?evm_address_type=main&network=${network}&page_number=${First}&page_size=10&sort_order=ascending`
      }
    } else {
      const token = TokenTransfered?.find((item) => item.symbol === TokenSelected);
      address = `${serverAddress}/explorer/evm/address/${hash}/?contract_address=${token.contract_address}&evm_address_type=tokens&network=${network}&page_number=${First}&page_size=10&sort_field=time&sort_order=ascending`;
    }

    let cancelled = false;
    GetRequest(address)
      .then((response) => {
        console.log(response)
        let raw
        if (TokenSelected === network) {
          raw = ExploreProcessor(hash, response, null) || [];
        } else {
          raw = ExploreProcessor(hash, null, response) || [];
        }

        const rows = raw.map((d) => ({
          Date: d.Time ?? null,
          hash: d.address,
          mode: d.mode,
          symbole: d.currencyType,
          value: d.BTCAmount,
          fee: d.Fee,
        }));

        if (!cancelled) {
          SetFiltredData(rows);
          console.log(rows);
          SetLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          SetLoading(false)
          console.log(err)
        };
      });

    return () => {
      cancelled = true;
    };
  }, [TokenSelected, First, network, hash]);

  useEffect(() => {
    SetFirst(1)
  },[TokenSelected])

  return (
    <div>
      {
        !Loading ?
          <>
            <ExpandableTable
              data={filteredData}          // ← فقط دیتای فیلترشده را بده
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
            <Pagination
              rtl
              totalItems={Transactions}
              pageSize={10}
              currentPage={First}
              onPageChange={
                (e) => {
                  SetFirst(e)
                }
              }
            />
          </>
          :
          <div className='overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark shadow-sm px-2 '>
            <SkeletonLoading />
          </div>
      }

    </div>
  )
}

export default AddressTransactions
