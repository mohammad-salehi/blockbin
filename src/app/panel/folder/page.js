"use client";

import React, { useEffect, useMemo, useState } from "react";
import ExpandableTable from "@/components/ExpandableTable/ExpandableTable";
import Pagination from "@/components/Pagination/Pagination";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import { utcToJalaliIran } from "@/functions/utcToJalali";
import { Modal, Button, Input } from "@heathmont/moon-core-tw";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const StatusBadge = ({ status }) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border text-textColor";

  if (status === "done") {
    return (
      <span className={`${base} border-boxBorderColor bg-BgRed/60`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        بسته
      </span>
    );
  }

  if (status === "ongoing") {
    return (
      <span className={`${base} border-boxBorderColor bg-bgPrimary/40`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        در حال بررسی
      </span>
    );
  }

  if (status === "open") {
    return (
      <span className={`${base} border-boxBorderColor bg-BgGreen/60`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        باز
      </span>
    );
  }

  return (
    <span className={`${base} border-boxBorderColor bg-boxColor/40`}>
      نامشخص
    </span>
  );
};

const TrashIcon = ({ className = "" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ className = "" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Page = () => {
  // Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Data
  const [data, setData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);

  // UI state
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  // Search
  const [search, setSearch] = useState("");

  // Modals
  const [addBox, setAddBox] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [deleteBox, setDeleteBox] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Columns
  const columns = useMemo(
    () => [
      {
        header: "عنوان",
        accessorKey: "name",
        cell: (row) => (
          <a
            href={`/panel/folder/${row.id}`}
            className="font-medium text-textColor hover:underline underline-offset-4"
          >
            {row.name}
          </a>
        ),
      },
      {
        header: "آخرین تغییرات",
        accessorKey: "last_modified",
        cell: (row) => (
          <div className="text-sm text-textColor/80">
            {utcToJalaliIran(row.last_modified)}
          </div>
        ),
      },
      {
        header: "وضعیت",
        accessorKey: "status",
        cell: (row) => <StatusBadge status={row.status} />,
      },
      {
        header: "حذف",
        accessorKey: "actions",
        cell: (row) => (
          <button
            type="button"
            onClick={() => {
              setDeleteId(row.id);
              setDeleteBox(true);
            }}
            className="inline-flex items-center justify-center rounded-lg border border-boxBorderColor px-2 py-1 hover:bg-white/5 transition text-textColor"
            title="حذف پرونده"
          >
            <TrashIcon className="opacity-80" />
          </button>
        ),
      },
    ],
    []
  );

  // Fetch
  useEffect(() => {
    setLoading(true);

    GetRequest(`${serverAddress}/case/management/`)
      .then((response) => {
        const raw = response?.data?.data;

        // ✅ normalize: always array
        const rows =
          Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.results)
              ? raw.results
              : Array.isArray(response?.data?.results)
                ? response.data.results
                : [];

        setData(rows);
        setTotalItem(rows.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("دریافت اطلاعات با خطا مواجه شد", { position: "bottom-left" });
      });
  }, [reload]);

  // Filter
  const filteredData = useMemo(() => {
    const rows = Array.isArray(data) ? data : [];
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((x) => {
      const name = (x?.name ?? "").toLowerCase();
      const note = (x?.note_detail ?? "").toLowerCase();
      return name.includes(q) || note.includes(q);
    });
  }, [data, search]);

  // Reset page when search changes
  useEffect(() => {
    setTotalItem(filteredData.length);
    setPage(1);
  }, [search]); // فقط با تغییر سرچ

  // Pagination
  const pagedData = useMemo(() => {
    const rows = Array.isArray(filteredData) ? filteredData : [];
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [filteredData, page]);

  // Actions
  const addCase = () => {
    if (title.trim() === "" || description.trim() === "") {
      return toast.error("عنوان و توضیحات پرونده نباید خالی باشد", {
        position: "bottom-left",
      });
    }

    setAddLoading(true);
    axios
      .post(
        `${serverAddress}/case/management/`,
        { name: title.trim(), note_detail: description.trim() },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setAddLoading(false);
          setAddBox(false);
          setTitle("");
          setDescription("");
          setReload((p) => !p);
          toast.success("پرونده با موفقیت ساخته شد", { position: "bottom-left" });
        }
      })
      .catch((err) => {
        setAddLoading(false);
        console.log(err);
        toast.error("ایجاد پرونده ناموفق بود", { position: "bottom-left" });
      });
  };

  const deleteCase = () => {
    if (!deleteId) return;

    setDeleteLoading(true);
    axios
      .delete(`${serverAddress}/case/management/${deleteId}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((response) => {
        setDeleteLoading(false);
        setDeleteBox(false);
        if (response.status === 204) {
          toast.success("پرونده حذف شد", { position: "bottom-left" });
          setReload((p) => !p);
        }
      })
      .catch((err) => {
        setDeleteBox(false);
        setDeleteLoading(false);
        console.log(err);
        toast.error("حذف پرونده ناموفق بود", { position: "bottom-left" });
      });
  };

  return (
    <div className="space-y-4 text-textColor">
      {/* Header */}
      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/60 backdrop-blur p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-textColor">
              مدیریت پرونده‌ها
            </h3>
            <p className="text-sm text-textColor/75 mt-1">
              پرونده‌های خود را بسازید، جستجو کنید و وضعیت‌شان را ببینید.
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-primary px-4 py-2 rounded-xl text-bgColor hover:opacity-90 transition"
            onClick={() => setAddBox(true)}
          >
            <PlusIcon />
            افزودن پرونده جدید
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو بر اساس عنوان یا توضیحات..."
              className="border border-boxBorderColor rounded-xl text-textColor"
            />
          </div>

          <div className="text-sm text-textColor/75">{filteredData.length} پرونده</div>
        </div>
      </div>

      {/* Table Box */}
      <div className="rounded-2xl border border-boxBorderColor bg-boxColor/40 backdrop-blur p-3 md:p-4">
        {loading ? (
          <div className="py-14 text-center text-sm text-textColor/80">
            در حال بارگذاری...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-14 text-center">
            <div className="text-sm text-textColor/80">هیچ پرونده‌ای پیدا نشد.</div>
            <button
              onClick={() => setAddBox(true)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-bgColor hover:opacity-90 transition"
            >
              <PlusIcon />
              ساخت پرونده جدید
            </button>
          </div>
        ) : (
          <>
            <ExpandableTable
              data={pagedData}
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />

            <div className="mt-4">
              <Pagination
                rtl
                totalItems={filteredData.length}
                pageSize={10}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      <Modal open={addBox} onClose={() => (!addLoading ? setAddBox(false) : null)}>
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 items-center justify-center backdrop-blur-sm bg-black/30 p-3">
          <Modal.Panel className="w-full max-w-xl rounded-2xl bg-boxColor shadow-lg text-textColor p-4 md:p-5 border border-boxBorderColor">
            <div className="flex items-center justify-between border-b border-boxBorderColor pb-3">
              <h5 className="font-bold text-textColor">ایجاد پرونده جدید</h5>
              <button
                className="text-sm text-textColor/80 hover:text-textColor"
                onClick={() => (!addLoading ? setAddBox(false) : null)}
              >
                بستن
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <h5 className="text-sm text-textColor/90">عنوان پرونده</h5>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="border border-boxBorderColor rounded-xl mt-2 text-textColor"
                  placeholder="مثلاً: پرونده شکایت..."
                />
              </div>

              <div>
                <h5 className="text-sm text-textColor/90">توضیحات پرونده</h5>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="border border-boxBorderColor rounded-xl mt-2 w-full outline-none px-4 py-2 bg-transparent min-h-[110px] text-textColor"
                  placeholder="چند خط توضیح درباره پرونده..."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setAddBox(false)}
                  disabled={addLoading}
                  className="w-1/2 rounded-xl border border-boxBorderColor text-textColor py-2 hover:bg-white/5 transition disabled:opacity-60"
                >
                  لغو
                </Button>

                <Button
                  onClick={addCase}
                  disabled={addLoading}
                  className="w-1/2 bg-primary rounded-xl text-bgColor py-2 hover:opacity-90 transition disabled:opacity-60"
                >
                  {addLoading ? "در حال ایجاد..." : "ایجاد"}
                </Button>
              </div>
            </div>
          </Modal.Panel>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteBox}
        onClose={() => (!deleteLoading ? setDeleteBox(false) : null)}
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 items-center justify-center backdrop-blur-sm bg-black/30 p-3">
          <Modal.Panel className="w-full max-w-xl rounded-2xl bg-boxColor shadow-lg text-textColor p-4 md:p-5 border border-boxBorderColor">
            <div className="flex items-center justify-between border-b border-boxBorderColor pb-3">
              <h5 className="font-bold text-textColor">حذف پرونده</h5>
              <button
                className="text-sm text-textColor/80 hover:text-textColor"
                onClick={() => (!deleteLoading ? setDeleteBox(false) : null)}
              >
                بستن
              </button>
            </div>

            <p className="mt-4 text-sm text-textColor/85">
              آیا از حذف پرونده موردنظر مطمئن هستید؟ این عملیات قابل بازگشت نیست.
            </p>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => setDeleteBox(false)}
                disabled={deleteLoading}
                className="w-1/2 rounded-xl border border-boxBorderColor text-textColor py-2 hover:bg-white/5 transition disabled:opacity-60"
              >
                لغو
              </Button>

              <Button
                onClick={deleteCase}
                disabled={deleteLoading}
                className="w-1/2 rounded-xl bg-BgRed border border-boxBorderColor text-textColor py-2 hover:opacity-90 transition disabled:opacity-60"
              >
                {deleteLoading ? "در حال حذف..." : "حذف"}
              </Button>
            </div>
          </Modal.Panel>
        </div>
      </Modal>
    </div>
  );
};

export default Page;