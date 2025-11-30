'use client'
import React, { useEffect, useState } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { GetRequest } from '@/functions/GetRequest';
import { serverAddress } from '@/functions/ServerAddress';
import { useParams, usePathname, useRouter } from 'next/navigation'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { utcToJalaliIran } from '@/functions/utcToJalali';
const Page = () => {

  const params = useParams()
  const type = params.type

  const [Loading, setLoading] = useState(false)
  const [First, SetFirst] = useState(1)
  const [EntitieNumber, SetEntitieNumber] = useState(1)
  const [Data, SetData] = useState([])
  const [Name, SetName] = useState('')

  const getData = () => {

    GetRequest(`${serverAddress}/entity/type/`)
      .then((response) => {
        if (response.status === 200) {
          const getType = [
            {
              id: null,
              value: false,
              label: 'انتخاب نشده'
            }
          ]
          for (let i = 0; i < response.data.results.length; i++) {
            getType.push({
              id: response.data.results[i].id,
              value: response.data.results[i].id,
              label: response.data.results[i].name,
              pname: response.data.results[i].persian_name,
            })
          }
          const queryParams = {
            limit: 10,
            offset: (First - 1) * 10,
            type: getType.find(item => item.label === type).id
          }

          SetName(getType.find(item => item.label === type).pname)

          GetRequest(`${serverAddress}/entity/filter-process/`, queryParams)
            .then((response) => {
              SetEntitieNumber(response.data.count)
              setLoading(false)
              if (response.status === 200) {
                console.log(response.data.results)
                SetData(response.data.results)
              } else if (response.status === 404) {
                SetData([])
              }
              setLoading(false)

            })
            .catch((err) => {
              setLoading(false)
              console.log(err)

              if (err.response.status === 403) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
              }
              if (err.response.status === 401) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
              }
              if (err.response.status === 404) {
                SetData([])
                SetEntitieNumber(0)
              }
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }
  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      header: "عنوان",
      accessorKey: "logo",
      cell: (row) => (
        <a href={`/panel/entity/${row.uuid}`}>
          {
            row.image !== null ?
              <img src={row.image} className='w-6 inline-block' />
              :
              <ImageNotSupportedIcon />
          }
          <span className='mr-2'>
            {row.name}
          </span>
        </a>
      ),
    },
    {
      header: "وبسایت", accessorKey: "hash",

      cell: (row) => (
        <div>
          {
            row.web_site !== null ?
              <a href={row.web_site}>{row.web_site}</a>
              :
              <span>
                نامشخص
              </span>
          }
        </div>
      ),
    },
    {
      header: "نام حقوقی", accessorKey: "legal_name",
      cell: (row) => (
        <div className='p-0'>
          {
            row.legal_name !== null ?
              <p>{row.legal_name}</p>
              :
              <span>
                نامشخص
              </span>
          }
        </div>
      ),
    },
    {
      header: "ریسک", accessorKey: "TokenInfo",
      cell: (row) => (
        <div className='p-0'>
          {
            row.riskscore !== null ?
              <p>{row.riskscore * 100}%</p>
              :
              <span>
                نامشخص
              </span>
          }
        </div>
      ),
    },
    {
      header: "آخرین به‌روزرسانی", accessorKey: "hash",

      cell: (row) => (
        <div>
          {
            row.last_modified ?
              <span>
                {
                  utcToJalaliIran(row.last_modified)}
              </span>
              :
              'نامشخص'
          }

        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className='text-textColor text-xl mb-1'>
        لیست موجودیت‌های {Name}
      </h3>
      {
        !Loading ?
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

export default Page
