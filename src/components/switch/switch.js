import React, { useEffect, useState } from 'react'

const CalendarSwitch = ({ options = [], color = '#0ea5e9', defaultIndex = 0, SetMiladi }) => {
  const [selected, setSelected] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(options.length - 1, 0))
  )

  const handleClick = (i) => {
    setSelected(i)
    SetMiladi(i)
  }

  return (
    <div
      id="CalandarSwitch"
      className="inline-flex w-auto min-w-[30%] select-none"
      dir="rtl" /* اگر چپ به راست می‌خوای، این خط رو حذف کن */
    >
      {options.map((item, i) => {
        const isActive = i === selected
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              handleClick(i)

            }}
            className={[
              'w-1/2 min-w-[50px] px-3 py-2',
              'inline-flex items-center justify-center',
              ' text-sm font-medium',
              'first:rounded-r-2xl last:rounded-l-2xl',
              'transition-colors duration-150',
              'cursor-pointer',
              `${isActive ? 'bg-primary text-white' : 'bg-boxBorderColor text-textColor'}`
            ].join(' ')}
          >
            <span className="truncate">{item}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CalendarSwitch
