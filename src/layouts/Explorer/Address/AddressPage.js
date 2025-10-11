import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo/AddressInfo'
import AdressActivity from './AdressActivity/AdressActivity'
import AddressTransactions from './AddressTransactions/AddressTransactions'
import MainInput from '@/components/MainInput/MainInput'
import { useParams, usePathname, useRouter } from 'next/navigation'

const AddressPage = () => {

    const params = useParams()

    const query = params.query
    const network = params.network
    const hash = params.hash

    const [TokenSelected, SetTokenSelected] = useState(network)
    const [Miladi, SetMiladi] = useState(0)
    const [Transactions, SetTransactions] = useState(0)
    const [TokenTransfered, SetTokenTransfered] = useState([
        {
            symbol: network,
            contract_address: null,
            value: network,
            label: network,
        }
    ]);

    useEffect(() => {
        
    },[])

    return (
        <div>
            <div className='mt-0'>
                <MainInput />
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 mt-4">
                <div className='pl-2'>
                    <AddressInfo />
                </div>
                <div className='pr-2'>
                    <AdressActivity
                        SetTokenSelected={SetTokenSelected}
                        TokenSelected={TokenSelected}
                        SetMiladi={SetMiladi}
                        Miladi={Miladi}
                        SetTokenTransfered={SetTokenTransfered}
                        TokenTransfered={TokenTransfered}
                        SetTransactions={SetTransactions}
                        Transactions={Transactions}
                    />
                </div>
            </div>
            <div className='mt-4'>
                <AddressTransactions
                    TokenTransfered={TokenTransfered}
                    Miladi={Miladi}
                    TokenSelected={TokenSelected}
                    Transactions={Transactions}
                />
            </div>
        </div>

    )
}

export default AddressPage
