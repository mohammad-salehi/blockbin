export const Ton_Address = (data, address, symbole, decimal) => {

    const outputs = [];
    const inputs = [];
    const outAndIN = { outputs: outputs, inputs: inputs, isError: false, address, symbole, Label: false, entity: false }

    try {
        data.events.forEach(event => {
            event.actions.forEach(action => {
                const senderAddress = action?.[action.type]?.sender?.address;
                const recipientAddress = action?.[action.type]?.recipient?.address;
                const accountAddress = event.account.address;
                const simplePreviewValue = action?.simple_preview?.value || "";
                const numericValue = simplePreviewValue.split(" ")[0];
                
                if (action.type === 'TonTransfer') {
                    symbole = 'TON'
                } else if (action.type === 'JettonTransfer') {
                    symbole = action.JettonTransfer?.jetton?.symbol
                }

                // console.log(symbole)

                // بررسی اینکه account.address با sender.address یکی باشد
                if (accountAddress === senderAddress) {
                    // بررسی نوع اکشن و اضافه کردن آدرس به خروجی
                    if (action.type === "TonTransfer" || action.type === "JettonTransfer") {
                        // console.log('Output')
                        outputs.push({
                            address: recipientAddress,
                            addressEntity: '',
                            addressLabel: '',
                            symbole,
                            value: Number(numericValue),
                            ValueInDollar: 0,
                            hash: event.event_id,
                            entity: '',
                            blockNumber: 0,
                            timestamp: event.timestamp,
                            fee: 0,
                        });
                    }
                } else {
                    if (action.type === "TonTransfer" || action.type === "JettonTransfer") {
                        // console.log('input')
                        inputs.push({
                            address: senderAddress,
                            addressEntity: '',
                            addressLabel: '',
                            symbole,
                            value: Number(numericValue),
                            ValueInDollar: 0,
                            hash: event.event_id,
                            entity: '',
                            blockNumber: 0,
                            timestamp: event.timestamp,
                            fee: 0,
                        });
                    }
                }
            });
        });
        return outAndIN;
    } catch (err) {
        // console.log(error)
    }



}

