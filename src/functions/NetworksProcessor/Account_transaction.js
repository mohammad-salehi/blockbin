/* eslint-disable no-unused-vars */
export function Account_transaction (array, symbole, decimal) {

    console.log('array')
    console.log(array)
    const hash = array.hash
    const blockNumber = array.blockNumber? array.blockNumber : array.block_number
    const timestamp = array.time
    const from = array.detail_from.address
    const to = array.detail_to.address
    const value = Number(array.value)
    const valueInDollar = Number(array.value_in_dollor)
    const fee = Number(array.fee) 
    const logs = []
    const FromEntity = array.detail_from.entity.name ? array.detail_from.entity : null
    const FromRisk = array.detail_from.entity.name ? array.detail_from.entity.riskscore : null
    const FromMetadata = array.detail_from.metadata
    const ToRisk = array.detail_to.entity.name ? array.detail_to.entity.riskscore : null
    const ToEntity = array.detail_to.entity.name ? array.detail_to.entity : null
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
                    from: array.logs[i].fromAddress.address, 
                    to: array.logs[i].toAddress.address,
                    ToEntity:array.logs[i].toAddress.entity.name ? array.logs[i].toAddress.entity : null,
                    FromEntity:array.logs[i].fromAddress.entity.name ? array.logs[i].fromAddress.entity : null,
                    ToLabel:array.logs[i].toAddress.labels.length !== 0 ? array.logs[i].toAddress.labels[0].label : null,
                    FromLabel:array.logs[i].fromAddress.labels.length !== 0 ? array.logs[i].fromAddress.labels[0].label : null,
                    FromMetadata: array.logs[i].fromAddress.metadata !== null ? array.logs[i].fromAddress.metadata.label : false,
                    ToMetadata: array.logs[i].toAddress.metadata !== null ? array.logs[i].toAddress.metadata.label : false,
                    ToRisk:array.logs[i].toAddress.entity.name ? array.logs[i].toAddress.entity.riskscore : null,
                    FromRisk:array.logs[i].fromAddress.entity.name ? array.logs[i].fromAddress.entity.riskscore : null,
                    ToMetadata:array.logs[i].toAddress.metadata.label ? array.logs[i].toAddress.metadata.label : null,
                    FromMetadata:array.logs[i].fromAddress.metadata.label ? array.logs[i].fromAddress.metadata.label : null,
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
            ToMetadata,
            FromRisk,
            ToRisk
        }
    )
}