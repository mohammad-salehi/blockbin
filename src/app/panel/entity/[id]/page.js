'use client'

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { MenuItem, Button } from '@heathmont/moon-core-tw'
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import { Networks } from '@/functions/Networks'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat'
import { GetRequest } from '@/functions/GetRequest'
import { useParams } from 'next/navigation'
import { serverAddress } from '@/functions/ServerAddress'
import Dropdown, {
  DropdownTrigger,
  DropdownOptions,
  DropdownOption
} from "@/components/Dropdown/Dropdown";

const HIDDEN_KEYS = new Set([
  'currency',
  'addresses',
])

const MAX_ARRAY_PREVIEW = 20

const AddressPage = () => {

  const params = useParams();
  const ENTITY_UID = params.id;

  const PAGE_SIZE = 10
  const API_BASE = serverAddress

  // ✅ اصلاح: مقدار اولیه باید با symbole2 یکی از شبکه‌ها مطابقت داشته باشه
  const [networkSelected, setNetworkSelected] = useState('BTC')
  const [addresses, setAddresses] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)

  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState('')

  const [entityLoading, setEntityLoading] = useState(true)
  const [entityError, setEntityError] = useState('')
  const [entityPayload, setEntityPayload] = useState(null)

  const selectedNetworkMeta = useMemo(() => {
    return Networks.find(
      (item) => item.symbole2 === networkSelected  // ✅ مقایسه با symbole2
    )
  }, [networkSelected])

  const entityInfo = useMemo(() => {
    const infoArr = entityPayload?.data?.info
    if (!Array.isArray(infoArr)) return null
    return infoArr?.[0] ?? null
  }, [entityPayload])

  const metadata = useMemo(() => entityInfo?.metadata ?? null, [entityInfo])
  const category = useMemo(() => entityInfo?.category ?? null, [entityInfo])

  const addressCount = useMemo(() => {
    const n = entityPayload?.data?.address_count
    return typeof n === 'number' ? n : Number(n || 0)
  }, [entityPayload])

  const riskPercent = useMemo(() => {
    const raw = entityInfo?.riskscore
    const num = typeof raw === 'number' ? raw : Number(raw)
    if (!Number.isFinite(num)) return null
    if (num <= 1) return Math.round(num * 100)
    if (num <= 100) return Math.round(num)
    return Math.min(100, Math.round(num))
  }, [entityInfo])

  const riskLevel = useMemo(() => {
    if (riskPercent == null) return { label: 'نامشخص' }
    if (riskPercent >= 80) return { label: 'خیلی بالا' }
    if (riskPercent >= 60) return { label: 'بالا' }
    if (riskPercent >= 30) return { label: 'متوسط' }
    return { label: 'پایین' }
  }, [riskPercent])

  const columns = useMemo(
    () => [
      {
        header: 'آدرس',
        accessorKey: 'address',
        cell: (row) => {
          const addr = row?.address ?? row?.original?.address ?? ''
          return (
            <div className="font-mono text-sm text-textColor">
              {AddressFormat(addr, 28, 'address', networkSelected, true)}
            </div>
          )
        },
      },
      {
        header: 'شبکه',
        accessorKey: 'network',
        cell: (row) => {
          const net = row?.network ?? row?.original?.network ?? ''
          const networkInfo = Networks.find(
            (item) => item.symbole2.toUpperCase() === String(net).toUpperCase()
          )
          const name = networkInfo?.name || net
          const symbole = networkInfo?.symbole || net

          return (
            <div className="flex items-center gap-2">
              <img
                src={`/images/${symbole}.png`}
                className="w-5 h-5"
                alt={String(net)}
                loading="lazy"
              />
              <span className="text-sm font-semibold text-textColor">
                {String(net).toUpperCase()}
              </span>
              <span className="text-xs opacity-70">{name}</span>
            </div>
          )
        },
      },
      {
        header: 'لیبل‌ها',
        accessorKey: 'labels',
        cell: (row) => {
          const labels = row?.labels ?? row?.original?.labels ?? []
          const text = Array.isArray(labels) && labels.length ? labels.join(', ') : 'نامشخص'
          return <div className="text-sm text-textColor">{text}</div>
        },
      },
    ],
    [networkSelected]
  )

  const fetchAddresses = useCallback(
    async (requestedPage) => {
      setTableLoading(true)
      setTableError('')

      const selectedNetwork = Networks.find(item => item.symbole2 === networkSelected)
      const networkParam = selectedNetwork?.symbole2.toLowerCase() || networkSelected.toLowerCase()

      const url =
        `${API_BASE}/entity/addresses/?` +
        `entity_uid=${encodeURIComponent(ENTITY_UID)}` +
        `&network=${encodeURIComponent(networkParam)}` +
        `&page_number=${encodeURIComponent(String(requestedPage))}` +
        `&page_size=${encodeURIComponent(String(PAGE_SIZE))}`

      try {
        const response = await GetRequest(url)
        if (response?.status === 200) {
          const data = response?.data?.data
          setAddresses(data?.addresses || [])
          setTotalItems(Number(data?.count || 0))
        } else {
          setAddresses([])
          setTotalItems(0)
          setTableError('دریافت لیست آدرس‌ها ناموفق بود.')
        }
      } catch (err) {
        console.log(err)
        setAddresses([])
        setTotalItems(0)
        setTableError('خطا در ارتباط با سرور برای دریافت آدرس‌ها.')
      } finally {
        setTableLoading(false)
      }
    },
    [networkSelected, ENTITY_UID]
  )

  const fetchEntity = useCallback(async () => {
    setEntityLoading(true)
    setEntityError('')

    const url = `${API_BASE}/entity/entities/${ENTITY_UID}/`

    try {
      const response = await GetRequest(url)
      if (response?.status === 200) {
        setEntityPayload(response?.data ?? null)
      } else {
        setEntityPayload(null)
        setEntityError('دریافت اطلاعات موجودیت ناموفق بود.')
      }
    } catch (err) {
      console.log(err)
      setEntityPayload(null)
      setEntityError('خطا در ارتباط با سرور برای دریافت اطلاعات موجودیت.')
    } finally {
      setEntityLoading(false)
    }
  }, [ENTITY_UID])

  useEffect(() => {
    fetchEntity()
  }, [fetchEntity])

  useEffect(() => {
    setPage(1)
  }, [networkSelected])

  useEffect(() => {
    fetchAddresses(page)
  }, [fetchAddresses, page])

  const showValue = (v) => {
    if (v === null) return '—'
    if (v === undefined) return '—'
    if (typeof v === 'boolean') return v ? 'بله' : 'خیر'
    if (typeof v === 'number') return String(v)
    if (typeof v === 'string') return v.trim() ? v : '—'
    if (Array.isArray(v)) {
      if (v.length === 0) return '—'
      if (v.length > MAX_ARRAY_PREVIEW) return `(${v.length} آیتم) — نمایش داده نمی‌شود`
      return v.join(', ')
    }
    if (typeof v === 'object') return '—'
    return String(v)
  }

  const Field = ({ label, value, link }) => {
    const v = showValue(value)
    const isLink = typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'))
    return (
      <div className="flex flex-col gap-1 py-2">
        <div className="text-xs opacity-70">{label}</div>
        {isLink ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-textColor underline break-all"
          >
            {link}
          </a>
        ) : (
          <div className="text-sm text-textColor wrap-break-word">{v}</div>
        )}
      </div>
    )
  }

  const CompactMetaList = ({ obj, title }) => {
    if (!obj || typeof obj !== 'object') return null
    const entries = Object.entries(obj).filter(([k, v]) => {
      if (HIDDEN_KEYS.has(k)) return false
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) return false
      if (Array.isArray(v) && v.length > MAX_ARRAY_PREVIEW) return false
      return true
    })

    if (entries.length === 0) return null

    return (
      <div className="mt-6">
        <div className="text-sm font-semibold text-textColor mb-2">{title}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {entries.map(([k, v]) => (
            <Field key={k} label={k} value={v} />
          ))}
        </div>
      </div>
    )
  }

  // یک کامپوننت Dropdown ساده که حتماً کار می‌کنه
  const SimpleDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find(opt => opt.value === value)

    return (
      <div className="relative w-64" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-2xl border border-boxBorderColor 
                   bg-boxColor/70 text-textColor backdrop-blur 
                   flex items-center justify-between 
                   px-4 py-2.5
                   hover:bg-boxColor transition-all
                   focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <span className="flex items-center gap-2">
            {selectedOption && (
              <>
                <img src={selectedOption.icon} className="w-5 h-5" alt="" />
                <span className="font-semibold">{selectedOption.label.split(' - ')[0]}</span>
                <span className="text-xs opacity-70">{selectedOption.name}</span>
              </>
            )}
          </span>
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 
                        bg-bgColor border border-boxBorderColor rounded-2xl 
                        shadow-2xl z-[100] max-h-72 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  console.log('Selecting:', option.value)
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full text-right px-4 py-2.5 transition-colors flex items-center gap-2
                hover:bg-boxColor/50
                ${value === option.value ? 'bg-primary/10 text-primary' : 'text-textColor'}`}
              >
                <img src={option.icon} className="w-5 h-5" alt="" />
                <span className="font-semibold">{option.label.split(' - ')[0]}</span>
                <span className="text-xs opacity-70">{option.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // آماده کردن options برای SimpleDropdown
  const networkOptions = Networks.map(item => ({
    value: item.symbole2,
    label: `${String(item.symbole).toUpperCase()} - ${item.name}`,
    icon: `/images/${item.symbole}.png`,
    name: item.name,
    symbole: item.symbole
  }))

  // جایگزین Dropdown در JSX:

  return (
    <div className="mx-auto max-w-7xl">

      {/* ONE SINGLE BOX: identity + specs + risk */}
      <div className="mt-8">
        {entityLoading ? (
          <div className="rounded-3xl border border-boxBorderColor bg-bgColor p-6">
            <SkeletonLoading />
          </div>
        ) : entityError ? (
          <div className="rounded-3xl border border-boxBorderColor bg-bgColor p-6">
            <div className="text-sm font-semibold text-textColor">خطا در دریافت اطلاعات</div>
            <div className="mt-2 text-sm opacity-70 text-textColor">{entityError}</div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[26px] border border-boxBorderColor bg-bgColor">
            {/* Neon glass background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-95 h-95 rounded-full bg-primary/14 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-105 h-105 rounded-full bg-primary/14 blur-3xl" />
              <div className="absolute inset-0 opacity-[0.28] [background:radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_52%)]" />
            </div>

            <div className="relative p-6 sm:p-8">
              {/* Top identity row */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* identity */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-boxBorderColor bg-boxColor/70 backdrop-blur flex items-center justify-center overflow-hidden shrink-0">
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 pointer-events-none" />
                    {entityInfo?.image ? (
                      <img
                        src={entityInfo.image}
                        alt="entity"
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : metadata?.image ? (
                      <img
                        src={metadata.image}
                        alt="entity"
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-xs opacity-70 text-textColor">بدون تصویر</div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-textColor leading-7">
                      {entityInfo?.persian_name || entityInfo?.name || '—'}
                    </h2>

                    <div className="mt-1 text-sm text-textColor">
                      <span className="opacity-70">نام انگلیسی:</span>{' '}
                      <span className="font-semibold">{entityInfo?.name || '—'}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full border border-boxBorderColor bg-boxColor/70 text-xs text-textColor backdrop-blur">
                        <span className="opacity-70">نوع:</span> <b>{metadata?.type || 'نامشخص'}</b>
                      </span>

                      <span className="px-3 py-1 rounded-full border border-boxBorderColor bg-boxColor/70 text-xs text-textColor backdrop-blur">
                        <span className="opacity-70">کشور:</span> <b>{entityInfo?.country || 'نامشخص'}</b>
                      </span>

                      <span className="px-3 py-1 rounded-full border border-boxBorderColor bg-boxColor/70 text-xs text-textColor backdrop-blur">
                        <span className="opacity-70">دسته‌بندی:</span>{' '}
                        <b>{category?.persian_name || category?.name || 'نامشخص'}</b>
                      </span>

                      <span className="px-3 py-1 rounded-full border border-boxBorderColor bg-boxColor/70 text-xs text-textColor backdrop-blur">
                        <span className="opacity-70">وضعیت تحریم:</span>{' '}
                        <b>{metadata?.is_in_sanction_list ? 'تحریم' : 'بدون تحریم'}</b>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Risk embedded in same box */}
                <div className="w-full lg:w-105">
                  <div className="rounded-3xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-textColor">ریسک موجودیت</div>
                      <span className="px-3 py-1 rounded-full border border-boxBorderColor bg-bgColor/60 text-xs text-textColor backdrop-blur">
                        سطح: <b>{riskLevel.label}</b>
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <div className="text-4xl font-extrabold text-textColor">
                        {riskPercent == null ? '--' : `${riskPercent}%`}
                      </div>
                      <div className="text-xs opacity-70 text-textColor">Risk Score</div>
                    </div>

                    <div className="mt-4">
                      <div className="h-2.5 w-full rounded-full bg-bgColor/60 border border-boxBorderColor overflow-hidden backdrop-blur">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${Math.max(0, Math.min(100, Number(riskPercent ?? 0)))}%`,
                          }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-xs opacity-70 text-textColor">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-8 h-px w-full bg-boxBorderColor/60" />

              {/* Specs area */}
              <div className="mt-6">
                <h3 className="text-lg font-extrabold text-textColor">مشخصات</h3>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Website */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">وبسایت</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      {metadata?.website || metadata?.web_site ? (
                        <a
                          href={metadata?.website || metadata?.web_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-textColor break-all"
                        >
                          {metadata?.website || metadata?.web_site}
                        </a>
                      ) : (
                        <span className="text-textColor">ثبت نشده</span>
                      )}
                    </div>
                  </div>

                  {/* Legal name */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">نام حقوقی</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.legal_name || 'ثبت نشده'}
                    </div>
                  </div>

                  {/* Registration */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">شماره ثبت</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.registration_number || 'ثبت نشده'}
                    </div>
                  </div>

                  {/* Supervisor */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">نهاد ناظر</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.supervisory_body || 'نامشخص'}
                    </div>
                  </div>

                  {/* Establishment */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">تاریخ تأسیس</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.establishment || 'ثبت نشده'}
                    </div>
                  </div>

                  {/* Fiat support */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">پشتیبانی از فیات</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.fiat_support ? 'دارد' : 'ندارد'}
                    </div>
                  </div>

                  {/* Private coin */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">سکه خصوصی</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.private_coin ? 'دارد' : 'ندارد'}
                    </div>
                  </div>

                  {/* Licence */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">مجوز</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-bold text-textColor">
                      {metadata?.licence ? metadata?.licence === 'dont_have' ? 'بدون مجوز' : metadata?.licence : 'نامشخص'}
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="group rounded-2xl border border-boxBorderColor bg-boxColor/55 backdrop-blur p-4 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs opacity-70 text-textColor">توییتر</div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      {metadata?.twitter ? (
                        <a
                          href={metadata.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-textColor break-all"
                        >
                          {metadata.twitter}
                        </a>
                      ) : (
                        <span className="text-textColor">ثبت نشده</span>
                      )}
                    </div>
                  </div>
                </div>

                {metadata?.note ? (
                  <div className="mt-6 rounded-2xl border border-boxBorderColor bg-bgColor/60 backdrop-blur p-4">
                    <div className="text-xs opacity-70 text-textColor">یادداشت</div>
                    <div className="mt-1 text-sm text-textColor wrap-break-word">{metadata.note}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADDRESSES SECTION */}
      <div className="mt-8 relative overflow-hidden rounded-3xl border border-boxBorderColor bg-bgColor">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8 border-b border-boxBorderColor">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-extrabold text-textColor">لیست آدرس‌ها</h3>

            <div className="flex items-center gap-3 justify-end">

              <SimpleDropdown
                value={networkSelected}
                onChange={(val) => {
                  console.log('onChange called with:', val)
                  setNetworkSelected(val)
                }}
                options={networkOptions}
              />
            </div>
          </div>
        </div>

        <div className="relative p-4 sm:p-6">
          {tableLoading ? (
            <div className="rounded-[20px] border border-boxBorderColor bg-bgColor p-6">
              <SkeletonLoading />
            </div>
          ) : tableError ? (
            <div className="rounded-[20px] border border-boxBorderColor bg-bgColor p-6">
              <div className="text-sm font-semibold text-textColor">خطا در دریافت آدرس‌ها</div>
              <div className="mt-2 text-sm opacity-70 text-textColor">{tableError}</div>
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="rounded-2xl border border-boxBorderColor bg-boxColor/70 text-textColor backdrop-blur hover:bg-boxColor"
                  onClick={() => fetchAddresses(page)}
                >
                  تلاش دوباره
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border border-boxBorderColor bg-bgColor overflow-hidden">
              <ExpandableTable
                data={addresses}
                columns={columns}
                rowDetailsMode="row"
                rowDetailsClassName="rounded-xl p-3"
              />
            </div>
          )}

          <div className="mt-6">
            <Pagination
              rtl
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              currentPage={page}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressPage