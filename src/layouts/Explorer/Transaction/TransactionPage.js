import MainInput from '@/components/MainInput/MainInput'
import { useParams, usePathname, useRouter } from 'next/navigation'
import TransactionInfo from './TransactionInfo/TransactionInfo'
import React, { useState } from 'react'
import { Networks } from '@/functions/Networks'
import EvmTable from './EvmTable/EvmTable'
import UtxoTable from './UtxoTable/UtxoTable'
import NetworkSelection from '@/components/networkSelection/NetworkSelection'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import toast from 'react-hot-toast'
const TransactionPage = () => {

    const params = useParams()

    const query = params.query
    const network = params.network
    const hash = params.hash

    const [TotalUSDValue, SetTotalUSDValue] = useState(null)

    const [inputText, SetInputText] = useState('')
    const [NetworkFounded, SetNetworkFounded] = useState([])
    const [ShowSelection, SetShowSelection] = useState(false)
    const [query2, Setquery2] = useState('')
    const onSubmit = () => {
        GetRequest(`${serverAddress}/explorer/network-detection/?query=${inputText}`)
            .then((response) => {
                Setquery2(response.data.query)
                if (response.data.network.length > 1) {
                    SetNetworkFounded(response.data.network)
                    SetShowSelection(true)
                } else if (response.data.network.length === 1) {
                    window.location.assign(`/panel/dashboard/${response.data.query}/${response.data.network}/${inputText}`)
                }
            })
            .catch((err) => {
                console.log(err)
                return toast.error('آدرس مورد نظر یافت نشد', {
                    position: 'bottom-left'
                })
            })
    }

    return (
        <div>
            <div className='mt-0'>
                <MainInput SetInputText={SetInputText} inputText={inputText} onSubmit={onSubmit} placeholder={"آدرس یا شناسه تراکنش..."} />
                {
                    ShowSelection ?
                        <div className='mt-4'>
                            <NetworkSelection FoundedType={query2} networks={NetworkFounded} type='researcher' mode='main' address={inputText} />
                        </div>
                        :
                        null
                }
            </div>

            <div className='mt-4'>
                <TransactionInfo TotalUSDValue={TotalUSDValue} SetTotalUSDValue={SetTotalUSDValue} />
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
