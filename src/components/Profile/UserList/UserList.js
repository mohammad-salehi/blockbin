import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Label, Input } from "@heathmont/moon-core-tw";
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'

const UserList = () => {
    const [Data, SetData] = useState([])
    const [Reload, SetReload] = useState(false)
    const [TableLoading, SetTableLoading] = useState(false)
    useEffect(() => {
        SetTableLoading(true)
        let getUsers = []
        GetRequest(`${serverAddress}/accounts/users/`)
            .then((response) => {
                if (response.data.results.length > 0) {
                    getUsers = response.data.results
                    GetRequest(`${serverAddress}/accounts/role/`)
                        .then((resp2) => {
                            SetTableLoading(false)
                            if (resp2.data.results.length > 0) {
                                for (let i = 0; i < getUsers.length; i++) {
                                    for (let j = 0; j < resp2.data.results.length; j++) {
                                        if (String(getUsers[i].role) === String(resp2.data.results[j].id)) {
                                            getUsers[i].role = resp2.data.results[j].name
                                        }
                                    }
                                }
                                SetData(getUsers)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            SetTableLoading(false)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                SetTableLoading(false)
            }
            )
    }, [Reload])
    const columns = [
        {
            header: "آی‌دی",
            accessorKey: "logo",
            cell: (row) => (
                <div>
                    {row.id}
                </div>
            ),
        },
        {
            header: "نام کاربری", accessorKey: "hash",

            cell: (row) => (
                <div>
                    {row.username}
                </div>
            ),
        },
        {
            header: "شماره تلفن", accessorKey: "hash",

            cell: (row) => (
                <div>
                    {row.phone_number}
                </div>
            ),
        },
        {
            header: "ایمیل", accessorKey: "legal_name",
            cell: (row) => (
                <div className='p-0'>
                    {row.email}
                </div>
            ),
        },
        {
            header: `نقش`, accessorKey: "TokenInfo",
            cell: (row) => (
                <div className='p-0'>
                    {row.role}
                </div>
            ),
        },
        {
            header: `وضعیت`, accessorKey: "TokenInfo",

            cell: (row) => (
                row.is_active ?
                    <span style={{ fontSize: "12px", padding: "2px 6px", borderRadius: "10px" }} className='bg-BgGreen text-TextGreen'>فعال</span>
                    :
                    <span style={{ fontSize: "12px", padding: "2px 6px", borderRadius: "10px" }} className='bg-BgRed text-TextRed'>غیرفعال</span>
            ),
        },
        {
            header: `ویرایش`, accessorKey: "TokenInfo",
            cell: (row) => (
                <div className='p-0'
                    onClick={() => {
                        handleEdit()
                        SetNumber(row.id)
                        Setusers(row)
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
                        <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            ),
        }
    ];
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const userList = Data.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const [users, Setusers] = useState(null)
    const [Loading, SetLoading] = useState(false)
    const [number, SetNumber] = useState(1)
    const [Edit, setEdit] = useState(false)
    const handleEdit = () => setEdit(!Edit)
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

    const [inputValue, setInputValue] = useState('')
    const [inputLastValue, setInputLastValue] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [GetRole, setGetRole] = useState('')
    const [inputUsernameValue, setInputUsernameValue] = useState('')
    const [inputEmailValue, setInputEmailValue] = useState('')
    const [inputNumberValue, setInputNumberValue] = useState('')
    const [inputIsActive, setInputIsActive] = useState(null)

    const [Rolls, SetRolls] = useState([])

    const numberHandler = (event) => {
        const value = event.target.value
        setInputNumberValue(value)
    }

    const numberValidator = () => {
        const inputNumberElement = document.getElementById('AdminAddUserPhoneNumber2')
        const phoneRegex = /^09[0-9]{9}$/
        if (!(phoneRegex.test(inputNumberElement.value))) {
            SetNumberErr(true)
            SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
        } else {
            SetNumberErr(false)
            SetNumberErrText('')
        }
    }

    const EmailHandler = (event) => {
        const value = event.target.value
        setInputEmailValue(value)
    }

    const EmailValidator = (event) => {
        const inputEmailElement = document.getElementById('AdminAddUserEmailInput2')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!(emailRegex.test(inputEmailElement.value))) {
            SetEmailErr(true)
            SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
        } else {
            SetEmailErr(false)
            SetEmailErrText('')
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

    function handleSelectionChange() {
        const selectedValue = document.getElementById('Roll_select_Options2').value
        if (Number(selectedValue) === 0) {
            SetRollErr(true)
            SetRollErrText('نقش را به درستی وارد کنید.')
            setSelectedOption(null)
        } else {
            SetRollErr(false)
            setSelectedOption(String(selectedValue))
        }
    }

    //get Roles
    useEffect(() => {
        axios.get(`${serverAddress}/accounts/role/`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                }
            })
            .then((response) => {
                if (response.data.results.length > 0) {
                    SetRolls(response.data.results)
                }
            })
            .catch((err) => {
                try {
                    if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                        Cookies.set('refresh', '')
                        Cookies.set('access', '')
                        window.location.assign('/')
                    }
                } catch (error) { }
            })
    }, [])

    useEffect(() => {
        try {
            if (users) {
                setInputEmailValue(users.email)
                setInputNumberValue(users.phone_number)
                setInputValue(users.first_name)
                setInputLastValue(users.last_name)
                setInputUsernameValue(users.username)
                setGetRole(users.role)
                setInputIsActive(users.is_active)
                setSelectedOption((Rolls.find(item => item.name === users.role)).id)
            }
        } catch (error) { }

    }, [users])

    useEffect(() => {
        if (!open) {
            // setInputIsActive(true)
        } else if (users) {
            setInputIsActive(users.is_active)
        }
    }, [open])

    //Edit User Error Handler
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

    const handleSubmit = (event) => {
        const Emailvalue = document.getElementById('AdminAddUserEmailInput2').value
        const Numbervalue = document.getElementById('AdminAddUserPhoneNumber2').value
        const nameValue = document.getElementById('NameAddUserAdmin2').value
        const LastnameValue = document.getElementById('lastNameMulti2').value
        const UsernameValue = document.getElementById('AdminAddUserUsernameInput2').value

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
                                axios.put(`${serverAddress}/accounts/profile/${users.id}/`,
                                    {
                                        first_name: document.getElementById('NameAddUserAdmin2').value,
                                        last_name: document.getElementById('lastNameMulti2').value,
                                        email: document.getElementById('AdminAddUserEmailInput2').value,
                                        role_id: String(selectedOption),
                                        username: document.getElementById('AdminAddUserUsernameInput2').value,
                                        phone_number: document.getElementById('AdminAddUserPhoneNumber2').value,
                                        is_active: inputIsActive
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${Cookies.get('access')}`,
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then((response) => {
                                        console.log(response)
                                        if (response.status === 200) {
                                            SetLoading(false)
                                            if (response.data.message === 'success') {
                                                handleEdit()
                                                SetReload(!Reload)
                                                return toast.success('انجام شد', {
                                                    position: 'bottom-left'
                                                })
                                            } else {
                                                return toast.error('ناموفق', {
                                                    position: 'bottom-left'
                                                })
                                            }
                                        } else {
                                            ErrorHandler(response)
                                        }

                                    })
                                    .catch((err) => {
                                        console.log('err')
                                        console.log(err)
                                        SetLoading(false)
                                        ErrorHandler(err)
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

    return (
        <div>
            <div>
                {
                    TableLoading ?
                        <div className='border border-boxBorderColor rounded-xl p-3'>
                            <SkeletonLoading />
                        </div>
                        :
                        <ExpandableTable
                            data={userList}          // ← فقط دیتای فیلترشده را بده
                            columns={columns}
                            rowDetailsMode="row"
                            rowDetailsClassName="rounded-xl p-3"
                        />
                }
            </div>

            <Pagination
                rtl
                totalItems={Data.length}
                pageSize={pageSize}
                currentPage={page}
                onPageChange={setPage}
            />

            <Modal open={Edit} onClose={handleEdit}>
                <Modal.Backdrop />
                <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
                    <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[75px] text-textColor p-4">
                        <div className='mb-1 mt-3'>
                            <div>
                                <div className='row'>
                                    <Label className='form-label' for='full-name' style={{ fontSize: "12px" }}>
                                        نام
                                    </Label>
                                    <Input className='border border-boxBorderColor rounded-md' value={inputValue} type='text' style={{ borderRadius: '4px', borderStyle: 'solid' }} id='NameAddUserAdmin2' onChange={handleInputChange} />
                                    {
                                        NameErr ?
                                            <small style={{ color: "red" }} id='NameErrTag'>
                                                {NameErrText}
                                            </small>
                                            :
                                            null
                                    }

                                    <Label className='form-label mt-3' for='full-name' style={{ fontSize: "12px" }}>
                                        نام خانوادگی
                                    </Label>
                                    <Input className='border border-boxBorderColor rounded-md' value={inputLastValue} onChange={handleInputLastChange} type='text' style={{ borderRadius: '4px', borderStyle: 'solid' }} id='lastNameMulti2' />
                                    {
                                        LastnameErr ?
                                            <small style={{ color: "red" }} id='LastNameErrTag'>
                                                {LastnameErrText}
                                            </small>
                                            :
                                            null
                                    }

                                    <Label className='form-label mt-3' for='full-name' style={{ fontSize: "12px" }}>
                                        نام کاربری
                                    </Label>
                                    <Input className='border border-boxBorderColor rounded-md' value={inputUsernameValue} onChange={handleInputUsernameChange} type='text' style={{ borderRadius: '4px', borderStyle: 'solid' }} id="AdminAddUserUsernameInput2" />
                                    {
                                        UsernameErr ?
                                            <small style={{ color: "red" }} id='UsernameErrTag'>
                                                {UsernameErrText}
                                            </small>
                                            :
                                            null
                                    }

                                    <Label className='form-label mt-3' for='full-name' style={{ fontSize: "12px" }}>
                                        ایمیل
                                    </Label>
                                    <Input className='border border-boxBorderColor rounded-md' value={inputEmailValue} onBlur={EmailValidator} onChange={EmailHandler} id="AdminAddUserEmailInput2" type='text' style={{ borderRadius: '4px', borderStyle: 'solid' }} />
                                    {
                                        EmailErr ?
                                            <small style={{ color: "red" }} id='EmailErrTag'>
                                                {EmailErrText}
                                            </small>
                                            :
                                            null
                                    }

                                    <Label className='form-label mt-3' for='full-name' style={{ fontSize: "12px" }}>
                                        شماره همراه
                                    </Label>
                                    <Input className='border border-boxBorderColor rounded-md' value={inputNumberValue} onBlur={numberValidator} onChange={numberHandler} id='AdminAddUserPhoneNumber2' type='text' style={{ borderRadius: '4px', borderStyle: 'solid' }} />
                                    {
                                        NumberErr ?
                                            <small style={{ color: "red" }} id='NumberErrTag'>
                                                {NumberErrText}
                                            </small>
                                            :
                                            null
                                    }

                                    <Label className='form-label mt-3' for='full-name' style={{ fontSize: "12px" }}>
                                        نقش
                                    </Label>

                                    <select onChange={handleSelectionChange} className='border border-boxBorderColor rounded-md w-full p-2 outline-none' id='Roll_select_Options2' aria-label="Default select example">
                                        <option value="0">انتخاب نقش</option>
                                        {
                                            Rolls.map((item, index) => {
                                                if (item.name === GetRole) {
                                                    return (
                                                        <option selected key={index} value={`${item.id}`}>{item.name}</option>
                                                    )
                                                } else {
                                                    return (
                                                        <option key={index} value={`${item.id}`}>{item.name}</option>
                                                    )
                                                }
                                            })
                                        }

                                    </select >
                                    {
                                        RollErr ?
                                            <small style={{ color: "red" }} id='RollErrTag'>
                                                {RollErrText}
                                            </small>
                                            :
                                            null
                                    }
                                    <div className='mt-3 px-3' style={{ marginRight: '-12px' }}>

                                        <input className='inline-block' onClick={(event) => { setInputIsActive(!(event.target.checked)) }} checked={!inputIsActive} type='checkbox' style={{ display: 'inline-block', marginTop: '12px', color: 'red' }} id='deActiveCheckbox' />

                                        <label className='form-label mt-3 mr-1 inline-block text-textColor cursor-pointer' for='deActiveCheckbox' style={{ fontSize: "12px", display: 'inline-block' }}>
                                            غیرفعال سازی کاربر
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: "left" }} className='mt-3'>
                            <button className='bg-primary text-bgColor cursor-pointer' onClick={(event) => { handleSubmit(event) }} style={{ border: "none", padding: "8px 16px", borderRadius: "8px" }} color='secondary' outline>
                                {
                                    Loading ?
                                        'loading'
                                        :
                                        <span className='align-middle'>ویرایش کاربر</span>
                                }
                            </button>

                        </div>

                    </Modal.Panel>
                </div>
            </Modal>
        </div>
    )
}

export default UserList
