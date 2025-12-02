import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import { Input } from "@heathmont/moon-core-tw";
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
const AddUser = () => {

    const [inputValue, setInputValue] = useState('')
    const [inputLastValue, setInputLastValue] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [Loading, SetLoading] = useState(false)
    const [inputUsernameValue, setInputUsernameValue] = useState('')

    //Errors
    const [NameErr, SetNameErr] = useState(false)
    const [NameErrText, SetNameErrText] = useState('')
    const [LastnameErr, SetLastNameErr] = useState(false)
    const [LastnameErrText, SetLastNameErrText] = useState('')
    const [EmailErr, SetEmailErr] = useState(false)
    const [EmailErrText, SetEmailErrText] = useState('')
    const [RollErr, SetRollErr] = useState(false)
    const [RollErrText, SetRollErrText] = useState('')
    const [UsernameErr, SetUsernameErr] = useState(false)
    const [UsernameErrText, SetUsernameErrText] = useState('')
    const [NumberErr, SetNumberErr] = useState(false)
    const [NumberErrText, SetNumberErrText] = useState('')

    //add User Error Handler
    const ErrorHandler = (response) => {
        try {
            if (response.response.status === 400) {
                if (response.response.data.error.fields.first_name !== undefined) {
                    return toast.error('نام را به درستی وارد کنید', {
                        position: 'bottom-left'
                    })
                } else if (response.response.data.error.fields.username !== undefined) {
                    if (response.response.data.error.fields.username[0].message === 'A user with that username already exists.') {
                        return toast.error('نام کاربری انتخاب شده از قبل وجود دارد.', {
                            position: 'bottom-left'
                        })
                    } else {
                        return toast.error('نام کاربری را به درستی وارد کنید', {
                            position: 'bottom-left'
                        })
                    }

                } else if (response.response.data.error.fields.email !== undefined) {
                    return toast.error('ایمیل را به درستی وارد کنید', {
                        position: 'bottom-left'
                    })
                } else if (response.response.data.error.fields.phone_number !== undefined) {
                    if (response.response.data.error.fields.phone_number[0].message === 'user with this phone number already exists.') {
                        return toast.error('شماره موبایل تکراری است', {
                            position: 'bottom-left'
                        })
                    } else {
                        return toast.error('شماره همراه را به درستی وارد کنید', {
                            position: 'bottom-left'
                        })
                    }
                } else {
                    return toast.error('ناموفق', {
                        position: 'bottom-left'
                    })
                }
            } else {
                return toast.error('ناموفق', {
                    position: 'bottom-left'
                })
            }
        } catch (error) {
            return toast.error('ناموفق', {
                position: 'bottom-left'
            })
        }
    }

    const handleInputChange = (event) => {
        const value = event.target.value
        const persianRegex = /^[\u0600-\u06FF\s]+$/

        if (persianRegex.test(value) || value === '') {
            setInputValue(value)
            SetNameErr(false)
            SetNameErrText('')
        } else {
            SetNameErr(true)
            SetNameErrText('نام کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
        }
    }

    const handleInputLastChange = (event) => {
        const value = event.target.value
        const persianRegex = /^[\u0600-\u06FF\s]+$/

        if (persianRegex.test(value) || value === '') {
            setInputLastValue(value)
            SetLastNameErr(false)
            SetLastNameErrText('')
        } else {
            SetLastNameErr(true)
            SetLastNameErrText('نام خانوادگی کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
        }
    }

    const handleInputUsernameChange = (event) => {
        const value = event.target.value
        const englishRegex = /^[a-zA-Z0-9]+$/

        if (englishRegex.test(value) || value === '') {
            setInputUsernameValue(value)
            SetUsernameErr(false)
            SetUsernameErrText('')
        } else {
            SetUsernameErr(true)
            SetUsernameErrText('نام کاربری کاربر باید تنها از حروف و اعداد انگلیسی تشکیل شده باشد!')
        }
    }

    const handleSubmit = (event) => {
        const Emailvalue = document.getElementById('AdminAddUserEmailInput').value
        const Numbervalue = document.getElementById('AdminAddUserPhoneNumber').value
        const nameValue = document.getElementById('NameAddUserAdmin').value
        const LastnameValue = document.getElementById('lastNameMulti').value
        const UsernameValue = document.getElementById('AdminAddUserUsernameInput').value

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^09[0-9]{9}$/

        event.preventDefault()
        if (emailRegex.test(Emailvalue)) {
            if (phoneRegex.test(Numbervalue)) {
                if (selectedOption !== null) {
                    if (LastnameValue !== '') {
                        if (UsernameValue !== '') {
                            if (nameValue !== '') {
                                // register
                                SetLoading(true)
                                axios.post(`${serverAddress}/accounts/register/`,
                                    {
                                        first_name: document.getElementById('NameAddUserAdmin').value,
                                        last_name: document.getElementById('lastNameMulti').value,
                                        email: document.getElementById('AdminAddUserEmailInput').value,
                                        role: String(selectedOption),
                                        username: document.getElementById('AdminAddUserUsernameInput').value,
                                        phone_number: document.getElementById('AdminAddUserPhoneNumber').value
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${Cookies.get('access')}`,
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then((response) => {
                                        SetLoading(false)
                                        if (response.data.message === 'successfully create user') {
                                            return toast.success('انجام شد', {
                                                position: 'bottom-left'
                                            })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        ErrorHandler(err)
                                        SetLoading(false)
                                    })
                            }
                        }
                    }
                }
            }
        }

        if (!(emailRegex.test(Emailvalue))) {
            SetEmailErr(true)
            SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
        } else {
            SetEmailErr(false)
            SetEmailErrText('')
        }

        if (!(phoneRegex.test(Numbervalue))) {
            SetNumberErr(true)
            SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
        } else {
            SetNumberErr(false)
            SetNumberErrText('')
        }

        if (selectedOption === null) {
            SetRollErr(true)
            SetRollErrText('نقش مورد نظر خود را وارد کنید!')
        } else {
            SetRollErr(false)
            SetRollErrText('')
        }

        if (LastnameValue === '') {
            SetLastNameErr(true)
            SetLastNameErrText('نام خانوادگی را وارد کنید!')
        } else {
            SetLastNameErr(false)
            SetLastNameErrText('')
        }

        if (UsernameValue === '') {
            SetUsernameErr(true)
            SetUsernameErrText('نام کاربری مورد نظر خود را وارد کنید!')
        } else {
            SetUsernameErr(false)
            SetUsernameErrText('')
        }

        if (nameValue === '') {
            SetNameErr(true)
            SetNameErrText('نام را وارد کنید!')
        } else {
            SetNameErr(false)
            SetNameErrText('')
        }
    }

    const numberHandler = () => {
        const inputNumberElement = document.getElementById('AdminAddUserPhoneNumber')
        const phoneRegex = /^09[0-9]{9}$/
        if (!(phoneRegex.test(inputNumberElement.value))) {
            SetNumberErr(true)
            SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
        } else {
            SetNumberErr(false)
            SetNumberErrText('')
        }
    }

    const EmailHandler = () => {
        const inputEmailElement = document.getElementById('AdminAddUserEmailInput')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!(emailRegex.test(inputEmailElement.value))) {
            SetEmailErr(true)
            SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
        } else {
            SetEmailErr(false)
            SetEmailErrText('')
        }
    }

    function handleSelectionChange(event) {
        const selectedValue = event.target.value;

        if (Number(selectedValue) === 0) {
            SetRollErr(true);
            SetRollErrText('نقش را به درستی وارد کنید.');
            setSelectedOption(null);
        } else {
            SetRollErr(false);
            setSelectedOption(String(selectedValue));
        }
    }

    //Rolls
    const [Rolls, SetRolls] = useState([])
    useEffect(() => {
        GetRequest(`${serverAddress}/accounts/role/`)
            .then((response) => {
                if (response.data.results.length > 0) {
                    SetRolls(response.data.results)
                }
            })
            .catch((err) => {

            })
    }, [])

    return (
        <form

            onSubmit={handleSubmit}
            id="RegisterMainForm"
            className="text-right border border-boxBorderColor rounded-xl p-3"
            dir="rtl"
        >
            {/* گرید کلی: تک‌ستونه روی موبایل، دو ستونه از md به بالا */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* نام */}
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="NameAddUserAdmin"
                    >
                        نام
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        type="text"
                        name="name"
                        id="NameAddUserAdmin"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    {NameErr && (
                        <small
                            id="NameErrTag"
                            className="text-xs text-red-500"
                        >
                            {NameErrText}
                        </small>
                    )}
                </div>

                {/* نام خانوادگی */}
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="lastNameMulti"
                    >
                        نام خانوادگی
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={inputLastValue}
                        onChange={handleInputLastChange}
                        type="text"
                        name="lastname"
                        id="lastNameMulti"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    {LastnameErr && (
                        <small
                            id="LastNameErrTag"
                            className="text-xs text-red-500"
                        >
                            {LastnameErrText}
                        </small>
                    )}
                </div>

                {/* نام کاربری */}
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="AdminAddUserUsernameInput"
                    >
                        نام کاربری
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="AdminAddUserUsernameInput"
                        value={inputUsernameValue}
                        onChange={handleInputUsernameChange}
                        type="text"
                        name="city"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    {UsernameErr && (
                        <small
                            id="UsernameErrTag"
                            className="text-xs text-red-500"
                        >
                            {UsernameErrText}
                        </small>
                    )}
                </div>

                {/* نقش */}
                <div className="flex flex-col gap-1">
                    <label className="form-label text-right text-sm font-medium text-textColor">
                        نقش
                        <span className="text-red-500">*</span>
                    </label>

                    {RollErr ? (
                        <div className="flex flex-col gap-1">
                            <div id="AdminSelectRollSuperBox">
                                <select
                                    id="Roll_select_Options"
                                    aria-label="Default select example"
                                    onChange={handleSelectionChange}
                                    className="block w-full rounded-md border border-red-500 bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="0">انتخاب نقش</option>
                                    {Rolls.map((item, index) => (
                                        <option key={index} value={`${item.id}`}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <small
                                id="RollErrTag"
                                className="text-xs text-red-500"
                            >
                                {RollErrText}
                            </small>
                        </div>
                    ) : (
                        <div id="AdminSelectRollSuperBox">
                            <select
                                id="Roll_select_Options"
                                aria-label="Default select example"
                                onChange={handleSelectionChange}
                                className="block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            >
                                <option value="0">انتخاب نقش</option>
                                {Rolls.map((item, index) => (
                                    <option key={index} value={`${item.id}`}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* ایمیل */}
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="AdminAddUserEmailInput"
                    >
                        ایمیل
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        onBlur={EmailHandler}
                        id="AdminAddUserEmailInput"
                        type="text"
                        name="company"
                        placeholder="example@example.com"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    {EmailErr && (
                        <small
                            id="EmailErrTag"
                            className="text-xs text-red-500"
                        >
                            {EmailErrText}
                        </small>
                    )}
                </div>

                {/* شماره همراه */}
                <div className="flex flex-col gap-1">
                    <label
                        className="form-label text-right text-sm font-medium text-textColor"
                        htmlFor="AdminAddUserPhoneNumber"
                    >
                        شماره همراه
                        <span className="text-red-500">*</span>
                    </label>
                    <Input
                        onBlur={numberHandler}
                        type="text"
                        name="Email"
                        id="AdminAddUserPhoneNumber"
                        placeholder="09121234567"
                        className="mt-0 block w-full rounded-md border border-borderNeutral bg-boxColor px-3 py-2 text-sm text-textColor placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    {NumberErr && (
                        <small
                            id="NumberErrTag"
                            className="text-xs text-red-500"
                        >
                            {NumberErrText}
                        </small>
                    )}
                </div>

                {/* هشدار رمز عبور */}
                <div className="mt-1">
                    <span
                        className="rounded-md  px-3 py-2"
                    >
                        <label className="form-label block text-right text-xs text-textColor">
                            *رمز عبور توسط سیستم به طور خودکار تولید شده و برای کاربر ارسال (پیامک، ایمیل) میشود.
                        </label>
                    </span>
                </div>

                {/* دکمه افزودن */}

            </div>
            <div className="mt-1 flex items-end justify-start">
                <button
                    type="submit"
                    className="mt-1 rounded-md bg-[var(--color-primary)] px-4 py-3 text-sm text-white shadow-sm hover:opacity-90 w-full max-w-[400px]"
                >
                    {Loading ? <span>درحال افزودن...</span> : <span>افزودن</span>}
                </button>
            </div>
        </form>


    )
}

export default AddUser
