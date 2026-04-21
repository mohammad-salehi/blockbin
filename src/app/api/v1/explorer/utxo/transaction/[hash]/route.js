import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const searchParams = new URL(req.url).searchParams;

  const { hash } = params;
  // دریافت پارامترهای درخواست
  const network = searchParams.get("network");
  const page_number_from = searchParams.get("page_number_from");
  const page_size_from = searchParams.get("page_size_from");
  const page_number_to = searchParams.get("page_number_to");
  const page_size_to = searchParams.get("page_size_to");

  const responseData1 = {
    "data": {
      "message": null,
      "status_code": 200,
      "query": "address",
      "network": [
        "BTC"
      ],
      "result": {
        "block_number": 864552,
        "time": 1728278685.0,
        "hash": "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a",
        "total_inputs": 1,
        "total_outputs": 3,
        "inputs": [
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 109761.76738619982,
              "value": 1.74726717,
              "address": {
                "entity": {},
                "address": "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          }
        ],
        "outputs": [
          {
            "coinbase": false,
            "ValueInDollar": 109681.16607158793,
            "value": 1.7459841,
            "address": {
              "entity": {},
              "address": "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          },
          {
            "coinbase": false,
            "ValueInDollar": 55.64642342936229,
            "value": 0.00088582,
            "address": {
              "entity": {},
              "address": "bc1qnc4an22h9dqlh9ayutf7f3008kp7j6266evx2g",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          },
          {
            "coinbase": false,
            "ValueInDollar": 23.766353633955696,
            "value": 0.00037833,
            "address": {
              "entity": {
                "image": null,
                "persian_name": null,
                "name": "Undefined",
                "id": "6d7b7a41-51d8-4cdb-bca2-433a145fa994",
                "is_iranian": false,
                "metadata": {
                  "name": "@Undefined____2",
                  "note": "",
                  "type": "individual",
                  "grade": -2.0,
                  "image": null,
                  "licence": null,
                  "service": null,
                  "twitter": "https://twitter.com/Undefined____2",
                  "currency": [
                    1
                  ],
                  "web_site": null,
                  "addresses": null,
                  "countries": [],
                  "is_active": false,
                  "is_deleted": false,
                  "legal_name": null,
                  "sample_addr": "0xeeDE9ACD5BbCd64915078323BDA6216dfb6565ef",
                  "fiat_support": false,
                  "private_coin": null,
                  "establishment": null,
                  "mapping_checked": true,
                  "supervisory_body": null,
                  "is_in_sanction_list": false,
                  "registration_number": null
                },
                "country": "",
                "riskscore": 1.0,
                "category": {
                  "id": "3a05f313-3cc7-47c8-a26c-302bc20564f6",
                  "name": "dark_market",
                  "persian_name": "بازار سیاه"
                }
              },
              "address": "bc1qply5x5ar4ds4ke4llcttx8plt7dn4ssf5fjn9k",
              "labels": [],
              "tags": [],
              "address_label": [
                "panta"
              ],
              "metadata": {}
            }
          }
        ],
        "fee": 1.892e-05,
        "label_tag": {
          "labels": [],
          "tags": []
        },
        "amount_transacted": 1.74724825,
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
        "block_number": 865331,
        "time": 1728743533.0,
        "hash": "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e",
        "total_inputs": 461,
        "total_outputs": 2,
        "inputs": [
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 39.26142874794283,
              "value": 0.00062874,
              "address": {
                "entity": {},
                "address": "bc1qcx0tdchs28kgf7l00dapwafy6tecgwe4gkl3xf",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          }
        ],
        "outputs": [
          {
            "coinbase": false,
            "ValueInDollar": 627.6564518423514,
            "value": 0.01005141,
            "address": {
              "entity": {},
              "address": "bc1qtdggrcmkhz9jdtzsxg43xtc0z7362e8rmyhlsr",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          },
          {
            "coinbase": false,
            "ValueInDollar": 11865.96973352453,
            "value": 0.1900239,
            "address": {
              "entity": {},
              "address": "bc1qyh5z7wl2sfkcu6yddwuqj5grvxe7ljd3trh425",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          }
        ],
        "fee": 0.01072741,
        "label_tag": {
          "labels": [],
          "tags": []
        },
        "amount_transacted": 0.20007531,
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
        "block_number": 864683,
        "time": 1728357871.0,
        "hash": "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c",
        "total_inputs": 386,
        "total_outputs": 1,
        "inputs": [
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 54.90313524634312,
              "value": 0.00088238,
              "address": {
                "entity": {},
                "address": "bc1qnr5evj0jys2j6fym4c4yudya9kym9gdhnekexm",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          },
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 53.80430099301641,
              "value": 0.00086472,
              "address": {
                "entity": {},
                "address": "bc1q8ttx0wz98e9nwkxy5nn8qta5mh5wx75f920afn",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          },
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 53.69354646465166,
              "value": 0.00086294,
              "address": {
                "entity": {},
                "address": "bc1q57v67v6hqpy0ztg8w2fq50h75kxr7gv6qklxge",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          }
        ],
        "outputs": [
          {
            "coinbase": false,
            "ValueInDollar": 20067.301886183854,
            "value": 0.3225132,
            "address": {
              "entity": {},
              "address": "bc1q5jh0vyy0spkutl56wpz9w2kdhjws40wdnqm5pm",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          }
        ],
        "fee": -0.03372089,
        "label_tag": {
          "labels": [],
          "tags": []
        },
        "amount_transacted": 0.3225132,
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
        "block_number": 864683,
        "time": 1723278685.0,
        "hash": "45y6f5464e83eb65fc818b3264e5c88bd66c734f3ca7e39dbae9db80e69cegag",
        "total_inputs": 386,
        "total_outputs": 1,
        "inputs": [
          {
            "coin": {
              "coinbase": false,
              "ValueInDollar": 24158,
              "value": 0.4,
              "address": {
                "entity": {},
                "address": "bc1qttyevj0jys2j6fym4c4yudya9kym9gdhnekads",
                "labels": [],
                "tags": [],
                "address_label": [],
                "metadata": {}
              }
            }
          }
        ],
        "outputs": [
          {
            "coinbase": false,
            "ValueInDollar": 24158,
            "value": 0.4,
            "address": {
              "entity": {},
              "address": "bc1qq904ynep5mvwpjxdlyecgeupg22dm8am6cfvgq",
              "labels": [],
              "tags": [],
              "address_label": [],
              "metadata": {}
            }
          }
        ],
        "fee": 0.04,
        "label_tag": {
          "labels": [],
          "tags": []
        },
        "amount_transacted": 0.4,
        "status_code": 200
      }
    },
    "en_msg": "Successfully",
    "code": 200,
    "status": "OK",
    "fa_msg": "با موفقیت انجام شد"
  };
  // بررسی دقیق پارامترهای درخواست
  if (
    hash ===
    "38f6f5464e83eb65fc818b7164e5c88bd66c734f3ca7e39dbae9db80e69cea2a" &&
    network === "BTC"
  ) {
    return NextResponse.json(responseData1);
  }

  if (
    hash ===
    "0451a6d226a541eb6d78bde730ec6a988020b85dd86db8bbe3b59ce9ecee750e" &&
    network === "BTC"
  ) {
    return NextResponse.json(responseData2);
  }

  if (
    hash ===
    "468ec563365d5a94ad3b37a366ce898dc16e7c38bd2e0828c4e7c4acfabe000c" &&
    network === "BTC"
  ) {
    return NextResponse.json(responseData3);
  }

  if (
    hash ===
    "45y6f5464e83eb65fc818b3264e5c88bd66c734f3ca7e39dbae9db80e69cegag" &&
    network === "BTC"
  ) {
    return NextResponse.json(responseData4);
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
