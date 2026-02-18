import React, { useEffect, useState } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';

import { formatSmallNumber } from '@/functions/formatSmallNumber';
import Pagination from '@/components/Pagination/Pagination';
import { useParams } from 'next/navigation'
import { GetRequest } from '@/functions/GetRequest';
import { serverAddress } from '@/functions/ServerAddress';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { AccountBaseTr } from '@/functions/ExploreProcessor';
import { Networks } from '@/functions/Networks';
const EvmTable = ({ SetTotalUSDValue }) => {

  const [First, SetFirst] = useState(1)
  const [Loading, SetLoading] = useState(false)

  const params = useParams()

  const query = params.query
  const network = params.network
  const hash = params.hash


  const TokenInfo = (rowData) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span className='mr-1'>{rowData.Token !== 'BSC' ? rowData.Token : 'BNB'}</span>
        <img style={{ width: "24px" }} src={`/images/${rowData.Token}.png`} className='inline-block' />
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
          {rowData.Token !== 'BSC' ? rowData.Token : 'BNB'}
        </small>

      </div>
    )
  }

  const columns = [
    {
      header: "مبدا",
      accessorKey: "logo",
      cell: (row) => (
        <div>

          {AddressFormat(row.from.address, 8, 'address', 'TRX', true)}
          <span>
        {
          row.from.entity.name ?
            <a href={`/panel/entity/${row.from.entity.uuid}`} className='mr-1 bg-BgGreen text-TextGreen px-2 rounded-lg cursor-pointer' >
              {row.from.entity.name}
            </a>
          :
          null
        }
        </span>
        </div>
      ),
    },
    {
      header: "مقصد", accessorKey: "hash",

      cell: (row) => (
        <div>

        {AddressFormat(row.to.address, 8, 'address', 'TRX', true)}
        <span>
        {
          row.to.entity.name ?
            <a href={`/panel/entity/${row.to.entity.uuid}`} className='mr-1 bg-BgRed text-TextRed px-2 rounded-lg cursor-pointer' >
              {row.to.entity.name}
            </a>
          :
          null
        }
        </span>

      </div>
      ),
    },
    {
      header: "نوع ارز", accessorKey: "legal_name",
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
  ];

  const [filteredData, SetFiltredData] = useState([])

  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/explorer/evm/transaction/${hash}/?network=${network}&page_number=1&page_size=100&transaction_type=ALL`)
      .then((response) => {
        console.log(response)
        const Trlist = (AccountBaseTr(response.data.data.result, network, Networks.find(item => item.symbole === network).name).transfers)
        const getData = []
        for (let i = 0; i < Trlist.length; i++) {
          getData.push(
            {
              value: Trlist[i].amount,
              from: Trlist[i].from,
              to: Trlist[i].to,
              Token: Trlist[i].currencyType,
            }
          )
        }
        console.log(getData)
        SetFiltredData(getData)
        SetLoading(false)
        let sum = 0
        for (let i = 0; i < response.data.data.result.logs.length; i++) {
          sum = sum + response.data.data.result.logs[i].ValueInDollor
        }
        sum = sum + response.data.data.result.value_in_dollor
        SetTotalUSDValue(sum)
      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
      })
  }, [])

  return (
    <div>
      {
        !Loading ?
          <>
            <ExpandableTable
              data={filteredData}
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
            <Pagination
              rtl
              totalItems={filteredData.length}
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

export default EvmTable
