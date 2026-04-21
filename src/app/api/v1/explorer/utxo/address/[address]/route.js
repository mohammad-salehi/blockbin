import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const { address } = params;

    const searchParams = new URL(req.url).searchParams;
    const evm_address_type = searchParams.get("evm_address_type");
    const network = searchParams.get("network");
    const page_number = searchParams.get("page_number");
    const page_size = searchParams.get("page_size");
    const sort_order = searchParams.get("sort_order");

    const responseData1 = {
        "data": {
            "message": null,
            "status_code": 200,
            "query": "address",
            "network": [
                "BTC"
            ],
            "result": {
                "result": [
                    {
                        "blockNumber": 864552,
                        "time": 1728278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0.00088582,
                        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 55.64642342936229
                    },
                    {
                        "blockNumber": 864683,
                        "time": 1728357871,
                        "fee": -0.03372089,
                        "amountTransferred": -0.00088582,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 55.11717770565478
                    }
                ],
                "info": null,
                "status_code": 200
            }
        },
        "en_msg": "Successfully",
        "code": 200,
        "status": "OK",
        "fa_msg": "با موفقیت انجام شد"
    };
    const responseData2 = {
        "data": {
            "message": null,
            "status_code": 200,
            "query": "address",
            "network": [
                "BTC"
            ],
            "result": {
                "result": [
                    {
                        "blockNumber": 864552,
                        "time": 1728278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0.00037833,
                        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 23.766353633955696
                    },
                    {
                        "blockNumber": 865331,
                        "time": 1728743533,
                        "fee": 0.01072741,
                        "amountTransferred": -0.00037833,
                        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 23.624672103268775
                    }
                ],
                "info": null,
                "status_code": 200
            }
        },
        "en_msg": "Successfully",
        "code": 200,
        "status": "OK",
        "fa_msg": "با موفقیت انجام شد"
    };
    const responseData3 = {
        "data": {
            "message": null,
            "status_code": 200,
            "query": "address",
            "network": [
                "BTC"
            ],
            "result": {
                "result": [
                    {
                        "blockNumber": 864352,
                        "time": 1723278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0.4,
                        "hash": "45y6f5464e83eb65fc818b3264e5c88bd66c734f3ca7e39dbae9db80e69cegag",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 24158
                    }
                ],
                "info": null,
                "status_code": 200
            }
        },
        "en_msg": "Successfully",
        "code": 200,
        "status": "OK",
        "fa_msg": "با موفقیت انجام شد"
    };

    if (
        address === "bc1qnc4an22h9dqlh9ayutf7f3008kp7j6266evx2g"
    ) {
        return NextResponse.json(responseData1)
    }

    if (
        address === "bc1qply5x5ar4ds4ke4llcttx8plt7dn4ssf5fjn9k"
    ) {
        return NextResponse.json(responseData2)
    }

    if (
        address === "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq"
    ) {
        return NextResponse.json(responseData3)
    }

    return NextResponse.json({
        data: {
            message: "Invalid parameters",
            status_code: 400,
            result: [],
            en_msg: "Invalid request parameters",
            code: 400,
            status: "Bad Request",
            fa_msg: "پارامترهای درخواست نامعتبر است"
        }
    });
}