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
  const responseData4 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {
        hash: "0883nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdppl4",
        block_number: 48418975,
        block_hash: null,
        detail_from: {
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
              currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
              linkedin: "https://www.linkedin.com/company/kucoin/",
              web_site: null,
              addresses: null,
              countries: [198, 200],
              is_active: false,
              crunchbase: "https://www.crunchbase.com/organization/kucoin",
              is_deleted: false,
              legal_name: null,
              sample_addr: "0xDBa6Ae7c0ED453012604Ba210c20493631589029",
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
          address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Hot Wallet" }
        },
        detail_to: {
          entity: {},
          address: "T39kaCeRBBs5Z2v42N9KzvcGfdRhnaPook",
          labels: [],
          tags: [],
          address_label: ["Arkham", "panta"],
          metadata: { label: "Deposit" }
        },
        value: 3.6,
        time: 1675263915.0,
        fee: 0.268,
        logs: [],
        labels_tags: { labels: [], tags: [] },
        value_in_dollor: 2.4,
        status_code: 200,
      },
    },
  };
  const responseData5 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {

        fee: 0.268,
        value: 3.6,
        ValueInDollor: 2.4,
        time: 1675163915,
        hash: "0639nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdhhy6",
        block_number: 48418975,
        block_hash: null,
        detail_from: {
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
              currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
              linkedin: "https://www.linkedin.com/company/kucoin/",
              web_site: null,
              addresses: null,
              countries: [198, 200],
              is_active: false,
              crunchbase: "https://www.crunchbase.com/organization/kucoin",
              is_deleted: false,
              legal_name: null,
              sample_addr: "0xDBa6Ae7c0ED453012604Ba210c20493631589029",
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
          address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Hot Wallet" }
        },
        detail_to: {
          entity: {},
          address: "T87uzeRBBs5Z2v42N9KzvcGfdRhnaJuuL",
          labels: [],
          tags: [],
          address_label: ["Arkham", "panta"],
          metadata: { label: "Deposit" }
        },
        logs: [],
        labels_tags: { labels: [], tags: [] },
        status_code: 200,
      },
    },
  };
  const responseData6 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {

        fee: 0.00048,
        value: 18.7,
        ValueInDollor: 12.6,
        time: 1673815115,
        hash: "3tz354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbq19r",
        block_number: 48247762,

        block_hash: null,
        detail_from: {
          entity: {},
          address: "TWZN2QXGLi3KnLTtMY2ch3Hh8jwUtoagro",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Gas Supplier" }
        },
        detail_to: {
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
              currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
              linkedin: "https://www.linkedin.com/company/kucoin/",
              web_site: null,
              addresses: null,
              countries: [198, 200],
              is_active: false,
              crunchbase: "https://www.crunchbase.com/organization/kucoin",
              is_deleted: false,
              legal_name: null,
              sample_addr: "0xDBa6Ae7c0ED453012604Ba210c20493631589029",
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
          address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
          labels: [],
          tags: [],
          address_label: ["Arkham", "panta"],
          metadata: { label: "Deposit" }
        },
        logs: [],
        labels_tags: { labels: [], tags: [] },
        status_code: 200,
      },
    },
  };
  const responseData7 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {
        fee: 0.268,
        value: 11.7,
        ValueInDollor: 7.8,
        time: 1674863915,
        hash: "9890bc2k9ff4e12235a22d841654b9ebebf09df0186093af6668149eaacdaap5",
        block_number: 48418975,
        block_hash: null,
        detail_from: {
          entity: {},
          address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Gas Supplier" }
        },
        detail_to: {
          entity: {},
          address: "TiYgAVFFKIq5A2G83T7KavzLfdRhnaXppL",
          labels: [],
          tags: [],
          address_label: ["Arkham", "panta"],
          metadata: { label: "Deposit" }
        },
        logs: [],
        labels_tags: { labels: [], tags: [] },
        status_code: 200,
      },
    },
  };
  const responseData8 = {
    message: null,
    status_code: 200,
    query: "transaction",
    network: ["TRX"],
    data: {
      result: {

        fee: 0.168,
        value: 125.7,
        ValueInDollor: 80.18,
        time: 1673843915,
        hash: "0680vn2b6dd4e43835a22d841654b9ebebf09df0186093af6668149eaacdeea3",
        block_number: 48418975,

        block_hash: null,
        detail_from: {
          entity: {},
          address: "TBSJ2TZGPi3KnAAACY6ch3Hh3jrUtopkYA",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Gas Supplier" }
        },
        detail_to: {
          entity: {},
          address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
          labels: [],
          tags: [],
          address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
          metadata: { label: "Gas Supplier" }
        },
        logs: [],
        labels_tags: { labels: [], tags: [] },
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

  if (
    transaction ===
      "0883nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdppl4" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData4);
  }

  if (
    transaction ===
      "0639nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdhhy6" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData5);
  }

  if (
    transaction ===
      "3tz354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbq19r" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData6);
  }
  
  if (
    transaction ===
      "9890bc2k9ff4e12235a22d841654b9ebebf09df0186093af6668149eaacdaap5" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData7);
  }

  if (
    transaction ===
      "0680vn2b6dd4e43835a22d841654b9ebebf09df0186093af6668149eaacdeea3" &&
    network === "TRX"
  ) {
    return NextResponse.json(responseData8);
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
