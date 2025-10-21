'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'
import FullPageLoading from '@/components/FullPageLoading/FullPageLoading'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DetailBox from '@/components/DetailBox/DetailBox'
import TailwindGaugePretty from '@/components/Gauge/Gauge'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import { Networks } from '@/functions/Networks'
import { AddressFormat } from '@/components/AddressFormat/AddressFormat'
import { Dropdown, MenuItem, Button } from "@heathmont/moon-core-tw";
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'

const Page = () => {
  const params = useParams()
  const id = params.id

  const [Balance, setBalance] = useState(0)
  const [Data, SetData] = useState(null)
  const [Transactions, SetTransactions] = useState([])
  const [Start, SetStart] = useState(false)
  const [First, SetFirst] = useState(1)
  const [totalItems, SettotalItems] = useState(1)
  const [Loading, SetLoading] = useState(false)
  const [TableLoading, SetTableLoading] = useState(false)
  const [RiskScore, SetRiskScore] = useState(0)
  const [networkSelected, SetnetworkSelected] = useState(Networks[10].symbole)

  const handleEdit = (sectionId, contentId, newContent) => {
    setInvoiceData((prevData) =>
      prevData.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.map((item) => {
              if (item.id === contentId) {
                return { ...item, content: newContent };
              }
              return item;
            }),
          };
        }
        return section;
      })
    );
  };
  const [balanceMap, setBalanceMap] = useState({});
  const inFlightBalance = useRef(new Set()); // اختیاری برای جلوگیری از دابل‌فچ
  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      title: "مشخصات پایه",
      content: [
        { id: 1, title: "عنوان فارسی", content: '' },
        { id: 2, title: "عنوان حقوقی", content: "" },
        { id: 3, title: "وبسایت", content: "" },
        { id: 4, title: "تاریخ تاسیس", content: "" },
        { id: 5, title: "شماره ثبت", content: "" },
      ],
    },
    {
      id: 2,
      title: "جزئیات موجودیت",
      content: [
        { id: 1, title: "دسته‌بندی", content: "" },
        { id: 2, title: "پشتیبانی از فیات", content: "" },
        { id: 3, title: "سکه خصوصی", content: "" },
        { id: 4, title: "نهاد ناظر", content: "" },
        { id: 5, title: "مجوز", content: "" },
      ],
    },
    {
      id: 3,
      title: "ریسک",
      content: [
        {
          id: 1,
          content: (
            <TailwindGaugePretty value={RiskScore} />
          )
        }
      ],
    },
  ]);


  const [SourceMap, setSourceMap] = useState({});
  const [metadataMap, setMetadataMap] = useState({});
  const [statusMap, setStatusMap] = useState({}); // { [address]: 'loading' | 'loaded' }
  const inFlight = useRef(new Set());

  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/entity/type/`)
      .then((typeResponse) => {
        GetRequest(`${serverAddress}/entity/${id}/`)
          .then((response) => {
            SetData(response.data)
            handleEdit(1, 1, response.data.persian_name)
            handleEdit(1, 2, response.data.legal_name)
            handleEdit(1, 3, response.data.web_site)
            handleEdit(1, 4, response.data.establishment)
            handleEdit(1, 5, response.data.registration_number)
            handleEdit(2, 1, typeResponse.data.results.find(item => item.id === response.data.type).persian_name)
            handleEdit(2, 2, response.data.fiat_support ? 'دارد' : 'ندارد')
            handleEdit(2, 3, response.data.private_coin ? 'دارد' : 'ندارد')
            handleEdit(2, 4, response.data.supervisory_body)
            handleEdit(2, 5, response.data.licence)

            const rs = response.data.riskscore * 100;
            SetRiskScore(rs);

            setInvoiceData(prev =>
              prev.map(sec =>
                sec.id === 3
                  ? {
                    ...sec,
                    content: [
                      {
                        id: 1,
                        content: (
                          <div className="w-full self-stretch flex justify-center items-center ">
                            {/* ظرف داخلی برای کنترل حداکثر عرض گیج */}
                            <div className="w-full ">
                              <TailwindGaugePretty value={rs} />
                            </div>
                          </div>
                        ),
                      },
                    ],
                  }
                  : sec
              )
            );

            SetLoading(false)
          })
          .catch((err) => {
            console.log(err)
            SetLoading(false)
          })
      })
      .catch((err) => {

      })

  }, [])


  const addDataToTable = (response) => {

    try {
      const getData = []
      for (let i = 0; i < response.data.results[0].addresses.length; i++) {
        if (response.data.results[0].addresses[i].network.toUpperCase() === networkSelected.toUpperCase()) {
          getData.push(
            {
              address: response.data.results[0].addresses[i].address,
              network: response.data.results[0].addresses[i].network
            }
          )
          SettotalItems(response.data.results[0].details.count[0].networkCounts.find(item => item.network.toUpperCase() === Networks.find(item2 => item2.symbole === networkSelected).symbole2).count)
        }
      }
      SetTransactions(getData)

    } catch (error) {
      console.log(error)
      SetTransactions([])
    }
  }

  useEffect(() => {
    SetLoading(true)
    GetRequest(`${serverAddress}/entity/addresses/?entity_uuid=${id}&page=1&size=10&has_transaction=${false}`)
      .then((response) => {
        if (response.status === 200) {
          addDataToTable(response)
          SetStart(true)
        }
        SetLoading(false)
      })
      .catch((err) => {
        console.log(err)
        SetLoading(false)
      })
  }, [])

  useEffect(() => {
    if (Start) {
      SetTableLoading(true)
      GetRequest(`${serverAddress}/entity/addresses/?entity_uuid=${id}&page=${First}&size=10&has_transaction=${false}`)
        .then((response) => {
          if (response.status === 200) {
            addDataToTable(response)
          }
          SetTableLoading(false)
        })
        .catch((err) => {
          console.log(err)
          SetTableLoading(false)
        })
    }
  }, [networkSelected, First])

  useEffect(() => {
    SetFirst(1)
  }, [networkSelected])

  const columns = [
    {
      header: "آدرس",
      accessorKey: "logo",
      cell: (row) => (
        <div>{AddressFormat(row.address, 24, 'address', networkSelected, true)}</div>
      ),
    },
    {
      header: "شناسایی توسط", accessorKey: "hash",

      cell: (row) => (
        <div>
          {/*  */}
          <SourceAddress address={row.address} />
        </div>
      ),
    },
    {
      header: "نوع آدرس", accessorKey: "hash",

      cell: (row) => (
        <div>
          {/*  */}
          <TypeAddress address={row.address} />
        </div>
      ),
    },
    {
      header: "شبکه", accessorKey: "legal_name",
      cell: (row) => (
        <div className='p-0'>
          <img src={`/images/${row.network}.png`} className='w-6 inline-block' />
          <span className='mr-1 text-md'>
            {Networks.find(item => item.symbole.toUpperCase() === row.network.toUpperCase()).name}
          </span>
        </div>
      ),
    },
    {
      header: `موجودی 
      
      `, accessorKey: "TokenInfo",
      cell: (row) => (
        <div className='p-0'>
          <AddressBalance key={row.address} address={row.address} />
        </div>
      ),
    }
  ];

  const fetchMetadata = async (address) => {
    if (!address) return;
    if (inFlight.current.has(address)) return;
    if (statusMap[address] === 'loaded') return; // قبلاً لود شده
  
    inFlight.current.add(address);
    setStatusMap(prev => ({ ...prev, [address]: 'loading' }));
  
    try {
      const response = await GetRequest(`${serverAddress}/explorer/address-detail/?query=${address}`);
      if (response.status === 200) {
        const meta = response.data?.address_detail?.metadata ?? {};
  
        // نرمال‌سازی label
        const rawLabel = response.data?.address_detail?.address_label[0];
        const normalizedLabel =
          typeof rawLabel === 'string'
            ? rawLabel
            : (typeof rawLabel?.label === 'string' ? rawLabel.label : '');
  
        setMetadataMap(prev => ({ ...prev, [address]: meta }));
        setSourceMap(prev => ({ ...prev, [address]: { label: normalizedLabel } }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      inFlight.current.delete(address);
      setStatusMap(prev => ({ ...prev, [address]: 'loaded' }));
    }
  };
  // NEW: real component so Hooks order stays stable
  const TypeAddress = React.memo(function TypeAddress({ address }) {
    useEffect(() => {
      if (address && !metadataMap[address]) {
        fetchMetadata(address);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, metadataMap]); // ok: we only *read* metadataMap here

    const label = metadataMap[address]?.label;

    return label !== undefined ? (
      <span style={{
        borderRadius: '16px',
        padding: '2px 16px',
        fontSize: '14px'
      }} className='bg-BgGreen text-TextGreen'>
        {label}
      </span>
    ) : (
      <span> نامشخص </span>
    );
  });

  const SourceAddress = React.memo(function TypeAddress({ address }) {

    const label = SourceMap[address]?.label;

    return label !== undefined ? (
      <span style={{
        
        borderRadius: '16px',
        fontSize: '14px'
      }}>
        {label}
      </span>
    ) : (
      <span> نامشخص </span>
    );
  });
  const fetchBalance = async (address) => {
    if (!address) return;
    if (balanceMap[address] !== undefined) return; // ← به‌جای if (balanceMap[address])
    if (inFlightBalance.current.has(address)) return;

    inFlightBalance.current.add(address);
    try {
      const response = await GetRequest(
        `${serverAddress}/explorer/address-aggregation/?query=${address}&network=${networkSelected.toUpperCase()}`
      );
      if (response.status === 200) {
        setBalanceMap(prev => ({
          ...prev,
          [address]: response.data.balance // می‌تونه 0 باشه و مشکلی نیست
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      inFlightBalance.current.delete(address);
    }
  };
  const AddressBalance = React.memo(function AddressBalance({ address }) {
    useEffect(() => {
      // اگر برای این آدرس قبلاً مقدار داریم و شبکه عوض نشده، نیازی به فچ نیست
      if (balanceMap[address] === undefined) {
        fetchBalance(address);
      }
    }, [address, networkSelected]); // ← networkSelected اضافه شد

    const value = balanceMap[address];
    return value !== undefined ? (
      <span>
        {Number(value).toLocaleString()}
        <small style={{ marginLeft: 4 }}>{networkSelected.toUpperCase()}</small>
      </span>
    ) : (
      <span> نامشخص </span>
    );
  });

  // useEffect(() => {
  //   GetRequest(`${serverAddress}/entity/entity-balance/?entityuid=${id}&network=${networkSelected}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setBalance(response.data.balance)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [networkSelected])
  return (

    <div>
      {
        Loading ?
          <FullPageLoading />
          :
          Data !== null ?
            <div>
              <div className="flex items-center gap-3">
                {Data.image && (
                  <img className="w-12 h-12 object-contain" src={Data.image} alt="logo" />
                )}
                {!Data.image && (
                  <ImageNotSupportedIcon className='text-textColor' style={{ fontSize: '48px' }} />
                )}
                {Data.name && (
                  <h4 className="text-4xl font-semibold text-textColor">{Data.name}</h4>
                )}

              </div>
              <DetailBox
                data={invoiceData.map((section) => ({
                  title: section.title,
                  content: section.content.map((item) => ({
                    title: item.title,
                    content: typeof item.content === 'string' ? item.content : React.isValidElement(item.content) ? item.content : '', // تبدیل به string یا Element
                  })),
                }))}
              />
            </div>
            :
            null
      }

      <div className="flex justify-between items-center mt-8">
        <h4 className="text-3xl font-semibold text-textColor text-right">آدرس‌ها</h4>

        <div className="flex justify-end mb-3">
          <Dropdown
            value={networkSelected}
            onChange={() => { }}
          >
            <Dropdown.Trigger className="w-56">
              <Button
                as="span"
                role="button"
                variant="ghost"
                className="flex items-center justify-between w-full px-2 py-2 cursor-pointer
          text-gray-700 border border-boxBorderColor
          rounded-lg dark:border-buttonBorderColor-dark focus:outline-none 
          dark:text-gray-100 appearance-none relative"
              >
                {networkSelected ? (
                  <span className="text-textColor flex items-center">
                    <img
                      src={`/images/${networkSelected}.png`}
                      alt={networkSelected}
                      className="w-5 h-5 inline-block ml-2"
                    />
                    {networkSelected}
                  </span>
                ) : (
                  <span className="text-textColor opacity-70">Select network...</span>
                )}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Options
              className="absolute left-0 mt-2 w-56 px-2 py-1
        text-gray-700 bg-bgColor dark:bg-buttonColor-dark
        border border-boxBorderColor dark:border-buttonBorderColor-dark 
        rounded-lg dark:text-gray-100 appearance-none z-50
        max-h-60 overflow-y-auto"
            >
              {Networks.map((item, index) => (
                <Dropdown.Option value={item.symbole} key={index}>
                  {({ active }) => (
                    <MenuItem
                      isActive={active}
                      isSelected={false}
                      onClick={() => {
                        SetnetworkSelected(item.symbole);
                        document.activeElement?.blur();
                      }}
                      className={`border mt-2 mb-1 rounded-md border-gray-100 dark:border-buttonBorderColor-dark ${networkSelected === item.symbole
                        ? "bg-boxColor border-boxBorderColor dark:bg-gray-700"
                        : "border-boxBorderColor"
                        } text-textColor`}
                    >
                      <MenuItem.Title>
                        <img
                          src={`/images/${item.symbole}.png`}
                          alt={item.symbole}
                          className="w-5 h-5 inline-block ml-2"
                        />
                        {item.symbole}
                      </MenuItem.Title>
                    </MenuItem>
                  )}
                </Dropdown.Option>
              ))}
            </Dropdown.Options>
          </Dropdown>
        </div>
      </div>

      <div className='mt-2'>
        {
          TableLoading ?
            <div className='border border-boxBorderColor p-2 rounded-lg'>
              <SkeletonLoading />
            </div>
            :
            <ExpandableTable
              data={Transactions}          // ← فقط دیتای فیلترشده را بده
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
        }

        <Pagination
          rtl
          totalItems={totalItems}
          pageSize={10}
          currentPage={First}
          onPageChange={
            (e) => {
              SetFirst(e)
            }
          }
        />
      </div>

    </div>
  )
}

export default Page
