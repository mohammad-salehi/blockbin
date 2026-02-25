import { NextResponse } from "next/server";

const TX_HASH =
  "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a";

const RESULT_A = {
  block_number: 864552,
  time: 1728278685.0,
  hash: TX_HASH,
  total_inputs: 1,
  total_outputs: 3,
  inputs: [
    {
      coin: {
        coinbase: false,
        ValueInDollar: 109761.76738619982,
        value: 1.74726717,
        address: {
          entity: {},
          address: "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
          labels: [],
          tags: [],
          address_label: [],
          metadata: {},
        },
      },
    },
  ],
  outputs: [
    {
      coinbase: false,
      ValueInDollar: 23.766353633955696,
      value: 0.00037833,
      address: {
        entity: {
          image: null,
          persian_name: null,
          name: "Undefined",
          id: "6d7b7a41-51d8-4cdb-bca2-433a145fa994",
          is_iranian: false,
          metadata: {
            grade: -2.0,
            image: null,
            licence: null,
            currency: [1],
            web_site: null,
            countries: [],
            is_active: false,
            is_deleted: false,
            legal_name: null,
            fiat_support: false,
            private_coin: null,
            establishment: null,
            supervisory_body: null,
            is_in_sanction_list: false,
            registration_number: null,
          },
          country: "",
          riskscore: 1.0,
          category: {
            id: "3a05f313-3cc7-47c8-a26c-302bc20564f6",
            name: "dark_market",
            persian_name: "بازار سیاه",
          },
        },
        address: "bc1qply5x5ar4ds4ke4llcttx8plt7dn4ssf5fjn9k",
        labels: [],
        tags: [],
        address_label: ["panta"],
        metadata: {},
      },
    },
  ],
  fee: 1.892e-05,
  label_tag: {
    labels: [],
    tags: [],
  },
  amount_transacted: 1.74724825,
  status_code: 200,
};

const RESULT_B = JSON.parse(JSON.stringify(RESULT_A));
RESULT_B.outputs = [
  {
    coinbase: false,
    ValueInDollar: 109681.16607158793,
    value: 1.7459841,
    address: {
      entity: {},
      address: "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
      labels: [],
      tags: [],
      address_label: [],
      metadata: {},
    },
  },
];

const RESULT_C = JSON.parse(JSON.stringify(RESULT_A));
RESULT_C.outputs = [
  ...RESULT_B.outputs,
  {
    coinbase: false,
    ValueInDollar: 55.64642342936229,
    value: 0.00088582,
    address: {
      entity: {},
      address: "bc1qnc4an22h9dqlh9ayutf7f3008kp7j6266evx2g",
      labels: [],
      tags: [],
      address_label: [],
      metadata: {},
    },
  },
  ...RESULT_A.outputs, 
];

const CASES = [
  {
    match: ({ hash, q }) =>
      hash === TX_HASH &&
      q.network === "BTC" &&
      q.page_number_from === "1" &&
      q.page_size_from === "1" &&
      q.page_number_to === "2" &&
      q.page_size_to === "2",
    result: RESULT_C,
  },

  {
    match: ({ hash, q }) =>
      hash === TX_HASH &&
      q.network === "BTC" &&
      q.page_number_from === "1" &&
      q.page_size_from === "5" &&
      q.page_number_to === "1" &&
      q.page_size_to === "1",
    result: RESULT_B,
  },

  {
    match: ({ hash, q }) =>
      hash === TX_HASH &&
      q.network === "BTC" &&
      q.page_number_from === "1" &&
      q.page_size_from === "1" &&
      q.page_number_to === "1" &&
      q.page_size_to === "5",
    result: RESULT_C,
  },

  {
    match: ({ hash, q }) => hash === TX_HASH && q.network === "BTC",
    result: RESULT_A,
  },
];

function readQuery(req) {
  const { searchParams } = new URL(req.url);
  return {
    network: (searchParams.get("network") || "").toUpperCase(),
    page_number_from: searchParams.get("page_number_from") || "",
    page_size_from: searchParams.get("page_size_from") || "",
    page_number_to: searchParams.get("page_number_to") || "",
    page_size_to: searchParams.get("page_size_to") || "",
  };
}

export async function GET(req, { params }) {
  const hash = params.hash;
  const q = readQuery(req);

  const found = CASES.find((c) => c.match({ hash, q }));

  return NextResponse.json({
    data: {
      message: null,
      status_code: 200,
      query: "address",
      network: [q.network || "BTC"],
      result: found ? found.result : null,
    },
    en_msg: "Successfully",
    code: 200,
    status: "OK",
    fa_msg: "با موفقیت انجام شد",
  });
}