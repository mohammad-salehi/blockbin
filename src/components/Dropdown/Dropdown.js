'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const SimpleDropdown = ({
  value,
  onChange,
  options,
  placeholder = 'انتخاب کنید',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  renderValue,
  renderOption,
  iconKey = 'icon',
  labelKey = 'label',
  valueKey = 'value',
  nameKey = 'name',
  width = 'w-64'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 })
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  // محاسبه موقعیت منو وقتی باز می‌شود
  const updateMenuPosition = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()

    setMenuPos({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
    })
  }

  // بسته شدن با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    window.addEventListener('scroll', updateMenuPosition, true)
    window.addEventListener('resize', updateMenuPosition)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
      window.removeEventListener('scroll', updateMenuPosition, true)
      window.removeEventListener('resize', updateMenuPosition)
    }
  }, [])

  const selectedOption = options.find(opt => opt[valueKey] === value)

  const renderSelectedValue = () => {
    if (renderValue && selectedOption) return renderValue(selectedOption)

    if (selectedOption) {
      return (
        <span className="flex items-center gap-2 min-w-0">
          {selectedOption[iconKey] && (
            <img
              src={selectedOption[iconKey]}
              className="w-5 h-5 object-contain flex-shrink-0"
              alt=""
              loading="lazy"
            />
          )}
          <span className="font-semibold truncate">
            {selectedOption[labelKey]?.split(' - ')[0] || selectedOption[labelKey]}
          </span>
          {selectedOption[nameKey] && (
            <span className="text-xs opacity-70 truncate hidden sm:inline-block">
              {selectedOption[nameKey]}
            </span>
          )}
        </span>
      )
    }

    return <span className="text-textTitleColor">{placeholder}</span>
  }

  const renderMenuItem = (option) => {
    if (renderOption) return renderOption(option)

    return (
      <span className="flex items-center gap-2">
        {option[iconKey] && (
          <img
            src={option[iconKey]}
            className="w-5 h-5 object-contain"
            alt=""
            loading="lazy"
          />
        )}
        <span className="font-semibold">
          {option[labelKey]?.split(' - ')[0] || option[labelKey]}
        </span>
        {option[nameKey] && (
          <span className="text-xs opacity-70 hidden sm:inline-block">
            {option[nameKey]}
          </span>
        )}
      </span>
    )
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setTimeout(() => updateMenuPosition(), 0)
  }

  return (
    <>
      {/* Trigger Button */}
      <div className={`relative ${width} ${className}`}>
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          className={`w-full rounded-2xl border border-boxBorderColor 
                     bg-boxColor/70 text-textColor backdrop-blur 
                     flex items-center justify-between 
                     px-4 py-2.5
                     hover:bg-boxColor transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary/30
                     ${buttonClassName}`}
        >
          {renderSelectedValue()}

          <svg
            className={`w-4 h-4 text-textTitleColor flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu (Portal) */}
      {isOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`fixed z-[99999] bg-bgColor border border-boxBorderColor rounded-2xl 
                       shadow-2xl max-h-72 overflow-y-auto ${menuClassName}`}
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width
            }}
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-textTitleColor text-sm text-center">
                آیتمی یافت نشد
              </div>
            ) : (
              options.map((option, index) => (
                <button
                  key={option[valueKey] || index}
                  type="button"
                  onClick={() => {
                    onChange(option[valueKey])
                    setIsOpen(false)
                  }}
                  className={`w-full text-right px-4 py-2.5 transition-all duration-150
                    hover:bg-boxColor/50
                    ${value === option[valueKey]
                      ? 'bg-primary/10 text-primary border-r-2 border-primary'
                      : 'text-textColor'
                    }`}
                >
                  {renderMenuItem(option)}
                </button>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  )
}

export default SimpleDropdown
