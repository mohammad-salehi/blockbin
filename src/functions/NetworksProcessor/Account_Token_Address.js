/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Token_Address (data, address, symbole, decimal) {
    let isError = false
    let ErrorText = ''
    const array = data.result
    console.log('data')
    console.log(array)
    const logs = {
        inputs: [],
        outputs: []
    }

    let mainLabel = false
    let mainMetadata = false
    let mainEntity = false

    for (let i = 0; i < array.length; i++) {
            if (array[i].detail_from.address === address) {
                let Label = false
                const GetLabel = array[i].detail_to.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].detail_to.labels.label
                }
                if (!mainLabel) {
                    if (array[i].detail_from.labels.length !== 0) {
                        mainLabel = array[i].detail_from.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].detail_from.entity.name ? array[i].detail_from.entity : null
                }
                if (!mainMetadata) {
                    if (array[i].detail_from.metadata.label) {
                        mainMetadata = array[i].detail_from.metadata.label
                    }
                }
                logs.outputs.push(
                    {
                        address: array[i].detail_to.address,
                        addressEntity:array[i].detail_to.entity,
                        addressLabel:array[i].detail_to.labels.length !== 0 ? array[i].detail_to.labels[0].label : false,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:array[i].detail_to.entity.name? array[i].detail_to.entity : null,
                        blockNumber:0,
                        timestamp:array[i].time > 100000000000 ? array[i].time / 1000 : array[i].time,
                        fee: 0,
                        Label,
                        metadata:array[i].detail_to.metadata.label ?? null,
                        risk:array[i].detail_to.entity.riskscore ? array[i].detail_to.entity.riskscore * 100 : null
                    }
                )
                
            } else if (array[i].detail_to.address === address) {
                let Label = false
                const GetLabel = array[i].detail_from.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].detail_from.labels.label
                }
                if (!mainLabel) {
                    if (array[i].detail_to.labels.length !== 0) {
                        mainLabel = array[i].detail_to.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].detail_to.entity.name ? array[i].detail_to.entity : null
                }
                if (!mainMetadata) {
                    if (array[i].detail_to.metadata.label) {
                        mainMetadata = array[i].detail_to.metadata.label
                    }
                }
                logs.inputs.push(
                    {
                        address: array[i].detail_from.address,
                        addressEntity:array[i].detail_from.entity,
                        addressLabel:array[i].detail_from.labels.length !== 0 ? array[i].detail_from.labels[0].label : false,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:array[i].detail_from.entity.name ? array[i].detail_from.entity : null,
                        blockNumber:0,
                        timestamp:array[i].time > 100000000000 ? array[i].time / 1000 : array[i].time,
                        fee: 0,
                        Label,
                        metadata:array[i].detail_from.metadata.label ?? null,
                        risk:array[i].detail_from.entity.riskscore ? array[i].detail_from.entity.riskscore * 100 : null
                    }
                )
            }
    }

    if (isError) {
        return (
            {
                isError,
                ErrorText
            }
        )
    } else {
        return (
            {
                isError,
                address,
                symbole,
                logs,
                Label:mainLabel,
                entity:mainEntity,
                metadata:mainMetadata
            }
        )
    }
}