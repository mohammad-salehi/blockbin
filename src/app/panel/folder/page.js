"use client";

import React, { useEffect, useState } from "react";
import ExpandableTable from "@/components/ExpandableTable/ExpandableTable";
import Pagination from "@/components/Pagination/Pagination";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import { utcToJalaliIran } from "@/functions/utcToJalali";
import { Modal, Button, Input } from "@heathmont/moon-core-tw";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Page = () => {
  const columns = [
    {
      header: "عنوان",
      accessorKey: "logo",
      cell: (row) => <a href={`/panel/folder/${row.id}`}>{row.name}</a>,
    },
    {
      header: "آخرین تغییرات",
      accessorKey: "hash",

      cell: (row) => <div>{utcToJalaliIran(row.last_modified)}</div>,
    },
    {
      header: "وضعیت",
      accessorKey: "legal_name",
      cell: (row) => {
        return row.status === "done" ? (
          <span
            className="text-TextRed bg-BgRed"
            style={{
              fontSize: "12px",
              background: "rgb(255, 176, 176)",
              color: "red",
              padding: "2px 6px",
              borderRadius: "10px",
            }}
          >
            بسته
          </span>
        ) : row.status === "ongoing" ? (
          <span
            className="text-primary bg-bgPrimary"
            style={{
              fontSize: "12px",
              padding: "2px 6px",
              borderRadius: "10px",
            }}
          >
            در حال بررسی
          </span>
        ) : row.status === "open" ? (
          <span
            className="text-TextGreen bg-BgGreen"
            style={{
              fontSize: "12px",
              padding: "2px 16px",
              borderRadius: "10px",
            }}
          >
            باز
          </span>
        ) : (
          <span
            className="text-TextGreen bg-BgGreen"
            style={{
              fontSize: "12px",
              padding: "2px 6px",
              borderRadius: "10px",
            }}
          >
            نمیدونم
          </span>
        );
      },
    },
    {
      header: "حذف",
      accessorKey: "TokenInfo",
      cell: (row) => (
        <div
          className="p-0"
          onClick={() => {
            SetDeleteId(row.id);
            SetDeleteBox(true);
          }}
        >
          <svg
            width="24"
            height="24"
            className="cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
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
        </div>
      ),
    },
  ];

  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [Reload, SetReload] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Data, SetData] = useState([]);
  const [First, SetFirst] = useState(1);
  const [TotalItem, SetTotalItem] = useState(1);
  const [AddBox, SetAddBox] = useState(false);
  const [AddLoading, SetAddLoading] = useState(false);
  const [DeleteLoading, SetDeleteLoading] = useState(false);
  const [DeleteBox, SetDeleteBox] = useState(false);
  const [DeleteId, SetDeleteId] = useState("");

  useEffect(() => {
    GetRequest(`${serverAddress}/case/management/`)
      .then((response) => {
        SetLoading(false);
        SetData(response.data.data);
        SetTotalItem(response.data.data.length)
      })
      .catch((err) => {
        SetLoading(false);
        console.log(err);
      });
  }, [, Reload]);

  const deleteCase = () => {
    SetDeleteLoading(true);
    axios
      .delete(`${serverAddress}/case/management/${DeleteId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((response) => {
        SetDeleteLoading(false);
        SetDeleteBox(false);
        if (response.status === 204) {
          SetReload(!Reload);
        }
      })
      .catch((err) => {
        SetDeleteBox(false);
        SetDeleteLoading(false);
        SetLoading(false);
        console.log(err);
      });
  };

  const AddCase = () => {
    if (Title === "" || Description === "") {
      return toast.error("عنوان و توضیحات پرونده نباید خالی باشد", {
        position: "bottom-left",
      });
    }
    SetAddLoading(true);
    axios
      .post(
        `${serverAddress}/case/management/`,
        {
          name: Title,
          note_detail: Description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      )

      .then((response) => {
        if (response.status === 201) {
          SetAddLoading(false);
          SetAddBox(false);
          SetReload(!Reload);
          return toast.success("پرونده با موفقیت ساخته شد", {
            position: "bottom-left",
          });
        }
      })
      .catch((err) => {
        SetAddLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="items-end">
        <button
          className="max-w-[200px] w-full bg-primary mb-4 p-2 rounded-lg text-bgColor cursor-pointer"
          onClick={() => {
            SetAddBox(true);
          }}
        >
          افزودن پرونده جدید
        </button>
      </div>
      {
        Data.length > 0 ?
          <div>
            <ExpandableTable
              data={Data.slice((First - 1) * 10, First * 10)}
              columns={columns}
              rowDetailsMode="row"
              rowDetailsClassName="rounded-xl p-3"
            />
            <Pagination
              rtl
              totalItems={TotalItem}
              pageSize={10}
              currentPage={First}
              onPageChange={(e) => {
                SetFirst(e);
              }}
            />
          </div>
          :
          null
      }


      <Modal
        open={AddBox}
        onClose={() => {
          SetAddBox(false);
        }}
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[200px] text-textColor p-4">
            <h5 className="font-bold border-b border-boxBorderColor pb-3">
              ایجاد پرونده جدید
            </h5>

            <h5 className="mt-3">عنوان پرونده</h5>
            <Input
              onChange={(e) => {
                SetTitle(e.target.value);
              }}
              value={Title}
              className="border border-boxBorderColor rounded-md mt-2"
            />
            <h5 className="mt-3">توضیحات پرونده</h5>
            <textarea
              onChange={(e) => {
                SetDescription(e.target.value);
              }}
              value={Description}
              className="border border-boxBorderColor rounded-md mt-2 w-full outline-none px-4 py-2"
            ></textarea>
            <Button
              onClick={() => {
                AddCase();
              }}
              className="bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4"
            >
              {AddLoading ? "درحال ایجاد..." : "ایجاد"}
            </Button>
          </Modal.Panel>
        </div>
      </Modal>

      <Modal
        open={DeleteBox}
        onClose={() => {
          SetDeleteBox(false);
        }}
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[200px] text-textColor p-4">
            <h5 className="mt-3">آیا از حذف پرونده موردنظر مطمئن هستید؟</h5>

            <Button
              onClick={() => {
                deleteCase();
              }}
              className="bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4"
            >
              {DeleteLoading ? "درحال حذف..." : "حذف"}
            </Button>
          </Modal.Panel>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
