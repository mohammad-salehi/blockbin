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
import Switch from '@mui/material/Switch'

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
  const [IsIranianFilter, SetIsIranianFilter] = useState(true)

  const getData = useCallback(() => {
    if (!type) return

    setLoading(true)

    const queryParams = {
      page_number: First,
      page_size: PAGE_SIZE,
      category: type,
      ...(IsIranianFilter === false && { is_iranian: true }),
    }

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
    SetIsIranianFilter(event.target.checked)
  }

  const nowrapCell = 'whitespace-nowrap overflow-hidden text-ellipsis'

  const columns = [
    {
      header: 'نام',
      accessorKey: 'name',
      cell: (row) => (
        <a
          href={`/panel/entity/${row.id}`}
          className="flex items-center gap-3 min-w-0 whitespace-nowrap overflow-hidden hover:text-primary transition"
        >
          {row.metadata.image ? (
            <img
              src={row.metadata.image}
              className="w-7 h-7 rounded-full object-cover shrink-0 border border-boxBorderColor"
              alt=""
            />
          ) : (
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-boxColor border border-boxBorderColor">
              <ImageNotSupportedIcon fontSize="small" />
            </div>
          )}

          <span className="min-w-0 overflow-hidden text-ellipsis font-medium" title={row.name}>
            {row.name}
          </span>
        </a>
      ),
    },
    {
      header: 'ریسک',
      accessorKey: 'riskscore',
      cell: (row) => {
        if (row.riskscore === null) {
          return <span className="text-gray-400 whitespace-nowrap">نامشخص</span>
        }
    
        const score = row.riskscore
        const percent = (score * 100).toFixed(2)
    
        let color = ''
    
        if (score < 0.3) color = 'text-green-500 bg-green-500/10'
        else if (score < 0.6) color = 'text-yellow-500 bg-yellow-500/10'
        else if (score < 0.8) color = 'text-orange-500 bg-orange-500/10'
        else color = 'text-red-500 bg-red-500/10'
    
        return (
          <div className="whitespace-nowrap">
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${color}`}
            >
              {percent}%
            </span>
          </div>
        )
      },
    },
    
    {
      header: 'کشور',
      accessorKey: 'country',
      cell: (row) => (
        <div className={`${nowrapCell} text-textTitleColor`}>
          {row.country || 'نامشخص'}
        </div>
      ),
    },
    {
      header: 'آخرین به‌روزرسانی',
      accessorKey: 'last_modified',
      cell: (row) => (
        <div
          className="whitespace-nowrap text-sm text-textTitleColor"
          title={row.last_modified ? utcToJalaliIran(row.last_modified) : ''}
        >
          {row.last_modified ? utcToJalaliIran(row.last_modified) : 'نامشخص'}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h3 className="text-xl font-bold text-textColor">
          لیست موجودیت‌ها
          <span className="text-primary mr-2">{Name}</span>
        </h3>

        <div className="text-sm text-textTitleColor">
          تعداد: {EntitieNumber}
        </div>

      </div>

      {/* Filter Card */}
      <div className="flex items-center justify-between bg-boxColor border border-boxBorderColor rounded-xl px-5 py-4 shadow-sm">

        <div className="flex items-center gap-3">

          <span className="text-textTitleColor font-medium">
            نمایش موجودیت‌های غیرایرانی
          </span>

          <Switch
            checked={IsIranianFilter}
            onChange={handleIranianFilterChange}
          />

        </div>

      </div>

      {/* Table Card */}
      {!Loading ? (
        <div className="bg-boxColor   rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">
            <ExpandableTable
              data={Data}
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
          </div>

          <div className="flex justify-center py-6  ">
            <Pagination
              rtl
              totalItems={TotalPages}
              pageSize={PAGE_SIZE}
              currentPage={First}
              totalPages={TotalPages}
              onPageChange={handlePageChange}
            />
          </div>

        </div>
      ) : (
        <div className="bg-boxColor border border-boxBorderColor rounded-2xl shadow-sm p-4">
          <SkeletonLoading />
        </div>
      )}
    </div>
  )
}

export default Page
