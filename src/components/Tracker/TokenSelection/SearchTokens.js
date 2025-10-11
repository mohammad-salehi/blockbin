import React, { useEffect, useState } from 'react'
import { Alert } from 'reactstrap'
import './SearchTokenStyle.css'
import { serverAddress } from '../../../../address'
import LocalLoading from '../../../../components/localLoading/localLoading'
import { useParams } from "react-router-dom"
import toast from 'react-hot-toast'
import { GetRequest } from '../../../../newProcessors/GetRequest'
import { IsAccountBase } from '../../../dashboard/functions/functions'

const SearchTokens = ({SetData}) => {

  const { hash } = useParams()
  const { network } = useParams()

  const [tokens, SetTokens] = useState([])
  const [Searching, SetSearching] = useState(true)

  //get tokens data
  useEffect(() => {
    GetRequest(`${serverAddress}/explorer/network-detection/?query=${hash}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.query === 'address') {
            if (IsAccountBase(network)) {
              GetRequest(`${serverAddress}/explorer/token-transfer-list/?query=${hash}&network=${network}`)
                .then((response) => {
                  if (response.status === 200) {
                    console.log(response)
                    const getTokens = []
                    for (let i = 0; i < response.data.length; i++) {
                      if (!getTokens.some(item => item.symbol === response.data[i].symbol)) {
                        getTokens.push(response.data[i])
                      }
                    }
                    if (getTokens.length === 0) {
                      location.assign(`/tracker2/${network}/${hash}/${network}`)
                    }
                    SetTokens(getTokens)
                    SetSearching(false)
                  } else {
                    SetTokens([])
                    SetSearching(false)
                  }
                })
                .catch((err) => {                    
                  SetTokens([])
                  SetSearching(false) 
                })
            } else {
              location.assign(`/tracker2/${network}/${hash}/${network}`)
            }
          } else if (response.data.query === 'transaction') {
            if (!IsAccountBase(network)) {
              location.assign(`/tracker2/${network}/${hash}/${network}`)
            } else {
              GetRequest(`${serverAddress}/explorer/search/?query=${hash}&page_number=0&page_size=0&network=${network}&pageNumberFrom=1&pageSizeFrom=1&pageNumberTo=1&pageSizeTo=1`)
                .then((response) => {
                      const getTokens = []
                      for (let i = 0; i < response.data.data.logs.length; i++) {
                        getTokens.push(
                          {
                            symbol:response.data.data.logs[i].symbol,
                            contract_address:response.data.data.logs[i].contractAddress,
                            name:response.data.data.logs[i].name
                          }
                        )
                      }
                      SetTokens(getTokens)    
                      SetSearching(false)
                })
                .catch((err) => { })
            }
          }
        } else {
          SetTokens([])
          SetSearching(false)
        }
      })
      .catch((err) => {
        SetTokens([])
        SetSearching(false)
        console.log(err)
        if (err.response.status === 404) {
          SetSearching(false)
          toast.error('برای این آدرس توکنی یافت نشد', {
            position: 'bottom-left'
          })
          setTimeout(() => {
            window.location.assign(`/tracker2/${network}/${hash}/${network}`)
          }, 2000)
        }
        try {
          if (err.response.data.detail === 'Not found.') {
            return toast.error('آدرس مورد نظر یافت نشد.', {
              position: 'bottom-left'
            })
          }
        } catch (error) { }
      })
  }, [])

  return (
    <div id='searchTokenDiv'>
      <h6 style={{ padding: '8px' }}>
        براساس کدام توکن رسم شود؟
      </h6>
      {
        Searching ?
          <div className='mt-5'>
            <LocalLoading />
          </div>
          :
            <div>
              <div
                className={`p-2 tokenNumber0`}
                id='tokenItems'
                onClick={() => { location.assign(`/tracker2/${network}/${hash}/${network}`) }}
              >
                <a href={`/tracker2/${network}/${hash}/${network}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span>
                    <img src={`/images/${network}.png`} style={{ width: '24px' }} className='ms-1' />
                    {network === 'XRP' ? 'Ripple' : network === 'ETH' ? 'Ethereum' : network === 'TRX' ? 'Tron' : network === 'Matic' ? 'Polygon' : network === 'BSC' ? 'Binance Smart Chain' : null}
                  </span>
                  <span style={{ float: 'left' }}>
                    <Alert color='warning' style={{ display: 'inline-block', padding: '2px 4px', fontSize: '12px', margin: '0px', borderRadius: '20px', float: 'left' }}>{network}</Alert>
                  </span>
                </a>
              </div>
              {
                tokens.map((item, index) => {
                  // if (item.symbol === 'USDT') {
                  if (true) {
                    return (
                      <div
                        className={`p-2 tokenNumber0`}
                        id='tokenItems'
                        onClick={() => { location.assign(`/tracker2/${network}/${hash}/${item.symbol}/${item.contract_address}`) }}
                      >
                        <a href={`/tracker2/${network}/${hash}/${item.symbol}/${item.contract_address}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <span>
                            <img src={`${item.symbol.toUpperCase() !== 'USDT' ? '/images/'+item.symbol : 'https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png'}`} style={{ width: '24px' }} className='ms-1' />
                            {item.name}
                          </span>
                          <span style={{ float: 'left' }}>
                            <Alert color={index % 2 === 0 ? 'primary' : 'warning'} style={{ display: 'inline-block', padding: '2px 4px', fontSize: '12px', margin: '0px', borderRadius: '20px', float: 'left' }}>{item.symbol}</Alert>
                          </span>
                        </a>
                      </div>
                    )
                  }

                })
              }
            </div>
      }
    </div>
  )
}

export default SearchTokens
