import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "@heathmont/moon-core-tw";
import CalendarSwitch from "@/components/switch/switch";
import { ControlsChevronDown } from "@heathmont/moon-icons-tw";
import { useParams } from "next/navigation";
import { serverAddress } from "@/functions/ServerAddress";
import { GetRequest } from "@/functions/GetRequest";
import { Networks } from "@/functions/Networks";
import { JalaliCalendar } from "@/functions/jalaliCalendar";
import { MiladiCalendar } from "@/functions/miladiCalendar";
import ExploreTopBoxLoading from "@/components/ExploreTopBoxLoading/ExploreTopBoxLoading";
import SimpleDropdown from "@/components/Dropdown/Dropdown"; // ← ایمپورت جدید

const AdressActivity = ({
  SetTokenSelected,
  TokenSelected,
  SetMiladi,
  Miladi,
  SetTokenTransfered,
  TokenTransfered,
  Transactions,
  SetTransactions,
}) => {
  const params = useParams();

  const query = params.query;
  const network = params.network;
  const hash = params.hash;

  const [Balance, SetBalance] = useState(null);
  const [FirstActivity, SetFirstActivity] = useState(null);
  const [LastActivity, SetLastActivity] = useState(null);
  const [Loading1, SetLoading1] = useState(false);
  const [Loading2, SetLoading2] = useState(false);

  useEffect(() => {
    SetLoading1(true);
    if (TokenSelected === network) {
      GetRequest(
        `${serverAddress}/explorer/address-aggregation/?query=${hash}&network=${network}`
      )
        .then((response) => {
          if (response.status === 200) {
            SetBalance(response.data.data.balance);
            SetFirstActivity(response.data.data.first_activity);
            SetLastActivity(response.data.data.last_activity);
            SetTransactions(response.data.data.transactions);
          }
          SetLoading1(false);
        })
        .catch((err) => {
          SetLoading1(false);
        });
    } else {
      GetRequest(
        `${serverAddress}/explorer/token-transfer-list/?query=${hash}&network=${network}`
      )
        .then((response) => {
          if (response.status === 200) {
            const Result = response.data.data.find(
              (item) => item.symbol === TokenSelected
            );

            SetBalance(Result.crypto_balance * Math.pow(10, -Result.decimals));
            SetFirstActivity(Result.first_activity);
            SetLastActivity(Result.last_activity);

            GetRequest(
              `${serverAddress}/explorer/total-transaction/?type=asset_transactions&contract_address=${TokenTransfered.find((item) => item.symbol === TokenSelected)
                .contract_address
              }&query=${hash}&network=${network}`
            )
              .then((response) => {
                if (response.status === 200) {
                  SetTransactions(response.data.data.total_document);
                }
                SetLoading1(false);
              })
              .catch((err) => {
                SetLoading1(false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          SetLoading1(false);
        });
    }
  }, [, TokenSelected]);

  useEffect(() => {
    SetLoading2(true);
    GetRequest(
      `${serverAddress}/explorer/token-transfer-list/?query=${hash}&network=${network}`
    )
      .then((response) => {
        SetLoading2(false);
        const getData = [];
        if (TokenTransfered[0]) {
          getData.push(TokenTransfered[0]);
        }
        for (let i = 0; i < response.data.data.length; i++) {
          if (
            !getData.some(
              (item) => item.symbol === response.data.data[i].symbol
            )
          ) {
            getData.push({
              symbol: response.data.data[i].symbol,
              contract_address: response.data.data[i].contract_address,
              value: response.data.data[i].symbol,
              label: response.data.data[i].symbol,
              icon: `/images/${response.data.data[i].symbol}.png`,
            });
          }
        }
        SetTokenTransfered(getData);
      })
      .catch((err) => {
        SetLoading2(false);
        const getData = [];
        getData.push({
          symbol: network,
          contract_address: null,
          value: network,
          label: network,
          icon: `/images/${network}.png`,
        });
        SetTokenTransfered(getData);
      });
  }, []);

  // تبدیل TokenTransfered به فرمت مناسب برای SimpleDropdown
  const tokenOptions = (TokenTransfered || []).map(item => ({
    value: item.symbol,
    label: item.symbol,
    icon: item.icon || `/images/${item.symbol}.png`,
    symbol: item.symbol
  }));

  return (
    <div
      className="relative rounded-2xl border border-boxBorderColor main-animated-border-box overflow-visible h-full transition-all duration-500 hover:shadow-2xl"
      style={{
        "--dynamic-color": `${Networks.find((item) => item.symbole === network.toUpperCase())?.color || '#3b82f6'
          }`,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden h-full bg-gradient-to-br from-bgColor/90 to-bgColor/40 backdrop-blur-sm">

        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${Networks.find((item) => item.symbole === network.toUpperCase())?.color || '#3b82f6'
              }, transparent)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"
          style={{
            background: `radial-gradient(circle, ${Networks.find((item) => item.symbole === network.toUpperCase())?.color || '#3b82f6'
              }, transparent)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
        <div className="relative flex flex-col h-full z-10 animate-fade-in-up">

          <div className="flex items-center justify-between gap-3 p-6 border-b border-boxBorderColor/30 bg-gradient-to-r from-transparent via-bgColor/20 to-transparent">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-xl blur-md"></div>
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-bgColor to-bgColor/80 border border-boxBorderColor shadow-lg backdrop-blur grid place-items-center text-textColor group-hover:scale-105 transition-transform duration-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-90"
                  >
                    <path
                      d="M4 7.2C4 6.08 4 5.52 4.218 5.092c.192-.376.498-.682.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218.376.192.682.498.874.874C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C18.48 20 17.92 20 16.8 20H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8V7.2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 14.5 10.2 12.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 0 1.4 0L18 11.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="text-2xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent tracking-tight">
                  جزئیات فعالیت آدرس
                </h6>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            {Loading1 && Loading2 ? (
              <div className="space-y-4 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-textColor items-stretch">

                  {/* Balance Card */}
                  <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl -mr-12 -mt-12"></div>
                    <div className="relative z-10">
                      <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        موجودی فعلی
                      </p>
                      <p className="text-3xl font-black flex items-center gap-3 tabular-nums tracking-tight">
                        <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M6 8H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 10.5C22 10.4226 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <circle cx="18" cy="12" r="1" fill="currentColor" />
                            <path d="M13 4C16.7712 4 18.6569 4 19.8284 5.17157C20.6366 5.97975 20.8873 7.1277 20.965 9M10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15M9 4.00093C5.8857 4.01004 4.23467 4.10848 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C3.82475 19.4816 4.69989 19.7706 6 19.8985" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </span>
                        {Balance !== null ? (
                          <span>
                            {Balance.toLocaleString()}
                            <small className="mr-1 text-sm font-medium text-textTitleColor">{TokenSelected}</small>
                          </span>
                        ) : (
                          <span className="text-textTitleColor">نامشخص</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Transaction Count Card */}
                  <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      تعداد کل تراکنش‌ها
                    </p>
                    <p className="text-3xl font-black flex items-center gap-3 tabular-nums tracking-tight">
                      <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor">
                        <svg fill="currentColor" width="22" height="22" viewBox="0 0 24 24">
                          <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z" />
                        </svg>
                      </span>
                      {typeof Transactions === "number"
                        ? Transactions.toLocaleString()
                        : "نامشخص"}
                    </p>
                  </div>

                  {/* First Activity Card */}
                  <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      اولین فعالیت
                    </p>
                    <p className="text-xl font-bold flex items-center gap-3">
                      <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 12V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {FirstActivity !== null
                        ? Miladi === 0
                          ? `${MiladiCalendar(FirstActivity).year}/${MiladiCalendar(FirstActivity).month}/${MiladiCalendar(FirstActivity).day}`
                          : `${JalaliCalendar(FirstActivity).year}/${JalaliCalendar(FirstActivity).month}/${JalaliCalendar(FirstActivity).day}`
                        : "نامشخص"}
                    </p>
                  </div>

                  {/* Last Activity Card */}
                  <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      آخرین فعالیت
                    </p>
                    <p className="text-xl font-bold flex items-center gap-3">
                      <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 12V17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {LastActivity !== null
                        ? Miladi === 0
                          ? `${MiladiCalendar(LastActivity).year}/${MiladiCalendar(LastActivity).month}/${MiladiCalendar(LastActivity).day}`
                          : `${JalaliCalendar(LastActivity).year}/${JalaliCalendar(LastActivity).month}/${JalaliCalendar(LastActivity).day}`
                        : "نامشخص"}
                    </p>
                  </div>

                  {/* Token Selector - با SimpleDropdown جدید */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <p className="text-textTitleColor text-xs mb-2 pr-1 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      انتخاب توکن
                    </p>

                    {/* ✅ کامپوننت SimpleDropdown جایگزین شده */}
                    <SimpleDropdown
                      value={TokenSelected}
                      onChange={(val) => {
                        console.log('Token changed to:', val)
                        SetTokenSelected(val)
                      }}
                      options={tokenOptions}
                      width="w-full"
                      buttonClassName="bg-bgColor/80 hover:bg-bgColor/95 border border-boxBorderColor/60 rounded-xl"
                      menuClassName="mt-2"
                    />
                  </div>

                  {/* Calendar Switch */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <p className="text-textTitleColor text-xs mb-2 pr-1 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      نوع تاریخ
                    </p>
                    <CalendarSwitch
                      options={["میلادی", "شمسی"]}
                      color={"red"}
                      SetMiladi={SetMiladi}
                    />
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdressActivity;