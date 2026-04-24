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





const RES_BTC = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0.001,
  received: 0.005,
  transactions: 2,
  first_activity: 1708278685.0,
  last_activity: 1728257871.0,
  balance: 0.004,
  status_code: 200,
};
const RES_BTC2 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0,
  transactions: 2,
  first_activity: 1708278685.0,
  last_activity: 1728713533.0,
  balance: 0,
  status_code: 200,
};

const RES_BTC3 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0.001,
  received: 0.4,
  transactions: 2,
  first_activity: 1693678685.0,
  last_activity: 1708278685.0,
  balance: 0.399,
  status_code: 200,
};
const RES_BTC4 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.05,
  transactions: 1,
  first_activity: 1728713533.0,
  last_activity: 1728713533.0,
  balance: 0.05,
  status_code: 200,
};
const RES_BTC5 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.05,
  transactions: 1,
  first_activity: 1728713533.0,
  last_activity: 1728713533.0,
  balance: 0.05,
  status_code: 200,
};

const RES_BTC6 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.011,
  transactions: 1,
  first_activity: 1728257871.0,
  last_activity: 1728257871.0,
  balance: 0.011,
  status_code: 200,
};
const RES_BTC7 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.04,
  transactions: 1,
  first_activity: 1728257871.0,
  last_activity: 1728257871.0,
  balance: 0.04,
  status_code: 200,
};

const RES_BTC8 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.004,
  transactions: 1,
  first_activity: 1728257871.0,
  last_activity: 1728257871.0,
  balance: 0.004,
  status_code: 200,
};
const RES_BTC9 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.003,
  transactions: 1,
  first_activity: 1728257871.0,
  last_activity: 1728257871.0,
  balance: 0.003,
  status_code: 200,
};
const RES_BTC10 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.01,
  transactions: 1,
  first_activity: 1728713533.0,
  last_activity: 1728713533.0,
  balance: 0.01,
  status_code: 200,
};

const RES_BTC11 = {
  entity_uid: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
  sent: 0,
  received: 0.4,
  transactions: 1,
  first_activity: 1723678685.0,
  last_activity: 1723678685.0,
  balance: 0.4,
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




  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qnc4an22h9dqlh9ayutf7f3008kp7j6266evx2g",
    result: RES_BTC,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qply5x5ar4ds4ke4llcttx8plt7dn4ssf5fjn9k",
    result: RES_BTC2,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
    result: RES_BTC3,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qyh5z7wl2sfkcu6yddwuqj5grvxe7ljd3trh425",
    result: RES_BTC4,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qtdggrcmkhz9jdtzsxg43xtc0z7362e8rmyhlsr",
    result: RES_BTC5,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1q5jh0vyy0spkutl56wpz9w2kdhjws40wdnqm5pm",
    result: RES_BTC6,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1q57v67v6hqpy0ztg8w2fq50h75kxr7gv6qklxge",
    result: RES_BTC7,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1q8ttx0wz98e9nwkxy5nn8qta5mh5wx75f920afn",
    result: RES_BTC8,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qnr5evj0jys2j6fym4c4yudya9kym9gdhnekexm",
    result: RES_BTC9,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qcx0tdchs28kgf7l00dapwafy6tecgwe4gkl3xf",
    result: RES_BTC10,
  },
  {
    match: ({ q }) => q.network === "BTC" && q.query === "bc1qttyevj0jys2j6fym4c4yudya9kym9gdhnekads",
    result: RES_BTC11,
  },
  { match: () => true, result: { message: null, status_code: 404 } },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}