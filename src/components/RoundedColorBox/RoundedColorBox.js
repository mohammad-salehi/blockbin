import React, { useEffect, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";

const RoundedColorBox = (props) => {
  const [Price, SetPrice] = useState(0);
  const [Block, SetBlock] = useState(0);

  useEffect(() => {
    try {
      document.documentElement.style.setProperty("--dynamic-color", "#01153a");
    } catch (error) {
      document.documentElement.style.setProperty("--dynamic-color", "black");
    }

    GetRequest(
      `${serverAddress}/explorer/price-service/?timestamp=${Math.trunc(
        Date.now() / 1000
      )}&symbol=${props.symbol !== "BSC" ? props.symbol : "BNB"}`
    )
      .then((response) => {
        SetPrice(response.data.price);
      })
      .catch((err) => console.log(err));

    GetRequest(`${serverAddress}/explorer/latest-block-info/?network=${props.symbol}`)
      .then((response) => {
        if (response.status === 200) SetBlock(response.data.block_number);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="animated-border-box bg-gradient-main shadow-none font-iranSans text-sm"
      style={{ "--dynamic-color": props.NetworkColor }}
    >
      {/* Row 1: عنوان + لوگو (هم‌ردیف در موبایل) */}
      <div className="flex flex-nowrap items-center justify-between gap-3">
        {/* متن */}
        <div className="px-6 py-4 min-w-0">
          <div className="flex flex-col min-w-0">
            <h4
              style={{
                display: "inline-block",
                marginLeft: "8px",
                marginBottom: "-14px",
                fontWeight: "100",
              }}
              className="text-textColor font-bold truncate"
              title={props.name}
            >
              {props.name}
            </h4>

            <h6
              className="mt-3 text-textColor font-bold truncate"
              style={{
                display: "inline-block",
                marginLeft: "8px",
                marginBottom: "-14px",
              }}
              title={props.symbol}
            >
              {props.symbol}
            </h6>
          </div>
        </div>

        {/* لوگو */}
        <div className="px-6 py-4 shrink-0">
          <img
            src={`/images/${props.logo}`}
            className="w-10 h-10"
            alt=""
          />
        </div>
      </div>

      {/* Row 2: قیمت + آخرین بلاک (یک ردیف در موبایل) */}
      <div className="flex flex-nowrap items-stretch">
        {/* آخرین بلاک */}
        <div className="w-1/2 px-6 py-4">
          <div className="flex flex-col">
            <h6 style={{ fontWeight: "100" }} className="text-textColor">
              آخرین بلاک
            </h6>
            <h6 className="text-textColor font-bold">
              {Block ? Block.toLocaleString() : "نامشخص"}
            </h6>
          </div>
        </div>

        {/* قیمت */}
        <div className="w-1/2 px-6 py-4">
          <div className="flex flex-col">
            <h6 style={{ fontWeight: "100" }} className="text-textColor">
              قیمت
            </h6>
            <h6 className="text-textColor font-bold">
              {Price ? `${Number(Price).toLocaleString()}$` : "نامشخص"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundedColorBox;
