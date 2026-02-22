import React, { useEffect, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";

const EntityTypes = (props) => {
  const [PersianEntityNumber, SetPersianEntityNumber] = useState(0);
  const [EntityNumber, SetEntityNumber] = useState(0);

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

  return (
    <div
      className="animated-border-box bg-gradient-main shadow-none font-iranSans text-sm h-full"
      style={{ "--dynamic-color": props.NetworkColor }}
    >
      <a className="cursor-pointer" href={`/panel/entity/types/${props.id}`}>
        {/* Row 1: عنوان + لوگو (هم‌ردیف در موبایل) */}
        <div className="flex flex-nowrap items-center justify-between gap-3">
          {/* Title */}
          <div className="px-6 py-2 min-w-0">
            <h4
              style={{
                display: "inline-block",
                marginLeft: "8px",
                fontWeight: "bold",
              }}
              className="text-textColor font-bold truncate"
              title={props.name}
            >
              {props.name}
            </h4>
          </div>

          {/* Logo */}
          <div className="px-6 py-2 shrink-0">
            <img
              src={`${props.logo}`}
              className="w-15 h-15 object-contain"
              alt=""
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
          <div className="w-full px-6">
            <h6 style={{ fontWeight: "100" }} className="text-textColor">
              <span className="font-bold">{EntityNumber.toLocaleString()}</span> موجودیت
            </h6>
          </div>

          <div className="w-full px-6 pt-2">
            <h6 style={{ fontWeight: "100" }} className="text-textColor">
              <span className="font-bold">{PersianEntityNumber.toLocaleString()}</span> موجودیت ایرانی
            </h6>
          </div>
        </div>
      </a>
    </div>
  );
};

export default EntityTypes;
