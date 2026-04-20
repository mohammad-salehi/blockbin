import React, { useEffect, useState } from "react";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const EntityTypes = (props) => {
  const [PersianEntityNumber, SetPersianEntityNumber] = useState(0);
  const [EntityNumber, SetEntityNumber] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getLogoSrc = (logo) => {
    if (!logo) return "";
    if (logo.startsWith("data:image")) return logo;
    return `data:image/png;base64,${logo}`;
  };

  useEffect(() => {
    GetRequest(`${serverAddress}/entity/entities/?category=${props.id}&is_iranian=false&page_number=1&page_size=1000`)
      .then((response) => {
        if (response.status === 200) SetEntityNumber(response.data.data.count);
        else SetEntityNumber(0);
      })
      .catch((err) => console.log(err));

    GetRequest(`${serverAddress}/entity/entities/?category=${props.id}&is_iranian=true&page_number=1&page_size=1000`)
      .then((response) => {
        if (response.status === 200) SetPersianEntityNumber(response.data.data.count);
        else if (response.status === 204) SetPersianEntityNumber(0);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="group relative rounded-2xl transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ "--dynamic-color": props.NetworkColor }}
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/40 to-primary/60 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-bgColor/90 via-bgColor/70 to-bgColor/50 
                    backdrop-blur-xl rounded-2xl border border-boxBorderColor/40
                    shadow-lg overflow-hidden
                    group-hover:border-transparent transition-all duration-500">
        
        {/* Animated Background Orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 delay-100"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Content */}
        <a className="block relative z-10" href={`/panel/entity/types/${props.id}`}>
          
          {/* Header Section */}
          <div className="flex items-start justify-between gap-3 p-5 pb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-primary/40 rounded-full flex-shrink-0"></div>
                <span className="text-[10px] font-mono text-textTitleColor uppercase tracking-wider">
                  {props.symbol || 'ENTITY'}
                </span>
              </div>
              {/* Fixed title with word break and line clamp */}
              <h4
                className="text-textColor font-black text-base sm:text-lg 
                           break-words line-clamp-2 group-hover:text-primary 
                           transition-colors duration-300 leading-tight"
                title={props.name}
              >
                {props.name}
              </h4>
            </div>

            {/* Logo Container - Premium Glassmorphic - Fixed size */}
            <div className="shrink-0 relative">
              {/* Pulsing Ring on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-primary/30 blur-md transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}></div>
              
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-bgColor to-bgColor/60 
                            border-2 border-boxBorderColor/40 shadow-xl backdrop-blur-md 
                            flex items-center justify-center overflow-hidden
                            group-hover:border-primary/50 transition-all duration-300">
                {imageError ? (
                  <ImageNotSupportedIcon className="w-7 h-7 sm:w-8 sm:h-8 text-textTitleColor" />
                ) : (
                  <img
                    src={getLogoSrc(props.logo)}
                    className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
                    alt={props.name}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Divider with Gradient */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-boxBorderColor/50 to-transparent"></div>

          {/* Stats Section */}
          <div className="p-5 pt-4 space-y-3">
            {/* Total Entities */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-bgColor/60 to-transparent 
                          border border-boxBorderColor/30 p-3 group/stat">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                    </svg>
                  </div>
                  <span className="text-textTitleColor text-xs font-medium">کل موجودیت‌ها</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-textColor font-black text-xl">
                    {EntityNumber.toLocaleString()}
                  </span>
                  <span className="text-textTitleColor text-[10px]">مورد</span>
                </div>
              </div>
            </div>

            {/* Iranian Entities - Highlighted */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 to-transparent 
                          border border-primary/20 p-3 group/iran">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/iran:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-textTitleColor text-xs font-medium">موجودیت ایرانی</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-primary font-black text-xl">
                    {PersianEntityNumber.toLocaleString()}
                  </span>
                  <span className="text-primary/60 text-[10px]">مورد</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - View Details */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex items-center justify-between text-primary/60 group-hover:text-primary transition-colors duration-300">
              <span className="text-xs font-medium">مشاهده جزئیات</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default EntityTypes;