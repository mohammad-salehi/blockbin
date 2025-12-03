'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import Cookies from 'js-cookie';

export default function Header({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen, toggleDarkMode, isDarkMode }) {

    const closeSidebar = () => {
        setIsMobileOpen(false);
    };

    const navItems = [
        {
            link: "dashboard",
            label: "کاوشگر",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_92_1581" fill="white">
                        <path d="M14.825 18.9583H5.17496C2.89163 18.9583 1.04163 17.1 1.04163 14.8167V8.64166C1.04163 7.50833 1.74163 6.08333 2.64163 5.38333L7.13329 1.88333C8.48329 0.833332 10.6416 0.783332 12.0416 1.76667L17.1916 5.375C18.1833 6.06666 18.9583 7.55 18.9583 8.75833V14.825C18.9583 17.1 17.1083 18.9583 14.825 18.9583ZM7.89996 2.86667L3.40829 6.36666C2.81663 6.83333 2.29163 7.89166 2.29163 8.64166V14.8167C2.29163 16.4083 3.58329 17.7083 5.17496 17.7083H14.825C16.4166 17.7083 17.7083 16.4167 17.7083 14.825V8.75833C17.7083 7.95833 17.1333 6.85 16.475 6.4L11.325 2.79167C10.375 2.125 8.80829 2.15833 7.89996 2.86667Z" />
                    </mask>
                    <path d="M14.825 18.9583H5.17496C2.89163 18.9583 1.04163 17.1 1.04163 14.8167V8.64166C1.04163 7.50833 1.74163 6.08333 2.64163 5.38333L7.13329 1.88333C8.48329 0.833332 10.6416 0.783332 12.0416 1.76667L17.1916 5.375C18.1833 6.06666 18.9583 7.55 18.9583 8.75833V14.825C18.9583 17.1 17.1083 18.9583 14.825 18.9583ZM7.89996 2.86667L3.40829 6.36666C2.81663 6.83333 2.29163 7.89166 2.29163 8.64166V14.8167C2.29163 16.4083 3.58329 17.7083 5.17496 17.7083H14.825C16.4166 17.7083 17.7083 16.4167 17.7083 14.825V8.75833C17.7083 7.95833 17.1333 6.85 16.475 6.4L11.325 2.79167C10.375 2.125 8.80829 2.15833 7.89996 2.86667Z" fill="currentColor" />
                </svg>
            ),
        },
        {
            link: "entities",
            label: "موجودیت‌ها",
            icon: (
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },


        {
            link: "folder",
            label: "پرونده‌ها",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6V10.8528C18 11.1429 18 11.2879 17.9051 11.3465C17.8103 11.4051 17.6806 11.3403 17.4211 11.2106L16.1789 10.5894C16.0911 10.5456 16.0472 10.5236 16 10.5236C15.9528 10.5236 15.9089 10.5456 15.8211 10.5894L14.5789 11.2106C14.3194 11.3403 14.1897 11.4051 14.0949 11.3465C14 11.2879 14 11.1429 14 10.8528V6" stroke="currentColor" stroke-width="1.5" />
                    <path d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            )
        },
        {
            link: "profile",
            label: "پروفایل",
            icon: (
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    const [pathName, SetPathName] = useState('')
    const pathname = usePathname();
    useEffect(() => {
        const pathParts = pathname.split('/').filter(part => part !== '');
        const secondPart = pathParts[1];
        SetPathName(secondPart)
    }, [])

    return (
        <header className={`w-full h-18 bg-boxColor dark:bg-boxColor-dark flex items-stretch justify-between ${isOpen ? "rounded-bl-md rounded-br-md" : ""} shadow-sm px-6`}>
            {isMobileOpen && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
            <div className="flex items-center gap-5 text-textColor">
                {
                    !isOpen ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { setIsOpen(true) }}>
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        :
                        null
                }

                <img src={isDarkMode ? "/images/logo22.png" : "/images/logo_dark.png"} className=" w-36" />
                {
                    isOpen ?
                        //                     <div className="flex items-center gap-1 text-textColor ">


                        //                         <Dropdown value={'option'} onChange={() => { }}>
                        //                             <Dropdown.Trigger>
                        //                                 <div className="flex items-center justify-between gap-2 px-3 py-2 text-textColor cursor-pointer">
                        //                                     <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        //                                         <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //                                     </svg>
                        //                                     <span className='mr-4'>علی اکبری</span>
                        //                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="">
                        //                                         <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //                                     </svg>
                        //                                 </div>

                        //                             </Dropdown.Trigger>

                        //                             <Dropdown.Options
                        //                                 className="
                        //     absolute top-full right-0 mt-2 z-[10000]
                        //     w-fit inline-block
                        //     max-w-[90vw]      /* اختیاری: جلوگیری از خروج از صفحه */
                        //     rounded-md border dark:border-boxColor-dark
                        //     bg-boxbordercolor2 border-boxBorderColor shadow-lg
                        //     origin-top-right  /* رشد از راست به چپ */
                        //     p-4
                        //   "
                        //                             >
                        //                                 <span className="block text-md mb-1">ادمین سیستم</span>
                        //                                 <p className="text-md whitespace-nowrap mt-4" dir="rtl">
                        //                                     mohammad7979salehi@gmail.com
                        //                                 </p>
                        //                             </Dropdown.Options>
                        //                         </Dropdown>
                        //                     </div>

                        null
                        :
                        // <div className="text-titleText dark:text-titleText-dark">
                        //     <svg className="cursor-pointer" width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { setIsMobileOpen(true) }}>
                        //         <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        //     </svg>
                        // </div>

                        null

                }
                {
                    isOpen ?
                        <nav className="items-center p-2 mt-0 gap-x-2  flex">
                            {navItems.map((item) => (
                                <a
                                    href={`/panel/${item.link}`}
                                    key={item.label}
                                    className="no-underline text-inherit"
                                >
                                    <button
                                        className={`flex items-center px-4 py-2 rounded-md transition ${item.link === pathName
                                            ? "bg-bgPrimary text-primary"
                                            : "hover:bg-bgPrimary text-textColor cursor-pointer"
                                            }`}
                                    >
                                        <span
                                            className={`text-xl ml-2 ${item.link === pathName ? "text-primary" : "text-textColor"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                        <span
                                            className={`${item.link === pathName ? "text-primary" : "text-textColor"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </button>
                                </a>
                            ))}
                        </nav>
                        :
                        null
                }


            </div>

            <div className="flex items-center p-4 pl-0">


                {
                    isOpen ?
                        <button className="flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer" onClick={toggleDarkMode}>
                            {
                                isDarkMode ?
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.828l1.414 1.414M17.95 17.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                            }


                        </button>
                        :
                        null
                }

                <button className="flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer" onClick={() => {
                    Cookies.remove('access');
                    Cookies.remove('refresh');
                    window.location.assign('/');
                }}>
                    <svg
                        width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
                </button>

            </div>
        </header>
    );
}
