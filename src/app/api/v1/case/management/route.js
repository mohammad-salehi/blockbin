import { NextResponse } from "next/server";

export async function GET() {
  const responseData = {
    "data": {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": "09bae345-6be7-4910-8db2-e68ed25f0306",
                "name": "تست",
                "networks": [
                    "TRX"
                ],
                "status": "open",
                "last_modified": "2026-02-23T13:18:26.665Z",
                "user_created": "salehi",
                "average_risk": 0.0,
                "asset_volumes": {
                    "TRX": 1e-06
                },
                "len_of_address": 1,
                "len_of_graph": 2,
                "len_of_transaction": 1
            }
        ]
    },
    "en_msg": "Successfully",
    "code": 200,
    "status": "OK",
    "fa_msg": "با موفقیت انجام شد"
  };

  return NextResponse.json(responseData);
}