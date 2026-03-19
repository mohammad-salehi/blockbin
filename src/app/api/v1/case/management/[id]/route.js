import { NextResponse } from "next/server";

export async function GET() {
  const responseData = {
    "data": {
        "case_info": {
            "name": "تست",
            "created_time": "2026-02-23T13:17:15.320978Z",
            "modified_time": "2026-02-23T13:18:26.665098Z",
            "status": "open",
            "note_detail": "نوشته تستی پرونده",
            "id": "09bae345-6be7-4910-8db2-e68ed25f0306",
            "is_active": true,
            "created_at": "2026-02-23T13:17:15.320539Z",
            "updated_at": "2026-02-23T13:18:26.664764Z",
            "deleted_at": null,
            "created_by": {
                "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                "username": "salehi"
            },
            "updated_by": {
                "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                "username": "salehi"
            }
        },
        "addresses": [
            {
                "address_hash": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                "risk": 0.0,
                "owner_name": "Not Implemented",
                "asset_volume": "1e-06",
                "date_created": "2026-02-23T13:25:22.499778Z",
                "network": "9112616d-fe37-428d-b9ea-e3494554df9d",
                "network_symbol": "TRX",
                "case": "09bae345-6be7-4910-8db2-e68ed25f0306",
                "id": "7395996f-2a3c-418d-a8a4-24513d93cd5d",
                "is_active": true,
                "created_at": "2026-02-23T13:25:22.498711Z",
                "updated_at": "2026-02-23T13:25:22.498930Z",
                "deleted_at": null,
                "created_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                },
                "updated_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                }
            }
        ],
        "graphs": [
            {
                "graph_detail": {
                    "id": "eb231961-6725-4005-b4ed-aadf420b626c",
                    "title": "tron",
                    "network": 11,
                    "Description": ""
                },
                "case": "09bae345-6be7-4910-8db2-e68ed25f0306",
                "date_created": "2026-02-23T13:38:46.348015Z",
                "id": "3d3c6e75-ba08-444c-910a-dd0e42a74fe5",
                "is_active": true,
                "created_at": "2026-02-23T13:38:46.347159Z",
                "updated_at": "2026-02-23T13:38:46.347304Z",
                "deleted_at": null,
                "created_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                },
                "updated_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                }
            },
            {
                "graph_detail": {
                    "id": "f02e6fc5-c5aa-48ac-bd09-0efc827a049d",
                    "title": "test",
                    "network": 11,
                    "Description": ""
                },
                "case": "09bae345-6be7-4910-8db2-e68ed25f0306",
                "date_created": "2026-02-25T08:38:59.269643Z",
                "id": "f92f06f2-a3a3-4442-8ecf-781988f7d19b",
                "is_active": true,
                "created_at": "2026-02-25T08:38:59.268586Z",
                "updated_at": "2026-02-25T08:38:59.268754Z",
                "deleted_at": null,
                "created_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                },
                "updated_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                }
            }
        ],
        "transactions": [
            {
                "date_created": "2026-02-23T13:47:16.365348Z",
                "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                "volume": "1.74724825",
                "network": "aed112ec-0dc9-4c03-b957-5cb788fdcafa",
                "case": "09bae345-6be7-4910-8db2-e68ed25f0306",
                "network_symbol": "BTC",
                "id": "52b4aae5-622e-45f8-84b1-61454fd12071",
                "is_active": true,
                "created_at": "2026-02-23T13:47:16.364332Z",
                "updated_at": "2026-02-23T13:47:16.364532Z",
                "deleted_at": null,
                "created_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                },
                "updated_by": {
                    "id": "0f44f277-abbc-49c7-baff-1f6bc5698ca2",
                    "username": "salehi"
                }
            }
        ]
    },
    "en_msg": "Successfully",
    "code": 200,
    "status": "OK",
    "fa_msg": "با موفقیت انجام شد"
}

  return NextResponse.json(responseData);
}