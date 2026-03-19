import MainInput from '@/components/MainInput/MainInput'
import RoundedColorBox from '@/components/RoundedColorBox/RoundedColorBox'
import { Networks } from '@/functions/Networks'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import NetworkSelection from '@/components/networkSelection/NetworkSelection'

const Main = ({ SetLoading }) => {
  const [inputText, SetInputText] = useState('')
  const [query, Setquery] = useState('')
  const [NetworkFounded, SetNetworkFounded] = useState([])
  const [ShowSelection, SetShowSelection] = useState(false)

  const onSubmit = () => {
    const q = inputText?.trim()
    if (!q) {
      return toast.error('مقادیر را به درستی وارد کنید!', { position: 'bottom-left' })
    }

    SetLoading(true)
    GetRequest(`${serverAddress}/explorer/network-detection/?query=${encodeURIComponent(q)}`)
      .then((response) => {
        SetLoading(false)

        const payload = response?.data?.data  
        const foundedQuery = payload?.query
        const networks = payload?.network || []

        Setquery(foundedQuery || '')

        if (networks.length > 0) {
          SetNetworkFounded(networks)
          SetShowSelection(true)
        } else {
          toast.error('شبکه‌ای برای این ورودی پیدا نشد', { position: 'bottom-left' })
        }
      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
        return toast.error('آدرس مورد نظر یافت نشد', { position: 'bottom-left' })
      })
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('#NetworkSelection')) {
      SetShowSelection(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className='mt-16 max-w-7xl m-auto'>
      <h1 className='text-lg sm:text-4xl font-bold text-textColor'>
        <p className='inline-block'>آدرس یا تراکنش های خود را به کمک</p>
        <p className='inline-block mr-1 ml-1 text-primary'>بلاک‌بین</p>
        <p className='inline-block'>جست‌وجو کنید</p>
      </h1>

      <h1 className='text-sm sm:text-md font-bold text-textColor mt-4'>
        <p className='inline-block'>جست‌وجو در</p>
        <p className='inline-block mr-1 ml-1 text-primary'>{Networks.length} شبکه</p>
        <p className='inline-block'>پشتیبانی‌شده</p>
      </h1>

      <div className='mt-4'>
        <MainInput
          SetInputText={SetInputText}
          inputText={inputText}
          onSubmit={onSubmit}
          placeholder={'آدرس یا شناسه تراکنش...'}
        />
      </div>

      <h1 className='text-sm sm:text-md  text-textColor mt-4'>
        <p className='inline-block'>نمونه کاوش</p>
        <p
          className='inline-block mr-2 sm:mr-4 bg-bgColor2 px-4 py-1 rounded-full cursor-pointer'
          onClick={() => { SetInputText('TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG') }}
        >
          آدرس
        </p>
        <p
          className='inline-block mr-2 sm:mr-4 bg-bgColor2 px-4 py-1 rounded-full cursor-pointer'
          onClick={() => { SetInputText('38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a') }}
        >
          تراکنش
        </p>
      </h1>

      {ShowSelection ? (
        <div className='mt-4' id="NetworkSelection">
          <NetworkSelection FoundedType={query} networks={NetworkFounded} type='researcher' mode='main' address={inputText} />
        </div>
      ) : null}

      <h1 className='text-lg font-bold text-textColor mt-8  mb-4 sm:mb-0'>
        <p className='inline-block'>شبکه‌های پشتیبانی‌شده</p>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {Networks.map((item, index) => (
          <div className='mt-0 sm:mt-3' key={index}>
            <RoundedColorBox
              fee={2.04}
              lastBlock={123456}
              symbol={item.symbole}
              name={item.name}
              NetworkColor={item.color}
              logo={`${item.symbole}.png`}
            />
            <div className='mt-3'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
