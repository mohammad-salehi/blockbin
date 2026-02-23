/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '@/functions/ServerAddress';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { GetRequest } from '@/functions/GetRequest';
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable';

const SavedGraph = () => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [loading, setLoading] = useState(false);

  // گرفتن لیست گراف‌های ذخیره‌شده
  useEffect(() => {
    GetRequest(`${serverAddress}/explorer/graph/`)
      .then((response) => {
        console.log(response)
        const results = response.data?.data?.results || [];
        if (results.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        const mapped = results.map((item) => ({
          name: item.title,
          description: item.value?.GraphDescription,
          items: item.value?.Data?.length,
          id: item.id,
          networkName: item.value?.network,
          token: item.value?.token,
          contract: item.value?.contractAddress,
          hash: item.value?.hash,
        }));

        setData(mapped);
      })
      .catch((err) => {
        console.log(err);
        try {
          if (err.response?.status === 403 || err.response?.status === 401) {
            Cookies.set('refresh', '');
            Cookies.set('access', '');
            window.location.assign('/');
          }
        } catch (e) {}
      });
  }, []);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteBox(true);
  };

  const deleteGraph = () => {
    if (!deleteId) return;
    setLoading(true);

    axios
      .delete(`${serverAddress}/explorer/graph/${deleteId}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`,
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.status >= 200 && response.status < 300) {
          // حذف از state لوکال
          setData((prev) => {
            const updated = prev.filter((item) => item.id !== deleteId);
            if (updated.length === 0) setIsEmpty(true);
            return updated;
          });
          setOpenDeleteBox(false);
          setDeleteId(null);

          return toast.success('با موفقیت حذف شد', {
            position: 'bottom-left',
          });
        } else {
          return toast.error('ناموفق', {
            position: 'bottom-left',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        try {
          if (err.response?.status === 403 || err.response?.status === 401) {
            Cookies.set('refresh', '');
            Cookies.set('access', '');
            window.location.assign('/');
            return;
          }
        } catch (e) {}

        return toast.error('ناموفق', {
          position: 'bottom-left',
        });
      });
  };

  const columns = [
    {
      header: 'نام',
      cell: (row) => (
        <a
          href={`/panel/tracker/${row.networkName}/${row.hash}/${row.token}/${row.contract}/${row.id}`}
          className="text-textColor no-underline hover:underline"
        >
          {row.name}
        </a>
      ),
    },
    {
      header: 'توضیحات',
      cell: (row) => <span>{row.description}</span>,
    },
    {
      header: 'آیتم‌ها',
      cell: (row) => <span>{row.items}</span>,
    },
    {
      header: 'شبکه',
      cell: (row) => (
        <span className="inline-flex items-center gap-1">
          <img
            src={`/images/${row.networkName}.png`}
            className="ml-1 inline-block h-5 w-5"
            alt={row.networkName}
          />
          {row.networkName}
        </span>
      ),
    },
    {
      header: 'عملیات',
      cell: (row) => (
        <button
          type="button"
          onClick={() => openDeleteModal(row.id)}
          className="text-TextRed hover:text-red-600 cursor-pointer"
        >
          {/* آیکن سطل زباله (بدون react-feather) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="text-textColor" dir="rtl">
        {data.length > 0 && !isEmpty ? (
          <ExpandableTable
            data={data}
            columns={columns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />
        ) : (
          <p className="mt-5 text-center">بدون گراف ذخیره شده</p>
        )}
      </div>

      {/* مودال حذف با Tailwind */}
      {openDeleteBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg bg-boxColor p-5 text-textColor shadow-lg" dir="rtl">
            <h6 className="mb-4 text-sm font-medium">آیا با حذف گراف مورد نظر موافق هستید؟</h6>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md border border-borderNeutral px-4 py-1.5 text-sm text-textColor hover:bg-bgPrimary"
                onClick={() => {
                  setOpenDeleteBox(false);
                  setDeleteId(null);
                }}
              >
                انصراف
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm text-white hover:opacity-90"
                onClick={deleteGraph}
              >
                {loading ? 'درحال حذف...' : <span>حذف</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedGraph;
