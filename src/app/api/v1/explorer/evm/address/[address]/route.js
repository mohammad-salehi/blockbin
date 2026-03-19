import { NextResponse } from "next/server";

export async function GET(req,{params}) {

  const { address } = params;

  const searchParams = new URL(req.url).searchParams;
  const evm_address_type = searchParams.get("evm_address_type");
  const network = searchParams.get("network");
  const page_number = searchParams.get("page_number");
  const page_size = searchParams.get("page_size");
  const sort_order = searchParams.get("sort_order");

  // ساختار پاسخ مطابق با داده‌های شما (برای پارامترهای خاص)
  const responseData1 = {
    data: {
      message: null,
      status_code: 200,
      query: "address",
      network: ["TRX"],
      result: [
        {
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
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
            address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
            metadata: { label: "Hot Wallet" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.005,
          value: 12.7,
          ValueInDollor: 7.0,
          time: 1675345443,
          hash: "dc7ff5cac1a540ad72a9221af9f914bdea2237dc3ecc5dcdf1da331e2a02dae2",
          block_number: 47872115,
          block_hash: ""
        },
        {
          detail_from: {
            entity: {},
            address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.00048,
          value: 68.7,
          ValueInDollor: 40.26,
          time: 1674215115,
          hash: "9ca354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbe10a",
          block_number: 48247762,
          block_hash: ""
        },
        {
          detail_from: {
            entity: {},
            address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.268,
          value: 2.7,
          ValueInDollor: 1.62,
          time: 1675863915,
          hash: "0790bc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdeea2",
          block_number: 48418975,
          block_hash: ""
        }
      ],
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد"
    }
  };

  const responseData2 = {
    data: {
      message: null,
      status_code: 200,
      query: "address",
      network: ["TRX"],
      result: [
        {
          detail_from: {
            entity: {},
            address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.00048,
          value: 68.7,
          ValueInDollor: 40.26,
          time: 1674215115,
          hash: "9ca354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbe10a",
          block_number: 48247762,
          block_hash: ""
        },
        {
          detail_from: {
            entity: {},
            address: "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF",
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.268,
          value: 2.7,
          ValueInDollor: 1.62,
          time: 1675863915,
          hash: "0790bc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdeea2",
          block_number: 48418975,
          block_hash: ""
        },
        {
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
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.168,
          value: 125.7,
          ValueInDollor: 80.18,
          time: 1673843915,
          hash: "0680vn2b6dd4e43835a22d841654b9ebebf09df0186093af6668149eaacdeea3",
          block_number: 48418975,
          block_hash: ""
        },
        {
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
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.268,
          value: 11.7,
          ValueInDollor: 7.8,
          time: 1674863915,
          hash: "9890bc2k9ff4e12235a22d841654b9ebebf09df0186093af6668149eaacdaap5",
          block_number: 48418975,
          block_hash: ""
        },
      ],
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد"
    }
  };

  const responseData3 = {
    data: {
      message: null,
      status_code: 200,
      query: "address",
      network: ["TRX"],
      result: [
        {
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
            address: "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
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
            address_label: ["panta", "Arkham", "entity:arkham:kucoin"],
            metadata: { label: "Hot Wallet" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.005,
          value: 12.7,
          ValueInDollor: 7.0,
          time: 1675345443,
          hash: "dc7ff5cac1a540ad72a9221af9f914bdea2237dc3ecc5dcdf1da331e2a02dae2",
          block_number: 47872115,
          block_hash: ""
        },
        {
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
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.00048,
          value: 18.7,
          ValueInDollor: 12.6,
          time: 1673815115,
          hash: "3tz354af3f53514f2b1f0775db0511727b6802aa7c2078ef00d152ba22bbq19r",
          block_number: 48247762,
          block_hash: ""
        },
        {
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
            metadata: { label: "Gas Supplier" }
          },
          detail_to: {
            entity: {},
            address: "T39kaCeRBBs5Z2v42N9KzvcGfdRhnaPook",
            labels: [],
            tags: [],
            address_label: ["Arkham", "panta"],
            metadata: { label: "Deposit" }
          },
          logs: [],
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.268,
          value: 3.6,
          ValueInDollor: 2.4,
          time: 1675263915,
          hash: "0883nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdppl4",
          block_number: 48418975,
          block_hash: ""
        },
        {
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
            metadata: { label: "Gas Supplier" }
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
          status_code: 200,
          labels_tags: { labels: [], tags: [] },
          fee: 0.268,
          value: 3.6,
          ValueInDollor: 2.4,
          time: 1675163915,
          hash: "0639nc2b6ff4e91735a22d841654b9ebebf09df0186093af6668149eaacdhhy6",
          block_number: 48418975,
          block_hash: ""
        }
      ],
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد"
    }
  };  

  // بررسی پارامترهای درخواست
  if (
    address === "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG" &&
    evm_address_type === "main" &&
    network === "TRX" &&
    page_number === "1" &&
    page_size === "10" &&
    sort_order === "ascending"
  ) {
    return NextResponse.json(responseData1)
  } else if (address === "TCSN2TXGLi3KnLTtMY2ch3Hh8jwUtotkYF") {
    return NextResponse.json(responseData2)
  } else if (address === "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP") {
    return NextResponse.json(responseData3)
  }

  // پاسخ پیش‌فرض برای پارامترهای دیگر
  return NextResponse.json({
    data: {
      message: "Invalid parameters",
      status_code: 400,
      result: [], // داده‌های خالی برای پارامترهای نامعتبر
      en_msg: "Invalid request parameters",
      code: 400,
      status: "Bad Request",
      fa_msg: "پارامترهای درخواست نامعتبر است"
    }
  });
}