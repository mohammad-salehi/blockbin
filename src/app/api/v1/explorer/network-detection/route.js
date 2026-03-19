import { NextResponse } from "next/server";

// حالت‌های مختلفی که خودت می‌خوای ست کنی
const MOCK_CASES = [
  {
    match: (q) => q === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    response: {
      queryType: "address",
      networks: ["TRX"],
    },
  },
  {
    match: (q) => q === "9ca354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbe10a",
    response: {
      queryType: "transaction",
      networks: ["TRX"],
    },
  },
  {
    match: (q) => q === "0790bc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdeea2",
    response: {
      queryType: "transaction",
      networks: ["TRX"],
    },
  },
  {
    match: (q) => q === "dc7ff5cac1a540ad72a9221af9f914bdea2237dc3ecc5dcdf1da331e2a02dae2",
    response: {
      queryType: "transaction",
      networks: ["TRX"],
    },
  },
  {
    match: (q) =>
      q ===
      "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
    response: {
      queryType: "transaction",
      networks: ["BTC", "BCH", "DOGE"],
    },
  },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const found = MOCK_CASES.find((c) => c.match(query));

  const queryType = found?.response.queryType || "address";
  const networks = found?.response.networks || [];

  return NextResponse.json({
    data: {
      message: null,
      status_code: null,
      query: queryType,
      network: networks,
      result: null,
    },
    en_msg: "Successfully",
    code: 200,
    status: "OK",
    fa_msg: "با موفقیت انجام شد",
  });
}