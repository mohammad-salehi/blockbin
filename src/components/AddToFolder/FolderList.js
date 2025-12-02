import React, { useEffect, useState } from 'react'
import { MenuItem } from "@heathmont/moon-core-tw";
import { serverAddress } from '@/functions/ServerAddress';
import { GetRequest } from '@/functions/GetRequest';
import ExploreTopBoxLoading from '../ExploreTopBoxLoading/ExploreTopBoxLoading';
import axios from 'axios';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

const FolderList = ({ address, network, type, setFolderIsOpen, Description = '', title = '' }) => {
    const [folders, Setfolders] = useState([])
    const [Loading, SetLoading] = useState(false)
    const [ButtonLoading, SetButtonLoading] = useState(false)

    useEffect(() => {
        SetLoading(true)
        GetRequest(`${serverAddress}/case/management/`)
            .then((response) => {
                const getData = []
                for (let i = 0; i < response.data.length; i++) {
                    getData.push(
                        {
                            label: response.data[i].name,
                            value: response.data[i].id
                        }
                    )
                }
                Setfolders(getData)
                SetLoading(false)
            })
            .catch((err) => {
                console.log(err);
                SetLoading(false)
            });
    }, []);

    const AddToFolder = (id) => {
        if (type === 'address') {
            SetButtonLoading(true)
            axios.post(
                `${serverAddress}/case/address-list/`,
                {
                    address_hash: address,
                    case: id,
                    network: network,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                }
            )
                .then((response) => {
                    SetButtonLoading(false)
                    toast.success('باموفقیت افزوده شد', {
                        position: 'bottom-left'
                    })
                    setFolderIsOpen(false)
                })
                .catch((err) => {
                    console.log(err);
                    SetButtonLoading(false)
                });
        } else if (type === 'transaction') {
            SetButtonLoading(true)
            axios.post(
                `${serverAddress}/case/transaction-list/`,
                {
                    hash: address,
                    case: id,
                    network: network,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                }
            )
                .then((response) => {
                    SetButtonLoading(false)
                    toast.success('باموفقیت افزوده شد', {
                        position: 'bottom-left'
                    })
                    setFolderIsOpen(false)
                })
                .catch((err) => {
                    console.log(err);
                    SetButtonLoading(false)
                });
        } else if (type === 'graph') {
            SetButtonLoading(true)
            axios.post(`${serverAddress}/case/graph-list/`,
                {
                    graph_detail: {
                        id:address,
                        network,
                        title,
                        Description
                    },
                    case: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    },
                }
            )
                .then((response) => {
                    SetButtonLoading(false)
                    toast.success('باموفقیت افزوده شد', {
                        position: 'bottom-left'
                    })
                    setFolderIsOpen(false)
                })
                .catch((err) => {
                    console.log(err);
                    SetButtonLoading(false)
                });
        }

    }

    return (
        <div>
            {
                Loading ?
                    <ExploreTopBoxLoading />
                    :
                    folders.map((item, index) => {
                        return (
                            <div key={index} className="w-full" onClick={() => {
                                AddToFolder(item.value)
                            }}>
                                <MenuItem
                                    isActive={false}
                                    isSelected={false}
                                    onClick={() => {

                                    }}
                                    className={`border mt-2 mb-1 rounded-md border-gray-100 dark:border-buttonBorderColor-dark 
                        ${true
                                            ? "bg-boxColor border-boxBorderColor dark:bg-gray-700" // اگر خواستی هایلایت
                                            : "border-boxBorderColor"
                                        } text-textColor`}
                                >
                                    <MenuItem.Title>
                                        {item.label || item.value}
                                    </MenuItem.Title>
                                </MenuItem>
                            </div>
                        )
                    })
            }
            <button className='bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4' >
                {
                    ButtonLoading ?
                        'درحال افزودن...'
                        :
                        'افزودن'
                }

            </button>
        </div>
    )
}

export default FolderList
