/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '@/functions/ServerAddress';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { GetRequest } from '@/functions/GetRequest';
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable';
import { Networks } from '@/functions/Networks';
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';

const SavedLabel = () => {
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteBox, setOpenDeleteBox] = useState(false);
    const [loading, setLoading] = useState(false);

    // دریافت لیست برچسب‌ها
    useEffect(() => {
        GetRequest(`${serverAddress}/address-labels/label`)
            .then((response) => {
                const getResults = [];
                if (response.data.data.results.length === 0) {
                    setIsEmpty(true);
                } else {
                    setIsEmpty(false);
                }

                for (let i = 0; i < response.data.data.results.length; i++) {
                    getResults.push({
                        network: Networks.find(item => item.uuid === response.data.data.results[i].network).name,
                        networkEN: Networks.find(item => item.uuid === response.data.data.results[i].network).symbole,
                        address: response.data.data.results[i].address,
                        label: response.data.data.results[i].label,
                        is_wallet: response.data.data.results[i].is_wallet,
                        id: response.data.data.results[i].id,
                    });
                }
                setData(getResults);
            })
            .catch((err) => {
                console.log(err)
                try {
                    if (err.response.status === 403 || err.response.status === 401) {
                        Cookies.set('refresh', '');
                        Cookies.set('access', '');
                        window.location.assign('/');
                    }
                } catch (e) { }
            });
    }, []);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setOpenDeleteBox(true);
    };

    const basicColumns = [
        {
            header: 'آدرس',
            cell: (row) =>
                <div>
                    {AddressFormat(row.address, 8, row.is_wallet ? 'address' : 'transaction', row.networkEN, true)}
                </div>
        },
        {
            header: 'برچسب',
            cell: (row) => (
                <span className="inline-block rounded-full bg-primary text-bgColor px-3 py-0.5 text-xs ">
                    {row.label}
                </span>
            ),
        },
        {
            header: 'شبکه',
            cell: (row) => (
                <span className="inline-flex items-center gap-1">
                    <img
                        src={`/images/${row.networkEN}.png`}
                        className="ml-1 inline-block h-5 w-5"
                        alt={row.network}
                    />
                    {row.network}
                </span>
            ),
        },
        {
            header: 'نوع',
            cell: (row) => (row.is_wallet ? 'آدرس کیف پول' : 'هش تراکنش'),
        },
        {
            header: 'عملیات',
            cell: (row) => (
                <button
                    type="button"
                    onClick={() => openDeleteModal(row.id)}
                    className="text-TextRed hover:text-red-600 cursor-pointer"
                >
                    {/* آیکن سطل زباله (بدون react-feather) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                    </svg>
                </button>
            ),
        },
    ];

    const deleteLabel = () => {
        if (!deleteId) return;
        setLoading(true);
        axios
            .delete(`${serverAddress}/address-labels/label/${deleteId}/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`,
                },
            })
            .then((response) => {
                setLoading(false);
                if (response.status === 204) {
                    // حذف از state لوکال
                    setData((prev) => prev.filter((item) => item.id !== deleteId));
                    setOpenDeleteBox(false);
                    setDeleteId(null);

                    return toast.success('با موفقیت حذف شد', {
                        position: 'bottom-left',
                    });
                }
            })
            .catch((err) => {
                setLoading(false);
                return toast.error('ناموفق', {
                    position: 'bottom-left',
                });
            });
    };

    return (
        <>
            {/* کارت اصلی با Tailwind */}
            <div className=" text-textColor" dir="rtl">
                {!isEmpty ? (
                    data.length > 0 ? (

                        <ExpandableTable
                            data={data}          // ← فقط دیتای فیلترشده را بده
                            columns={basicColumns}
                            rowDetailsMode="row"
                            rowDetailsClassName="rounded-xl p-3"
                        />
                    ) : (
                        <p className="mt-5 text-center">بدون برچسب ذخیره شده</p>
                    )
                ) : (
                    <p className="mt-5 text-center">بدون برچسب ذخیره شده</p>
                )}
            </div>

            {/* مودال حذف با Tailwind */}
            {openDeleteBox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-sm rounded-lg bg-boxColor p-5 text-textColor shadow-lg" dir="rtl">
                        <h6 className="mb-4 text-sm font-medium">آیا با حذف برچسب مورد نظر موافق هستید؟</h6>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-md border border-borderNeutral px-4 py-1.5 text-sm text-textColor hover:bg-bgPrimary"
                                onClick={() => {
                                    setOpenDeleteBox(false);
                                    setDeleteId(null);
                                }}
                            >
                                انصراف
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm text-white hover:opacity-90"
                                onClick={deleteLabel}
                            >
                                {loading ? 'درحال حذف...' : <span>حذف</span>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SavedLabel;
