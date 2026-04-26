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
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'

const SavedGraph = () => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [TableLoading, SetTableLoading] = useState(false)

  // گرفتن لیست گراف‌های ذخیره‌شده
  useEffect(() => {
    SetTableLoading(true)
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
        SetTableLoading(false)

      })
      .catch((err) => {
        console.log(err);
        try {
          if (err.response?.status === 403 || err.response?.status === 401) {
            Cookies.set('refresh', '');
            Cookies.set('access', '');
            window.location.assign('/');
          }
        } catch (e) { }
        SetTableLoading(false)
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
        } catch (e) { }

        return toast.error('ناموفق', {
          position: 'bottom-left',
        });
      });
  };

  const columns = [
    {
      header: 'نام گراف',
      cell: (row) => (
        <a
          href={`/panel/tracker/${row.networkName}/${row.hash}/${row.token}/${row.contract}/${row.id}`}
          className="font-medium text-textColor hover:text-primary transition-colors"
        >
          {row.name}
        </a>
      ),
    },
    {
      header: 'توضیحات',
      cell: (row) => (
        <span className="text-sm text-textColor/80">
          {row.description || '—'}
        </span>
      ),
    },
    {
      header: 'آیتم‌ها',
      cell: (row) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
          {row.items || 0}
        </span>
      ),
    },
    {
      header: 'شبکه',
      cell: (row) => (
        <div className="flex items-center gap-2 bg-bgPrimary px-2 py-1 rounded-md w-fit">
          <img
            src={`/images/${row.networkName}.png`}
            className="h-4 w-4"
            alt={row.networkName}
          />
          <span className="text-sm">{row.networkName}</span>
        </div>
      ),
    },
    {
      header: 'عملیات',
      cell: (row) => (
<button
  type="button"
  onClick={() => openDeleteModal(row.id)}
  className="flex items-center justify-center w-8 h-8 rounded-lg text-textColor/60 hover:text-red-500 cursor-pointer transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-9 w-9"
    viewBox="0 0 32 32"
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
        {
          TableLoading ?
            <div className='border border-boxBorderColor rounded-xl p-3'>
              <SkeletonLoading />
            </div> :
            data.length > 0 && !isEmpty ? (
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
