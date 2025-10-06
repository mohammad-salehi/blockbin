import React from 'react'
import AddressInfo from './AddressInfo/AddressInfo'
import AdressActivity from './AdressActivity/AdressActivity'

const AddressPage = () => {
    return (
        <div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
                <div>
                    <AddressInfo />
                </div>
                <div>
                    <AdressActivity />
                </div>
            </div>
            <div>
                123
            </div>
        </div>

    )
}

export default AddressPage
