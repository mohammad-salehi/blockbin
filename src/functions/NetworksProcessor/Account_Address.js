/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Address (data, address, symbole, decimal) {
    
    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''
    const array = data

    let mainLabel = false
    let mainMetadata = false
    let mainEntity = false


    try {
        for (let i = 0; i < array.length; i++) {
            if (array[i].detail_from.address.toUpperCase() === address.toUpperCase()) {

                const GetLabel = array[i].detail_to.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].detail_to.labels[0].label
                }
                if (!mainLabel) {
                    if (array[i].detail_from.labels.length !== 0) {
                        mainLabel = array[i].detail_from.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].detail_from.entity
                }
                if (!mainMetadata) {
                    if (array[i].detail_from.metadata !== null) {
                        mainMetadata = array[i].detail_from.metadata.label
                    }
                }
                outputs.push(
                    {
                        address: array[i].detail_to.address,
                        metadata: array[i].detail_to.metadata.label,
                        addressEntity:array[i].detail_to.entity,
                        addressLabel:array[i].detail_to.labels.length !== 0 ? array[i].detail_to.labels[0].label : false,
                        symbole,
                        value: Number(array[i].value),
                        ValueInDollar: Number(array[i].ValueInDollor !== undefined ? array[i].ValueInDollor : array[i].valueInDollar),
                        hash:array[i].hash,
                        entity:array[i].detail_to.entity.name? array[i].detail_to.entity : null,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].time,
                        fee: Number(array[i].fee),
                        Label
                    }
                )
            } else if (array[i].detail_to.address.toUpperCase() === address.toUpperCase()) {
                const GetLabel = array[i].detail_from.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].detail_from.labels[0].label
                }
                if (!mainLabel) {
                    if (array[i].detail_to.labels.length !== 0) {
                        mainLabel = array[i].detail_to.labels[0].label
                    }
                }
                if (!mainEntity) {
                    mainEntity = array[i].detail_to.entity
                }
                if (!mainMetadata) {
                    if (array[i].detail_to.metadata !== null) {
                        mainMetadata = array[i].detail_to.metadata.label
                    }
                }
                inputs.push(
                    {
                        address: array[i].detail_from.address,
                        metadata: array[i].detail_from.metadata,
                        symbole,
                        addressEntity:array[i].detail_from.entity,
                        addressLabel:array[i].detail_from.labels.length !== 0 ? array[i].detail_from.labels[0].label : false,
                        value: Number(array[i].value),
                        ValueInDollar: Number((array[i].ValueInDollor !== undefined ? array[i].ValueInDollor : array[i].valueInDollar)),
                        hash:array[i].hash,
                        entity:array[i].detail_from.entity.name ? array[i].detail_from.entity : null,
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