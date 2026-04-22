import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const searchParams = new URL(req.url).searchParams;
    const network = searchParams.get("network");

  const responseData = {
    data: {
      addresses: [
        {
          address: "bc1qtdggrcmkhz9jdtzsxg43xtc0z7362e8rmyhlsr",
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
          address: "bc1qply5x5ar4ds4ke4llcttx8plt7dn4ssf5fjn9k",
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
        }
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
