'use client'

import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import FullPageLoading from '@/components/FullPageLoading/FullPageLoading'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DetailBox from '@/components/DetailBox/DetailBox'
import TailwindGaugePretty from '@/components/Gauge/Gauge'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import { Networks } from '@/functions/Networks'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat'

const Page = () => {
  const params = useParams()
  const id = params.id

  const [Data, SetData] = useState(null)
  const [Transactions, SetTransactions] = useState([])
  const [Loading, SetLoading] = useState(false)
  const [RiskScore, SetRiskScore] = useState(0)
  const [networkSelected, SetnetworkSelected] = useState(Networks[5].symbole)

  const handleEdit = (sectionId, contentId, newContent) => {
    setInvoiceData((prevData) =>
      prevData.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.map((item) => {
              if (item.id === contentId) {
                return { ...item, content: newContent };
              }
              return item;
            }),
          };
        }
        return section;
      })
    );
  };

  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      title: "مشخصات پایه",
      content: [
        { id: 1, title: "عنوان فارسی", content: '' },
        { id: 2, title: "عنوان حقوقی", content: "" },
        { id: 3, title: "وبسایت", content: "" },
        { id: 4, title: "تاریخ تاسیس", content: "" },
        { id: 5, title: "شماره ثبت", content: "" },
      ],
    },
    {
      id: 2,
      title: "جزئیات موجودیت",
      content: [
        { id: 1, title: "دسته‌بندی", content: "" },
        { id: 2, title: "پشتیبانی از فیات", content: "" },
        { id: 3, title: "سکه خصوصی", content: "" },
        { id: 4, title: "نهاد ناظر", content: "" },
        { id: 5, title: "مجوز", content: "" },
      ],
    },
    {
      id: 3,
      title: "ریسک",
      content: [
        {
          id: 1,
          content: (
            <TailwindGaugePretty value={RiskScore} />
          )
        }
      ],
    },
  ]);

  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/entity/type/`)
      .then((typeResponse) => {
        GetRequest(`${serverAddress}/entity/${id}/`)
          .then((response) => {
            SetData(response.data)
            handleEdit(1, 1, response.data.persian_name)
            handleEdit(1, 2, response.data.legal_name)
            handleEdit(1, 3, response.data.web_site)
            handleEdit(1, 4, response.data.establishment)
            handleEdit(1, 5, response.data.registration_number)
            handleEdit(2, 1, typeResponse.data.results.find(item => item.id === response.data.type).persian_name)
            handleEdit(2, 2, response.data.fiat_support ? 'دارد' : 'ندارد')
            handleEdit(2, 3, response.data.private_coin ? 'دارد' : 'ندارد')
            handleEdit(2, 4, response.data.supervisory_body)
            handleEdit(2, 5, response.data.licence)

            const rs = response.data.riskscore * 100;
            SetRiskScore(rs);

            setInvoiceData(prev =>
              prev.map(sec =>
                sec.id === 3
                  ? {
                    ...sec,
                    content: [
                      {
                        id: 1,
                        content: (
                          <div className="w-full self-stretch flex justify-center items-center ">
                            {/* ظرف داخلی برای کنترل حداکثر عرض گیج */}
                            <div className="w-full ">
                              <TailwindGaugePretty value={rs} />
                            </div>
                          </div>
                        ),
                      },
                    ],
                  }
                  : sec
              )
            );

            SetLoading(false)
          })
          .catch((err) => {
            console.log(err)
            SetLoading(false)
          })
      })
      .catch((err) => {

      })

  }, [])


  const addDataToTable = (response) => {

    try {
        // SetAddNumber(response.data.results[0].details.count[0].networkCounts.find(item => item.network === NetworkList.find(item => item.value === SelectedNetwork).value2).count)
        const getData = []
        for (let i = 0; i < response.data.results[0].addresses.length; i++) {
          if (response.data.results[0].addresses[i].network.toUpperCase() === networkSelected.toUpperCase()) {
            getData.push(
              {
                address: response.data.results[0].addresses[i].address,
                network: response.data.results[0].addresses[i].network
              }
            )
          }
        }
        SetTransactions(getData)
      
    } catch (error) {
      console.log(error)
      SetTransactions([])
    }
  }

  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/entity/addresses/?entity_uuid=${id}&page=1&size=10&has_transaction=${false}`)
      .then((response) => {
        if (response.status === 200) {
          addDataToTable(response)
        }
        SetLoading(false)
      })
      .catch((err) => {
        console.log(err)
        SetLoading(false)
      })
  }, [])

  const columns = [
    {
      header: "آدرس",
      accessorKey: "logo",
      cell: (row) => (
        <div>{AddressFormat(row.address, 24, 'transaction', 'TRX', true)}</div>
      ),
    },
    {
      header: "نوع آدرس", accessorKey: "hash",

      cell: (row) => (
        <div>
          {/*  */}
          {row.network}
        </div>
      ),
    },
    {
      header: "شبکه", accessorKey: "legal_name",
      cell: (row) => (
        <div className='p-0'>
          {/* {Type(row)} */}
        </div>
      ),
    },
    {
      header: "موجودی", accessorKey: "TokenInfo",
      cell: (row) => (
        <div className='p-0'>
          {/* {TokenInfo(row)} */}
        </div>
      ),
    }
  ];


  return (

    <div>
      {
        Loading ?
          <FullPageLoading />
          :
          Data !== null ?
            <div>
              <div className="flex items-center gap-3">
                {Data.image && (
                  <img className="w-12 h-12 object-contain" src={Data.image} alt="logo" />
                )}
                {!Data.image && (
                  <ImageNotSupportedIcon className='text-textColor' style={{ fontSize: '48px' }} />
                )}
                {Data.name && (
                  <h4 className="text-4xl font-semibold text-textColor">{Data.name}</h4>
                )}

              </div>
              <DetailBox
                data={invoiceData.map((section) => ({
                  title: section.title,
                  content: section.content.map((item) => ({
                    title: item.title,
                    content: typeof item.content === 'string' ? item.content : React.isValidElement(item.content) ? item.content : '', // تبدیل به string یا Element
                  })),
                }))}
              />
            </div>
            :
            null
      }
      <h4 className="text-3xl font-semibold text-textColor mt-8">آدرس‌ها</h4>
      <div className='mt-2'>
        <ExpandableTable
          data={Transactions}          // ← فقط دیتای فیلترشده را بده
          columns={columns}
          rowDetailsMode="row"
          rowDetailsClassName="rounded-xl p-3"
        />
        <Pagination
          rtl
          totalItems={100}
          pageSize={10}
          currentPage={1}
          onPageChange={
            (e) => {
              SetFirst(e)
            }
          }
        />
      </div>

    </div>
  )
}

export default Page
