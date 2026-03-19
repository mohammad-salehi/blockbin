import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const searchParams = new URL(req.url).searchParams;
    const network = searchParams.get("network");

  const responseData = {
    data: {
      addresses: [
        {
          address: "bc1quwx5stn02q6t796qn7rch94eke3rqkc0kcucwv",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: [],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qmq7zn7g9mcxffgpsn584epdtzyu9y5mx7p779k",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qq3tf7rtww6glp6vfjlyufg7k0w8v8pedrpzx62",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qgfq0d4htwxs34ggh2yufrte7wa7a60x0pvw5av",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qccz9fnve23vsa0657x8g5e66nge6lm3rcqr4kz",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: [],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qahdj9m2ujn4dchkvplh2y3klldcnfe2d8l9ee5",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qptqyu3r4gzp30fzqjc5c5r48fqkjx965vyj6fw",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qfpu6s4lhxkgkcmldqgykqj5jl09p7hnhpggjnd",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qdqtgez56saxtxuzx0g5un235fn7kjsf7a0vkmq",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
        {
          address: "bc1qmujdrgshu0kcfvk5vl2dyye439szzrpkekzk98",
          entity: {
            id: "cca01e70-6dfc-4f77-b98a-63d65b004f9d",
            name: "Nobitex",
            persian_name: "نوبیتکس",
          },
          identified: ["panta"],
          labels: ["Crystal"],
          network: "btc",
          metadata: {
            last_checked_block: 940556,
          },
        },
      ],
      count: 10,
    },
    en_msg: "Successfully",
    code: 200,
    status: "OK",
    fa_msg: "با موفقیت انجام شد",
  };
  if (network === 'btc') {
    return NextResponse.json(responseData);
  }
}
