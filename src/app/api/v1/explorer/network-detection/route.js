import { NextResponse } from "next/server";

// حالت‌های مختلفی که خودت می‌خوای ست کنی
const MOCK_CASES = [
  {
    match: (q) => q === "THVKDNLrcP2MHAxuCP73LjhvzFBcUusk8r",
    response: {
      queryType: "address",
      networks: ["TRX"],
    },
  },
  {
    match: (q) =>
      q ===
      "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
    response: {
      queryType: "transaction",
      networks: ["BTC", "BCH", "TRX", "DOGE", "LTC", "TON", "XRP"],
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