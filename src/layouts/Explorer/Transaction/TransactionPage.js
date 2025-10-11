import MainInput from '@/components/MainInput/MainInput'
import { useParams, usePathname, useRouter } from 'next/navigation'
import TransactionInfo from './TransactionInfo/TransactionInfo'
import React, { useState } from 'react'
import { Networks } from '@/functions/Networks'
import EvmTable from './EvmTable/EvmTable'
import UtxoTable from './UtxoTable/UtxoTable'
const TransactionPage = () => {

    const params = useParams()

    const query = params.query
    const network = params.network
    const hash = params.hash

    const [TotalUSDValue, SetTotalUSDValue] = useState(null)
    return (
        <div>
            <div className='mt-0'>
                <MainInput />
            </div>

            <div className='mt-4'>
                <TransactionInfo TotalUSDValue={TotalUSDValue} SetTotalUSDValue={SetTotalUSDValue}/>
            </div>
            {
                Networks.find(item => item.symbole === network).type === 'account' ?
                    <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mt-4">
                        <div>
                            <EvmTable SetTotalUSDValue={SetTotalUSDValue} />
                        </div>
                    </div>
                    :

                    <UtxoTable />
            }

        </div>
    )
}

export default TransactionPage
