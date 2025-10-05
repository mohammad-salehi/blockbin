'use client'

import React, { useState } from 'react'
import DetailBox from '@/components/DetailBox/DetailBox'

const page = () => {

  const [invoiceData, setInvoiceData] = useState([
    {
        id: 1,
        title: "اطلاعات هویتی",
        content: [
            { id: 1, title: "آدرس", content: '' },
            { id: 2, title: "مالک", content: "" },
            { id: 3, title: "شناسایی توسط", content: "" },
            { id: 4, title: "ریسک", content: "" },

        ],
    },
    {
        id: 2,
        title: "جزئیات فعالیت",
        content: [
            { id: 1, title: "موجودی", content: "" },
            { id: 2, title: "تعداد تراکنش", content: "" },
            { id: 3, title: "اولین فعالیت", content: "" },
            { id: 4, title: "آخرین فعالیت", content: "" },

        ],
    },
    {
        id: 3,
        title: "عملیات",
        content: [
            {
                id: 1,
                content: (
                    <div className='text-center w-full cursor-pointer' onClick={() => {  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                            <path d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 22H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>ویرایش</span>

                    </div>

                ),
                title: ''
            },
            {
                id: 2,
                content: (
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                        
                    }}>
                        <span className="flex items-center ml-1">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <p className="text-right">دریافت Excel</p>

                    </div>

                ),
                title: ''
            },
        ],
    },
]);
  return (
    <div>
      <img className='w-12 inline-block' src={'../../../../images/TRX.png'} />
      <span className='text-textColor text-xl font-bold'>
        آدرس ترون
      </span>
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
  )
}

export default page
