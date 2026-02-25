import { NextResponse } from "next/server";
import { readSearchParams, ok, pickCase } from "@/app/api/_mock/utils";

const SUMMARY = {
  label_tags: { labels: [], tags: [] },
  address_detail: {
    entity: {
      image: null,
      persian_name: null,
      name: "Kucoin",
      id: "85c97727-6830-498d-ad16-16b5e58d9567",
      is_iranian: false,
      metadata: {
        name: "@Kucoin_KingV",
        note: "",
        type: "individual",
        grade: 0.0,
        image: "http://product.blockbin.ir/media/entitylibrary/KuCoin.png",
        licence: null,
        service: null,
        twitter: "https://x.com/Kucoin_KingV",
        website: "https://kucoin.com",
        currency: [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          10,
          11,
          12
        ],
        linkedin: "https://www.linkedin.com/company/kucoin/",
        web_site: null,
        addresses: null,
        countries: [
          198,
          200
        ],
        is_active: false,
        crunchbase: "https://www.crunchbase.com/organization/kucoin",
        is_deleted: false,
        legal_name: null,
        fiat_support: true,
        private_coin: null,
        establishment: null,
        mapping_checked: true,
        supervisory_body: null,
        is_in_sanction_list: false,
        registration_number: null
      },
      country: "Seychelles,Singapore,",
      riskscore: 0.6,
      category: {
        id: "fee3b858-66f9-4511-aba1-6086e528e97b",
        name: "exchange_unlicensed",
        persian_name: "صرافی غیرمجاز"
      }
    },
    address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    labels: [],
    tags: [],
    address_label: [
      "Arkham",
      "panta"
    ],
    metadata: {
      label: "Deposit"
    }
  },
}
const CASES = [
  {
    match: ({ q }) => q.query === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
    result: SUMMARY,
  },
  { match: () => true, result: { message: null, status_code: 404 } },
];

export async function GET(req) {
  const q = readSearchParams(req);
  const data = pickCase(CASES, { q });
  return NextResponse.json(ok(data));
}