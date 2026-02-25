import { NextResponse } from "next/server";
import { readSearchParams, ok, pickCase } from "@/app/api/_mock/utils";

const LIST_TRX = [
  {
    contract_address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    name: "Tether",
    persian_name: "تتر",
    symbol: "USDT",
    crypto_balance: 0.0,
    decimals: 6,
    entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
    first_activity: 1678649283000.0,
    last_activity: 1718295882000.0,
    sent: 0.0,
    received: 99.448582,
  },
];

const CASES = [
  {
    match: ({ q }) => q.network === "TRX" && q.query === "THVKDNLrcP2MHAxuCP73LjhvzFBcUusk8r",
    result: LIST_TRX,
  },
  { match: () => true, result: [] },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}