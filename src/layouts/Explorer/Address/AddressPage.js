import React from 'react'
import AddressInfo from './AddressInfo/AddressInfo'
import AdressActivity from './AdressActivity/AdressActivity'
import AddressTransactions from './AddressTransactions/AddressTransactions'
import MainInput from '@/components/MainInput/MainInput'

const AddressPage = () => {
    return (
        <div>
            <div className='mt-0'>
                <MainInput/>
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 mt-4">
                <div className='pl-2'>
                    <AddressInfo />
                </div>
                <div className='pr-2'>
                    <AdressActivity />
                </div>
            </div>
            <div className='mt-4'>
                <AddressTransactions />
            </div>
        </div>

    )
}

export default AddressPage
