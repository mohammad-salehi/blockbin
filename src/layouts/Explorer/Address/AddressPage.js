import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo/AddressInfo'
import AdressActivity from './AdressActivity/AdressActivity'
import AddressTransactions from './AddressTransactions/AddressTransactions'
import MainInput from '@/components/MainInput/MainInput'
import { useParams, usePathname, useRouter } from 'next/navigation'
import NetworkSelection from '@/components/networkSelection/NetworkSelection'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'

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
