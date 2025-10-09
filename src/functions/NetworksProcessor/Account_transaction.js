/* eslint-disable no-unused-vars */
export function Account_transaction (array, symbole, decimal) {

    const hash = array.hash
    const blockNumber = array.blockNumber
    const timestamp = array.time
    const from = array.detail_from.address
    const to = array.detail_to.address
    const value = Number(array.value)
    const valueInDollar = Number(array.value_in_dollor)
    const fee = Number(array.fee) 
    const logs = []
    const FromEntity = array.detail_from.entity
    const FromMetadata = array.detail_from.metadata
    const ToEntity = array.detail_to.entity 
    const ToMetadata = array.detail_to.metadata

    const GetFromLabel = array.detail_from.labels
    let FromLabel = null
    if (GetFromLabel.length !== 0) {
        FromLabel = GetFromLabel[0].label
    }

    const GetToLabel = array.detail_to.labels
    let ToLabel = null
    if (GetToLabel.length !== 0) {
        ToLabel = GetToLabel[0].label
    }

    let MainLabel = null

    for (let i = 0; i < array.logs.length; i++) {
        try {
            if (typeof (array.logs[i].contractAddress) === 'string') {
                logs.push({
                    symbole: array.logs[i].symbol,
                    contractAddress: array.logs[i].contractAddress,
                    value: Number(array.logs[i].tokenValue),
                    from: array.logs[i].from.address, 
                    to: array.logs[i].to.address,
                    ToEntity:array.logs[i].to.entity,
                    FromEntity:array.logs[i].from.entity,
                    ToLabel:array.logs[i].to.labels.length !== 0 ? array.logs[i].to.labels[0].label : null,
                    FromLabel:array.logs[i].from.labels.length !== 0 ? array.logs[i].from.labels[0].label : null,
                    FromMetadata: array.logs[i].from.metadata !== null ? array.logs[i].from.metadata.label : false,
                    ToMetadata: array.logs[i].to.metadata !== null ? array.logs[i].to.metadata.label : false,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        {
            hash,
            blockNumber,
            timestamp,
            from,
            to,
            symbole,
            value,
            valueInDollar,
            fee,
            logs,
            FromLabel,
            ToLabel,
            MainLabel,
            FromEntity,
            ToEntity,
            FromMetadata,
            ToMetadata
        }
    )
}