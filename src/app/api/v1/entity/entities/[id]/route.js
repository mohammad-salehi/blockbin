import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const TARGET_ID1 = "cca01e70-6dfc-4f77-b98a-63d65b004f9d";
  const TARGET_ID2 = "85c97727-6830-498d-ad16-16b5e58d9567";

  // ✅ بررسی دقیق ID
  if (id === TARGET_ID1) {
    return NextResponse.json({
      data: {
        info: [
          {
            image: null,
            persian_name: "نوبیتکس",
            name: "Nobitex",
            id: TARGET_ID1,
            is_iranian: true,
            metadata: {
              name: "Nobitex.ir",
              note: "",
              type: "cex",
              grade: -1.0,
              image:
                "http://product.blockbin.ir/media/entitylibrary/Nobitex.ir.png",
              licence: "dont_have",
              service: null,
              twitter: "https://twitter.com/nobitexmarket",
              website: "https://nobitex.ir",
              currency: [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13],
              web_site: "https://nobitex.ir/",
              addresses: null,
              countries: [106],
              is_active: false,
              is_deleted: false,
              legal_name: "راهکار فناوری نویان",
              fiat_support: true,
              private_coin: false,
              establishment: "1397-04-01",
              supervisory_body: "ندارد",
              is_in_sanction_list: false,
              registration_number: "528163",
            },
            country: "Iran", // ✅ اصلاح شد: حذف کاما اضافی
            riskscore: 1.0,
            category: {
              id: "073c0ba5-88c9-4532-b36d-4bc5acf3c13f",
              name: "sanctions",
              persian_name: "تحریم‌شده",
            },
          },
        ],
        address_count: 101818,
      },
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد",
    });
  } else if (id === TARGET_ID2) {
    return NextResponse.json({
      data: {
        info: [
          {
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
              image:
                "http://product.blockbin.ir/media/entitylibrary/KuCoin.png",
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
              registration_number: null,
            },
            country: "Seychelles,Singapore,",
            riskscore: 0.6,
            category: {
              id: "fee3b858-66f9-4511-aba1-6086e528e97b",
              name: "exchange_unlicensed",
              persian_name: "صرافی غیرمجاز",
            },
          },
        ],
        address_count: 214985,
      },
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد",
    });
  }

  // ✅ پاسخ 404 برای IDهای نامعتبر
  return NextResponse.json({ error: "Exchange not found" }, { status: 404 });
}
