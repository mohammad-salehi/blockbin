import React from 'react'

const AddressInfo = () => {
    return (
        <div className='bg-boxColor border border-boxBorderColor p-3 rounded-xl flex justify-between items-center'>
            <div className='flex items-center'>
                <img src={"/images/TRX.png"} className='w-8 inline-block ' />
                <h6 className='inline-block text-xl mr-2 text-textColor'>
                    آدرس ترون
                </h6>
            </div>
            <div className='flex items-center text-primary cursor-pointer'>
                <a>
                TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG
                </a>
            </div>
        </div>
    )
}

export default AddressInfo
