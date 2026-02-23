'use client'

import React, { useEffect, useState } from 'react'
import MainInput from '@/components/MainInput/MainInput'  // وارد کردن کامپوننت ورودی
import { GetRequest } from '@/functions/GetRequest'  // برای ارسال درخواست‌های API
import { serverAddress } from '@/functions/ServerAddress'  // برای آدرس سرور
import EntityTypes from '@/components/EntityTypes/EntityTypes'  // کامپوننت نمایش موجودیت‌ها
import FullPageLoading from '@/components/FullPageLoading/FullPageLoading'  // برای نشان دادن صفحه بارگذاری
import EntityList from '@/layouts/Entities/EntityList/EntityList'  // برای نمایش لیست موجودیت‌ها

const Page = () => {

  // وضعیت‌ها برای ذخیره داده‌ها و وضعیت‌های مختلف صفحه
  const [pageNumber, SetpageNumber] = useState(1)  // صفحه فعلی
  const [EntityNumber, SetEntityNumber] = useState(0)  // تعداد موجودیت‌ها
  const [Data, SetData] = useState([])  // داده‌های موجودیت‌ها
  const [Types, SetTypes] = useState([])  // دسته‌بندی‌های موجودیت‌ها
  const [Loading, SetLoading] = useState(false)  // وضعیت بارگذاری
  const [TableLoading, SetTableLoading] = useState(false)  // وضعیت بارگذاری جدول
  const [ShowEntityList, SetShowEntityList] = useState(false)  // نمایش یا عدم نمایش لیست موجودیت‌ها

  const [inputText, SetInputText] = useState('')  // ذخیره متن جستجو

  // برای ارسال درخواست جستجو
  const onSubmit = () => {
    // فعلاً خالی است، اگر نیاز به عملکرد خاصی داشتید می‌توانید اینجا اضافه کنید
  }

  // بارگذاری دسته‌بندی‌ها از API
  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/entity/categories/?page_number=1&page_size=100`)
      .then((response) => {
        SetTypes(response.data.data.categories)
        SetLoading(false)
      })
      .catch((err) => {
        console.log(err)
        SetLoading(false)
      })
  }, [])

  useEffect(() => {
    if (inputText.length >= 3) {
      SetTableLoading(true)
      const delayDebounceFn = setTimeout(() => {
        const filters = { search: inputText }
        const queryParams = {
          page_number: pageNumber, 
          page_size: 10,
          ...filters
        }
        SetShowEntityList(true)
        GetRequest(`${serverAddress}/entity/entities/`, queryParams)
          .then((response) => {
            SetTableLoading(false)
            SetEntityNumber(response.data.data.count)
            if (response.status === 200) {
              SetData(response.data.data.entities)
            } else if (response.status === 204) {
              SetData([])
              SetEntityNumber(0)
            }
          })
          .catch((err) => {
            SetTableLoading(false)
            console.log(err)
          })
      }, 500);

      return () => {
        clearTimeout(delayDebounceFn);
      };
    } else {
      SetTableLoading(false)
      SetShowEntityList(false)
    }
  }, [inputText, pageNumber])

  useEffect(() => {
    SetpageNumber(1)
  }, [inputText])

  const [totalPages, SettotalPages] = useState(0)
  useEffect(() => {
    if (typeof(EntityNumber) === 'number') {
        SettotalPages(EntityNumber)
    }
  },[EntityNumber])

  return (
    <div className='mt-16 max-w-7xl m-auto'>
      <h1 className='text-lg sm:text-4xl font-bold text-textColor'>
        <p className='inline-block'>
          جست‌وجوی موجودیت‌های
        </p>
        <p className='inline-block mr-1 ml-1 text-primary'>
          بلاک‌بین
        </p>
      </h1>

      <h1 className='text-sm sm:text-md font-bold text-textColor mt-4'>
        <p className='inline-block'>
          می‌توانید دسته مورد نظرتان را انتخاب و یا عنوان موجودیت مورد نظرتان را جست‌وجو کنید
        </p>
      </h1>

      <div className='mt-4'>
        <MainInput SetInputText={SetInputText} inputText={inputText} onSubmit={onSubmit} placeholder={'عنوان موجودیت...'} />
      </div>

      <div className="mt-8">
        {
          !ShowEntityList ? 
            !Loading ? 
              Types.length > 0 ? (
                <div>
                  <h4 className="font-extrabold text-right mb-4 text-textColor">
                    دسته‌بندی موجودیت‌ها
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Types.map((item, index) => (
                      <div key={index} className="p-2">
                        <EntityTypes 
                          id={item.id} 
                          fee={2.04} 
                          lastBlock={123456} 
                          symbol={item.name} 
                          name={item.persian_name} 
                          NetworkColor={'#2fa2dc'} 
                          logo={`${item.image}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                null
              )
            :
            <FullPageLoading />
          :
          <EntityList Data={Data} EntityNumber={totalPages} pageNumber={pageNumber} SetpageNumber={SetpageNumber} TableLoading={TableLoading} />
        }

      </div>
    </div>
  )
}

export default Page