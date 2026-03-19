import { NextResponse } from "next/server";

export async function GET() {
  const responseData = {
    "data": {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
        {
          "value": {
            "Data": [
              {
                "x": 0,
                "y": 800,
                "id": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                "main": true,
                "risk": 60,
                "text": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                "type": "address",
                "label": "آدرس اصلی",
                "entity": {
                  "id": "85c97727-6830-498d-ad16-16b5e58d9567",
                  "name": "Kucoin",
                  "image": null,
                  "country": "Seychelles,Singapore,",
                  "category": {
                    "id": "fee3b858-66f9-4511-aba1-6086e528e97b",
                    "name": "exchange_unlicensed",
                    "persian_name": "صرافی غیرمجاز"
                  },
                  "metadata": {
                    "name": "@Kurisawacoin",
                    "note": "",
                    "type": "individual",
                    "grade": 0,
                    "image": "http://product.blockbin.ir/media/entitylibrary/KuCoin.png",
                    "licence": null,
                    "service": null,
                    "twitter": "https://twitter.com/Kurisawacoin",
                    "website": "https://kucoin.com",
                    "currency": [
                      1,
                      2,
                      3,
                      4,
                      5,
                      7,
                      9,
                      10,
                      11,
                      12
                    ],
                    "linkedin": "https://www.linkedin.com/company/kucoin/",
                    "web_site": null,
                    "addresses": null,
                    "countries": [
                      198,
                      200
                    ],
                    "is_active": false,
                    "crunchbase": "https://www.crunchbase.com/organization/kucoin",
                    "is_deleted": false,
                    "legal_name": null,
                    "fiat_support": true,
                    "private_coin": null,
                    "establishment": null,
                    "mapping_checked": true,
                    "supervisory_body": null,
                    "is_in_sanction_list": false,
                    "registration_number": null
                  },
                  "riskscore": 0.6,
                  "is_iranian": false,
                  "persian_name": null
                },
                "inputs": [
                  {
                    "id": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                    "text": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                    "time": 1695826578,
                    "color": false,
                    "value": 499,
                    "symbol": "USDD",
                    "DollarValue": 497.69131915033375
                  }
                ],
                "outputs": [
                  {
                    "id": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                    "text": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                    "time": 1695829842,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 498.6886965434206
                  }
                ],
                "metadata": "Deposit"
              },
              {
                "x": 300,
                "y": 800,
                "id": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                "main": false,
                "risk": null,
                "text": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                    "text": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                    "time": 1695826578,
                    "color": false,
                    "value": 499,
                    "symbol": "USDD",
                    "DollarValue": 497.69131915033375
                  }
                ],
                "metadata": null
              },
              {
                "x": 600,
                "y": 800,
                "id": "TDkGt3s7HGdv5zHkcfinYiBMNNrFnNkeyW",
                "main": false,
                "risk": null,
                "text": "TDkGt3s7HGdv5zHkcfinYiBMNNrFnNkeyW",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                    "text": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d",
                    "time": 1695826578,
                    "color": false,
                    "value": 499,
                    "symbol": "USDD",
                    "DollarValue": 497.69131915033375
                  }
                ],
                "metadata": null
              },
              {
                "x": -300,
                "y": 800,
                "id": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                "main": false,
                "risk": null,
                "text": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                    "text": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
                    "time": 1695829842,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 498.6886965434206
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -600,
                "y": 800,
                "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                "main": false,
                "risk": 60,
                "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": {
                  "id": "85c97727-6830-498d-ad16-16b5e58d9567",
                  "name": "Kucoin",
                  "image": null,
                  "country": "Seychelles,Singapore,",
                  "category": {
                    "id": "fee3b858-66f9-4511-aba1-6086e528e97b",
                    "name": "exchange_unlicensed",
                    "persian_name": "صرافی غیرمجاز"
                  },
                  "metadata": {
                    "name": "@Kurisawacoin",
                    "note": "",
                    "type": "individual",
                    "grade": 0,
                    "image": "http://product.blockbin.ir/media/entitylibrary/KuCoin.png",
                    "licence": null,
                    "service": null,
                    "twitter": "https://twitter.com/Kurisawacoin",
                    "website": "https://kucoin.com",
                    "currency": [
                      1,
                      2,
                      3,
                      4,
                      5,
                      7,
                      9,
                      10,
                      11,
                      12
                    ],
                    "linkedin": "https://www.linkedin.com/company/kucoin/",
                    "web_site": null,
                    "addresses": null,
                    "countries": [
                      198,
                      200
                    ],
                    "is_active": false,
                    "crunchbase": "https://www.crunchbase.com/organization/kucoin",
                    "is_deleted": false,
                    "legal_name": null,
                    "fiat_support": true,
                    "private_coin": null,
                    "establishment": null,
                    "mapping_checked": true,
                    "supervisory_body": null,
                    "is_in_sanction_list": false,
                    "registration_number": null
                  },
                  "riskscore": 0.6,
                  "is_iranian": false,
                  "persian_name": null
                },
                "inputs": [
                  {
                    "id": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                    "text": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1",
                    "time": 1695829842,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 498.6886965434206
                  },
                  {
                    "id": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                    "text": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                    "time": 1671591975,
                    "color": false,
                    "value": 32,
                    "symbol": "USDD",
                    "DollarValue": 31.403417001159095
                  },
                  {
                    "id": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                    "text": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                    "time": 1671608796,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 923.4567311903346
                  },
                  {
                    "id": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                    "text": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                    "time": 1671606414,
                    "color": false,
                    "value": 23.73,
                    "symbol": "USDD",
                    "DollarValue": 23.287596419922043
                  },
                  {
                    "id": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                    "text": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                    "time": 1671601563,
                    "color": false,
                    "value": 498.2499,
                    "symbol": "USDD",
                    "DollarValue": 488.9609181401819
                  },
                  {
                    "id": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                    "text": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                    "time": 1674073605,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                    "text": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                    "time": 1671608892,
                    "color": false,
                    "value": 496.640935,
                    "symbol": "USDD",
                    "DollarValue": 487.3819494265797
                  },
                  {
                    "id": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                    "text": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                    "time": 1671608712,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  },
                  {
                    "id": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                    "text": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                    "time": 1671606342,
                    "color": false,
                    "value": 469.8983,
                    "symbol": "USDD",
                    "DollarValue": 461.13788321986743
                  },
                  {
                    "id": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                    "text": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                    "time": 1671603882,
                    "color": false,
                    "value": 60.526,
                    "symbol": "USDD",
                    "DollarValue": 59.39760054412986
                  },
                  {
                    "id": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                    "text": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                    "time": 1671596532,
                    "color": false,
                    "value": 993.000004,
                    "symbol": "USDD",
                    "DollarValue": 974.4872877426453
                  },
                  {
                    "id": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                    "text": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                    "time": 1671596253,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  }
                ],
                "metadata": "Hot Wallet"
              },
              {
                "x": -300,
                "y": 700,
                "id": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                "main": false,
                "risk": null,
                "text": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671591975,
                    "color": false,
                    "value": 32,
                    "symbol": "USDD",
                    "DollarValue": 31.403417001159095
                  }
                ],
                "metadata": null
              },
              {
                "x": 0,
                "y": 700,
                "id": "TAxJJ566WNGWhkYaPWM86VZknnbyQFYB14",
                "main": false,
                "risk": null,
                "text": "TAxJJ566WNGWhkYaPWM86VZknnbyQFYB14",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                    "text": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d",
                    "time": 1671591975,
                    "color": false,
                    "value": 32,
                    "symbol": "USDD",
                    "DollarValue": 31.403417001159095
                  }
                ],
                "metadata": null
              },
              {
                "x": -900,
                "y": 800,
                "id": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                "main": false,
                "risk": null,
                "text": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671608892,
                    "color": false,
                    "value": 496.640935,
                    "symbol": "USDD",
                    "DollarValue": 487.3819494265797
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -1200,
                "y": 800,
                "id": "TK4gHLG5LN2JAjGce6WhJjrnDEFGDEk4WH",
                "main": false,
                "risk": null,
                "text": "TK4gHLG5LN2JAjGce6WhJjrnDEFGDEk4WH",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                    "text": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85",
                    "time": 1671608892,
                    "color": false,
                    "value": 496.640935,
                    "symbol": "USDD",
                    "DollarValue": 487.3819494265797
                  },
                  {
                    "id": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                    "text": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                    "time": 1671608712,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -900,
                "y": 700,
                "id": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                "main": false,
                "risk": null,
                "text": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671608712,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -900,
                "y": 600,
                "id": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                "main": false,
                "risk": null,
                "text": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671606342,
                    "color": false,
                    "value": 469.8983,
                    "symbol": "USDD",
                    "DollarValue": 461.13788321986743
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -1200,
                "y": 700,
                "id": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                "main": false,
                "risk": null,
                "text": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                    "text": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0",
                    "time": 1671606342,
                    "color": false,
                    "value": 469.8983,
                    "symbol": "USDD",
                    "DollarValue": 461.13788321986743
                  }
                ],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                    "text": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                    "time": 1673681892,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 924.2803452493225
                  },
                  {
                    "id": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                    "text": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                    "time": 1674072960,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "metadata": null
              },
              {
                "x": -900,
                "y": 500,
                "id": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                "main": false,
                "risk": null,
                "text": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671603882,
                    "color": false,
                    "value": 60.526,
                    "symbol": "USDD",
                    "DollarValue": 59.39760054412986
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -1200,
                "y": 600,
                "id": "TW7M9GLj8NJ9LmgEiws5efi4ps2qBnvNba",
                "main": false,
                "risk": null,
                "text": "TW7M9GLj8NJ9LmgEiws5efi4ps2qBnvNba",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                    "text": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382",
                    "time": 1671603882,
                    "color": false,
                    "value": 60.526,
                    "symbol": "USDD",
                    "DollarValue": 59.39760054412986
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -900,
                "y": 400,
                "id": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                "main": false,
                "risk": null,
                "text": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671596532,
                    "color": false,
                    "value": 993.000004,
                    "symbol": "USDD",
                    "DollarValue": 974.4872877426453
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -1200,
                "y": 500,
                "id": "TDJ9QeshPE2CNyGZMyzrraZY6GpbdjhXFg",
                "main": false,
                "risk": null,
                "text": "TDJ9QeshPE2CNyGZMyzrraZY6GpbdjhXFg",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                    "text": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7",
                    "time": 1671596532,
                    "color": false,
                    "value": 993.000004,
                    "symbol": "USDD",
                    "DollarValue": 974.4872877426453
                  },
                  {
                    "id": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                    "text": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                    "time": 1671596253,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -900,
                "y": 300,
                "id": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                "main": false,
                "risk": null,
                "text": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671596253,
                    "color": false,
                    "value": 5,
                    "symbol": "USDD",
                    "DollarValue": 4.906783906431109
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -300,
                "y": 600,
                "id": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                "main": false,
                "risk": null,
                "text": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671608796,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 923.4567311903346
                  }
                ],
                "metadata": null
              },
              {
                "x": 0,
                "y": 600,
                "id": "TCid24uGZiqnuu3nMezCFLwiMfwZZnZCMh",
                "main": false,
                "risk": null,
                "text": "TCid24uGZiqnuu3nMezCFLwiMfwZZnZCMh",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                    "text": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57",
                    "time": 1671608796,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 923.4567311903346
                  }
                ],
                "metadata": null
              },
              {
                "x": -300,
                "y": 500,
                "id": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                "main": false,
                "risk": null,
                "text": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671606414,
                    "color": false,
                    "value": 23.73,
                    "symbol": "USDD",
                    "DollarValue": 23.287596419922043
                  }
                ],
                "metadata": null
              },
              {
                "x": 0,
                "y": 500,
                "id": "TUohQKaeSEegqnXYMgqb1ncxDmwq9yWqUa",
                "main": false,
                "risk": null,
                "text": "TUohQKaeSEegqnXYMgqb1ncxDmwq9yWqUa",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                    "text": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f",
                    "time": 1671606414,
                    "color": false,
                    "value": 23.73,
                    "symbol": "USDD",
                    "DollarValue": 23.287596419922043
                  }
                ],
                "metadata": null
              },
              {
                "x": -300,
                "y": 400,
                "id": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                "main": false,
                "risk": null,
                "text": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "text": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9",
                    "time": 1671601563,
                    "color": false,
                    "value": 498.2499,
                    "symbol": "USDD",
                    "DollarValue": 488.9609181401819
                  }
                ],
                "metadata": null
              },
              {
                "x": 0,
                "y": 400,
                "id": "TEhUYXuvgUHYUwtgiWNLCE7oaLWe1jTAhn",
                "main": false,
                "risk": null,
                "text": "TEhUYXuvgUHYUwtgiWNLCE7oaLWe1jTAhn",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                    "text": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c",
                    "time": 1671601563,
                    "color": false,
                    "value": 498.2499,
                    "symbol": "USDD",
                    "DollarValue": 488.9609181401819
                  }
                ],
                "metadata": null
              },
              {
                "x": -1500,
                "y": 700,
                "id": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                "main": false,
                "risk": null,
                "text": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                    "text": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                    "time": 1673681892,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 924.2803452493225
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -1800,
                "y": 700,
                "id": "TY7hRXyjAQ9T5dPggBnD93bzBuMegPLHxn",
                "main": false,
                "risk": null,
                "text": "TY7hRXyjAQ9T5dPggBnD93bzBuMegPLHxn",
                "type": "address",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                    "text": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700",
                    "time": 1673681892,
                    "color": false,
                    "value": 941,
                    "symbol": "USDD",
                    "DollarValue": 924.2803452493225
                  },
                  {
                    "id": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                    "text": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                    "time": 1674072960,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "network": "TRX",
                "outputs": [
                  {
                    "id": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                    "text": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                    "time": 1674073605,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "metadata": null
              },
              {
                "x": -1500,
                "y": 600,
                "id": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                "main": false,
                "risk": null,
                "text": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                    "text": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe",
                    "time": 1674072960,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              },
              {
                "x": -2100,
                "y": 700,
                "id": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                "main": false,
                "risk": null,
                "text": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645",
                "type": "transaction",
                "label": null,
                "token": "USDD",
                "entity": null,
                "inputs": [
                  {
                    "id": "TY7hRXyjAQ9T5dPggBnD93bzBuMegPLHxn",
                    "text": "TY7hRXyjAQ9T5dPggBnD93bzBuMegPLHxn",
                    "time": 1674073605,
                    "color": false,
                    "value": 500,
                    "symbol": "USDD",
                    "DollarValue": 487.59590645510747
                  }
                ],
                "network": "TRX",
                "outputs": [],
                "metadata": null
              }
            ],
            "hash": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG",
            "Scale": 0.7513148009015781,
            "token": "USDD",
            "network": "TRX",
            "GraphName": "تست",
            "XPosition": -605.0334000000001,
            "YPosition": 798.03053095,
            "PaintedEdges": [],
            "NodesPosition": [
              {
                "x": 0,
                "y": 800,
                "id": "TAngDVCCBBs5Z2v42N9KzvcGfdRhnaXrrG"
              },
              {
                "x": 300,
                "y": 800,
                "id": "60cd3768098f10335f6001d8ad827f71e88d744d5ea51eafc64d86d6b091ca3d"
              },
              {
                "x": 600,
                "y": 800,
                "id": "TDkGt3s7HGdv5zHkcfinYiBMNNrFnNkeyW"
              },
              {
                "x": -300,
                "y": 800,
                "id": "2016d503421c52f04eb666f84be91b3da0a3f9813ad4532eebefaa96b0f386e1"
              },
              {
                "x": -600,
                "y": 800,
                "id": "TUpHuDkiCCmwaTZBHZvQdwWzGNm5t8J2b9"
              },
              {
                "x": -300,
                "y": 700,
                "id": "3f4a52cdf9adc87de9bd18c5af47c938248e0518ee7750a72b7f4277cd1f994d"
              },
              {
                "x": 0,
                "y": 700,
                "id": "TAxJJ566WNGWhkYaPWM86VZknnbyQFYB14"
              },
              {
                "x": -900,
                "y": 800,
                "id": "f7d6a6ece954337f581d35f85fa5bf49ce9b35abc57df5b4a7ec868db3c35d85"
              },
              {
                "x": -1200,
                "y": 800,
                "id": "TK4gHLG5LN2JAjGce6WhJjrnDEFGDEk4WH"
              },
              {
                "x": -900,
                "y": 700,
                "id": "b7b061f36460825a6554bf505750c5b87a5b6ab57b749285eb24f715f9829c0c"
              },
              {
                "x": -900,
                "y": 600,
                "id": "24d0053c156146e48d07e2c087897c2a363050828acbb313be263632eecac2e0"
              },
              {
                "x": -1200,
                "y": 700,
                "id": "TRuVDEeoDsadsTwshgvf2Dpv1UJWBC6ABe"
              },
              {
                "x": -900,
                "y": 500,
                "id": "1da2921f2dc69afe5b432e78845e3f7d085a26f4d3ce5f31d82d977d907a7382"
              },
              {
                "x": -1200,
                "y": 600,
                "id": "TW7M9GLj8NJ9LmgEiws5efi4ps2qBnvNba"
              },
              {
                "x": -900,
                "y": 400,
                "id": "2b5e8767ddd45418b031b7163892250ad9950f17e719c4b7d3889b20b27ad7f7"
              },
              {
                "x": -1200,
                "y": 500,
                "id": "TDJ9QeshPE2CNyGZMyzrraZY6GpbdjhXFg"
              },
              {
                "x": -900,
                "y": 300,
                "id": "1f9238fa2f7c0bc18f5582d4709ad44941b041379e0886111eb370e7d47b0524"
              },
              {
                "x": -300,
                "y": 600,
                "id": "179456dc4c97989a9c3c4efe6a0bb00b887973563bb430e8b34100406c339b57"
              },
              {
                "x": 0,
                "y": 600,
                "id": "TCid24uGZiqnuu3nMezCFLwiMfwZZnZCMh"
              },
              {
                "x": -300,
                "y": 500,
                "id": "f54922da152083e538f6b58765eb7e33ad3121dee524be8803c0c42d7899b06f"
              },
              {
                "x": 0,
                "y": 500,
                "id": "TUohQKaeSEegqnXYMgqb1ncxDmwq9yWqUa"
              },
              {
                "x": -300,
                "y": 400,
                "id": "589fa453c7cc6829dfe14ebc6cab8a0da04aeba3e2379c1e68b6c9d2c742177c"
              },
              {
                "x": 0,
                "y": 400,
                "id": "TEhUYXuvgUHYUwtgiWNLCE7oaLWe1jTAhn"
              },
              {
                "x": -1500,
                "y": 700,
                "id": "2509866572662fd25c5f64a6f938e96ec0b086bf77eccea0974c0e2f2c8d0700"
              },
              {
                "x": -1800,
                "y": 700,
                "id": "TY7hRXyjAQ9T5dPggBnD93bzBuMegPLHxn"
              },
              {
                "x": -1500,
                "y": 600,
                "id": "4c552aadc1a4c67d93d9aac2f3270fc4847167a31a04ae8d4e46d70341480731"
              },
              {
                "x": -2100,
                "y": 700,
                "id": "c33b948cb3a7b234cb0d663be8540e4ff1669cc5bbb0bbee532ca051b4d1e645"
              }
            ],
            "SavedPositions": [],
            "contractAddress": "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
            "GraphDescription": ""
          },
          "title": "تست",
          "id": "ac5b90d7-73b8-4633-8f75-c8462c4687b5",
          "is_active": true,
          "created_at": "2026-02-24T10:48:10.263734Z",
          "updated_at": "2026-02-24T10:48:10.263877Z",
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
  };

  return NextResponse.json(responseData);
}