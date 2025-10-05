/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Networks } from '@/functions/Networks'

const NetworkSelection = ({ networks, FoundedType, address }) => {

    return (
        <div
            style={{
                backdropFilter: 'blur(1px)',
                borderRadius: '16px',
                overflow: 'hidden',
            }}
            className=" bg-boxColor shadow-none font-iranSans border border-boxBorderColor text-textColor"
            id="NetworkSelection"
        >
            {
                networks.map((network, index) => {
                    return (
                        <a style={{ color: 'inherit' }} className='' href={`/panel/dashboard/${FoundedType}/${address}`}>
                            <div className='m-1 p-2 selectNetworkBox hover:bg-bgPrimary cursor-pointer rounded-xl' style={{  transition: '0.2s', textAlign: 'right' }} id='SelectionNetworkForExploreLinks'>
                                <img src={`/images/${Networks.find(item => item.symbole === network).symbole}.png`} style={{ width: '20px' }} className='inline-block'/>
                                <span style={{ marginRight: '4px' }}>
                                    {Networks.find(item => item.symbole === network).name}
                                </span>
                                <span style={{ float: 'left' }}>
                                    {Networks.find(item => item.symbole === network).name} - {Networks.find(item => item.symbole === network).symbole}
                                </span>
                            </div>
                        </a>
                    )
                })
            }
        </div>
    )
}

export default NetworkSelection