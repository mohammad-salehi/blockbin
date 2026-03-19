import React from "react";
import { Networks } from "@/functions/Networks";

const NetworkSelection = ({ networks, FoundedType, address }) => {
  return (
    <div
      className="bg-boxColor border border-boxBorderColor rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm"
      style={{
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
      }}
      id="NetworkSelection"
    >
      {networks.map((network, index) => {
        const networkData = Networks.find((item) => item.symbole === network);
        if (!networkData) return null;

        return (
          <div key={index} className="">
            <a
              href={`/panel/dashboard/${FoundedType}/${network}/${address}`}
              className="block p-1"
            >
              <div
                className="flex items-center p-3 rounded-xl bg-bgColor/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-boxBorderColor/30 hover:border-primary/50"
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 mr-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-textColor">
                      اطلاعات {FoundedType === 'address' ? 'آدرس' : 'تراکنش'} در شبکه {networkData.name}
                    </span>

                  </div>
                  <p className="text-xs text-textTitleColor mt-1">
                    مشاهده جزئیات {FoundedType === 'address' ? 'آدرس' : 'تراکنش'} در شبکه {networkData.name}
                  </p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {networkData.symbole}
                    </span>
              </div>
            </a>

            <a
              href={`/panel/tracker/${network}/${address}`}
              className="block p-1"
            >
              <div
                className="flex items-center p-3 rounded-xl bg-bgColor/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-boxBorderColor/30 hover:border-primary/50"
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-95 text-primary"
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
                </div>
                <div className="flex-1 mr-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-textColor">
                      ترسیم گراف در شبکه {networkData.name}
                    </span>
                  </div>
                  <p className="text-xs text-textTitleColor mt-1">
                    تحلیل جامع {FoundedType === 'address' ? 'آدرس' : 'تراکنش'} در شبکه {networkData.name}
                  </p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {networkData.symbole}
                </span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NetworkSelection;
