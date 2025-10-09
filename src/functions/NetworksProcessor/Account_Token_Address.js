/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Token_Address (data, address, symbole, decimal) {
    let isError = false
    let ErrorText = ''
    const array = data.result

    const logs = {
        inputs: [],
        outputs: []
    }

    let mainLabel = false
    let mainMetadata = false
    let mainEntity = false

    for (let i = 0; i < array.length; i++) {
            if (array[i].from.address === address) {
                let Label = false
                const GetLabel = array[i].to.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].to.labels.label
                }
                if (!mainLabel) {
                    if (array[i].from.labels.length !== 0) {
                        mainLabel = array[i].from.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].from.entity
                }
                if (!mainMetadata) {
                    if (array[i].from.metadata !== null) {
                        mainMetadata = array[i].from.metadata.label
                    }
                }
                logs.outputs.push(
                    {
                        address: array[i].to.address,
                        addressEntity:array[i].to.entity,
                        addressLabel:array[i].to.labels.length !== 0 ? array[i].to.labels[0].label : false,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:array[i].to.entity,
                        blockNumber:0,
                        timestamp:array[i].time > 100000000000 ? array[i].time / 1000 : array[i].time,
                        fee: 0,
                        Label
                    }
                )
                
            } else if (array[i].to.address === address) {
                let Label = false
                const GetLabel = array[i].from.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].from.labels.label
                }
                if (!mainLabel) {
                    if (array[i].to.labels.length !== 0) {
                        mainLabel = array[i].to.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].to.entity
                }
                if (!mainMetadata) {
                    if (array[i].to.metadata !== null) {
                        mainMetadata = array[i].to.metadata.label
                    }
                }
                logs.inputs.push(
                    {
                        address: array[i].from.address,
                        addressEntity:array[i].from.entity,
                        addressLabel:array[i].from.labels.length !== 0 ? array[i].from.labels[0].label : false,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:array[i].from.entity,
                        blockNumber:0,
                        timestamp:array[i].time > 100000000000 ? array[i].time / 1000 : array[i].time,
                        fee: 0,
                        Label
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