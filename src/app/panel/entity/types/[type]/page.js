'use client'
import React, { useState, useEffect, useCallback } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import { useParams } from 'next/navigation'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { utcToJalaliIran } from '@/functions/utcToJalali'
import Switch from '@mui/material/Switch'  // وارد کردن سوییچ از MUI

const PAGE_SIZE = 10

const Page = () => {
  const params = useParams()
  const type = params?.type

  const [Loading, setLoading] = useState(false)
  const [First, SetFirst] = useState(1)
  const [EntitieNumber, SetEntitieNumber] = useState(0)
  const [TotalPages, SetTotalPages] = useState(0)
  const [Data, SetData] = useState([])
  const [Name, SetName] = useState('')
  const [IsIranianFilter, SetIsIranianFilter] = useState(true)  // فیلتر ایرانی بودن

  const getData = useCallback(() => {
    if (!type) return

    setLoading(true)

    // پارامترهای ریکوئست طبق نیاز شما
    const queryParams = {
      page_number: First,
      page_size: PAGE_SIZE,
      category: type,
      ...(IsIranianFilter === false && { is_iranian: true }),  // اگر فیلتر ایرانی بودن انتخاب شده باشد، آن را به ریکوئست اضافه می‌کنیم
    }

    // ارسال ریکوئست با پارامترهای صحیح
    GetRequest(`${serverAddress}/entity/entities/`, queryParams)
      .then((response) => {
        if (response.status !== 200) throw new Error('Failed to load entities')

        const entities = response.data.data?.entities ?? []
        SetEntitieNumber(entities.length)
        SetData(entities)

        if (entities.length > 0) {
          SetName(entities[0].category.persian_name || 'موجودیت‌ها')
        }

        const totalPages = Math.ceil(response.data.data?.count)
        SetTotalPages(totalPages)

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [First, type, IsIranianFilter])

  useEffect(() => {
    getData()
  }, [getData])

  const handlePageChange = (page) => {
    SetFirst(page)
  }

  const handleIranianFilterChange = (event) => {
    SetIsIranianFilter(event.target.checked ? true : false)  // برای سوییچ ایرانی بودن، true برای ایرانی و null برای همه
  }

  const nowrapCell = 'whitespace-nowrap overflow-hidden text-ellipsis'
  const maxCell = 'max-w-[240px]'

  const columns = [
    {
      header: 'نام',
      accessorKey: 'name',
      cell: (row) => (
        <a
          href={`/panel/entity/${row.id}`}
          className="flex items-center gap-2 min-w-0 whitespace-nowrap overflow-hidden"
        >
          {row.image ? (
            <img src={row.image} className="w-6 h-6 shrink-0 inline-block" alt="" />
          ) : (
            <ImageNotSupportedIcon className="shrink-0" />
          )}

          <span className="min-w-0 overflow-hidden text-ellipsis" title={row.name}>
            {row.name}
          </span>
        </a>
      ),
    },
    {
      header: 'ریسک',
      accessorKey: 'riskscore',
      cell: (row) => (
        <div className="whitespace-nowrap">
          {row.riskscore !== null ? <span>{(row.riskscore * 100).toFixed(2)}%</span> : <span>نامشخص</span>}
        </div>
      ),
    },
    {
      header: 'کشور',
      accessorKey: 'country',
      cell: (row) => <div className={nowrapCell}>{row.country || 'نامشخص'}</div>,
    },
    {
      header: 'آخرین به‌روزرسانی',
      accessorKey: 'last_modified',
      cell: (row) => (
        <div className="whitespace-nowrap" title={row.last_modified ? utcToJalaliIran(row.last_modified) : ''}>
          {row.last_modified ? <span>{utcToJalaliIran(row.last_modified)}</span> : 'نامشخص'}
        </div>
      ),
    },
  ]

  return (
    <div>
      <h3 className="text-textColor text-xl mb-4">لیست موجودیت‌ها - {Name}</h3>

      {/* فیلتر ایرانی بودن به صورت سوییچ */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="iranian-filter" className="font-bold text-textTitleColor">
          نمایش موجودیت های غیرایرانی:
        </label>
        <Switch
          checked={IsIranianFilter}
          onChange={handleIranianFilterChange}
          inputProps={{ 'aria-label': 'Toggle Iranian Filter' }}
        />
      </div>

      {!Loading ? (
        <>
          <div className="overflow-x-auto">
            <ExpandableTable
              data={Data}
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
          </div>

          <Pagination
            rtl
            totalItems={TotalPages}
            pageSize={PAGE_SIZE}
            currentPage={First}
            totalPages={TotalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark shadow-sm px-2">
          <SkeletonLoading />
        </div>
      )}
    </div>
  )
}

export default Page