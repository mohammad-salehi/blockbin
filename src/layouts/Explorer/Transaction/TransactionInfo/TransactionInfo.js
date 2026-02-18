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
            className="relative rounded-2xl border border-boxBorderColor main-animated-border-box overflow-visible"
            style={{ "--dynamic-color": `${Networks.find(item => item.symbole === network).color}` }}
        >
            <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-main-2" />
                <div
                    className="absolute -top-24 -right-24 h-72 w-72 blur-3xl opacity-30"
                    style={{ background: `${Networks.find(item => item.symbole === network).color}` }}
                />
                <div
                    className="absolute -bottom-28 -left-28 h-80 w-80 blur-3xl opacity-20"
                    style={{ background: `${Networks.find(item => item.symbole === network).color}` }}
                />

                <div className="relative">
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 p-4 border-b border-b-boxBorderColor/70">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-2xl bg-bgColor/70 border border-boxBorderColor flex items-center justify-center overflow-hidden shadow-sm backdrop-blur">
                                <img src={`/images/${network}.png`} className="w-8 h-8 object-contain" alt={network} />
                            </div>

                            <div className="leading-tight">
                                <h6 className="text-lg xl:text-xl font-extrabold text-textColor">
                                    تراکنش {Networks.find(item => item.symbole === network).name}
                                </h6>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 xl:gap-3 text-primary">
                            {(Label === null || Label.length === 0) ? (
                                <button
                                    type="button"
                                    className="group inline-flex items-center justify-center h-10 w-10 rounded-2xl
                               bg-bgColor/70 border border-boxBorderColor text-textColor
                               hover:bg-bgColor transition active:scale-[0.98] shadow-sm cursor-pointer"
                                    onClick={() => { if (!Loading1) setIsOpen(true) }}
                                    aria-label="افزودن برچسب"
                                    title="افزودن برچسب"
                                >
                                    <svg width="22" height="22" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true" className="opacity-90 group-hover:opacity-100">
                                        <path d="M24.896,9.463c-0.188-0.188-0.441-0.293-0.707-0.293L11.232,9.169c-0.551,0-0.998,0.445-1,0.996L10.186,23.17
        c-0.001,0.267,0.104,0.522,0.293,0.711l16.995,16.995c0.188,0.188,0.441,0.293,0.707,0.293s0.52-0.105,0.707-0.293l13.004-13.004
        c0.391-0.391,0.391-1.023,0-1.414L24.896,9.463z M28.181,38.755L12.188,22.761l0.041-11.592l11.547,0.001l15.995,15.995
        L28.181,38.755z" />
                                        <circle cx="20.362" cy="19.346" r="2.61" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 h-10 rounded-2xl px-4
                               bg-orange-300/90 text-black border border-orange-200/60
                               hover:bg-orange-300 transition active:scale-[0.98] shadow-sm"
                                >
                                    <span className="text-sm font-bold">{Label[0].label}</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(hash)
                                    toast.success("در کلیپ‌بورد ذخیره شد!", { position: "bottom-left" });
                                }}
                                className="inline-flex items-center justify-center h-10 w-10 rounded-2xl
                             bg-bgColor/70 border border-boxBorderColor text-textColor
                             hover:bg-bgColor transition active:scale-[0.98] shadow-sm cursor-pointer"
                                aria-label="کپی"
                                title="کپی"
                            >
                                <ContentCopyIcon className="text-textColor" style={{ fontSize: "16px", cursor: "pointer" }} />
                            </button>

                            <div className="px-3 py-2 rounded-2xl bg-bgColor/70 border border-boxBorderColor text-textColor text-sm shadow-sm">
                                {AddressFormat(hash, 8, query, network, false)}
                            </div>
                        </div>
                    </div>

                    {!Loading1 ? (
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-textColor">
                                <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur
                                  hover:bg-bgColor/70 hover:shadow-md transition">
                                    <p className="text-textTitleColor text-xs mb-2">شماره بلاک</p>
                                    <p className="text-base font-extrabold flex items-center gap-2 tabular-nums">
                                        <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                                            <svg fill="currentColor" width="18" height="18" viewBox="0 0 56 56">
                                                <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.9530 39.4375 C 22.8671 39.4375 23.4296 38.9922 23.6171 38.1016 L 24.6718 33.0859 L 29.0312 33.0859 L 28.0702 37.6797 C 27.8593 38.6406 28.5390 39.4375 29.4999 39.4375 C 30.4374 39.4375 31.0468 38.9922 31.2343 38.1016 L 32.2890 33.0625 L 34.7265 33.0625 C 35.6405 33.0625 36.2968 32.3828 36.2968 31.4688 C 36.2968 30.6719 35.7343 30.0859 34.9609 30.0859 L 32.9218 30.0859 L 33.9296 25.3516 L 36.3905 25.3516 C 37.3046 25.3516 37.9609 24.6719 37.9609 23.7578 C 37.9609 22.9609 37.3983 22.3750 36.6249 22.3750 L 34.5390 22.3750 L 35.4530 18.0156 C 35.6405 17.0547 34.9374 16.2344 33.9765 16.2344 C 33.0624 16.2344 32.4765 16.7031 32.2890 17.5703 L 31.2812 22.3750 L 26.9218 22.3750 L 27.8124 18.0156 C 28.0234 17.0781 27.3671 16.2344 26.3827 16.2344 C 25.4452 16.2344 24.8593 16.7031 24.6718 17.5703 L 23.6874 22.3750 L 21.2030 22.3750 C 20.3124 22.3750 19.6327 23.0781 19.6327 23.9688 C 19.6327 24.7656 20.1952 25.3516 20.9921 25.3516 L 23.0312 25.3516 L 22.0468 30.0859 L 19.5390 30.0859 C 18.6249 30.0859 17.9687 30.7890 17.9687 31.6797 C 17.9687 32.4766 18.5312 33.0625 19.3280 33.0625 L 21.4374 33.0625 L 20.4765 37.6797 C 20.2890 38.6406 20.9921 39.4375 21.9530 39.4375 Z M 25.0936 30.3672 L 26.1718 25.1172 L 30.9062 25.1172 L 29.8046 30.3672 Z" />
                                            </svg>
                                        </span>
                                        {blockNumber !== null ? `${blockNumber}` : "نامشخص"}
                                    </p>
                                </div>

                                <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur
                                  hover:bg-bgColor/70 hover:shadow-md transition">
                                    <p className="text-textTitleColor text-xs mb-2">حجم تراکنش</p>
                                    <p className="text-base font-extrabold flex items-center gap-2 tabular-nums">
                                        <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                                            <svg fill="currentColor" height="18" width="18" viewBox="0 0 24 24">
                                                <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z" />
                                            </svg>
                                        </span>
                                        <span className={`${Owner !== null ? "text-primary" : "text-textColor"}`}>
                                            {TrValue !== null ? (
                                                <span>
                                                    {TrValue.toLocaleString()}
                                                    <small className="ml-1 opacity-80">{network}</small>
                                                </span>
                                            ) : (
                                                "نامشخص"
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur
                                  hover:bg-bgColor/70 hover:shadow-md transition">
                                    <p className="text-textTitleColor text-xs mb-2">کارمزد تراکنش</p>
                                    <p className="text-base font-extrabold flex items-center gap-2 tabular-nums">
                                        <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        {Fee !== null ? (
                                            <span>
                                                {Fee.toLocaleString()}
                                                <small className="ml-1 opacity-80">{network}</small>
                                            </span>
                                        ) : (
                                            "نامشخص"
                                        )}
                                    </p>
                                </div>

                                <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur
                                  hover:bg-bgColor/70 hover:shadow-md transition">
                                    <p className="text-textTitleColor text-xs mb-2">زمان بلاک</p>
                                    <p className="text-base font-extrabold flex items-start gap-2">
                                        <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor mt-0.5">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>

                                        <span className="leading-6">
                                            {Time !== null ? (
                                                <span style={{ margin: "0px" }}>
                                                    {GetMyTime(Time).hour + ":" + GetMyTime(Time).minute + " - " +
                                                        moment(GetMyTime(Time).year + "-" + GetMyTime(Time).month + "-" + GetMyTime(Time).day, "YYYY/MM/DD")
                                                            .locale("fa")
                                                            .format("YYYY/MM/DD")}{" "}
                                                    <span className="text-xs text-textTitleColor">({timeSince(Time)})</span>
                                                </span>
                                            ) : (
                                                "نامشخص"
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <button

                                    className="h-11 rounded-2xl bg-primary text-white shadow-sm
                               hover:opacity-95 transition active:scale-[0.99] flex items-center justify-center gap-2"
                                    onClick={() => window.location.assign(`/panel/tracker/${network}/${hash}`)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M15 3L12.0605 5.93945V5.93945C12.0271 5.97289 12.0271 6.02711 12.0605 6.06055V6.06055L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 21L11.9473 18.0527V18.0527C11.9764 18.0236 11.9764 17.9764 11.9473 17.9473V17.9473L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 6C14.8284 6 16.2426 6 17.1213 6.87868C18 7.75736 18 9.17157 18 12V15" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 18C9.17157 18 7.75736 18 6.87868 17.1213C6 16.2426 6 14.8284 6 12L6 9" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    ترسیم گراف
                                </button>

                                <button
                                    className="h-11 rounded-2xl border border-primary text-primary bg-bgColor/40 backdrop-blur
                               hover:bg-primary/10 transition active:scale-[0.99] flex items-center justify-center gap-2"
                                    onClick={() => setFolderIsOpen(true)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-95">
                                        <path d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65Z" fill="currentColor" />
                                        <path d="M3.15 7V17.353C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75H17.899C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521V8.64789C20.2507 8.01874 20.008 7.41136 19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25H12.2226"
                                            fill="currentColor" opacity="0.6" />
                                    </svg>
                                    افزودن به پرونده
                                </button>
                            </div>
                        </div>
                    ) : (
                        <ExploreTopBoxLoading />
                    )}

                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <Modal.Backdrop />
                        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-black/30">
                            <Modal.Panel className="w-full max-w-xl rounded-3xl bg-boxColor shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor">
                                <h5 className="text-lg font-extrabold">برچسب موردنظر را وارد کنید</h5>
                                <p className="text-xs text-textTitleColor mt-1">یک برچسب کوتاه و قابل تشخیص وارد کنید.</p>

                                <Input
                                    className="border border-boxBorderColor rounded-2xl mt-4"
                                    placeholder="برچسب"
                                    onChange={(e) => SetnewLabel(e.target.value)}
                                    value={newLabel}
                                />

                                <button
                                    className="bg-primary border border-primary rounded-2xl text-white w-full py-2.5 cursor-pointer mt-4
                               transition hover:opacity-90 active:scale-[0.99] shadow-sm font-semibold"
                                    onClick={AddLabel}
                                >
                                    ثبت
                                </button>
                            </Modal.Panel>
                        </div>
                    </Modal>

                    {/* Folder Modal */}
                    <Modal open={isFolderOpen} onClose={() => setFolderIsOpen(false)}>
                        <Modal.Backdrop />
                        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-black/30">
                            <Modal.Panel className="w-full max-w-xl rounded-3xl bg-boxColor shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor">
                                <h5 className="text-lg font-extrabold">پرونده موردنظر را انتخاب کنید</h5>
                                <p className="text-xs text-textTitleColor mt-1">یک پرونده را انتخاب کنید تا این تراکنش به آن اضافه شود.</p>

                                <div className="mt-4">
                                    <FolderList
                                        address={hash}
                                        network={Networks.find(item => item.symbole === network).id}
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
