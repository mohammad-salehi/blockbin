import React, { useState } from 'react'
import { Dropdown, MenuItem, Button, Input } from "@heathmont/moon-core-tw";
import CalendarSwitch from '@/components/switch/switch';
import { ControlsChevronDown } from '@heathmont/moon-icons-tw';

const AdressActivity = () => {
  const [Risk, SetRisk] = useState(0)
  const [Owner, SetOwner] = useState('Nobitex')
  const [IdentificationBy, SetIdentificationBy] = useState('Arkham')
  const [Label, SetLabel] = useState(null)
  const [exchangeType, SetexchangeType] = useState("")

  return (
    <div className='bg-gradient-main-2 border border-boxBorderColor rounded-xl main-animated-border-box' style={{ "--dynamic-color": 'red' }}>
      <div className='flex justify-between items-center border-b border-b-boxBorderColor p-3'>
        <div className='flex items-center'>
          <h6 className='inline-block text-xl mr-2 text-textColor p-1'>
            جزئیات فعالیت آدرس
          </h6>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-textColor p-3">

        <div>
          <div className="relative w-full mt-2">
            <Dropdown onChange={SetexchangeType} value={exchangeType}>
              <Dropdown.Trigger className="w-full">
                <Button
                  as="span"
                  role="button"
                  variant="ghost"
                  className="flex items-center justify-between w-full pl-10 pr-10 py-2 
                   text-gray-700 border border-boxBorderColor
                   rounded-lg dark:border-buttonBorderColor-dark focus:outline-none 
                   dark:text-gray-100 appearance-none relative "
                >
                  <span className='text-textColor'>
                    <img src={`/images/TRX.png`} className='w-5 inline-block ml-1' />
                    TRX
                  </span>
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Options
                className="absolute left-0 mt-2 w-72 pl-2 pr-2
                 text-gray-700 bg-white dark:bg-buttonColor-dark
                 border border-gray-300 dark:border-buttonBorderColor-dark 
                 rounded-lg dark:text-gray-100 appearance-none z-50
                 max-h-60 overflow-y-auto"
              >
                <Dropdown.Option value="سهامی" key="option1">
                  {({ selected, active }) => (
                    <MenuItem isActive={active} isSelected={selected}
                      className={`border mt-2 mb-1 rounded-md border-gray-100 dark:border-buttonBorderColor-dark ${exchangeType === "سهامی"
                        ? "bg-gray-100 border-gray-200 dark:bg-gray-700"
                        : ""
                        }`}
                    >
                      <MenuItem.Title>سهامی</MenuItem.Title>
                    </MenuItem>
                  )}
                </Dropdown.Option>
                <Dropdown.Option value="مسئولیت محدود" key="option2">
                  {({ active }) => (
                    <MenuItem isActive={active}
                      className={`border mt-2 mb-1 rounded-md border-gray-100 dark:border-buttonBorderColor-dark ${exchangeType === "مسئولیت محدود"
                        ? "bg-gray-100 border-gray-200 dark:bg-gray-700"
                        : ""
                        }`}
                    >
                      <MenuItem.Title>مسئولیت محدود</MenuItem.Title>
                    </MenuItem>
                  )}
                </Dropdown.Option>
              </Dropdown.Options>
            </Dropdown>

            {/* فلش سمت راست */}
            <ControlsChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-titleText dark:text-titleText-dark pointer-events-none" />

          </div>
        </div>

        <div className='pt-2'>
          <CalendarSwitch options={['میلادی', 'شمسی']} color={'red'} />
        </div>

        <div>
          <p className='text-textTitleColor'>
            موجودی
          </p>
          <p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-1 inline-block'>
              <path d="M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 10.5C22 10.4226 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.5774 22 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="18" cy="12" r="1" fill="currentColor" />
              <path d="M13 4C16.7712 4 18.6569 4 19.8284 5.17157C20.6366 5.97975 20.8873 7.1277 20.965 9M10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15M9 4.00093C5.8857 4.01004 4.23467 4.10848 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C3.82475 19.4816 4.69989 19.7706 6 19.8985" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {(1274).toLocaleString()}<small className='ml-1'>TRX</small>
          </p>
        </div>

        <div>
          <p className='text-textTitleColor'>
            تعداد تراکنش‌ها
          </p>
          <p>
            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
              <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
            </svg>
            <span className=''>
                {(253).toLocaleString()}
            </span>
          </p>
        </div>

        <div>
          <p className='text-textTitleColor'>
            اولین فعالیت
          </p>
          <p>


            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
              <path d="M12 12V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              1403/04/24
            </span>
          </p>
        </div>

        <div>
          <p className='text-textTitleColor'>
            آخرین فعالیت
          </p>
          <p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
              <path d="M12 12V17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
            1403/04/24
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdressActivity
