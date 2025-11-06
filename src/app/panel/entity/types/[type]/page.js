'use client'
import React, { useEffect, useState } from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { GetRequest } from '@/functions/GetRequest';
import { serverAddress } from '@/functions/ServerAddress';
import { useParams, usePathname, useRouter } from 'next/navigation'

const Page = () => {

  const params = useParams()
  const type = params.type

  const [Loading, setLoading] = useState(false)
  const [First, SetFirst] = useState(1)
  const [EntitieNumber, SetEntitieNumber] = useState(1)
  const [Data, SetData] = useState([])

  const getData = () => {

    GetRequest(`${serverAddress}/entity/type/`)
      .then((response) => {
        console.log(response)
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
              label: response.data.results[i].name
            })
          }
          console.log(getType)
          const queryParams = {
            limit: 10,
            offset: (First - 1) * 10,
            type: getType.find(item => item.label === type).id
          }
          GetRequest(`${serverAddress}/entity/filter-process/`, queryParams)
            .then((response) => {
              console.log(response)
              SetEntitieNumber(response.data.count)
              setLoading(false)
              if (response.status === 200) {
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
  return (
    <div>
      {
        !Loading ?
          <>
            <ExpandableTable
              data={[]}          // ← فقط دیتای فیلترشده را بده
              columns={[]}
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
