import MainInput from '@/components/MainInput/MainInput'
import RoundedColorBox from '@/components/RoundedColorBox/RoundedColorBox'
import { Networks } from '@/functions/Networks'
import React, { useState } from 'react'

const Main = ({SetLoading}) => {

    const [inputText, SetInputText] = useState('')
    const onSubmit = () => {
        SetLoading(true)
    }
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

            <MainInput SetInputText={SetInputText} inputText={inputText} onSubmit={onSubmit} />

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


            <h1 className='text-lg font-bold text-textColor mt-8'>
                <p className='inline-block'>
                    شبکه‌های پشتیبانی‌شده
                </p>

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    Networks.map((item, index) => {
                        return (
                            <div className="mt-3" key={index}>
                                <RoundedColorBox fee={2.04} lastBlock={123456} symbol={item.symbole} name={item.name} NetworkColor={item.color} logo={`${item.symbole}.png`} />  <div className="mt-3"></div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Main
