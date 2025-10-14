import React, { useEffect, useState } from 'react'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";
import { useParams, usePathname, useRouter } from 'next/navigation'
import { serverAddress } from '@/functions/ServerAddress';
import { GetRequest } from '@/functions/GetRequest';
import { Networks } from '@/functions/Networks';
import axios from 'axios';
import { Modal, Button, Input } from "@heathmont/moon-core-tw";
import Cookies from 'js-cookie';
import ExploreTopBoxLoading from '@/components/ExploreTopBoxLoading/ExploreTopBoxLoading';
import { GetMyTime } from '@/functions/getMyTime';
import { timeSince } from '@/functions/timeSince';
import moment from 'jalali-moment'

const TransactionInfo = ({ TotalUSDValue, SetTotalUSDValue }) => {

    const params = useParams()

    const query = params.query
    const network = params.network
    const hash = params.hash

    const [Risk, SetRisk] = useState(null)
    const [Owner, SetOwner] = useState(null)
    const [IdentificationBy, SetIdentificationBy] = useState(null)
    const [Label, SetLabel] = useState(null)
    const [newLabel, SetnewLabel] = useState(null)
    const [metadata, SetMetadata] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [Loading1, SetLoading1] = useState(false)
    const [Loading2, SetLoading2] = useState(false)

    const [blockNumber, SetblockNumber] = useState(null)
    const [TrValue, SetTrValue] = useState(null)
    const [Fee, SetFee] = useState(null)
    const [Time, SetTime] = useState(null)
    useEffect(() => {
        GetRequest(`${serverAddress}/explorer/search/?query=${hash}&network=${network}`)
            .then((response) => {
                if (Networks.find(item => item.symbole === network).type === 'account') {
                    SetblockNumber(response.data.data.block_number)
                    SetTrValue(response.data.data.value)
                    SetFee(response.data.data.fee)
                    SetTime(response.data.data.time)
                } else {
                    SetblockNumber(response.data.data.block_number)
                    SetTrValue(response.data.data.amount_transacted)
                    SetFee(response.data.data.fee)
                    SetTime(response.data.data.time)
                    if (response.status == 200) {
                        let sum = 0
                        for (let i = 0; i < response.data.data.outputs.length; i++) {
                            sum = sum + response.data.data.outputs[i].ValueInDollar
                        }
                        SetTotalUSDValue(sum)
                    }
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const AddLabel = () => {
        if (newLabel !== null && newLabel !== '') {

            axios.post(serverAddress + "/address-labels/label/",
                {
                    items: [
                        {
                            address: hash,
                            label: newLabel,
                            network: Networks.find(item => item.symbole === network).id
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access')}`
                    }
                }
            )
                .then((response) => {
                    if (Number(response.status) >= 200 && Number(response.status) < 300) {
                        console.log(response.data[0])
                        SetLabel([response.data[0]])
                        SetnewLabel(null)
                        setIsOpen(false)
                        return toast.success('برچسب موردنظر باموفقیت ثبت شد', {
                            position: 'bottom-left'
                        })
                    } else {
                        return toast.error('خطا در پردازش', {
                            position: 'bottom-left'
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return toast.error('خطا در پردازش', {
                        position: 'bottom-left'
                    })
                })
        }
        else {
            return toast.error('برچسب را وارد کنید', {
                position: 'bottom-left'
            })
        }
    }

    const deleteLabel = () => {
        axios.delete(serverAddress + `/address-labels/label/${Label[0].id}/`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                }
            }
        )
            .then((response) => {
                if (Number(response.status) >= 200 && Number(response.status) < 300) {
                    SetLabel(null)
                    console.log(response)
                    return toast.success('برچسب موردنظر باموفقیت حذف شد', {
                        position: 'bottom-left'
                    })
                } else {
                    return toast.error('خطا در پردازش', {
                        position: 'bottom-left'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                return toast.error('خطا در پردازش', {
                    position: 'bottom-left'
                })
            })
    }
    return (
        <div className='bg-gradient-main-2 border border-boxBorderColor rounded-xl main-animated-border-box' style={{ "--dynamic-color": `${Networks.find(item => item.symbole === network).color}` }}>
            <div className='flex justify-between items-center border-b border-b-boxBorderColor p-3'>
                <div className='flex items-center'>
                    <img src={`/images/${network}.png`} className='w-8 inline-block ' />
                    <h6 className='inline-block text-xl mr-2 text-textColor'>
                        تراکنش {Networks.find(item => item.symbole === network).name}
                    </h6>
                </div>
                <div className='flex items-center text-primary cursor-pointer'>
                    {
                        (Label === null || Label.length === 0) ?
                            <div className='flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer'>
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 50 50"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    onClick={() => {
                                        setIsOpen(true)
                                    }}
                                >
                                    <path d="M24.896,9.463c-0.188-0.188-0.441-0.293-0.707-0.293L11.232,9.169c-0.551,0-0.998,0.445-1,0.996L10.186,23.17
      c-0.001,0.267,0.104,0.522,0.293,0.711l16.995,16.995c0.188,0.188,0.441,0.293,0.707,0.293s0.52-0.105,0.707-0.293l13.004-13.004
      c0.391-0.391,0.391-1.023,0-1.414L24.896,9.463z M28.181,38.755L12.188,22.761l0.041-11.592l11.547,0.001l15.995,15.995
      L28.181,38.755z" />
                                    <circle cx="20.362" cy="19.346" r="2.61" />
                                </svg>
                            </div>
                            :
                            <div className='flex items-center justify-center bg-orange-300 text-black transition ml-2 h-9 rounded-4xl cursor-pointer px-4'
                                onClick={() => {
                                    deleteLabel()
                                }}
                            >
                                {Label[0].label}
                            </div>
                    }

                    <div className='flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer'>
                        <ContentCopyIcon className='text-textColor' style={{ fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => {
                                navigator.clipboard.writeText('TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG')
                                toast.success("در کلیپ‌بورد ذخیره شد!", {
                                    position: "bottom-left",
                                });
                            }} />
                    </div>
                    {AddressFormat(hash, 8, query, network, false)}

                </div>
            </div>
            {
                !Loading1 && !Loading2 ?

                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-textColor p-3">
                            <div>
                                <p className='text-textTitleColor'>
                                    شماره بلاک
                                </p>
                                <p>
                                    <svg fill="currentColor" width="20" height="20" className='inline-block ml-1' viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.9530 39.4375 C 22.8671 39.4375 23.4296 38.9922 23.6171 38.1016 L 24.6718 33.0859 L 29.0312 33.0859 L 28.0702 37.6797 C 27.8593 38.6406 28.5390 39.4375 29.4999 39.4375 C 30.4374 39.4375 31.0468 38.9922 31.2343 38.1016 L 32.2890 33.0625 L 34.7265 33.0625 C 35.6405 33.0625 36.2968 32.3828 36.2968 31.4688 C 36.2968 30.6719 35.7343 30.0859 34.9609 30.0859 L 32.9218 30.0859 L 33.9296 25.3516 L 36.3905 25.3516 C 37.3046 25.3516 37.9609 24.6719 37.9609 23.7578 C 37.9609 22.9609 37.3983 22.3750 36.6249 22.3750 L 34.5390 22.3750 L 35.4530 18.0156 C 35.6405 17.0547 34.9374 16.2344 33.9765 16.2344 C 33.0624 16.2344 32.4765 16.7031 32.2890 17.5703 L 31.2812 22.3750 L 26.9218 22.3750 L 27.8124 18.0156 C 28.0234 17.0781 27.3671 16.2344 26.3827 16.2344 C 25.4452 16.2344 24.8593 16.7031 24.6718 17.5703 L 23.6874 22.3750 L 21.2030 22.3750 C 20.3124 22.3750 19.6327 23.0781 19.6327 23.9688 C 19.6327 24.7656 20.1952 25.3516 20.9921 25.3516 L 23.0312 25.3516 L 22.0468 30.0859 L 19.5390 30.0859 C 18.6249 30.0859 17.9687 30.7890 17.9687 31.6797 C 17.9687 32.4766 18.5312 33.0625 19.3280 33.0625 L 21.4374 33.0625 L 20.4765 37.6797 C 20.2890 38.6406 20.9921 39.4375 21.9530 39.4375 Z M 25.0936 30.3672 L 26.1718 25.1172 L 30.9062 25.1172 L 29.8046 30.3672 Z" /></svg>
                                    {
                                        blockNumber !== null ?
                                            `${blockNumber}`
                                            :
                                            'نامشخص'
                                    }

                                </p>
                            </div>

                            <div>
                                <p className='text-textTitleColor'>
                                    حجم تراکنش
                                </p>
                                <p>
                                    <svg fill="currentColor" height="20" width="20" className='inline-block ml-1' version="1.1" id="Filled_Icons"
                                        viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                                        <g id="Transaction-Filled">
                                            <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z" />
                                        </g>
                                    </svg>
                                    <span className={`${Owner !== null ? 'text-primary' : 'text-textColor'} `}>
                                        {
                                            TrValue !== null ?
                                                <span>
                                                    {(TrValue).toLocaleString()}<small className='ml-1'>{network}</small>
                                                </span>
                                                :
                                                'نامشخص'
                                        }
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className='text-textTitleColor'>
                                    مجموع ورودی
                                </p>
                                <p>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-1 inline-block'>
                                        <path d="M3 9V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V9C21 6.17157 21 4.75736 20.1213 3.87868C19.2426 3 17.8284 3 15 3H9" stroke="currentColor" />
                                        <path d="M15 15V16H16V15H15ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM14 8V15H16V8H14ZM15 14H8V16H15V14ZM15.7071 14.2929L7.70711 6.29289L6.29289 7.70711L14.2929 15.7071L15.7071 14.2929Z" fill="currentColor" />
                                    </svg>
                                    <span className='mr-1'>
                                        {
                                            TotalUSDValue !== null ?
                                                <span>
                                                    {(TotalUSDValue).toLocaleString()}<small className='ml-1'>USD</small>
                                                </span>
                                                :
                                                'نامشخص'
                                        }
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className='text-textTitleColor'>
                                    مجموع خروجی
                                </p>
                                <p>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
                                        <path d="M3 3V2H2V3H3ZM12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L12.2929 13.7071ZM4 11V3H2V11H4ZM3 4H11V2H3V4ZM2.29289 3.70711L12.2929 13.7071L13.7071 12.2929L3.70711 2.29289L2.29289 3.70711Z" fill="currentColor" />
                                        <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <span>
                                        {
                                            TotalUSDValue !== null ?
                                                <span>
                                                    {(TotalUSDValue).toLocaleString()}<small className='ml-1'>USD</small>
                                                </span>
                                                :
                                                'نامشخص'
                                        }
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className='text-textTitleColor'>
                                    کارمزد تراکنش
                                </p>
                                <p>
                                    <svg width="20" height="20" className='ml-1 inline-block' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {
                                        Fee !== null ?
                                            <span>
                                                {(Fee).toLocaleString()}<small className='ml-1'>{network}</small>
                                            </span>
                                            :
                                            'نامشخص'
                                    }
                                </p>
                            </div>

                            <div>
                                <p className='text-textTitleColor'>
                                    زمان بلاک
                                </p>
                                <p>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
                                        <path d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" />
                                    </svg>
                                    <span>
                                        {
                                            Time !== null ?

                                                <span style={{ margin: "0px" }}>{(GetMyTime(Time).hour + ':' + GetMyTime(Time).minute + ' - ' + moment(GetMyTime(Time).year + '-' + GetMyTime(Time).month + '-' + GetMyTime(Time).day, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))} ({timeSince(Time)})</span>
                                                :
                                                'نامشخص'
                                        }

                                    </span>
                                </p>
                            </div>

                            <div className='flex items-center w-full'>
                                <button className='border border-primary rounded-lg  text-primary w-full py-2 cursor-pointer'
                                    onClick={() => {
                                        window.location.assign(`/panel/tracker/${network}/${hash}`)
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                                        <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M15 3L12.0605 5.93945V5.93945C12.0271 5.97289 12.0271 6.02711 12.0605 6.06055V6.06055L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 21L11.9473 18.0527V18.0527C11.9764 18.0236 11.9764 17.9764 11.9473 17.9473V17.9473L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 6C14.8284 6 16.2426 6 17.1213 6.87868C18 7.75736 18 9.17157 18 12V15" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 18C9.17157 18 7.75736 18 6.87868 17.1213C6 16.2426 6 14.8284 6 12L6 9" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    ترسیم گراف

                                </button>
                            </div>

                            <div className='flex items-center w-full'>

                                <button className='border border-primary rounded-lg bg-primary text-white w-full py-2 cursor-pointer'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1 '>
                                        <path d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65ZM3.9 17.353L4.65 17.3539V17.353H3.9ZM4.36838 18.5168L4.90602 17.9939L4.90602 17.9939L4.36838 18.5168ZM5.50192 19L5.50099 19.75H5.50192V19ZM17.8981 19L17.8981 19.75L17.899 19.75L17.8981 19ZM19.0316 18.5168L18.494 17.9939L18.494 17.9939L19.0316 18.5168ZM19.5 17.353L18.75 17.353L18.75 17.3539L19.5 17.353ZM19.5 8.647L18.75 8.64611V8.647H19.5ZM19.0316 7.48322L18.494 8.00615L18.494 8.00615L19.0316 7.48322ZM17.8981 7L17.899 6.25H17.8981V7ZM12.2226 6.25C11.8084 6.25 11.4726 6.58579 11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75V6.25ZM3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75C4.31421 7.75 4.65 7.41421 4.65 7H3.15ZM3.9 5.647L4.65 5.647L4.64999 5.64611L3.9 5.647ZM5.50192 4L5.50192 3.25L5.50099 3.25L5.50192 4ZM10.6207 4L10.6216 3.25H10.6207V4ZM12.2226 5.647L11.4726 5.64611V5.647H12.2226ZM11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7H11.4726ZM3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75V6.25ZM12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7C12.9726 6.58579 12.6368 6.25 12.2226 6.25V7.75ZM3.15 7V17.353H4.65V7H3.15ZM3.15 17.3521C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397L4.90602 17.9939C4.74389 17.8272 4.64971 17.5973 4.64999 17.3539L3.15 17.3521ZM3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75L5.50285 18.25C5.28261 18.2497 5.06751 18.1599 4.90602 17.9939L3.83074 19.0397ZM5.50192 19.75H17.8981V18.25H5.50192V19.75ZM17.899 19.75C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397L18.494 17.9939C18.3325 18.1599 18.1174 18.2497 17.8971 18.25L17.899 19.75ZM19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521L18.75 17.3539C18.7503 17.5973 18.6561 17.8272 18.494 17.9939L19.5692 19.0397ZM20.25 17.353V8.647H18.75V17.353H20.25ZM20.25 8.64789C20.2507 8.01874 20.008 7.41136 19.5692 6.9603L18.494 8.00615C18.6561 8.17283 18.7503 8.4027 18.75 8.64611L20.25 8.64789ZM19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25L17.8971 7.75C18.1174 7.75027 18.3325 7.8401 18.494 8.00615L19.5692 6.9603ZM17.8981 6.25H12.2226V7.75H17.8981V6.25ZM4.65 7V5.647H3.15V7H4.65ZM4.64999 5.64611C4.64971 5.4027 4.74389 5.17283 4.90602 5.00615L3.83074 3.9603C3.39203 4.41136 3.14925 5.01874 3.15 5.64789L4.64999 5.64611ZM4.90602 5.00615C5.06751 4.8401 5.28261 4.75027 5.50285 4.75L5.50099 3.25C4.87048 3.25079 4.27008 3.5086 3.83074 3.9603L4.90602 5.00615ZM5.50192 4.75H10.6207V3.25H5.50192V4.75ZM10.6197 4.75C10.84 4.75027 11.0551 4.8401 11.2166 5.00615L12.2918 3.9603C11.8525 3.5086 11.2521 3.25079 10.6216 3.25L10.6197 4.75ZM11.2166 5.00615C11.3787 5.17283 11.4729 5.4027 11.4726 5.64611L12.9726 5.64789C12.9733 5.01874 12.7306 4.41136 12.2918 3.9603L11.2166 5.00615ZM11.4726 5.647V7H12.9726V5.647H11.4726ZM3.9 7.75H12.2226V6.25H3.9V7.75Z" fill="currentColor" />
                                        <path d="M9.75 12.25C9.33579 12.25 9 12.5858 9 13C9 13.4142 9.33579 13.75 9.75 13.75V12.25ZM11.7 13.75C12.1142 13.75 12.45 13.4142 12.45 13C12.45 12.5858 12.1142 12.25 11.7 12.25V13.75ZM11.7 12.25C11.2858 12.25 10.95 12.5858 10.95 13C10.95 13.4142 11.2858 13.75 11.7 13.75V12.25ZM13.65 13.75C14.0642 13.75 14.4 13.4142 14.4 13C14.4 12.5858 14.0642 12.25 13.65 12.25V13.75ZM12.45 13C12.45 12.5858 12.1142 12.25 11.7 12.25C11.2858 12.25 10.95 12.5858 10.95 13H12.45ZM10.95 15C10.95 15.4142 11.2858 15.75 11.7 15.75C12.1142 15.75 12.45 15.4142 12.45 15H10.95ZM10.95 13C10.95 13.4142 11.2858 13.75 11.7 13.75C12.1142 13.75 12.45 13.4142 12.45 13H10.95ZM12.45 11C12.45 10.5858 12.1142 10.25 11.7 10.25C11.2858 10.25 10.95 10.5858 10.95 11H12.45ZM9.75 13.75H11.7V12.25H9.75V13.75ZM11.7 13.75H13.65V12.25H11.7V13.75ZM10.95 13V15H12.45V13H10.95ZM12.45 13V11H10.95V13H12.45Z" fill="currentColor" />
                                    </svg>
                                    افزوودن به پرونده
                                </button>
                            </div>
                        </div>

                    </div>
                    :
                    <ExploreTopBoxLoading />
            }

            <Modal open={isOpen} onClose={() => { setIsOpen(false) }}>
                <Modal.Backdrop />
                <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
                    <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[200px] text-textColor p-4">
                        <h5>
                            برچسب موردنظر را وارد کنید
                        </h5>
                        <Input className='border border-boxBorderColor rounded-md mt-4' placeholder='برچسب' onChange={(e) => { SetnewLabel(e.target.value) }} value={newLabel} />
                        <button className='bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4' onClick={() => AddLabel()}>
                            ثبت
                        </button>
                    </Modal.Panel>
                </div>
            </Modal>

        </div>
    )
}

export default TransactionInfo
