import { Account_Address } from "./NetworksProcessor/Account_Address"
import { Account_Token_Address } from "./NetworksProcessor/Account_Token_Address"
import { Account_transaction } from "./NetworksProcessor/Account_transaction"
import { UTXO_Address } from "./NetworksProcessor/UTXO_Address"
import { UTXO_Transaction } from "./NetworksProcessor/UTXO_Transaction"
import { Networks } from "./Networks"

export function UTXOAdd(getData, symbol) {

    let data = []
    for (let i = 0; i < getData.inputs.length; i++) {

        let timeStamp = getData.inputs[i].timestamp
        let from = 'test'
        let to = getData.address
        let gasUsed = getData.inputs[i].fee
        let gasPrice = 1
        let value = Number(getData.inputs[i].value)
        let hash = getData.inputs[i].hash

        if (typeof (timeStamp) !== 'number') {
            throw new Error('timestamp Error')
        }

        if (typeof (from) !== 'string' && from !== null) {
            throw new Error('from Error')
        }

        if (typeof (to) !== 'string' && to !== null) {
            throw new Error('to Error')
        }

        if (typeof (value) !== 'number') {
            throw new Error('value Error')
        }

        if (typeof (hash) !== 'string') {
            throw new Error('hash Error')
        }

        data.push({
            timeStamp,
            from,
            to,
            gasUsed,
            gasPrice,
            value,
            hash,
            currencyType: `${symbol}`,
            Logo: `${symbol}.png`,
            image: `${symbol}.png`,
            Type: `coin`
        })
    }

    for (let i = 0; i < getData.outputs.length; i++) {

        let timeStamp = getData.outputs[i].timestamp
        let from = getData.address
        let to = 'test'
        let gasUsed = getData.outputs[i].fee
        let gasPrice = 1
        let value = Number(getData.outputs[i].value)
        let hash = getData.outputs[i].hash

        if (typeof (timeStamp) !== 'number') {
            throw new Error('timestamp Error')
        }

        if (typeof (from) !== 'string' && from !== null) {
            throw new Error('from Error')
        }

        if (typeof (to) !== 'string' && to !== null) {
            throw new Error('to Error')
        }

        if (typeof (value) !== 'number') {
            throw new Error('value Error')
        }

        if (typeof (hash) !== 'string') {
            throw new Error('hash Error')
        }

        data.push({
            timeStamp,
            from,
            to,
            gasUsed,
            gasPrice,
            value,
            hash,
            currencyType: `${symbol}`,
            Logo: `${symbol}.png`,
            image: `${symbol}.png`,
            Type: "coin"
        })
    }

    return data
}
export function AccountBaseAdd(getData, TokenData, symbol) {

    let data = []
    if (getData.inputs !== undefined) {
        for (let i = 0; i < getData.inputs.length; i++) {
            data.push({
                timeStamp: getData.inputs[i].timestamp,
                from: getData.inputs[i].address,
                to: getData.address,
                gasUsed: getData.inputs[i].fee,
                gasPrice: 1,
                value: (Number(getData.inputs[i].value)),
                hash: getData.inputs[i].hash,
                currencyType: `${symbol}`,
                Logo: `${symbol}.png`,
                Type: `coin`
            })
        }

        for (let i = 0; i < getData.outputs.length; i++) {
            data.push({
                timeStamp: getData.outputs[i].timestamp,
                from: getData.address,
                to: getData.outputs[i].address,
                gasUsed: getData.outputs[i].fee,
                gasPrice: 1,
                value: (Number(getData.outputs[i].value)),
                hash: getData.outputs[i].hash,
                currencyType: `${symbol}`,
                Logo: `${symbol}.png`,
                Type: "coin"
            })
        }
    }

    if (TokenData.logs !== undefined) {
        for (let i = 0; i < TokenData.logs.inputs.length; i++) {
            data.push({
                timeStamp: TokenData.logs.inputs[i].timestamp,
                from: TokenData.logs.inputs[i].address,
                to: TokenData.address,
                gasUsed: TokenData.logs.inputs[i].fee,
                gasPrice: 1,
                value: (Number(TokenData.logs.inputs[i].value)),
                hash: TokenData.logs.inputs[i].hash,
                currencyType: TokenData.logs.inputs[i].symbole,
                Logo: `${TokenData.logs.inputs[i].symbole}.png`,
                Type: "token"
            })
        }

        for (let i = 0; i < TokenData.logs.outputs.length; i++) {
            data.push({
                timeStamp: TokenData.logs.outputs[i].timestamp,
                from: TokenData.address,
                to: TokenData.logs.outputs[i].address,
                gasUsed: TokenData.logs.outputs[i].fee,
                gasPrice: 1,
                value: (Number(TokenData.logs.outputs[i].value)),
                hash: TokenData.logs.outputs[i].hash,
                currencyType: TokenData.logs.outputs[i].symbole,
                Logo: `${TokenData.logs.outputs[i].symbole}.png`,
                Type: "token"
            })
        }
    }

    return data
}



export function UTXOTr(data, symbol, name) {

    const CurrencyPrice = 28000
    const USDPrice = 490000
    const fee = data.fee
    const address = data.hash
    const blockNumber = data.block_number
    const image = `${symbol}.png`
    const BlockDate = data.time
    const symbole = symbol
    const color = '#f8a23a'
    let TotalOutput = 0
    let TotalInput = 0
    let BTCAmount = 0
    let TotalAmount = 0
    const inputData = []
    const outputData = []

    for (let i = 0; i < data.inputs.length; i++) {
        if (data.inputs[i].coin.address !== null) {
            TotalInput = TotalInput + data.inputs[i].coin.valueInDollar
            inputData.push({
                BTCAmount: data.inputs[i].coin.value,
                RiskScore: "0%",
                address: data.inputs[i].coin.address
            })
        } else {
            TotalInput = TotalInput + data.inputs[i].coin.valueInDollar
            inputData.push({
                BTCAmount: data.inputs[i].coin.value,
                RiskScore: "0%",
                address: 'coin base'
            })
        }
        BTCAmount = BTCAmount + data.inputs[i].coin.value
    }

    for (let i = 0; i < data.outputs.length; i++) {
        if (data.outputs[i].address !== null) {
            TotalOutput = TotalOutput + data.outputs[i].valueInDollar
            TotalAmount = TotalAmount + Number(data.outputs[i].value)
            outputData.push({
                BTCAmount: data.outputs[i].value,
                RiskScore: "0%",
                address: data.outputs[i].address

            })
        } else {
            TotalOutput = TotalOutput + data.outputs[i].valueInDollar
            TotalAmount = TotalAmount + Number(data.outputs[i].value)
            outputData.push({
                BTCAmount: data.outputs[i].value,
                RiskScore: "0%",
                address: 'coin base'
            })
        }
    }
    TotalAmount = Number(data.amountTransacted)

    const TotalOutput1 = TotalOutput * CurrencyPrice
    const TotalOutput2 = TotalOutput1 * USDPrice
    const TotalInput1 = TotalInput * CurrencyPrice
    const TotalInput2 = TotalInput1 * USDPrice
    const RiskScore = '0%'
    const isUTXOBase = true

    if (typeof (blockNumber) !== 'number') {
        throw new Error('blockNumber Error')
    }

    if (typeof (BlockDate) !== 'number') {
        throw new Error('BlockDate Error')
    }

    if (typeof (TotalOutput) !== 'number') {
        throw new Error('TotalOutput Error')
    }

    if (typeof (TotalInput) !== 'number') {
        throw new Error('TotalInput Error')
    }

    if (typeof (Number(fee)) !== 'number') {
        throw new Error('fee Error')
    }

    if (typeof (address) !== 'string' && address !== null) {
        throw new Error('address Error')
    }

    if (typeof (BTCAmount) !== 'number') {
        throw new Error('BTCAmount Error')
    }

    for (let i = 0; i < inputData.length; i++) {
        if (typeof (inputData[i].BTCAmount) !== 'number') {
            // throw new Error('InpDataBTCAmount Error')
        }
    }

    for (let i = 0; i < outputData.length; i++) {
        if (typeof (outputData[i].BTCAmount) !== 'number') {
            throw new Error('OutDataBTCAmount Error')
        }
    }

    return ({
        address,
        blockNumber,
        name,
        image,
        BlockDate,
        symbole,
        color,
        TotalOutput,
        TotalOutput1,
        TotalOutput2,
        TotalInput,
        TotalInput1,
        TotalInput2,
        RiskScore,
        BTCAmount,
        inputData,
        outputData,
        isUTXOBase,
        fee,
        TotalAmount
    })
}




export function AccountBaseTr(data, symbole, name) {
    const blockNumber = data.block_number
    const address = data.hash
    const BlockDate = data.time
    const image = `${symbole}.png`
    const color = '#627eea'
    const RiskScore = '0%'
    let TotalOutput = data.value_in_dollor
    let TotalInput = data.value_in_dollor
    const TotalAmount = data.value
    let fee = data.fee
    let transfers = []

    if (data.from !== null && data.to !== null) {
        transfers.push({
            from: data.detail_from,
            to: data.detail_to,
            currencyType: symbole,
            amount: data.value
        })
    } else if (data.from === null && data.to !== null) {
        transfers.push({
            from: 'coin base',
            to: data.detail_to,
            currencyType: symbole,
            amount: data.value
        })
    } else if (data.from !== null && data.to === null) {
        transfers.push({
            from: data.detail_from,
            to: 'coin base',
            currencyType: symbole,
            amount: data.value
        })
    } else {
        transfers.push({
            from: 'coin base',
            to: 'coin base',
            currencyType: symbole,
            amount: data.value
        })
    }

    for (let i = 0; i < data.logs.length; i++) {
        if (data.logs[i].symbol) {
            try {
                if (data.logs[i].fromAddress !== null && data.logs[i].toAddress !== null) {
                    transfers.push({
                        from: data.logs[i].fromAddress,
                        to: data.logs[i].toAddress,
                        currencyType: data.logs[i].symbol,
                        amount: data.logs[i].tokenValue
                    })
                } else if (data.logs[i].fromAddress === null && data.logs[i].toAddress !== null) {
                    transfers.push({
                        from: 'coin base',
                        to: data.logs[i].toAddress,
                        currencyType: data.logs[i].symbol,
                        amount: data.logs[i].tokenValue
                    })
                } else if (data.logs[i].fromAddress !== null && data.logs[i].toAddress === null) {
                    transfers.push({
                        from: data.logs[i].fromAddress,
                        to: 'coin base',
                        currencyType: data.logs[i].symbol,
                        amount: data.logs[i].tokenValue
                    })
                } else {
                    transfers.push({
                        from: 'coin base',
                        to: 'coin base',
                        currencyType: data.logs[i].symbol,
                        amount: data.logs[i].tokenValue
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return ({
        address,
        blockNumber,
        name,
        image,
        BlockDate,
        symbole,
        color,
        TotalOutput,
        TotalInput,
        RiskScore,
        transfers,
        fee,
        TotalAmount
    })
}

export function ExploreProcessor(hash, addressMode, tokens) {

    const processAccountAddress = (symbol, PersianName, decimal) => {
        try {
            const AccountAddress = addressMode !== null ? Account_Address(addressMode.data.data.result, hash, symbol, decimal) : []
            const AccountTokenAddress = tokens !== null ? Account_Token_Address(tokens.data.data, hash, symbol, decimal) : []
            return (AccountBaseAdd(AccountAddress, AccountTokenAddress, symbol))
        } catch (error) {
            console.log(error)
            return error
        }
    }
    const processAccountTransaction = (symbol, decimal, PersianName) => {
        try {
            return (AccountBaseTr(Account_transaction(addressMode.data.data.result, symbol, decimal), symbol, PersianName))
        } catch (error) {
            return error
        }
    }
    const processUtxoAddress = (symbol, PersianName, color, decimal) => {
        try {
            const getData = UTXO_Address(hash, addressMode.data.data.result, symbol, decimal)
            return (UTXOAdd(getData, symbol))
        } catch (error) {
            return error
        }
    }
    const processUtxoTransaction = (symbol, decimal, PersianName) => {
        try {
            const GetData = UTXO_Transaction(addressMode.data.data.result, symbol, decimal)
            return (UTXOTr(GetData, symbol, PersianName))
        } catch (error) {
            return err
        }
    }

    const recognizingNetwork = (addressMode) => {
        if (addressMode.data.data.query === 'transaction') {
            if (Networks.find(item => item.symbole === addressMode.data.data.network[0]).type === 'account') {
                return processAccountTransaction(addressMode.data.data.network[0], 1, Networks.find(item => item.symbole === addressMode.data.data.network[0]).name)
            } else {
                return processUtxoTransaction(addressMode.data.data.network[0], 1, Networks.find(item => item.symbole === addressMode.data.data.network[0]).name)
            }
        } else if (addressMode.data.data.query === 'address') {

            if (Networks.find(item => item.symbole === addressMode.data.data.network[0]).type === 'account') {
                return processAccountAddress(addressMode.data.data.network[0], 1, Networks.find(item => item.symbole === addressMode.data.data.network[0]).name)
            } else {
                return processUtxoAddress(addressMode.data.data.network[0], 1, Networks.find(item => item.symbole === addressMode.data.data.network[0]).name)
            }
        }
    }

    const BeReadyData = (array, address) => {
        const transactions = []
        for (let i = 0; i < array.length; i++) {

            //transactions data
            if ((array[i].from).toLowerCase() === (address).toLowerCase()) {
                transactions.push({
                    address: array[i].hash,
                    mode: false,
                    BTCAmount: Number(Number(array[i].value)),
                    Date: array[i].timeStamp,
                    Time: array[i].timeStamp,
                    currencyType: array[i].currencyType,
                    Logo: array[i].Logo,
                    Fee: Number(Number((array[i].gasPrice) * Number(array[i].gasUsed))).toFixed(5),
                    Type: array[i].Type
                })
            } else {
                transactions.push({
                    address: array[i].hash,
                    mode: true,
                    BTCAmount: Number(Number(array[i].value)),
                    Date: array[i].timeStamp,
                    Time: array[i].timeStamp,
                    currencyType: array[i].currencyType,
                    Logo: array[i].Logo,
                    Fee: Number(Number((array[i].gasPrice) * Number(array[i].gasUsed))).toFixed(5),
                    Type: array[i].Type
                })
            }
        }
        return transactions
    }

    const getData = addressMode !== null ? (recognizingNetwork(addressMode)) : (recognizingNetwork(tokens))
    return BeReadyData(getData, hash)
}