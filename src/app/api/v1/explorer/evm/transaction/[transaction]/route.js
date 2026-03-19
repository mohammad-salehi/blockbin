import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const searchParams = new URL(req.url).searchParams;

  const { transaction } = params;
  // دریافت پارامترهای درخواست
  const network = searchParams.get("network");
  const page_number_from = searchParams.get("page_number_from");
  const page_size_from = searchParams.get("page_size_from");
  const page_number_to = searchParams.get("page_number_to");
  const page_size_to = searchParams.get("page_size_to");

  // ساختار پاسخ مطابق با داده‌های شما
  const responseData1 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {
        hash: "9ca354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbe10a",
        block_number: 48247762,
        block_hash: null,
        detail_from: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Gas Supplier" },
        },
        detail_to: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Deposit" },
        },
        value: 68.7,
        time: 1675345443.0,
        fee: 0.00048,
        logs: [],
        labels_tags: { labels: [], tags: [] },
        value_in_dollor: 0.8213554746193994,
        status_code: 200,
      },
    },
  };
  const responseData2 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {
        hash: "0790bc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdeea2",
        block_number: 48247762,
        block_hash: null,
        detail_from: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Gas Supplier" },
        },
        detail_to: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Deposit" },
        },
        value: 2.7,
        time: 1675345443.0,
        fee: 0.268,
        logs: [],
        labels_tags: { labels: [], tags: [] },
        value_in_dollor: 0.8213554746193994,
        status_code: 200,
      },
    },
  };
  const responseData3 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {
        hash: "dc7ff5cac1a540ad72a9221af9f914bdea2237dc3ecc5dcdf1da331e2a02dae2",
        block_number: 48247762,
        block_hash: null,
        detail_from: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Deposit" },
        },
        detail_to: {
          entity: {
            uuid: "85c97727-6830-498d-ad16-16b5e58d9567",
            persian_name: null,
            name: "Kucoin",
            web_site: null,
            establishment: null,
            fiat_support: true,
            private_coin: null,
            supervisory_body: null,
            legal_name: null,
            registration_number: null,
            licence: null,
            created_time: "2024-02-13T11:11:11.310372Z",
            is_active: false,
            is_deleted: false,
            last_modified: "2024-12-23T09:28:24.181074Z",
            is_in_sanction_list: false,
            riskscore: 0.6,
            grade: 0.0,
            image: "/media/entitylibrary/KuCoin.png",
            type: 5,
            countries: [198, 200],
            currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
          },
          address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
          labels: [],
          tags: [],
          address_label: ["Arkham"],
          metadata: { label: "Gas Supplier" },
        },
        value: 12.7,
        time: 1675345443.0,
        fee: 0.005,
        logs: [],
        labels_tags: { labels: [], tags: [] },
        value_in_dollor: 0.8213554746193994,
        status_code: 200,
      },
    },
  };

  // بررسی دقیق پارامترهای درخواست
  if (
    transaction ===
      "9ca354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbe10a" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData1);
  }

  if (
    transaction ===
      "0790bc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdeea2" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData2);
  }

  if (
    transaction ===
      "dc7ff5cac1a540ad72a9221af9f914bdea2237dc3ecc5dcdf1da331e2a02dae2" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData3);
  }
  // پاسخ خطای 400 برای پارامترهای نامعتبر
  return NextResponse.json(
    {
      message: "Invalid parameters",
      status_code: 400,
      error: "Required parameters not matched",
    },
    { status: 400 }
  );
}
