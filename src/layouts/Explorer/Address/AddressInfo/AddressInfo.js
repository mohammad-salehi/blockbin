import React, { useEffect, useState } from "react";
import { AddressFormat } from "@/components/AddressFormat/AddressFormat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { serverAddress } from "@/functions/ServerAddress";
import { GetRequest } from "@/functions/GetRequest";
import { Networks } from "@/functions/Networks";
import axios from "axios";
import { Modal, Button, Input } from "@heathmont/moon-core-tw";
import Cookies from "js-cookie";
import ExploreTopBoxLoading from "@/components/ExploreTopBoxLoading/ExploreTopBoxLoading";
import FolderList from "@/components/AddToFolder/FolderList";

const AddressInfo = () => {
  const params = useParams();

  const query = params.query;
  const network = params.network;
  const hash = params.hash;

  const [Risk, SetRisk] = useState(null);
  const [Owner, SetOwner] = useState(null);
  const [IdentificationBy, SetIdentificationBy] = useState(null);
  const [Label, SetLabel] = useState(null);
  const [Tag, SetTag] = useState(null);
  const [newLabel, SetnewLabel] = useState(null);
  const [metadata, SetMetadata] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFolderOpen, setFolderIsOpen] = useState(false);
  const [Loading1, SetLoading1] = useState(false);
  const [Loading2, SetLoading2] = useState(false);
  useEffect(() => {
    SetLoading1(true);
    GetRequest(`${serverAddress}/explorer/address-detail?query=${hash}`)
      .then((response) => {
        if (response.status === 200) {
          SetOwner(
            response.data.data.address_detail.entity.name
              ? response.data.data.address_detail.entity
              : null
          );
          SetLabel(response.data.data.address_detail.labels);
          SetMetadata(response.data.data.address_detail.metadata.label ?? null);
          SetTag(response.data.data.label_tags.labels);
          SetIdentificationBy(
            response.data.data.address_detail.address_label.length !== 0
              ? response.data.data.address_detail.address_label[0]
              : null
          );
        }
        SetLoading1(false);
      })
      .catch((err) => {
        SetLoading1(false);
      });
    SetLoading2(true);
    GetRequest(
      `${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`
    )
      .then((response) => {
        if (response.status === 200) {
          SetRisk(response.data.data.risk_score);
        }
        SetLoading2(false);
      })
      .catch((err) => {
        console.log(err), SetLoading2(false);
      });
  }, []);

  const AddLabel = () => {
    if (newLabel !== null && newLabel !== "") {
      axios
        .post(
          serverAddress + "/address-labels/label/",
          {
            address: hash,
            label: newLabel,
            network: Networks.find(
              (item) => item.symbole === network.toUpperCase()
            ).uuid,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (Number(response.status) >= 200 && Number(response.status) < 300) {
            SetLabel([{ label: response.data.data.label }]);
            SetnewLabel(null);
            setIsOpen(false);
            return toast.success("برچسب موردنظر باموفقیت ثبت شد", {
              position: "bottom-left",
            });
          } else {
            return toast.error("خطا در پردازش", {
              position: "bottom-left",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return toast.error("خطا در پردازش", {
            position: "bottom-left",
          });
        });
    } else {
      return toast.error("برچسب را وارد کنید", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div
      className="relative rounded-2xl border border-boxBorderColor main-animated-border-box overflow-visible h-full transition-all duration-500 hover:shadow-2xl"
      style={{
        "--dynamic-color": `${
          Networks.find((item) => item.symbole === network.toUpperCase()).color
        }`,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden h-full bg-gradient-to-br from-bgColor/90 to-bgColor/40 backdrop-blur-sm">

        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${
              Networks.find((item) => item.symbole === network.toUpperCase())
                .color
            }, transparent)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"
          style={{
            background: `radial-gradient(circle, ${
              Networks.find((item) => item.symbole === network.toUpperCase())
                .color
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

          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 p-6 border-b border-boxBorderColor/30 bg-gradient-to-r from-transparent via-bgColor/20 to-transparent">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-xl blur-md"></div>
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-bgColor to-bgColor/80 border border-boxBorderColor shadow-lg backdrop-blur grid place-items-center text-textColor group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={`/images/${network}.png`}
                    className="w-7 h-7 object-contain"
                    alt={network}
                  />
                </div>
              </div>

              <div className="leading-tight min-w-0">
                <h6 className="text-2xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent tracking-tight truncate">
                  آدرس{" "}
                  {
                    Networks.find(
                      (item) => item.symbole === network.toUpperCase()
                    ).name
                  }
                </h6>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:gap-3">
              {Tag === null || Tag.length === 0 ? (
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center h-10 w-10 rounded-xl
                             bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor
                             hover:bg-bgColor hover:border-boxBorderColor transition-all duration-300 active:scale-[0.95] shadow-sm
                             overflow-hidden cursor-pointer"
                  onClick={() => setIsOpen(true)}
                  aria-label="افزودن برچسب"
                  title="افزودن برچسب"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    aria-hidden="true"
                    className="opacity-90 group-hover:opacity-100 relative z-10"
                  >
                    <path
                      d="M24.896,9.463c-0.188-0.188-0.441-0.293-0.707-0.293L11.232,9.169c-0.551,0-0.998,0.445-1,0.996L10.186,23.17
                      c-0.001,0.267,0.104,0.522,0.293,0.711l16.995,16.995c0.188,0.188,0.441,0.293,0.707,0.293s0.52-0.105,0.707-0.293l13.004-13.004
                      c0.391-0.391,0.391-1.023,0-1.414L24.896,9.463z M28.181,38.755L12.188,22.761l0.041-11.592l11.547,0.001l15.995,15.995
                      L28.181,38.755z"
                    />
                    <circle cx="20.362" cy="19.346" r="2.61" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 h-10 rounded-xl px-4
                             bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white
                             border border-orange-400/60 shadow-md
                             hover:from-orange-500 hover:to-orange-600 transition-all duration-300 active:scale-[0.95]"
                >
                  <span className="text-sm font-bold">{Tag[0].label}</span>
                </button>
              )}

              <button
                type="button"
                className="group relative inline-flex items-center justify-center h-10 w-10 rounded-xl
                           bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor
                           hover:bg-bgColor hover:border-boxBorderColor transition-all duration-300 active:scale-[0.95] shadow-sm cursor-pointer
                           overflow-hidden"
                onClick={() => {
                  navigator.clipboard.writeText(hash);
                  toast.success("در کلیپ‌بورد ذخیره شد!", {
                    position: "bottom-left",
                  });
                }}
                aria-label="کپی"
                title="کپی"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <ContentCopyIcon
                  className="text-textColor relative z-10"
                  style={{ fontSize: "18px", cursor: "pointer" }}
                />
              </button>

              <div className="px-4 py-2 rounded-xl bg-bgColor/80 backdrop-blur-md border border-boxBorderColor/60 text-textColor text-sm shadow-sm font-mono">
                {AddressFormat(hash, 8, query, network, false)}
              </div>
            </div>
          </div>

          {!Loading1 && !Loading2 ? (
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-textColor">
                
                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <div className="relative z-10">
                    <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      ریسک
                    </p>
                    <p className="text-3xl font-black flex items-center gap-3 tabular-nums tracking-tight">
                      <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                        <svg
                          fill={
                            Risk === null
                              ? "currentColor"
                              : Risk < 25
                              ? "#22c55e"
                              : Risk < 50
                              ? "#3b82f6"
                              : Risk < 70
                              ? "#f97316"
                              : "#ef4444"
                          }
                          height="20"
                          width="20"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M507.494,426.066L282.864,53.537c-5.677-9.415-15.87-15.172-26.865-15.172c-10.995,0-21.188,5.756-26.865,15.172
                            L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h449.259
                            c11.314,0,21.751-6.093,27.315-15.944C513.508,447.839,513.336,435.755,507.494,426.066z M256.167,167.227
                            c12.901,0,23.817,7.278,23.817,20.178c0,39.363-4.631,95.929-4.631,135.292c0,10.255-11.247,14.554-19.186,14.554
                            c-10.584,0-19.516-4.3-19.516-14.554c0-39.363-4.63-95.929-4.63-135.292C232.021,174.505,242.605,167.227,256.167,167.227z
                            M256.498,411.018c-14.554,0-25.471-11.908-25.471-25.47c0-13.893,10.916-25.47,25.471-25.47c13.562,0,25.14,11.577,25.14,25.47
                            C281.638,399.11,270.06,411.018,256.498,411.018z"
                          />
                        </svg>
                      </span>
                      {Risk !== null ? (
                        <span className="text-textColor">
                          {Risk}%
                          <small className="mr-1 text-sm font-medium text-textTitleColor">
                            {Risk < 25 ? "(کم)" : Risk < 50 ? "(متوسط)" : Risk < 70 ? "(بالا)" : "(بحرانی)"}
                          </small>
                        </span>
                      ) : (
                        <span className="text-textTitleColor">نامشخص</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    مالک
                  </p>
                  <p className="text-xl font-bold flex items-center gap-3">
                    <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 18H9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <a
                      href={`/panel/entity/${Owner?.id}`}
                      className={`${
                        Owner !== null ? "text-primary hover:text-primary/80" : "text-textColor"
                      } hover:underline transition-colors`}
                    >
                      {Owner !== null ? Owner.name : "نامشخص"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                
                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    شناسایی شده توسط
                  </p>
                  <p className="text-xl font-bold flex items-center gap-3">
                    <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner text-textColor">
                      <svg fill="currentColor" width="20" height="20" viewBox="0 0 97 97">
                        <path
                          d="M95,44.312h-7.518C85.54,26.094,70.906,11.46,52.688,9.517V2c0-1.104-0.896-2-2-2h-4.376c-1.104,0-2,0.896-2,2v7.517
                          C26.094,11.46,11.46,26.094,9.517,44.312H2c-1.104,0-2,0.896-2,2v4.377c0,1.104,0.896,2,2,2h7.517
                          C11.46,70.906,26.094,85.54,44.312,87.482V95c0,1.104,0.896,2,2,2h4.377c1.104,0,2-0.896,2-2v-7.518
                          C70.906,85.54,85.54,70.906,87.482,52.688H95c1.104,0,2-0.896,2-2v-4.376C97,45.207,96.104,44.312,95,44.312z"
                        />
                      </svg>
                    </span>
                    <span className="text-textColor">{IdentificationBy !== null ? IdentificationBy : "نامشخص"}</span>
                  </p>
                </div>

                <div className="group relative rounded-xl bg-gradient-to-br from-bgColor/80 to-bgColor/20 border border-boxBorderColor/60 p-5 shadow-md backdrop-blur-md hover:shadow-2xl hover:border-boxBorderColor transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <p className="text-textTitleColor text-xs mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    نوع آدرس
                  </p>
                  <p className="text-xl font-bold flex items-center gap-3">
                    <span className="h-11 w-11 rounded-xl grid place-items-center bg-bgColor/90 border border-boxBorderColor shadow-inner text-textColor">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 7.24997H18.75V4.99997C18.7474 4.53665 18.5622 4.09305 18.2345 3.76543C17.9069 3.43781 17.4633 3.25259 17 3.24997
                          L4.86 7.24997H4.75H4.59L4.42 7.30997H4.28L4.12 7.39997L4 7.56997L3.86 7.68997L3.75 7.78997L3.63 7.93997
                          C3.598 7.96867 3.57097 8.00246 3.55 8.03997C3.51288 8.09779 3.47948 8.15791 3.45 8.21997L3.39 8.32997
                          C3.36216 8.40179 3.33878 8.47526 3.32 8.54997C3.30967 8.77307 3.30967 8.88687 3.32 8.99997V19
                          C3.3221 19.4515 3.49765 19.8849 3.81034 20.2106C4.12303 20.5364 4.54895 20.7295 5 20.75H19
                          C19.4633 20.7473 19.9069 20.5621 20.2345 20.2345C20.5622 19.9069 20.7474 19.4633 20.75 19V8.99997
                          C20.7474 8.53665 20.5622 8.09305 20.2345 7.76543C19.9069 7.43781 19.4633 7.25259 19 7.24997Z"
                          fill="currentColor"
                          opacity="0.9"
                        />
                        <path
                          d="M16.5 15.25C17.1904 15.25 17.75 14.6904 17.75 14C17.75 13.3096 17.1904 12.75 16.5 12.75C15.8096 12.75 15.25 13.3096 15.25 14C15.25 14.6904 15.8096 15.25 16.5 15.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="text-textColor">{metadata !== null ? metadata : "نامشخص"}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <button
                  className="group relative rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg
                             hover:from-primary/90 hover:to-primary/70 hover:shadow-primary/30 hover:shadow-xl
                             transition-all duration-300 active:scale-[0.97] 
                             flex items-center justify-center gap-3 h-14 cursor-pointer overflow-hidden"
                  onClick={() =>
                    window.location.assign(`/panel/tracker/${network}/${hash}`)
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative z-10"
                  >
                    <path
                      d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 3L12.0605 5.93945V5.93945C12.0271 5.97289 12.0271 6.02711 12.0605 6.06055V6.06055L15 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 21L11.9473 18.0527V18.0527C11.9764 18.0236 11.9764 17.9764 11.9473 17.9473V17.9473L9 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6C14.8284 6 16.2426 6 17.1213 6.87868C18 7.75736 18 9.17157 18 12V15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 18C9.17157 18 7.75736 18 6.87868 17.1213C6 16.2426 6 14.8284 6 12L6 9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="relative z-10 font-bold text-base">ترسیم گراف ارتباطی</span>
                </button>

                <button
                  className="group relative rounded-xl border border-primary/50 text-primary bg-bgColor/60 backdrop-blur-md
                             hover:bg-primary/10 hover:border-primary hover:shadow-md
                             transition-all duration-300 active:scale-[0.97] 
                             flex items-center justify-center gap-2 h-14 cursor-pointer overflow-hidden"
                  onClick={() => setFolderIsOpen(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative z-10"
                  >
                    <path
                      d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.15 7V17.353C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75H17.899
                      C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521V8.64789
                      C20.2507 8.01874 20.008 7.41136 19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25H12.2226"
                      fill="currentColor"
                      opacity="0.6"
                    />
                  </svg>
                  <span className="relative z-10 font-semibold">افزودن به پرونده</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6">
              <div className="space-y-4 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-28 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-28 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-14 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"></div>
                  <div className="h-14 bg-bgColor/40 rounded-xl border border-boxBorderColor/50"></div>
                </div>
              </div>
            </div>
          )}

          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Backdrop />
            <div className="fixed inset-0 flex z-50 backdrop-blur-md bg-black/40">
              <Modal.Panel className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-bgColor to-bgColor/95 shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor/60">
                <h5 className="text-xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent">
                  برچسب موردنظر را وارد کنید
                </h5>
                <p className="text-xs text-textTitleColor mt-1">
                  یک برچسب کوتاه و قابل تشخیص وارد کنید.
                </p>

                <Input
                  className="border border-boxBorderColor/60 rounded-xl mt-4 bg-bgColor/50 focus:ring-2 focus:ring-primary/30 text-textColor"
                  placeholder="برچسب"
                  onChange={(e) => SetnewLabel(e.target.value)}
                  value={newLabel}
                />

                <button
                  className="bg-gradient-to-r from-primary to-primary/80 rounded-xl text-white w-full py-2.5 cursor-pointer mt-4
                             transition hover:opacity-90 active:scale-[0.98] shadow-lg font-semibold"
                  onClick={AddLabel}
                >
                  ثبت
                </button>
              </Modal.Panel>
            </div>
          </Modal>

          <Modal open={isFolderOpen} onClose={() => setFolderIsOpen(false)}>
            <Modal.Backdrop />
            <div className="fixed inset-0 flex z-50 backdrop-blur-md bg-black/40">
              <Modal.Panel className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-bgColor to-bgColor/95 shadow-2xl mt-50 text-textColor p-6 border border-boxBorderColor/60">
                <h5 className="text-xl font-black bg-gradient-to-r from-textColor to-textColor/60 bg-clip-text text-transparent">
                  پرونده موردنظر را انتخاب کنید
                </h5>
                <p className="text-xs text-textTitleColor mt-1">
                  یک پرونده را انتخاب کنید تا این آدرس به آن اضافه شود.
                </p>

                <div className="mt-4">
                  <FolderList
                    address={hash}
                    network={
                      Networks.find(
                        (item) => item.symbole === network.toUpperCase()
                      ).id
                    }
                    type="address"
                    setFolderIsOpen={setFolderIsOpen}
                  />
                </div>
              </Modal.Panel>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
