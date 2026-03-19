import { NextResponse } from "next/server";
import { readSearchParams, ok, pickCase } from "@/app/api/_mock/utils";

const RES_TRX = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 3,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};

const RES_TRX2 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 1,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};

const RES_TRX3 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 1,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};
const RES_TRX4 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 1,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};
const RES_TRX5 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 1,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};

const RES_TRX6 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 12.7,
  received: 71.4,
  transactions: 1,
  first_activity: 1674215115000.0,
  last_activity: 1675863915000.0,
  balance: 58.7,
  status_code: 200,
};

const CASES = [
  {
    match: ({ q }) => q.network === "TRX" && q.query === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    result: RES_TRX,
  },
  {
    match: ({ q }) => q.network === "TRX" && q.query === "T39kaCeRBBs5Z2v42N9KzvcGfdRhnaPook",
    result: RES_TRX2,
  },
  {
    match: ({ q }) => q.network === "TRX" && q.query === "T87uzeRBBs5Z2v42N9KzvcGfdRhnaJuuL",
    result: RES_TRX3,
  },
  {
    match: ({ q }) => q.network === "TRX" && q.query === "TWZN2QXGLi3KnLTtMY2ch3Hh8jwUtoagro",
    result: RES_TRX4,
  },
  {
    match: ({ q }) => q.network === "TRX" && q.query === "TiYgAVFFKIq5A2G83T7KavzLfdRhnaXppL",
    result: RES_TRX5,
  },
  {
    match: ({ q }) => q.network === "TRX" && q.query === "TBSJ2TZGPi3KnAAACY6ch3Hh3jrUtopkYA",
    result: RES_TRX6,
  },
  { match: () => true, result: { message: null, status_code: 404 } },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}