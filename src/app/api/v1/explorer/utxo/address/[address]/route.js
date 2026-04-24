import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const { address } = params;

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
                        "blockNumber": 864502,
                        "time": 1708278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0.005,
                        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 307.6
                    },
                    {
                        "blockNumber": 864633,
                        "time": 1728257871,
                        "fee": 0.03372089,
                        "amountTransferred": 0.001,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 54.90313524634312
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
                        "blockNumber": 864502,
                        "time": 1708278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0,
                        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 0
                    },
                    {
                        "blockNumber": 865321,
                        "time": 1728713533,
                        "fee": 0.01072741,
                        "amountTransferred": 0,
                        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 0
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
                        "blockNumber": 864288,
                        "time": 1693678685,
                        "fee": 0.004,
                        "amountTransferred": 0.4,
                        "hash": "45y6f5464e83eb65fc818b3264e5c88bd66c734f3ca7e39dbae9db80e69cegag",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 15000
                    },
                    {
                        "blockNumber": 864502,
                        "time": 1708278685,
                        "fee": 1.892e-05,
                        "amountTransferred": 0.001,
                        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 55.16607158793
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
    const responseData4 = {
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
                        "blockNumber": 865321,
                        "time": 1728713533,
                        "fee": 0.01072741,
                        "amountTransferred": 0.05,
                        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 300.96973352453
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
    const responseData5 = {
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
                        "blockNumber": 865321,
                        "time": 1728713533,
                        "fee": 0.01072741,
                        "amountTransferred": 0.05,
                        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 300.96973352453
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
    const responseData6 = {
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
                        "blockNumber": 864633,
                        "time": 1728257871,
                        "fee": 0.03372089,
                        "amountTransferred": 0.011,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Received",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 648.301886183854
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
    const responseData7 = {
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
                        "blockNumber": 864633,
                        "time": 1728257871,
                        "fee": 0.03372089,
                        "amountTransferred": 0.004,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 216.69354646465166
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
    const responseData8 = {
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
                        "blockNumber": 864633,
                        "time": 1728257871,
                        "fee": 0.03372089,
                        "amountTransferred": 0.004,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                          "labels": [],
                          "tags": []
                        },
                        "ValueInDollor": 216.80430099301641
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
    const responseData9 = {
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
                        "blockNumber": 864633,
                        "time": 1728257871,
                        "fee": 0.03372089,
                        "amountTransferred": 0.003,
                        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                          "labels": [],
                          "tags": []
                        },
                        "ValueInDollor": 162.90313524634312
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
    const responseData10 = {
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
                        "blockNumber": 865321,
                        "time": 1728713533,
                        "fee": 0.01072741,
                        "amountTransferred": 0.01,
                        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 600.26142874794283
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
    const responseData11 = {
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
                        "blockNumber": 864288,
                        "time": 1723678685,
                        "fee": 0.004,
                        "amountTransferred": 0.4,
                        "hash": "45y6f5464e83eb65fc818b3264e5c88bd66c734f3ca7e39dbae9db80e69cegag",
                        "addresstype": "Sent",
                        "totalInputs": 0,
                        "totalOutputs": 0,
                        "labels_tags": {
                            "labels": [],
                            "tags": []
                        },
                        "ValueInDollor": 15000
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

    if (
        address === "bc1qyh5z7wl2sfkcu6yddwuqj5grvxe7ljd3trh425"
    ) {
        return NextResponse.json(responseData4)
    }

    if (
        address === "bc1qtdggrcmkhz9jdtzsxg43xtc0z7362e8rmyhlsr"
    ) {
        return NextResponse.json(responseData5)
    }

    if (
        address === "bc1q5jh0vyy0spkutl56wpz9w2kdhjws40wdnqm5pm"
    ) {
        return NextResponse.json(responseData6)
    }

    /**/
    if (
        address === "bc1q57v67v6hqpy0ztg8w2fq50h75kxr7gv6qklxge"
    ) {
        return NextResponse.json(responseData7)
    }

    if (
        address === "bc1q8ttx0wz98e9nwkxy5nn8qta5mh5wx75f920afn"
    ) {
        return NextResponse.json(responseData8)
    }

    if (
        address === "bc1qnr5evj0jys2j6fym4c4yudya9kym9gdhnekexm"
    ) {
        return NextResponse.json(responseData9)
    }

    if (
        address === "bc1qcx0tdchs28kgf7l00dapwafy6tecgwe4gkl3xf"
    ) {
        return NextResponse.json(responseData10)
    }

    if (
        address === "bc1qttyevj0jys2j6fym4c4yudya9kym9gdhnekads"
    ) {
        return NextResponse.json(responseData11)
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