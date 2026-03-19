import React, { useEffect, useState } from "react";
import { Dropdown, MenuItem, Button, Input } from "@heathmont/moon-core-tw";
import CalendarSwitch from "@/components/switch/switch";
import { ControlsChevronDown } from "@heathmont/moon-icons-tw";
import { useParams, usePathname, useRouter } from "next/navigation";
import { serverAddress } from "@/functions/ServerAddress";
import { GetRequest } from "@/functions/GetRequest";
import { Networks } from "@/functions/Networks";
import { JalaliCalendar } from "@/functions/jalaliCalendar";
import { MiladiCalendar } from "@/functions/miladiCalendar";
import ExploreTopBoxLoading from "@/components/ExploreTopBoxLoading/ExploreTopBoxLoading";

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
              `${serverAddress}/explorer/total-transaction/?type=asset_transactions&contract_address=${
                TokenTransfered.find((item) => item.symbol === TokenSelected)
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
        getData.push(TokenTransfered[0]);
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
        });
        SetTokenTransfered(getData);
      });
  }, []);

  return (
    <div
      className="relative rounded-2xl border border-boxBorderColor main-animated-border-box overflow-visible h-full"
      style={{
        "--dynamic-color": `${
          Networks.find((item) => item.symbole === network.toUpperCase()).color
        }`,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-main-2" />
        <div
          className="absolute -top-24 -right-24 h-54 w-54 blur-3xl opacity-30"
          style={{
            background: `${
              Networks.find((item) => item.symbole === network.toUpperCase())
                .color
            }`,
          }}
        />
        <div
          className="absolute -bottom-28 -left-28 h-60 w-60 blur-3xl opacity-20"
          style={{
            background: `${
              Networks.find((item) => item.symbole === network.toUpperCase())
                .color
            }`,
          }}
        />

        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between gap-3 p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-bgColor/70 border border-boxBorderColor shadow-sm backdrop-blur grid place-items-center text-textColor">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-90"
                >
                  <path
                    d="M4 7.2C4 6.08 4 5.52 4.218 5.092c.192-.376.498-.682.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218.376.192.682.498.874.874C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C18.48 20 17.92 20 16.8 20H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8V7.2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 14.5 10.2 12.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 0 1.4 0L18 11.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="leading-tight">
                <h6 className="text-lg xl:text-xl font-extrabold text-textColor">
                  جزئیات فعالیت آدرس
                </h6>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {Loading1 && Loading2 ? (
              <ExploreTopBoxLoading />
            ) : (
              <div className="p-4 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-textColor items-stretch">
                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full">
                    <p className="text-textTitleColor text-xs mb-2">موجودی</p>
                    <p className="text-base font-extrabold flex items-center gap-2 tabular-nums">
                      <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6 8H10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 10.5C22 10.4226 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <circle cx="18" cy="12" r="1" fill="currentColor" />
                          <path
                            d="M13 4C16.7712 4 18.6569 4 19.8284 5.17157C20.6366 5.97975 20.8873 7.1277 20.965 9M10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15M9 4.00093C5.8857 4.01004 4.23467 4.10848 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C3.82475 19.4816 4.69989 19.7706 6 19.8985"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      {Balance !== null ? (
                        <span>
                          {Balance.toLocaleString()}
                          <small className="ml-1 opacity-80">
                            {TokenSelected}
                          </small>
                        </span>
                      ) : (
                        "نامشخص"
                      )}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full">
                    <p className="text-textTitleColor text-xs mb-2">
                      تعداد تراکنش‌ها
                    </p>
                    <p className="text-base font-extrabold flex items-center gap-2 tabular-nums">
                      <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                        <svg
                          fill="currentColor"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z" />
                        </svg>
                      </span>
                      {typeof Transactions === "number"
                        ? Transactions.toLocaleString()
                        : "نامشخص"}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full">
                    <p className="text-textTitleColor text-xs mb-2">
                      اولین فعالیت
                    </p>
                    <p className="text-base font-extrabold flex items-center gap-2">
                      <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 12V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {FirstActivity !== null
                        ? Miladi === 0
                          ? `${MiladiCalendar(FirstActivity).year}/${
                              MiladiCalendar(FirstActivity).month
                            }/${MiladiCalendar(FirstActivity).day}`
                          : `${JalaliCalendar(FirstActivity).year}/${
                              JalaliCalendar(FirstActivity).month
                            }/${JalaliCalendar(FirstActivity).day}`
                        : "نامشخص"}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full">
                    <p className="text-textTitleColor text-xs mb-2">
                      آخرین فعالیت
                    </p>
                    <p className="text-base font-extrabold flex items-center gap-2">
                      <span className="h-9 w-9 rounded-2xl grid place-items-center bg-bgColor border border-boxBorderColor">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 12V17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {LastActivity !== null
                        ? Miladi === 0
                          ? `${MiladiCalendar(LastActivity).year}/${
                              MiladiCalendar(LastActivity).month
                            }/${MiladiCalendar(LastActivity).day}`
                          : `${JalaliCalendar(LastActivity).year}/${
                              JalaliCalendar(LastActivity).month
                            }/${JalaliCalendar(LastActivity).day}`
                        : "نامشخص"}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full relative z-2">
                    <p className="text-textTitleColor text-xs mb-2">
                      انتخاب توکن
                    </p>

                    <div className="relative w-full">
                      <Dropdown
                        onChange={SetTokenSelected}
                        value={TokenSelected}
                      >
                        <Dropdown.Trigger className="w-full">
                          <Button
                            as="span"
                            role="button"
                            variant="ghost"
                            className="flex items-center justify-between w-full pl-10 pr-10 py-2.5 cursor-pointer
                              border border-boxBorderColor rounded-2xl
                              dark:border-buttonBorderColor-dark appearance-none
                              bg-bgColor/60 backdrop-blur hover:bg-bgColor/80 transition"
                          >
                            <span className="text-textColor inline-flex items-center gap-2">
                              <img
                                src={`/images/${TokenSelected}.png`}
                                className="w-5 h-5 object-contain"
                              />
                              <span className="font-semibold">
                                {TokenSelected}
                              </span>
                            </span>
                          </Button>
                        </Dropdown.Trigger>

                        <Dropdown.Options
                          className="absolute left-0 right-0 mt-2 p-2
                            bg-bgColor dark:bg-buttonColor-dark
                            border border-boxBorderColor dark:border-buttonBorderColor-dark
                            rounded-2xl text-textColor z-999
                            max-h-60 overflow-y-auto shadow-2xl"
                        >
                          {TokenTransfered.map((item, index) => (
                            <Dropdown.Option value={item.symbol} key={index}>
                              {({ selected, active }) => (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                  className={`border mt-2 mb-1 rounded-2xl
                                    ${
                                      TokenSelected === item.symbol
                                        ? "bg-boxColor border-boxBorderColor dark:bg-gray-700"
                                        : "border-boxBorderColor"
                                    } text-textColor`}
                                >
                                  <MenuItem.Title>
                                    <img
                                      src={`/images/${item.symbol}.png`}
                                      className="w-5 h-5 inline-block ml-1"
                                    />
                                    {item.symbol}
                                  </MenuItem.Title>
                                </MenuItem>
                              )}
                            </Dropdown.Option>
                          ))}
                        </Dropdown.Options>
                      </Dropdown>

                      <ControlsChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-titleText dark:text-titleText-dark pointer-events-none" />
                    </div>
                  </div>

                  <div className="group rounded-2xl bg-bgColor/50 border border-boxBorderColor p-4 shadow-sm backdrop-blur hover:bg-bgColor/70 hover:shadow-md transition h-full">
                    <p className="text-textTitleColor text-xs mb-2">
                      نوع تاریخ
                    </p>
                    <div className="pt-1">
                      <CalendarSwitch
                        options={["میلادی", "شمسی"]}
                        color={"red"}
                        SetMiladi={SetMiladi}
                      />
                    </div>
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
