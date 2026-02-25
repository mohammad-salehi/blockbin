import { NextResponse } from "next/server";
import { readSearchParams, ok, pickCase } from "@/app/api/_mock/utils";

const RES_TRX = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0.0,
  received: 131529.835876,
  transactions: 20,
  first_activity: 1671640683000.0,
  last_activity: 1739618163000.0,
  balance: 0.0,
  status_code: 200,
};

const CASES = [
  {
    match: ({ q }) => q.network === "TRX" && q.query === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    result: RES_TRX,
  },
  { match: () => true, result: { message: null, status_code: 404 } },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}