import { NextResponse } from "next/server";

const NETWORKS = {
  BTC: { price: 89496.466, block: 938266 },
  LTC: { price: 77.94, block: 3062368 },
  BCH: { price: 579.8, block: 939917 },
  DOGE: { price: 0.132, block: 6100008 },
  MATIC: { price: 0.318, block: 83446997 },
  XRP: { price: 1.916, block: null },
  TON: { price: 1.466, block: null },
  SOL: { price: 125.851, block: null },
  BSC: { price: 865.072, block: null },
  ETH: { price: 3035.225, block: 24533138 },
  TRX: { price: 0.288, block: 80448836 },
};

function baseResponse(symbol, price) {
  return {
    data: {
      id: crypto.randomUUID(),
      created_at: "2025-12-22T09:24:21.423487Z",
      updated_at: "2025-12-22T09:24:21.423494Z",
      deleted_at: null,
      is_active: true,
      is_deleted: false,
      price,
      date: "2025-12-22T09:25:00Z",
      symbol,
      rial_price: 0.0,
      user_created_object: null,
      user_updated_object: null,
    },
    en_msg: "Successfully",
    code: 200,
    status: "OK",
    fa_msg: "با موفقیت انجام شد",
  };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = (searchParams.get("symbol") || "").toUpperCase();

  const network = NETWORKS[symbol];

  // اگر symbol نبود یا پیدا نشد
  if (!network) {
    return NextResponse.json({
      data: null,
      en_msg: "No mock for this symbol",
      code: 200,
      status: "OK",
      fa_msg: "برای این نماد موک تعریف نشده",
    });
  }

  return NextResponse.json(
    baseResponse(symbol, network.price)
  );
}