import { NextResponse } from "next/server";
import { readSearchParams, ok, pickCase } from "@/app/api/_mock/utils";

const CASES = [
  {
    match: ({ q }) => q.network === "TRX" && q.address === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    result: { risk_score: 60.0, message: null, status_code: null },
  },
  // fallback
  {
    match: () => true,
    result: { risk_score: 0.0, message: null, status_code: null },
  },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}