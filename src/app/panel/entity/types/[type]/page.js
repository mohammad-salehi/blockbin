'use client'
import React, { useCallback, useEffect, useState } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import { useParams } from 'next/navigation'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { utcToJalaliIran } from '@/functions/utcToJalali'

const PAGE_SIZE = 10

const Page = () => {
  const params = useParams()
  const type = params?.type

  const [Loading, setLoading] = useState(false)
  const [First, SetFirst] = useState(1)
  const [EntitieNumber, SetEntitieNumber] = useState(0)
  const [Data, SetData] = useState([])
  const [Name, SetName] = useState('')

  const getData = useCallback(() => {
    if (!type) return

    setLoading(true)

    GetRequest(`${serverAddress}/entity/type/`)
      .then((response) => {
        if (response.status !== 200) throw new Error('Failed to load types')

        const getType = [
          { id: null, value: false, label: 'انتخاب نشده', pname: 'انتخاب نشده' },
        ]

        for (let i = 0; i < response.data.results.length; i++) {
          getType.push({
            id: response.data.results[i].id,
            value: response.data.results[i].id,
            label: response.data.results[i].name,
            pname: response.data.results[i].persian_name,
          })
        }

        const found = getType.find((item) => item.label === type)

        if (!found) {
          SetName('')
          SetData([])
          SetEntitieNumber(0)
          setLoading(false)
          return null
        }

        SetName(found.pname)

        const queryParams = {
          limit: PAGE_SIZE,
          offset: (First - 1) * PAGE_SIZE,
          type: found.id,
        }

        return GetRequest(`${serverAddress}/entity/filter-process/`, queryParams)
      })
      .then((response) => {
        if (!response) return

        if (response.status === 200) {
          SetEntitieNumber(response.data.count ?? 0)
          SetData(response.data.results ?? [])
        } else if (response.status === 404) {
          SetData([])
          SetEntitieNumber(0)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        if (err?.response?.status === 404) {
          SetData([])
          SetEntitieNumber(0)
        }
        setLoading(false)
      })
  }, [First, type])

  // ✅ مهم: با تغییر First یا type دوباره دیتا بگیر
  useEffect(() => {
    getData()
  }, [getData])

  const columns = [
    {
      header: 'عنوان',
      accessorKey: 'logo',
      cell: (row) => (
        <a href={`/panel/entity/${row.uuid}`}>
          {row.image !== null ? (
            <img src={row.image} className="w-6 inline-block" />
          ) : (
            <ImageNotSupportedIcon />
          )}
          <span className="mr-2">{row.name}</span>
        </a>
      ),
    },
    {
      header: 'وبسایت',
      accessorKey: 'hash',
      cell: (row) => (
        <div>
          {row.web_site !== null ? (
            <a href={row.web_site}>{row.web_site}</a>
          ) : (
            <span>نامشخص</span>
          )}
        </div>
      ),
    },
    {
      header: 'نام حقوقی',
      accessorKey: 'legal_name',
      cell: (row) => (
        <div className="p-0">
          {row.legal_name !== null ? <p>{row.legal_name}</p> : <span>نامشخص</span>}
        </div>
      ),
    },
    {
      header: 'ریسک',
      accessorKey: 'TokenInfo',
      cell: (row) => (
        <div className="p-0">
          {row.riskscore !== null ? <p>{row.riskscore * 100}%</p> : <span>نامشخص</span>}
        </div>
      ),
    },
    {
      header: 'آخرین به‌روزرسانی',
      accessorKey: 'hash',
      cell: (row) => (
        <div>
          {row.last_modified ? <span>{utcToJalaliIran(row.last_modified)}</span> : 'نامشخص'}
        </div>
      ),
    },
  ]

  return (
    <div>
      <h3 className="text-textColor text-xl mb-1">لیست موجودیت‌های {Name}</h3>

      {!Loading ? (
        <>
          <ExpandableTable
            data={Data}
            columns={columns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />

          <Pagination
            rtl
            totalItems={EntitieNumber}
            pageSize={PAGE_SIZE}
            currentPage={First}
            onPageChange={(page) => {
              SetFirst(page)
            }}
          />
        </>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark shadow-sm px-2 ">
          <SkeletonLoading />
        </div>
      )}
    </div>
  )
}

export default Page
