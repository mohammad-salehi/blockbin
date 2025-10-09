/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Address (data, address, symbole, decimal) {

    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''
    const array = data.result

    let mainLabel = false
    let mainMetadata = false
    let mainEntity = false

    try {
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address.toUpperCase() === address.toUpperCase()) {

                const GetLabel = array[i].to.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].to.labels[0].label
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
                outputs.push(
                    {
                        address: array[i].to.address,
                        metadata: array[i].to.metadata,
                        addressEntity:array[i].to.entity,
                        addressLabel:array[i].to.labels.length !== 0 ? array[i].to.labels[0].label : false,
                        symbole,
                        value: Number(array[i].value),
                        ValueInDollar: Number(array[i].ValueInDollor !== undefined ? array[i].ValueInDollor : array[i].valueInDollar),
                        hash:array[i].hash,
                        entity:array[i].to.entity,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].time,
                        fee: Number(array[i].fee),
                        Label
                    }
                )
            } else if (array[i].to.address.toUpperCase() === address.toUpperCase()) {
                const GetLabel = array[i].from.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].from.labels[0].label
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
                inputs.push(
                    {
                        address: array[i].from.address,
                        metadata: array[i].from.metadata,
                        symbole,
                        addressEntity:array[i].from.entity,
                        addressLabel:array[i].from.labels.length !== 0 ? array[i].from.labels[0].label : false,
                        value: Number(array[i].value),
                        ValueInDollar: Number((array[i].ValueInDollor !== undefined ? array[i].ValueInDollor : array[i].valueInDollar)),
                        hash:array[i].hash,
                        entity:array[i].from.entity,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].time,
                        fee: Number(array[i].fee),
                        Label
                    }
                )
            }
        }
    } catch (error) {
        console.log(error)
        isError = true
        ErrorText = error
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
                inputs,
                outputs,
                Label:mainLabel,
                entity:mainEntity,
                metadata:mainMetadata
            }
        )
    }
}