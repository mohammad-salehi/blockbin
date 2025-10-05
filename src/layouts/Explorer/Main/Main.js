import MainInput from '@/components/MainInput/MainInput'
import React from 'react'

const Main = () => {
    return (
        <div className='mt-16 max-w-7xl m-auto'>
            <h1 className='text-4xl font-bold text-textColor'>
                <p className='inline-block'>
                    آدرس یا تراکنش های خود را به کمک
                </p>
                <p className='inline-block mr-1 ml-1 text-primary'>
                    بلاک‌بین
                </p>
                <p className='inline-block'>
                    جست‌وجو کنید
                </p>
            </h1>

            <h1 className='text-md font-bold text-textColor mt-4'>
                <p className='inline-block'>
                    جست‌وجو در
                </p>
                <p className='inline-block mr-1 ml-1 text-primary'>
                    8 شبکه
                </p>
                <p className='inline-block'>
                    پشتیبانی‌شده
                </p>
            </h1>

            <MainInput/>

            <h1 className='text-md  text-textColor mt-4'>
                <p className='inline-block'>
                    نمونه کاوش
                </p>
                
                <p className='inline-block mr-4 bg-bgColor2 px-4 py-1 rounded-full cursor-pointer'>
                    آدرس
                </p>
                <p className='inline-block mr-4 bg-bgColor2 px-4 py-1 rounded-full cursor-pointer'>
                    تراکنش
                </p>
            </h1>
        </div>
    )
}

export default Main
