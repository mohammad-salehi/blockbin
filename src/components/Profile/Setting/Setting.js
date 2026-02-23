import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import { Input } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Setting = () => {

    const [Data, SetData] = useState(
        {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phone_number: '',
        }
    )
    useEffect(() => {
        GetRequest(`${serverAddress}/accounts/users/${Cookies.get('id')}`)
            .then((response) => {
                SetData(response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [openDeleteBox, setOpenDeleteBox] = useState(false);
    const [cpLoading, setcpLoading] = useState(false);
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [retrynewPassword, setretrynewPassword] = useState('');

    const changePassword = () => {
        if (newPassword.length < 8) {
            return toast.error('رمزعبور باید حداقل 8 رقم باشد', {
                position: 'bottom-left',
              });
        }
        if (retrynewPassword !== newPassword) {
            return toast.error('رمزعبور با تکرار رمزعبور برابر نیست', {
                position: 'bottom-left',
              });
        }
        setcpLoading(true)
        axios.put(`${serverAddress}/accounts/change_password/${Cookies.get('id')}/`,
            {
                old_password: oldPassword,
                password: newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setOpenDeleteBox(false)
        setcpLoading(false)
        return toast.success('انجام شد', {
                        position: 'bottom-left'
                    })
            })
            .catch((err) => {
                console.log(err)
        setcpLoading(false)
        return toast.error('انجام نشد', {
                    position: 'bottom-left'
                })
            })
    }
    return (
        <div className='border border-boxBorderColor rounded-xl p-3'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        نام
                    </label>
                    <input
                        value={Data.first_name ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        نام‌خانوادگی
                    </label>
                    <input
                        value={Data.last_name ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        نام‌کاربری
                    </label>
                    <input
                        value={Data.username ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        ایمیل
                    </label>
                    <input
                        value={Data.email ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        شماره همراه
                    </label>
                    <input
                        value={Data.phone_number ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        نقش
                    </label>
                    <input
                        value={Cookies.get('roll_name') ?? ''}
                        type="text"
                        disabled
                        name="name"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => {
                            setOpenDeleteBox(true);
                        }}
                        type="submit"
                        className="mt-1 rounded-md bg-[var(--color-primary)] px-4 py-3 text-sm text-white shadow-sm hover:opacity-90 w-full max-w-[400px]"
                    >
                        تغییر رمزعبور
                    </button>
                </div>
            </div>
            {openDeleteBox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-sm rounded-lg bg-bgColor p-5 text-textColor shadow-lg" dir="rtl">
                        <h6 className="mb-4 text-sm font-medium">تغییر رمزعبور</h6>
                        <div className="">
                            <label
                                className="form-label text-right text-sm font-medium text-textColor"
                                htmlFor="NameAddUserAdmin"
                            >
                                رمزعبور قدیمی
                            </label>
                            <input
                                value={oldPassword}
                                onChange={(e) => {setoldPassword(e.target.value)}}
                                type="text"
                                name="name"
                                className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        <div className="">
                            <label
                                className="form-label text-right text-sm font-medium text-textColor"
                                htmlFor="NameAddUserAdmin"
                            >
                                رمزعبور جدید
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => {setnewPassword(e.target.value)}}
                                type="text"
                                name="name"
                                className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        <div className="">
                            <label
                                className="form-label text-right text-sm font-medium text-textColor"
                                htmlFor="NameAddUserAdmin"
                            >
                                تکرار رمزعبور جدید
                            </label>
                            <input
                                value={retrynewPassword}
                                onChange={(e) => {setretrynewPassword(e.target.value)}}
                                type="text"
                                name="name"
                                className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-3">
                            <button
                                type="button"
                                className="rounded-md border border-borderNeutral px-4 py-1.5 text-sm text-textColor hover:bg-bgPrimary"
                                onClick={() => {
                                    setOpenDeleteBox(false);
                                }}
                            >
                                انصراف
                            </button>
                            <button
                                onClick={() => {changePassword()}}
                                type="button"
                                className="flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm text-white hover:opacity-90"
                            >
                                {<span>
                                    {
                                        cpLoading ?
                                        'درحال تغییر...'
                                        :
                                        'تغییر'
                                    }
                                    </span>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Setting
