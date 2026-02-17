/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
export function UTXO_Address (address, data, symbole, decimal) {
    console.log('UTXO_Address')
    console.log(data)
    let isError = false
    let ErrorText = ''

    //labels
    let mainLabel = false

    //tags
    let maintag = false
    const mainEntity = data.entity
    const outputs = []
    const inputs = []

    try {
        for (let i = 0; i < data.result.length; i++) {
            //inputs
            if (data.result[i].addresstype === 'Received') {

                const Getlabel = data.result[i].labels_tags.labels
                let label = false
                if (Getlabel.length !== 0) {
                    label = Getlabel[0].label
                }

                const GetTag = data.result[i].labels_tags.tags
                let tag = false
                if (GetTag.length !== 0) {
                    tag = GetTag[0].tag
                }

                inputs.push(
                    {
                        blockNumber: data.result[i].blockNumber,
                        hash: data.result[i].hash,
                        fee: Number(data.result[i].fee),
                        value: Math.abs(data.result[i].amountTransferred),
                        timestamp: data.result[i].time,
                        ValueInDollar: data.result[i].ValueInDollor
                    }
                )

            //outputs
            } else if (data.result[i].addresstype === 'Sent') {

                const Getlabel = data.result[i].labels_tags.labels
                let label = false
                if (Getlabel.length !== 0) {
                    label = Getlabel[0].label
                }

                const GetTag = data.result[i].labels_tags.tags
                let tag = false
                if (GetTag.length !== 0) {
                    tag = GetTag[0].tag
                }

                outputs.push(
                    {
                        blockNumber: data.result[i].blockNumber,
                        hash: data.result[i].hash,
                        fee: Number(data.result[i].fee),
                        value: Math.abs(data.result[i].amountTransferred),
                        timestamp: data.result[i].time,
                        ValueInDollar: data.result[i].ValueInDollor
                    }
                )

            }
        }
    } catch (error) {
        isError = true
        ErrorText = error
    }

    return (
        {
            isError,
            address,
            symbole,
            inputs,
            outputs,
            label:mainLabel,
            tag:maintag,
            entity:mainEntity
        }
    )
}