import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";

const RoundedColorBox = (props) => {
  const [price, setPrice] = useState(null);
  const [block, setBlock] = useState(null);

  const symbolForPrice = useMemo(
    () => (props.symbol !== "BSC" ? props.symbol : "BNB"),
    [props.symbol]
  );

  useEffect(() => {
    // حفظ همون مکانیزم dynamic-color
    try {
      document.documentElement.style.setProperty(
        "--dynamic-color",
        props.NetworkColor || "#01153a"
      );
    } catch {
      document.documentElement.style.setProperty("--dynamic-color", "black");
    }

    GetRequest(
      `${serverAddress}/explorer/price-service/?timestamp=${Math.trunc(
        Date.now() / 1000
      )}&symbol=${symbolForPrice}`
    )
      .then((response) => {
        setPrice(response?.data?.price ?? null);
      })
      .catch(() => setPrice(null));

    GetRequest(
      `${serverAddress}/explorer/latest-block-info/?network=${props.symbol}`
    )
      .then((response) => {
        if (response.status === 200) setBlock(response?.data?.block_number ?? null);
      })
      .catch(() => setBlock(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        // ✅ بوردر/انیمیشن همون قبلی
        "animated-border-box bg-gradient-main shadow-none font-iranSans",

        // ✅ مدرن‌تر
        "rounded-2xl ",
        "transition-transform duration-200 hover:-translate-y-0.5",
        "hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]",
      ].join(" ")}
      style={{ "--dynamic-color": props.NetworkColor }}


    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {/* Dot accent */}
              <span
                className="inline-block h-2 w-2 rounded-full opacity-70"
                style={{ background: "var(--dynamic-color)" }}
              />
              <h4
                className="text-textColor font-extrabold text-base md:text-[15px] truncate"
                title={props.name}
              >
                {props.name}
              </h4>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span
                className="text-textColor font-bold text-sm tracking-wide truncate"
                title={props.symbol}
              >
                {props.symbol}
              </span>

              {/* subtle chip */}
              <span className="ml-1 inline-flex items-center rounded-full border border-boxBorderColor px-2 py-0.5 text-[11px] text-textColor/80 bg-boxColor/30">
                Network
              </span>
            </div>
          </div>

          {/* Logo */}
          <div className="shrink-0">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-2xl blur-xl opacity-25"
                style={{ background: "var(--dynamic-color)" }}
              />
              <div className="relative rounded-2xl border border-boxBorderColor bg-boxColor/40 p-2">
                <img
                  src={`/images/${props.logo}`}
                  className="w-10 h-10 object-contain"
                  alt={props.symbol || "logo"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-4 h-px w-full bg-boxBorderColor/70" />
      </div>

      {/* Stats */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Block */}
          <div className="rounded-2xl border border-boxBorderColor bg-boxColor/30 p-4">
            <div className="flex items-center gap-2">
              <span className="text-textColor/75 text-xs">آخرین بلاک</span>
            </div>

            <div className="mt-2">
              {block === null ? (
                <div className="h-6 w-24 rounded-lg bg-boxBorderColor/40 animate-pulse" />
              ) : (
                <div className="text-textColor font-extrabold text-lg leading-6">
                  {Number(block).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-boxBorderColor bg-boxColor/30 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-textColor/75 text-xs">قیمت</span>
              <span
                className="text-[11px] text-textColor/70"
                title="USD"
              >
                USD
              </span>
            </div>

            <div className="mt-2 flex items-end gap-2">
              {price === null ? (
                <div className="h-6 w-28 rounded-lg bg-boxBorderColor/40 animate-pulse" />
              ) : (
                <>
                  <div className="text-textColor font-extrabold text-lg leading-6">
                    {Number(price).toLocaleString()}
                  </div>
                  <div className="text-textColor/75 text-sm">$</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tiny footer hint (optional but modern) */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-textColor/65">
          <span className="truncate">Updated automatically</span>
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-full opacity-70"
              style={{ background: "var(--dynamic-color)" }}
            />
            Live
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoundedColorBox;