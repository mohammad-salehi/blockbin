import React, { useState } from 'react'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";

const AddressInfo = () => {

    const [Risk, SetRisk] = useState(0)
    const [Owner, SetOwner] = useState('Nobitex')
    const [IdentificationBy, SetIdentificationBy] = useState('Arkham')
    const [Label, SetLabel] = useState(null)
    return (
        <div className='bg-gradient-main-2 border border-boxBorderColor rounded-xl main-animated-border-box' style={{ "--dynamic-color": 'red' }}>
            <div className='flex justify-between items-center border-b border-b-boxBorderColor p-3'>
                <div className='flex items-center'>
                    <img src={"/images/TRX.png"} className='w-8 inline-block ' />
                    <h6 className='inline-block text-xl mr-2 text-textColor'>
                        آدرس ترون
                    </h6>
                </div>
                <div className='flex items-center text-primary cursor-pointer'>
                    <div className='flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer'>
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 50 50"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M24.896,9.463c-0.188-0.188-0.441-0.293-0.707-0.293L11.232,9.169c-0.551,0-0.998,0.445-1,0.996L10.186,23.17
      c-0.001,0.267,0.104,0.522,0.293,0.711l16.995,16.995c0.188,0.188,0.441,0.293,0.707,0.293s0.52-0.105,0.707-0.293l13.004-13.004
      c0.391-0.391,0.391-1.023,0-1.414L24.896,9.463z M28.181,38.755L12.188,22.761l0.041-11.592l11.547,0.001l15.995,15.995
      L28.181,38.755z" />
                            <circle cx="20.362" cy="19.346" r="2.61" />
                        </svg>
                    </div>
                    <div className='flex items-center justify-center border bg-bgColor text-textColor border-boxBorderColor transition ml-2 h-9 w-9 rounded-full cursor-pointer'>
                        <ContentCopyIcon className='text-textColor' style={{ fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => {
                                navigator.clipboard.writeText('TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG')
                                toast.success("در کلیپ‌بورد ذخیره شد!", {
                                    position: "bottom-left",
                                });
                            }} />
                    </div>
                    {AddressFormat('TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG', 8, 'address', 'TRX', false)}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-textColor p-3">
                <div>
                    <p className='text-textTitleColor'>
                        ریسک
                    </p>
                    <p>
                        <svg fill={Risk === null ? 'currentColor' : Risk < 25 ? 'green' : Risk < 50 ? 'blue' : Risk < 70 ? 'orange' : 'red'} height="20px" width="20px" version="1.1" id="Layer_1" className='inline-block ml-1'
                            viewBox="0 0 512 512" >
                            <g>
                                <g>
                                    <path d="M507.494,426.066L282.864,53.537c-5.677-9.415-15.87-15.172-26.865-15.172c-10.995,0-21.188,5.756-26.865,15.172
			L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h449.259
			c11.314,0,21.751-6.093,27.315-15.944C513.508,447.839,513.336,435.755,507.494,426.066z M256.167,167.227
			c12.901,0,23.817,7.278,23.817,20.178c0,39.363-4.631,95.929-4.631,135.292c0,10.255-11.247,14.554-19.186,14.554
			c-10.584,0-19.516-4.3-19.516-14.554c0-39.363-4.63-95.929-4.63-135.292C232.021,174.505,242.605,167.227,256.167,167.227z
			 M256.498,411.018c-14.554,0-25.471-11.908-25.471-25.47c0-13.893,10.916-25.47,25.471-25.47c13.562,0,25.14,11.577,25.14,25.47
			C281.638,399.11,270.06,411.018,256.498,411.018z"/>
                                </g>
                            </g>
                        </svg>
                        %{Risk}
                    </p>
                </div>

                <div>
                    <p className='text-textTitleColor'>
                        مالک
                    </p>
                    <p>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                            <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M15 18H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <span className='text-primary cursor-pointer'>
                            {Owner}
                        </span>
                    </p>
                </div>

                <div>
                    <p className='text-textTitleColor'>
                        شناسایی شده توسط
                    </p>
                    <p>
                        <svg fill="currentColor" version="1.1" id="Capa_1" className='inline-block' width="20px" height="20px" viewBox="0 0 97 97" xmlSpace="preserve">
                            <g>
                                <path d="M95,44.312h-7.518C85.54,26.094,70.906,11.46,52.688,9.517V2c0-1.104-0.896-2-2-2h-4.376c-1.104,0-2,0.896-2,2v7.517l0,0
		C26.094,11.46,11.46,26.094,9.517,44.312H2c-1.104,0-2,0.896-2,2v4.377c0,1.104,0.896,2,2,2h7.517
		C11.46,70.906,26.094,85.54,44.312,87.482V95c0,1.104,0.896,2,2,2h4.377c1.104,0,2-0.896,2-2v-7.518l0,0
		C70.906,85.54,85.54,70.906,87.482,52.688H95c1.104,0,2-0.896,2-2v-4.376C97,45.207,96.104,44.312,95,44.312z M24.896,52.688
		c1.104,0,2-0.896,2-2v-4.376c0-1.104-0.896-2-2-2h-6.492c1.856-13.397,12.51-24.052,25.907-25.908v6.492c0,1.104,0.896,2,2,2h4.376
		c1.104,0,2-0.896,2-2v-6.492C66.086,20.26,76.74,30.914,78.596,44.312h-6.492c-1.104,0-2,0.896-2,2v4.377c0,1.104,0.896,2,2,2
		h6.492C76.74,66.086,66.086,76.74,52.689,78.598v-6.492c0-1.104-0.896-2-2-2h-4.377c-1.104,0-2,0.896-2,2v6.492
		C30.914,76.74,20.26,66.086,18.404,52.688H24.896z"/>
                            </g>
                        </svg>
                        <span className='mr-1'>
                            {IdentificationBy}
                        </span>
                    </p>
                </div>

                <div>
                    <p className='text-textTitleColor'>
                        نشانه‌گذاری
                    </p>
                    <p>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <span>
                            افزودن
                        </span>
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-textColor p-3'>
                <div className='flex items-center w-full'>
                    <button className='border border-primary rounded-lg bg-primary text-white w-full py-2 cursor-pointer'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                            <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" stroke="currentColor" stroke-width="2" />
                            <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="currentColor" stroke-width="2" />
                            <path d="M15 3L12.0605 5.93945V5.93945C12.0271 5.97289 12.0271 6.02711 12.0605 6.06055V6.06055L15 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 21L11.9473 18.0527V18.0527C11.9764 18.0236 11.9764 17.9764 11.9473 17.9473V17.9473L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 6C14.8284 6 16.2426 6 17.1213 6.87868C18 7.75736 18 9.17157 18 12V15" stroke="currentColor" stroke-width="2" />
                            <path d="M12 18C9.17157 18 7.75736 18 6.87868 17.1213C6 16.2426 6 14.8284 6 12L6 9" stroke="currentColor" stroke-width="2" />
                        </svg>
                        ترسیم گراف

                    </button>
                </div>
                <div className='flex items-center'>
                    <button className='border border-primary rounded-lg text-primary w-full py-2 cursor-pointer'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1 '>
                            <path d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65ZM3.9 17.353L4.65 17.3539V17.353H3.9ZM4.36838 18.5168L4.90602 17.9939L4.90602 17.9939L4.36838 18.5168ZM5.50192 19L5.50099 19.75H5.50192V19ZM17.8981 19L17.8981 19.75L17.899 19.75L17.8981 19ZM19.0316 18.5168L18.494 17.9939L18.494 17.9939L19.0316 18.5168ZM19.5 17.353L18.75 17.353L18.75 17.3539L19.5 17.353ZM19.5 8.647L18.75 8.64611V8.647H19.5ZM19.0316 7.48322L18.494 8.00615L18.494 8.00615L19.0316 7.48322ZM17.8981 7L17.899 6.25H17.8981V7ZM12.2226 6.25C11.8084 6.25 11.4726 6.58579 11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75V6.25ZM3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75C4.31421 7.75 4.65 7.41421 4.65 7H3.15ZM3.9 5.647L4.65 5.647L4.64999 5.64611L3.9 5.647ZM5.50192 4L5.50192 3.25L5.50099 3.25L5.50192 4ZM10.6207 4L10.6216 3.25H10.6207V4ZM12.2226 5.647L11.4726 5.64611V5.647H12.2226ZM11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7H11.4726ZM3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75V6.25ZM12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7C12.9726 6.58579 12.6368 6.25 12.2226 6.25V7.75ZM3.15 7V17.353H4.65V7H3.15ZM3.15 17.3521C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397L4.90602 17.9939C4.74389 17.8272 4.64971 17.5973 4.64999 17.3539L3.15 17.3521ZM3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75L5.50285 18.25C5.28261 18.2497 5.06751 18.1599 4.90602 17.9939L3.83074 19.0397ZM5.50192 19.75H17.8981V18.25H5.50192V19.75ZM17.899 19.75C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397L18.494 17.9939C18.3325 18.1599 18.1174 18.2497 17.8971 18.25L17.899 19.75ZM19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521L18.75 17.3539C18.7503 17.5973 18.6561 17.8272 18.494 17.9939L19.5692 19.0397ZM20.25 17.353V8.647H18.75V17.353H20.25ZM20.25 8.64789C20.2507 8.01874 20.008 7.41136 19.5692 6.9603L18.494 8.00615C18.6561 8.17283 18.7503 8.4027 18.75 8.64611L20.25 8.64789ZM19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25L17.8971 7.75C18.1174 7.75027 18.3325 7.8401 18.494 8.00615L19.5692 6.9603ZM17.8981 6.25H12.2226V7.75H17.8981V6.25ZM4.65 7V5.647H3.15V7H4.65ZM4.64999 5.64611C4.64971 5.4027 4.74389 5.17283 4.90602 5.00615L3.83074 3.9603C3.39203 4.41136 3.14925 5.01874 3.15 5.64789L4.64999 5.64611ZM4.90602 5.00615C5.06751 4.8401 5.28261 4.75027 5.50285 4.75L5.50099 3.25C4.87048 3.25079 4.27008 3.5086 3.83074 3.9603L4.90602 5.00615ZM5.50192 4.75H10.6207V3.25H5.50192V4.75ZM10.6197 4.75C10.84 4.75027 11.0551 4.8401 11.2166 5.00615L12.2918 3.9603C11.8525 3.5086 11.2521 3.25079 10.6216 3.25L10.6197 4.75ZM11.2166 5.00615C11.3787 5.17283 11.4729 5.4027 11.4726 5.64611L12.9726 5.64789C12.9733 5.01874 12.7306 4.41136 12.2918 3.9603L11.2166 5.00615ZM11.4726 5.647V7H12.9726V5.647H11.4726ZM3.9 7.75H12.2226V6.25H3.9V7.75Z" fill="currentColor" />
                            <path d="M9.75 12.25C9.33579 12.25 9 12.5858 9 13C9 13.4142 9.33579 13.75 9.75 13.75V12.25ZM11.7 13.75C12.1142 13.75 12.45 13.4142 12.45 13C12.45 12.5858 12.1142 12.25 11.7 12.25V13.75ZM11.7 12.25C11.2858 12.25 10.95 12.5858 10.95 13C10.95 13.4142 11.2858 13.75 11.7 13.75V12.25ZM13.65 13.75C14.0642 13.75 14.4 13.4142 14.4 13C14.4 12.5858 14.0642 12.25 13.65 12.25V13.75ZM12.45 13C12.45 12.5858 12.1142 12.25 11.7 12.25C11.2858 12.25 10.95 12.5858 10.95 13H12.45ZM10.95 15C10.95 15.4142 11.2858 15.75 11.7 15.75C12.1142 15.75 12.45 15.4142 12.45 15H10.95ZM10.95 13C10.95 13.4142 11.2858 13.75 11.7 13.75C12.1142 13.75 12.45 13.4142 12.45 13H10.95ZM12.45 11C12.45 10.5858 12.1142 10.25 11.7 10.25C11.2858 10.25 10.95 10.5858 10.95 11H12.45ZM9.75 13.75H11.7V12.25H9.75V13.75ZM11.7 13.75H13.65V12.25H11.7V13.75ZM10.95 13V15H12.45V13H10.95ZM12.45 13V11H10.95V13H12.45Z" fill="currentColor" />
                        </svg>
                        افزوودن به پرونده
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressInfo
