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
import FolderList from '@/components/AddToFolder/FolderList';
import { formatSmallNumber } from '@/functions/formatSmallNumber';

const TransactionInfo = ({ TotalUSDValue, SetTotalUSDValue }) => {

    const params = useParams()

    const query = params.query
    const network = params.network
    const hash = params.hash

    const [Owner, SetOwner] = useState(null)
    const [Label, SetLabel] = useState(null)
    const [newLabel, SetnewLabel] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [Loading1, SetLoading1] = useState(false)

    const [blockNumber, SetblockNumber] = useState(null)
    const [TrValue, SetTrValue] = useState(null)
    const [Fee, SetFee] = useState(null)
    const [Time, SetTime] = useState(null)
    const [isFolderOpen, setFolderIsOpen] = useState(false);

    useEffect(() => {
        SetLoading1(true)
        if (Networks.find(item => item.symbole === network).type === 'utxo') {
            GetRequest(`${serverAddress}/explorer/utxo/transaction/${hash}/?network=${network}&page_number_from=1&page_size_from=1&page_number_to=2&page_size_to=2`)
                .then((response) => {
                    console.log(response)
                    if (Networks.find(item => item.symbole === network).type === 'account') {
                        SetblockNumber(response.data.data.result.block_number)
                        SetTrValue(response.data.data.result.value)
                        SetFee(response.data.data.result.fee)
                        SetTime(response.data.data.result.time)
                        if (response.data.data.result.label_tag.labels.length > 0) {
                            SetLabel(response.data.data.result.label_tag.labels)
                        }
                    } else {
                        SetblockNumber(response.data.data.result.block_number)
                        SetTrValue(response.data.data.result.amount_transacted)
                        SetFee(response.data.data.result.fee)
                        SetTime(response.data.data.result.time)
                        if (response.data.data.result.label_tag.labels.length > 0) {
                            SetLabel(response.data.data.result.label_tag.labels)
                        }
                    }

                    SetLoading1(false)
                })
                .catch((err) => {
                    console.log(err)
                    SetLoading1(false)
                })
        } else {
            GetRequest(`${serverAddress}/explorer/evm/transaction/${hash}/?network=${network}&page_number_from=1&page_size_from=1&page_number_to=2&page_size_to=2`)
                .then((response) => {
                    console.log('trs2')
                    console.log(response)
                    if (Networks.find(item => item.symbole === network).type === 'account') {
                        SetblockNumber(response.data.data.result.block_number)
                        SetTrValue(response.data.data.result.value)
                        SetFee(response.data.data.result.fee)
                        SetTime(response.data.data.result.time)
                        if (response.data.data.result.labels_tags.labels.length > 0) {
                            SetLabel(response.data.data.result.labels_tags.labels)
                        }
                    } else {
                        SetblockNumber(response.data.data.result.block_number)
                        SetTrValue(response.data.data.result.amount_transacted)
                        SetFee(response.data.data.result.fee)
                        SetTime(response.data.data.result.time)
                        if (response.data.data.result.label_tag.labels.length > 0) {
                            SetLabel(response.data.data.result.label_tag.labels)
                        }
                    }

                    SetLoading1(false)
                })
                .catch((err) => {
                    console.log(err)
                    SetLoading1(false)
                })
        }
    }, [])

    const AddLabel = () => {
        if (newLabel !== null && newLabel !== '') {

            axios.post(serverAddress + "/address-labels/label/",
                {
                    address: hash,
                    label: newLabel,
                    network: Networks.find(item => item.symbole === network).uuid
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

    return (
        <div
            className="relative rounded-2xl border border-boxBorderColor main-animated-border-box overflow-visible transition-all duration-500 hover:shadow-2xl"
            style={{
                "--dynamic-color": `${Networks.find((item) => item.symbole === network)?.color || "#3b82f6"
                    }`,
            }}
        >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-bgColor/90 to-bgColor/40 backdrop-blur-sm">
                {/* Animated Gradient Orbs */}
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse"
                    style={{
                        background: `radial-gradient(circle, ${Networks.find((item) => item.symbole === network)?.color || "#3b82f6"
                            }, transparent)`,
                    }}
                />
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"
                    style={{
                        background: `radial-gradient(circle, ${Networks.find((item) => item.symbole === network)?.color || "#3b82f6"
                            }, transparent)`,
                    }}
                />

                {/* Grid Pattern for Depth */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    }}
                />

                <div className="relative flex flex-col h-full z-10 animate-fade-in-up">
                    {/* Header Section - Premium */}
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 p-6 border-b border-boxBorderColor/30 bg-gradient-to-r from-transparent via-bgColor/20 to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-xl blur-md" />
                                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-bgColor to-bgColor/80 border border-boxBorderColor shadow-lg backdrop-blur grid place-items-center text-textColor group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={`/images/${network}.png`}
                                        className="w-7 h-7 object-contain"
                                        alt={network}
                                    />
                                </div>
                            </div>
                            <div>
                                <h6 className="text-2xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent tracking-tight">
                                    تراکنش {Networks.find((item) => item.symbole === network)?.name}
                                </h6>
                                <p className="text-xs text-textTitleColor mt-1 flex items-center gap-1">
                                    <span className="inline-block w-1 h-1 rounded-full bg-primary/70 animate-pulse" />
                                    جزئیات کامل تراکنش
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                            {Label === null || Label.length === 0 ? (
                                <button
                                    type="button"
                                    className="group relative inline-flex items-center justify-center h-10 w-10 rounded-xl
                                 bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor
                                 hover:bg-bgColor hover:border-boxBorderColor transition-all duration-300 active:scale-[0.95] shadow-sm
                                 overflow-hidden"
                                    onClick={() => !Loading1 && setIsOpen(true)}
                                    aria-label="افزودن برچسب"
                                    title="افزودن برچسب"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 50 50"
                                        fill="currentColor"
                                        className="relative z-10 opacity-90 group-hover:opacity-100"
                                    >
                                        <path d="M24.896,9.463c-0.188-0.188-0.441-0.293-0.707-0.293L11.232,9.169c-0.551,0-0.998,0.445-1,0.996L10.186,23.17c-0.001,0.267,0.104,0.522,0.293,0.711l16.995,16.995c0.188,0.188,0.441,0.293,0.707,0.293s0.52-0.105,0.707-0.293l13.004-13.004c0.391-0.391,0.391-1.023,0-1.414L24.896,9.463z M28.181,38.755L12.188,22.761l0.041-11.592l11.547,0.001l15.995,15.995L28.181,38.755z" />
                                        <circle cx="20.362" cy="19.346" r="2.61" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 h-10 rounded-xl px-4
                                 bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white
                                 border border-orange-400/60 shadow-md
                                 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-[0.95]"
                                >
                                    <span className="text-sm font-bold">{Label[0].label}</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(hash);
                                    toast.success("در کلیپ‌بورد ذخیره شد!", { position: "bottom-left" });
                                }}
                                className="group relative inline-flex items-center justify-center h-10 w-10 rounded-xl
                               bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor
                               hover:bg-bgColor hover:border-boxBorderColor transition-all duration-300 active:scale-[0.95] shadow-sm
                               overflow-hidden"
                                aria-label="کپی"
                                title="کپی"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <ContentCopyIcon
                                    className="text-textColor relative z-10"
                                    style={{ fontSize: "18px" }}
                                />
                            </button>

                            <div className="px-4 py-2 rounded-xl bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor text-sm shadow-sm font-mono">
                                {AddressFormat(hash, 8, query, network, false)}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {!Loading1 ? (
                        <div className="flex-1 p-6">
                            {/* First Row: Block, Volume, Fee, Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {/* Block Number */}
                                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl -mr-12 -mt-12" />
                                    <div className="relative z-10">
                                        <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            شماره بلاک
                                        </p>
                                        <p className="text-2xl font-black flex items-center gap-3 tabular-nums tracking-tight text-textColor">
                                            <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                                                <svg fill="currentColor" width="22" height="22" viewBox="0 0 56 56">
                                                    <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.9530 39.4375 C 22.8671 39.4375 23.4296 38.9922 23.6171 38.1016 L 24.6718 33.0859 L 29.0312 33.0859 L 28.0702 37.6797 C 27.8593 38.6406 28.5390 39.4375 29.4999 39.4375 C 30.4374 39.4375 31.0468 38.9922 31.2343 38.1016 L 32.2890 33.0625 L 34.7265 33.0625 C 35.6405 33.0625 36.2968 32.3828 36.2968 31.4688 C 36.2968 30.6719 35.7343 30.0859 34.9609 30.0859 L 32.9218 30.0859 L 33.9296 25.3516 L 36.3905 25.3516 C 37.3046 25.3516 37.9609 24.6719 37.9609 23.7578 C 37.9609 22.9609 37.3983 22.3750 36.6249 22.3750 L 34.5390 22.3750 L 35.4530 18.0156 C 35.6405 17.0547 34.9374 16.2344 33.9765 16.2344 C 33.0624 16.2344 32.4765 16.7031 32.2890 17.5703 L 31.2812 22.3750 L 26.9218 22.3750 L 27.8124 18.0156 C 28.0234 17.0781 27.3671 16.2344 26.3827 16.2344 C 25.4452 16.2344 24.8593 16.7031 24.6718 17.5703 L 23.6874 22.3750 L 21.2030 22.3750 C 20.3124 22.3750 19.6327 23.0781 19.6327 23.9688 C 19.6327 24.7656 20.1952 25.3516 20.9921 25.3516 L 23.0312 25.3516 L 22.0468 30.0859 L 19.5390 30.0859 C 18.6249 30.0859 17.9687 30.7890 17.9687 31.6797 C 17.9687 32.4766 18.5312 33.0625 19.3280 33.0625 L 21.4374 33.0625 L 20.4765 37.6797 C 20.2890 38.6406 20.9921 39.4375 21.9530 39.4375 Z M 25.0936 30.3672 L 26.1718 25.1172 L 30.9062 25.1172 L 29.8046 30.3672 Z" />
                                                </svg>
                                            </span>
                                            {blockNumber !== null ? blockNumber.toLocaleString() : "نامشخص"}
                                        </p>
                                    </div>
                                </div>

                                {/* Transaction Volume */}
                                {/* Transaction Volume - بررسی و تأیید */}
                                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        حجم تراکنش
                                    </p>
                                    <p className="text-2xl font-black flex items-center tabular-nums tracking-tight text-textColor">
                                        <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                                            <svg fill="currentColor" height="22" width="22" viewBox="0 0 24 24">
                                                <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z" />
                                            </svg>
                                        </span>
                                        <span className={Owner !== null ? "text-primary" : "text-textColor"}>
                                            {TrValue !== null ? (
                                                <>
                                                    <small className="mr-3 ml-3 text-sm font-medium text-textTitleColor">
                                                        ({network})
                                                    </small>
                                                    {TrValue.toLocaleString()}
                                                </>
                                            ) : (
                                                "نامشخص"
                                            )}
                                        </span>
                                    </p>
                                </div>

                                {/* Fee */}
                                {/* Fee - اصلاح شده */}
                                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                        کارمزد تراکنش
                                    </p>
                                    <p className="text-2xl font-black flex items-center tabular-nums tracking-tight text-textColor">
                                        <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        {Fee !== null ? (
                                            <>
                                                <small className="ml-3 mr-3 text-sm font-medium text-textTitleColor">
                                                    ({network})
                                                </small>
                                                {formatSmallNumber(Fee)}
                                            </>
                                        ) : (
                                            "نامشخص"
                                        )}
                                    </p>
                                </div>

                                {/* Time */}
                                {/* Time - اصلاح شده */}
                                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                        زمان بلاک
                                    </p>
                                    <div className="flex items-start gap-3">
                                        <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner shrink-0 text-textColor">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <div className="flex-1 text-textColor">
                                            {Time !== null && Time !== 0 ? (
                                                <>
                                                    <div className="font-bold">
                                                        {GetMyTime(Time).hour}:{GetMyTime(Time).minute} -{" "}
                                                        {moment(
                                                            `${GetMyTime(Time).year}-${GetMyTime(Time).month}-${GetMyTime(Time).day}`,
                                                            "YYYY/MM/DD"
                                                        )
                                                            .locale("fa")
                                                            .format("YYYY/MM/DD")}
                                                    </div>
                                                    <div className="text-xs text-textTitleColor mt-1">
                                                        ({timeSince(Time)})
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-textColor">نامشخص</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <button
                                    className="group relative rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg
                                 hover:from-primary/90 hover:to-primary/70 hover:shadow-primary/30 hover:shadow-xl
                                 transition-all duration-300 active:scale-[0.97] 
                                 flex items-center justify-center gap-3 h-12 cursor-pointer overflow-hidden"
                                    onClick={() => window.location.assign(`/panel/tracker/${network}/${hash}`)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="relative z-10"
                                    >
                                        <path
                                            d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M15 3L12.0605 5.93945V5.93945C12.0271 5.97289 12.0271 6.02711 12.0605 6.06055V6.06055L15 9"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 21L11.9473 18.0527V18.0527C11.9764 18.0236 11.9764 17.9764 11.9473 17.9473V17.9473L9 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 6C14.8284 6 16.2426 6 17.1213 6.87868C18 7.75736 18 9.17157 18 12V15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M12 18C9.17157 18 7.75736 18 6.87868 17.1213C6 16.2426 6 14.8284 6 12L6 9"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <span className="relative z-10 font-bold text-base">ترسیم گراف</span>
                                </button>

                                <button
                                    className="group relative rounded-xl border border-primary/50 text-primary bg-bgColor/60 backdrop-blur-md
                                 hover:bg-primary/10 hover:border-primary hover:shadow-md
                                 transition-all duration-300 active:scale-[0.97] 
                                 flex items-center justify-center gap-2 h-12 cursor-pointer overflow-hidden"
                                    onClick={() => setFolderIsOpen(true)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="relative z-10"
                                    >
                                        <path
                                            d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M3.15 7V17.353C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75H17.899C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521V8.64789C20.2507 8.01874 20.008 7.41136 19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25H12.2226"
                                            fill="currentColor"
                                            opacity="0.6"
                                        />
                                    </svg>
                                    <span className="relative z-10 font-semibold">افزودن به پرونده</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 p-6">
                            <div className="space-y-4 animate-pulse">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-28 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="h-12 bg-bgColor/40 rounded-xl border border-boxBorderColor/50" />
                                    <div className="h-12 bg-bgColor/40 rounded-xl border border-boxBorderColor/50" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modals - Improved Glassmorphic */}
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <Modal.Backdrop />
                        <div className="fixed inset-0 flex z-50 backdrop-blur-md bg-black/40">
                            <Modal.Panel className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-bgColor to-bgColor/95 shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor/60">
                                <h5 className="text-xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent">
                                    برچسب موردنظر را وارد کنید
                                </h5>
                                <p className="text-xs text-textTitleColor mt-1">
                                    یک برچسب کوتاه و قابل تشخیص وارد کنید.
                                </p>

                                <Input
                                    className="border border-boxBorderColor/60 rounded-xl mt-4 bg-bgColor/50 focus:ring-2 focus:ring-primary/30 text-textColor"
                                    placeholder="برچسب"
                                    onChange={(e) => SetnewLabel(e.target.value)}
                                    value={newLabel}
                                />

                                <button
                                    className="bg-gradient-to-r from-primary to-primary/80 rounded-xl text-white w-full py-2.5 cursor-pointer mt-4
                                 transition hover:opacity-90 active:scale-[0.98] shadow-lg font-semibold"
                                    onClick={AddLabel}
                                >
                                    ثبت
                                </button>
                            </Modal.Panel>
                        </div>
                    </Modal>

                    <Modal open={isFolderOpen} onClose={() => setFolderIsOpen(false)}>
                        <Modal.Backdrop />
                        <div className="fixed inset-0 flex z-50 backdrop-blur-md bg-black/40">
                            <Modal.Panel className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-bgColor to-bgColor/95 shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor/60">
                                <h5 className="text-xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent">
                                    پرونده موردنظر را انتخاب کنید
                                </h5>
                                <p className="text-xs text-textTitleColor mt-1">
                                    یک پرونده را انتخاب کنید تا این تراکنش به آن اضافه شود.
                                </p>

                                <div className="mt-4">
                                    <FolderList
                                        address={hash}
                                        network={Networks.find((item) => item.symbole === network)?.id}
                                        type="transaction"
                                        setFolderIsOpen={setFolderIsOpen}
                                    />
                                </div>
                            </Modal.Panel>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );

}

export default TransactionInfo
