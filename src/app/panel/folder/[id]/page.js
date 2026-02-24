"use client";

import React, { useEffect, useMemo, useState } from "react";
import ExpandableTable from "@/components/ExpandableTable/ExpandableTable";
import Pagination from "@/components/Pagination/Pagination";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import { useParams } from "next/navigation";
import { AddressFormat } from "@/components/AddressFormat/AddressFormat";
import { utcToJalaliIran } from "@/functions/utcToJalali";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Networks } from "@/functions/Networks";

const Page = () => {
  const params = useParams();
  const uuid = params.id;

  const [name, setName] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [note, setNote] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [graphs, setGraphs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [addressPage, setAddressPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);
  const [graphPage, setGraphPage] = useState(1);
  const pageSize = 10;

  const [addressSearch, setAddressSearch] = useState("");
  const [transactionSearch, setTransactionSearch] = useState("");
  const [graphSearch, setGraphSearch] = useState("");

  const getNetworkSymbolById = (id) => {
    const found = Networks?.find((item) => item.id === id);
    return found?.symbole || found?.symbol || "";
  };

  const NetworkCell = ({ symbol }) => (
    <div className="flex items-center gap-2">
      <span className="text-textColor">{symbol}</span>
      {symbol ? (
        <img
          alt={symbol}
          style={{ width: "22px", height: "22px" }}
          src={`/images/${symbol}.png`}
          className="inline-block rounded-md"
        />
      ) : null}
    </div>
  );

  const addressColumns = useMemo(
    () => [
      {
        header: "آدرس",
        accessorKey: "address_hash",
        cell: (row) => (
          <div className="text-textColor">
            {AddressFormat(row.address_hash, 8, "address", row.network_symbol, true)}
          </div>
        ),
      },
      {
        header: "شبکه",
        accessorKey: "network",
        cell: (row) => <NetworkCell symbol={row.network_symbol} />,
      },
      {
        header: "ریسک",
        accessorKey: "risk",
        cell: (row) => (
          <span className="text-textColor">{row?.risk ?? "—"}</span>
        ),
      },
      {
        header: "مالک",
        accessorKey: "owner_name",
        cell: (row) => (
          <span className="text-textColor">{row?.owner_name || "نامشخص"}</span>
        ),
      },
      {
        header: "موجودی",
        accessorKey: "asset_volume",
        cell: (row) =>
          row?.asset_volume ? (
            <span className="text-textColor">
              {row.asset_volume}
              <span className="ml-1 opacity-80">{row.network_symbol}</span>
            </span>
          ) : (
            <span className="text-textColor">نامشخص</span>
          ),
      },
      {
        header: "تاریخ افزودن",
        accessorKey: "date_created",
        cell: (row) => (
          <span className="text-textColor">
            {utcToJalaliIran(row.date_created)}
          </span>
        ),
      },
    ],
    []
  );

  const transactionColumns = useMemo(
    () => [
      {
        header: "شناسه تراکنش",
        accessorKey: "hash",
        cell: (row) => (
          <div className="text-textColor">
            {AddressFormat(row.hash, 8, "transaction", row.network_symbol, true)}
          </div>
        ),
      },
      {
        header: "شبکه",
        accessorKey: "network_symbol",
        cell: (row) => <NetworkCell symbol={row.network_symbol} />,
      },
      {
        header: "حجم تراکنش",
        accessorKey: "volume",
        cell: (row) => (
          <span className="text-textColor">
            {row.volume}
            <span className="ml-1 opacity-80">{row.network_symbol}</span>
          </span>
        ),
      },
      {
        header: "تاریخ افزودن",
        accessorKey: "date_created",
        cell: (row) => (
          <span className="text-textColor">
            {utcToJalaliIran(row.date_created)}
          </span>
        ),
      },
    ],
    []
  );

  const graphColumns = useMemo(
    () => [
      {
        header: "عنوان",
        cell: (row) => (
          <button
            type="button"
            onClick={() => openGraph(row.graph_detail.id)}
            className="text-textColor font-medium hover:underline underline-offset-4 cursor-pointer"
          >
            {row.graph_detail.title}
          </button>
        ),
      },
      {
        header: "شبکه",
        accessorKey: "network",
        cell: (row) => {
          const symbol = getNetworkSymbolById(row.graph_detail.network);
          return <NetworkCell symbol={symbol} />;
        },
      },
      {
        header: "توضیحات",
        accessorKey: "Description",
        cell: (row) => (
          <span className="text-textColor">{row.graph_detail.Description}</span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);

    GetRequest(`${serverAddress}/case/management/${uuid}/`)
      .then((response) => {
        const payload = response?.data?.data;
        setName(payload?.case_info?.name ?? "");
        setLastUpdate(payload?.case_info?.modified_time ?? "");
        setNote(payload?.case_info?.note_detail ?? "");
        setAddresses(Array.isArray(payload?.addresses) ? payload.addresses : []);
        setTransactions(
          Array.isArray(payload?.transactions) ? payload.transactions : []
        );
        setGraphs(Array.isArray(payload?.graphs) ? payload.graphs : []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("دریافت اطلاعات پرونده ناموفق بود", {
          position: "bottom-left",
        });
      });
  }, []);

  const sendValueTextarea = async () => {
    try {
      const response = await axios.put(
        `${serverAddress}/case/management/${uuid}/`,
        { note_detail: note },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      );

      if (response.status === 200) {
        return toast.success("یادداشت با موفقیت تغییر کرد", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("ثبت یادداشت ناموفق بود", { position: "bottom-left" });
    }
  };

  const openGraph = (id) => {
    GetRequest(`${serverAddress}/explorer/graph/${id}/`)
      .then((response2) => {
        console.log(response2)
        const v = response2?.data?.data?.value;
        if (!v) return;

        window.location.assign(`/panel/tracker/${v.network}/${v.hash}/${v.token}/${v.contractAddress}/${response2.data.data.id}`);
      })
      .catch((err) => {
        const status = err?.response?.status ?? err?.status;
        if (status === 404) {
          return toast.error("گراف موردنظر یافت نشد", {
            position: "bottom-left",
          });
        }
        toast.error("باز کردن گراف ناموفق بود", { position: "bottom-left" });
      });
  };

  const filteredAddresses = useMemo(() => {
    const rows = Array.isArray(addresses) ? addresses : [];
    const q = addressSearch.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((x) => {
      const addr = (x?.address_hash ?? "").toLowerCase();
      const owner = (x?.owner_name ?? "").toLowerCase();
      const net = (x?.network ?? "").toLowerCase();
      return addr.includes(q) || owner.includes(q) || net.includes(q);
    });
  }, [addresses, addressSearch]);

  const filteredTransactions = useMemo(() => {
    const rows = Array.isArray(transactions) ? transactions : [];
    const q = transactionSearch.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((x) => {
      const hash = (x?.hash ?? "").toLowerCase();
      const net = (x?.network_symbol ?? "").toLowerCase();
      return hash.includes(q) || net.includes(q);
    });
  }, [transactions, transactionSearch]);

  const filteredGraphs = useMemo(() => {
    const rows = Array.isArray(graphs) ? graphs : [];
    const q = graphSearch.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((x) => {
      const title = (x?.graph_detail?.title ?? "").toLowerCase();
      const desc = (x?.graph_detail?.Description ?? "").toLowerCase();
      const sym = getNetworkSymbolById(x?.graph_detail?.network)?.toLowerCase();
      return title.includes(q) || desc.includes(q) || (sym || "").includes(q);
    });
  }, [graphs, graphSearch]);

  useEffect(() => setAddressPage(1), [addressSearch]);
  useEffect(() => setTransactionPage(1), [transactionSearch]);
  useEffect(() => setGraphPage(1), [graphSearch]);

  const pagedAddresses = useMemo(() => {
    const rows = Array.isArray(filteredAddresses) ? filteredAddresses : [];
    const start = (addressPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [filteredAddresses, addressPage]);

  const pagedTransactions = useMemo(() => {
    const rows = Array.isArray(filteredTransactions) ? filteredTransactions : [];
    const start = (transactionPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [filteredTransactions, transactionPage]);

  const pagedGraphs = useMemo(() => {
    const rows = Array.isArray(filteredGraphs) ? filteredGraphs : [];
    const start = (graphPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [filteredGraphs, graphPage]);

  return (
    <div className="space-y-5 text-textColor">
      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/60 backdrop-blur p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h5 className="text-textColor font-semibold text-xl flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  opacity="0.5"
                  d="M18 10L13 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  opacity="0.5"
                  d="M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="truncate">پرونده {name}</span>
            </h5>
            <p className="mt-2 text-textColor/80 text-sm">
              آخرین به‌روزرسانی:{" "}
              {lastUpdate ? utcToJalaliIran(lastUpdate) : "—"}
            </p>
          </div>

          {loading ? (
            <span className="text-sm text-textColor/70">در حال بارگذاری…</span>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/40 backdrop-blur p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <h5 className="text-textColor font-bold text-lg">یادداشت</h5>
          <button
            onClick={sendValueTextarea}
            className="bg-primary border border-primary rounded-xl text-bgColor px-4 py-2 cursor-pointer hover:opacity-90 transition"
          >
            ثبت
          </button>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border border-boxBorderColor rounded-xl mt-3 w-full outline-none px-4 py-3 text-textColor bg-transparent min-h-30"
          placeholder="یادداشت پرونده را اینجا بنویسید..."
        />
      </div>

      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/40 backdrop-blur p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h5 className="text-textColor font-bold text-lg">آدرس‌های افزوده‌شده</h5>
          <input
            value={addressSearch}
            onChange={(e) => setAddressSearch(e.target.value)}
            className="border border-boxBorderColor rounded-xl px-4 py-2 bg-transparent text-textColor outline-none w-full md:w-[320px]"
            placeholder="جستجو: آدرس / مالک / شبکه…"
          />
        </div>

        <div className="mt-4">
          <ExpandableTable
            data={pagedAddresses}
            columns={addressColumns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />
          <div className="mt-4">
            <Pagination
              rtl
              totalItems={filteredAddresses.length}
              pageSize={pageSize}
              currentPage={addressPage}
              onPageChange={(p) => setAddressPage(p)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/40 backdrop-blur p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h5 className="text-textColor font-bold text-lg">
            تراکنش‌های افزوده‌شده
          </h5>
          <input
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            className="border border-boxBorderColor rounded-xl px-4 py-2 bg-transparent text-textColor outline-none w-full md:w-[320px]"
            placeholder="جستجو: هش / شبکه…"
          />
        </div>

        <div className="mt-4">
          <ExpandableTable
            data={pagedTransactions}
            columns={transactionColumns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />
          <div className="mt-4">
            <Pagination
              rtl
              totalItems={filteredTransactions.length}
              pageSize={pageSize}
              currentPage={transactionPage}
              onPageChange={(p) => setTransactionPage(p)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/40 backdrop-blur p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h5 className="text-textColor font-bold text-lg">گراف‌های افزوده‌شده</h5>
          <input
            value={graphSearch}
            onChange={(e) => setGraphSearch(e.target.value)}
            className="border border-boxBorderColor rounded-xl px-4 py-2 bg-transparent text-textColor outline-none w-full md:w-[320px]"
            placeholder="جستجو: عنوان / توضیحات / شبکه…"
          />
        </div>

        <div className="mt-4">
          <ExpandableTable
            data={pagedGraphs}
            columns={graphColumns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />
          <div className="mt-4">
            <Pagination
              rtl
              totalItems={filteredGraphs.length}
              pageSize={pageSize}
              currentPage={graphPage}
              onPageChange={(p) => setGraphPage(p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;