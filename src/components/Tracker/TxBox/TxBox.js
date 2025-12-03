import React, { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination/Pagination';
import { Networks } from '@/functions/Networks';
import { MiladiCalendar } from '@/functions/miladiCalendar';
import { formatSmallNumber } from '@/functions/formatSmallNumber';
import Switch from "@mui/material/Switch";
import { useParams } from 'next/navigation'
import { serverAddress } from '@/functions/ServerAddress';
import { GetRequest } from '@/functions/GetRequest';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';
import CircularProgress from '@mui/material/CircularProgress';
import { Account_transaction } from '@/functions/NetworksProcessor/Account_transaction';
import { UTXO_Transaction } from '@/functions/NetworksProcessor/UTXO_Transaction';
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable';
import ExploreTopBoxLoading from '@/components/ExploreTopBoxLoading/ExploreTopBoxLoading';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';

const TxBox = ({ Data, SetData, AddressSelectedData, Reload, SetReload }) => {
    const params = useParams();
    const { network, hash } = params;
    const rest = Array.isArray(params.rest) ? params.rest : [];
    const token = rest[0];
    const contractAddress = rest[1];
    const id = rest[2];

    const [ShowUSD, setShowUSD] = useState(false);
    const [ShowAddress, setShowAddress] = useState(false);
    const [InputLoading, setInputLoading] = useState(false);
    const [OutputLoading, setOutputLoading] = useState(false);
    const [InputFirst, setInputFirst] = useState(1);
    const [OutputFirst, setOutputFirst] = useState(1);
    const [InputTrNumber, SetInputTrNumber] = useState(0);
    const [OutputTrNumber, SetOutputTrNumber] = useState(0);
    const [CanAdd, setCanAdd] = useState(true);

    //activity values
    const [Fee, SetFee] = useState(0)
    const [blockNumber, SetblockNumber] = useState(0)
    const [BlockDate, SetBlockDate] = useState(0)
    const [Value, SetValue] = useState(0)

    const [InputsData, SetInputsData] = useState([])
    const [OutputsData, SetOutputsData] = useState([])

    //
    const [ActivityLoading, SetActivityLoading] = useState(false)

    const AccountBaseTr = (data, symbole) => {

        const blockNumber = data.blockNumber
        const address = data.hash
        const BlockDate = data.timestamp
        let TotalOutput = 0
        let TotalInput = 0
        let fee = data.fee
        let value = 0

        let inputAddresses = []
        let outputAddresses = []

        if (network.toUpperCase() !== token.toUpperCase()) {
            for (let i = 0; i < data.logs.length; i++) {
                try {
                    if (typeof (data.logs[i].from) === 'string' || typeof (data.logs[i].value) === 'number' || typeof (data.logs[i].symbole) === 'string') {
                        inputAddresses.push(
                            {
                                address: data.logs[i].from,
                                value: data.logs[i].value,
                                Label: data.logs[i].FromLabel ? data.logs[i].FromLabel : null,
                                entity: data.logs[i].FromEntity !== null ? data.logs[i].FromEntity : null,
                                symbole: data.logs[i].symbole !== undefined ? data.logs[i].symbole : data.logs[i].contractAddress.toUpperCase() === contractAddress.toUpperCase() ? token : null,
                                contractAddress: data.logs[i].contractAddress,
                                show: Data[Data.findIndex(item => item.id === data.logs[i].from)] !== undefined ? Data[Data.findIndex(item => item.id === data.logs[i].from)].outputs.some(item => item.id === AddressSelectedData.id) : false,
                                valueInDollar: data.logs[i].valueInDollar,
                                loading: false
                            }
                        )
                    }
                } catch (error) { console.log(error) }

                try {
                    if (typeof (data.logs[i].to) === 'string' || typeof (data.logs[i].value) === 'number' || typeof (data.logs[i].symbole) === 'string') {
                        outputAddresses.push(
                            {
                                address: data.logs[i].to,
                                value: data.logs[i].value,
                                Label: data.logs[i].ToLabel ? data.logs[i].ToLabel : null,
                                entity: data.logs[i].ToEntity !== null ? data.logs[i].ToEntity : null,
                                symbole: data.logs[i].symbole !== undefined ? data.logs[i].symbole : data.logs[i].contractAddress.toUpperCase() === contractAddress.toUpperCase() ? token : null,
                                contractAddress: data.logs[i].contractAddress,
                                show: Data[Data.findIndex(item => item.id === data.logs[i].to)] !== undefined ? Data[Data.findIndex(item => item.id === data.logs[i].to)].inputs.some(item => item.id === AddressSelectedData.id) : false,
                                valueInDollar: data.logs[i].valueInDollar,
                                loading: false
                            }
                        )
                    }
                } catch (error) { console.log(error) }
            }


        } else {
            if (inputAddresses.some(item => item.address === data.from) === false) {
                try {
                    if (typeof (data.from) === 'string' || typeof (data.value) === 'number' || typeof (data.valueInDollar) === 'number' || typeof (data.symbole) === 'string') {
                        inputAddresses.push(
                            {
                                address: data.from,
                                value: data.value,
                                Label: data.FromLabel ? data.FromLabel : null,
                                entity: data.FromEntity !== null ? data.FromEntity : null,
                                symbole: data.symbole,
                                show: Data[Data.findIndex(item => item.id === data.from)] !== undefined ? Data[Data.findIndex(item => item.id === data.from)].outputs.some(item => item.id === AddressSelectedData.id) : false,
                                valueInDollar: data.valueInDollar,
                                loading: false
                            }
                        )
                    }
                } catch (error) { }
            }

            if (outputAddresses.some(item => item.address === data.to) === false) {
                try {
                    if (typeof (data.to) === 'string' || typeof (data.value) === 'number' || typeof (data.valueInDollar) === 'number' || typeof (data.symbole) === 'string') {
                        outputAddresses.push(
                            {
                                address: data.to,
                                value: data.value,
                                Label: data.ToLabel ? data.ToLabel : null,
                                entity: data.ToEntity !== null ? data.ToEntity : null,
                                symbole: data.symbole,
                                show: Data[Data.findIndex(item => item.id === data.to)] !== undefined ? Data[Data.findIndex(item => item.id === data.to)].inputs.some(item => item.id === AddressSelectedData.id) : false,
                                valueInDollar: data.valueInDollar,
                                loading: false
                            }
                        )
                    }
                } catch (error) { }
            }
        }

        for (let i = 0; i < inputAddresses.length; i++) {
            value = value + inputAddresses[i].value
        }

        //filter data for token
        let filtredInputs = []
        let filtredOutputs = []
        try {
            for (let i = 0; i < inputAddresses.length; i++) {
                if (inputAddresses[i].symbole.toUpperCase() === token.toUpperCase()) {
                    filtredInputs.push(inputAddresses[i])
                }
            }
        } catch (error) {
            for (let i = 0; i < inputAddresses.length; i++) {
                if (inputAddresses[i].contractAddress.toUpperCase() === contractAddress.toUpperCase()) {
                    filtredInputs.push(inputAddresses[i])
                }
            }
        }
        try {
            for (let i = 0; i < outputAddresses.length; i++) {
                if (outputAddresses[i].symbole.toUpperCase() === token.toUpperCase()) {
                    filtredOutputs.push(outputAddresses[i])
                }
            }
        } catch (error) {
            for (let i = 0; i < outputAddresses.length; i++) {
                if (outputAddresses[i].contractAddress.toUpperCase() === contractAddress.toUpperCase()) {
                    filtredOutputs.push(outputAddresses[i])
                }
            }
        }


        inputAddresses = filtredInputs
        outputAddresses = filtredOutputs



        return ({
            address,
            blockNumber,
            BlockDate,
            symbole,
            TotalOutput,
            TotalInput,
            fee,
            inputAddresses,
            outputAddresses,
            value
        })
    }

    const UTXOTr = (data) => {

        const blockNumber = data.blockNumber
        const address = data.hash
        const BlockDate = data.time
        const name = 'بیت کوین'
        const image = `BTC.png`
        const color = '#627eea'
        const RiskScore = '0%'
        let TotalOutput = 0
        let symbole = "BTC"
        let TotalInput = 0
        let fee = data.fee
        let value = 0

        const inputAddresses = []
        const outputAddresses = []

        for (let i = 0; i < data.inputs.length; i++) {
            try {
                if (typeof (data.inputs[i].address) === 'string' || typeof (data.inputs[i].value) === 'number' || typeof (data.symbole) === 'string' || typeof (data.inputs[i].valueInDollar) === 'number') {
                    inputAddresses.push(
                        {
                            address: data.inputs[i].address,
                            Label: data.inputs[i].Label ? data.inputs[i].Label : data.inputs[i].entity !== null ? data.inputs[i].entity.name : data.inputs[i].Label,
                            value: data.inputs[i].value,
                            entity: data.inputs[i].entity,
                            metadata: data.inputs[i].metadata,
                            symbole: data.symbole,
                            show: Data[Data.findIndex(item => item.id === data.inputs[i].address)] !== undefined ? Data[Data.findIndex(item => item.id === data.inputs[i].address)].outputs.some(item => item.id === AddressSelectedData.id) : false,
                            valueInDollar: data.inputs[i].valueInDollar
                        }
                    )
                }
            } catch (error) { }
        }

        for (let i = 0; i < data.outputs.length; i++) {
            try {
                if (typeof (data.outputs[i].address) === 'string' || typeof (data.outputs[i].value) === 'number' || typeof (data.symbole) === 'string' || typeof (data.outputs[i].valueInDollar) === 'number') {
                    outputAddresses.push(
                        {
                            address: data.outputs[i].address,
                            value: data.outputs[i].value,
                            Label: data.outputs[i].Label ? data.outputs[i].Label : null,
                            symbole: data.symbole,
                            entity: data.outputs[i].entity,
                            metadata: data.outputs[i].metadata,
                            show: Data[Data.findIndex(item => item.id === data.outputs[i].address)] !== undefined ? Data[Data.findIndex(item => item.id === data.outputs[i].address)].inputs.some(item => item.id === AddressSelectedData.id) : false,
                            valueInDollar: data.outputs[i].valueInDollar
                        }
                    )
                }
            } catch (error) { }
        }

        for (let i = 0; i < inputAddresses.length; i++) {
            for (let j = 0; j < outputAddresses.length; j++) {
                if (inputAddresses[i].address === outputAddresses[j].address) {
                    inputAddresses[i].value = inputAddresses[i].value - outputAddresses[j].value
                    inputAddresses[i].valueInDollar = inputAddresses[i].valueInDollar - outputAddresses[j].valueInDollar
                    outputAddresses.splice(j, 1)
                    j = j - 1
                }
            }
        }

        for (let i = 0; i < inputAddresses.length; i++) {
            value = value + inputAddresses[i].value
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
            fee,
            inputAddresses,
            outputAddresses,
            value
        })
    }

    const RemoveTxChecker = (firstData) => {
        let GetDataChecker = firstData
        let filtredData = []
        for (let i = 0; i < GetDataChecker.length; i++) {
            if (GetDataChecker[i].type === 'transaction') {
                let check = false
                for (let j = 0; j < GetDataChecker.length; j++) {
                    if (GetDataChecker[j].type === 'address') {
                        if (GetDataChecker[j].inputs.some(item => item.id === GetDataChecker[i].id)) {
                            check = true
                        }
                        if (GetDataChecker[j].outputs.some(item => item.id === GetDataChecker[i].id)) {
                            check = true
                        }
                    }
                }
                if (check) {
                    filtredData.push(GetDataChecker[i])
                }
            } else {
                filtredData.push(GetDataChecker[i])
            }
        }
        SetData(filtredData)
    }

    const onPageChangeInput = (page) => {
        setInputLoading(true)
        GetRequest(`${serverAddress}/explorer/search/?query=${AddressSelectedData.id}&page_number=0&page_size=0&network=${network}&pageNumberFrom=${page}&pageSizeFrom=10&pageNumberTo=1&pageSizeTo=1`)
            .then((response) => {
                const getData = (UTXOTr(UTXO_Transaction(response.data.data, network, 1), network))
                SetInputsData(getData.inputAddresses)
                // SetOutputsData(getData.outputAddresses)
                setInputLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setInputLoading(false)
            })
    }
    const onPageChangeOutput = (page) => {
        setOutputLoading(true)
        GetRequest(`${serverAddress}/explorer/search/?query=${AddressSelectedData.id}&page_number=0&page_size=0&network=${network}&pageNumberFrom=1&pageSizeFrom=1&pageNumberTo=${page}&pageSizeTo=10`)
            .then((response) => {
                const getData = (UTXOTr(UTXO_Transaction(response.data.data, network, 1), network))
                // SetInputsData(getData.inputAddresses)
                SetOutputsData(getData.outputAddresses)
                setOutputLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setInputLoading(false)
            })
    }
    const handlePaginationInput = (page) => {
        setInputFirst(page);
        onPageChangeInput(page);
    };
    const handlePaginationOutput = (page) => {
        setOutputFirst(page);
        onPageChangeOutput(page);
    };

    const removeInputSelectedData = (row) => {

        let GetData = Data
        let inputs = GetData.find(item => item.id === AddressSelectedData.id).inputs
        inputs = inputs.filter(item => item.id !== row.address)
        GetData[GetData.findIndex(item => item.id === AddressSelectedData.id)].inputs = inputs

        let GetTrOutputs = GetData.find(item => item.id === row.address).outputs
        GetTrOutputs = GetTrOutputs.filter(item => item.id !== AddressSelectedData.id)
        GetData[GetData.findIndex(item => item.id === row.address)].outputs = GetTrOutputs
        SetData(GetData)
        SetReload(!Reload)
        RemoveTxChecker(GetData)
        const tmp2 = InputsData.map(item => ({ ...item }));
        const idx2 = tmp2.findIndex(item => item.address === row.address);
        if (idx2 !== -1) tmp2[idx2].show = false;
        SetInputsData(tmp2);
    }
    const removeOutputSelectedData = (row) => {

        let GetData = Data
        let outputs = GetData.find(item => item.id === AddressSelectedData.id).outputs
        outputs = outputs.filter(item => item.id !== row.address)
        GetData[GetData.findIndex(item => item.id === AddressSelectedData.id)].outputs = outputs

        let GetTrInputs = GetData.find(item => item.id === row.address).inputs
        GetTrInputs = GetTrInputs.filter(item => item.id !== AddressSelectedData.id)
        GetData[GetData.findIndex(item => item.id === row.address)].inputs = GetTrInputs
        SetData(GetData)
        SetReload(!Reload)
        RemoveTxChecker(GetData)
        const tmp2 = OutputsData.map(item => ({ ...item }));
        const idx2 = tmp2.findIndex(item => item.address === row.address);
        if (idx2 !== -1) tmp2[idx2].show = false;
        SetOutputsData(tmp2);
    }

    const addInputSelectedData = async (row) => {
        let ProccessData = Data

        let SelectedAddress = AddressSelectedData
        if (!SelectedAddress.inputs.some(item => item.id === row.address)) {
            SelectedAddress.inputs.push(
                {
                    id: row.address,
                    text: row.address,
                    value: row.value,
                    time: row.BlockDate,
                    symbol: row.symbole,
                    DollarValue: row.valueInDollar,
                    color: false
                }
            )
        }

        if (!ProccessData.some(item => item.id === row.address)) {

            let x = AddressSelectedData.x
            let y = AddressSelectedData.y

            x = x + 300

            let check = true

            while (check) {
                let check2 = true
                for (let i = 0; i < Data.length; i++) {
                    if ((Math.abs(Data[i].x - x) <= 50) && (Math.abs(Data[i].y - y) <= 50)) {
                        check2 = false
                    }
                }
                if (!check2) {
                    y = y - 100
                } else {
                    if (Networks.find(item => item.symbole === network).type === 'account') {

                        try {
                            // ۱. اجرا هم‌زمان دو درخواست
                            const [riskRes, detailRes] = await Promise.all([
                                GetRequest(`${serverAddress}/explorer/risk-score/?address=${row.address}&network=${network}`),
                                GetRequest(`${serverAddress}/explorer/address-detail?query=${row.address}`)
                            ]);


                            ProccessData.push(
                                {
                                    id: row.address,
                                    text: row.address,
                                    type: "address",
                                    label: null,
                                    entity: row.entity,
                                    risk: riskRes.status === 200 ? riskRes.data.risk_score : null,
                                    metadata: detailRes.status === 200 ? detailRes.data.address_detail.metadata !== null ? detailRes.data.address_detail.metadata.label : null : null,
                                    x: x,
                                    y: y,
                                    main: row.address === address,
                                    inputs: [],
                                    outputs: [
                                        {
                                            id: AddressSelectedData.id,
                                            text: AddressSelectedData.id,
                                            value: row.value,
                                            time: BlockDate,
                                            symbol: row.symbole,
                                            DollarValue: row.valueInDollar,
                                            color: false
                                        },
                                    ],
                                    network: network,
                                    token: token,
                                }
                            )

                            SetData(ProccessData)
                            const tmp2 = InputsData.map(item => ({ ...item }));
                            const idx2 = tmp2.findIndex(item => item.address === row.address);
                            if (idx2 !== -1) tmp2[idx2].show = true;
                            SetInputsData(tmp2);
                            SetReload(!Reload)
                        } catch (err) {

                            console.log(err)
                            ProccessData.push(
                                {
                                    id: row.address,
                                    text: row.address,
                                    type: "address",
                                    label: null,
                                    entity: row.entity,
                                    risk: null,
                                    metadata: null,
                                    x: x,
                                    y: y,
                                    main: row.address === address,
                                    inputs: [],
                                    outputs: [
                                        {
                                            id: AddressSelectedData.id,
                                            text: AddressSelectedData.id,
                                            value: row.value,
                                            time: BlockDate,
                                            symbol: row.symbole,
                                            DollarValue: row.valueInDollar,
                                            color: false
                                        },
                                    ],
                                    network: network,
                                    token: token,
                                }
                            )
                            SetData(ProccessData)

                            const tmp2 = InputsData.map(item => ({ ...item }));
                            const idx2 = tmp2.findIndex(item => item.address === row.address);
                            if (idx2 !== -1) tmp2[idx2].show = true;
                            SetInputsData(tmp2);
                            SetReload(!Reload)

                        } finally {
                            // SetLoading(false);
                            // SetShowGraph(true);
                        }
                    } else {
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: null,
                                entity: row.entity,
                                risk: null,
                                metadata: row.metadata,
                                x: x,
                                y: y,
                                main: row.address === hash,
                                inputs: [],
                                outputs: [
                                    {
                                        id: AddressSelectedData.id,
                                        text: AddressSelectedData.id,
                                        value: row.value,
                                        time: BlockDate,
                                        symbol: row.symbole,
                                        DollarValue: row.valueInDollar,
                                        color: false
                                    },
                                ],
                                network: network,
                                token: token,
                            }
                        )
                        SetData(ProccessData)

                        const tmp2 = InputsData.map(item => ({ ...item }));
                        const idx2 = tmp2.findIndex(item => item.address === row.address);
                        if (idx2 !== -1) tmp2[idx2].show = true;
                        SetInputsData(tmp2);
                        SetReload(!Reload)
                    }
                    check = false
                }
            }

        } else {
            if (!ProccessData[ProccessData.findIndex(item => item.id === row.address)].outputs.some(item => item.id === AddressSelectedData.id)) {
                ProccessData[ProccessData.findIndex(item => item.id === row.address)].outputs.push(
                    {
                        id: AddressSelectedData.id,
                        text: AddressSelectedData.id,
                        value: row.value,
                        time: BlockDate,
                        symbol: row.symbole,
                        DollarValue: row.valueInDollar,
                        color: false
                    }
                )
                SetData(ProccessData)

                const tmp2 = InputsData.map(item => ({ ...item }));
                const idx2 = tmp2.findIndex(item => item.address === row.address);
                if (idx2 !== -1) tmp2[idx2].show = true;
                SetInputsData(tmp2);
                SetReload(!Reload)
            }
        }


    }
    const addOutputSelectedData = async (row) => {
        let ProccessData = Data

        let SelectedAddress = AddressSelectedData
        if (!SelectedAddress.outputs.some(item => item.id === row.address)) {
            SelectedAddress.outputs.push(
                {
                    id: row.address,
                    text: row.address,
                    value: row.value,
                    time: row.BlockDate,
                    symbol: row.symbole,
                    DollarValue: row.valueInDollar,
                    color: false
                }
            )
        }

        if (!ProccessData.some(item => item.id === row.address)) {

            let x = AddressSelectedData.x
            let y = AddressSelectedData.y

            x = x - 300

            let check = true

            while (check) {
                let check2 = true
                for (let i = 0; i < Data.length; i++) {
                    if ((Math.abs(Data[i].x - x) <= 50) && (Math.abs(Data[i].y - y) <= 50)) {
                        check2 = false
                    }
                }
                if (!check2) {
                    y = y - 100
                } else {
                    if (Networks.find(item => item.symbole === network).type === 'account') {
                        try {
                            // ۱. اجرا هم‌زمان دو درخواست
                            const [riskRes, detailRes] = await Promise.all([
                                GetRequest(`${serverAddress}/explorer/risk-score/?address=${row.address}&network=${network}`),
                                GetRequest(`${serverAddress}/explorer/address-detail?query=${row.address}`)
                            ]);


                            ProccessData.push(
                                {
                                    id: row.address,
                                    text: row.address,
                                    type: "address",
                                    label: null,
                                    entity: row.entity,
                                    risk: riskRes.status === 200 ? riskRes.data.risk_score : null,
                                    metadata: detailRes.status === 200 ? detailRes.data.address_detail.metadata !== null ? detailRes.data.address_detail.metadata.label : null : null,
                                    x: x,
                                    y: y,
                                    main: row.address === address,
                                    inputs: [
                                        {
                                            id: AddressSelectedData.id,
                                            text: AddressSelectedData.id,
                                            value: row.value,
                                            time: BlockDate,
                                            symbol: row.symbole,
                                            DollarValue: row.valueInDollar,
                                            color: false
                                        },
                                    ],
                                    outputs: [],
                                    network: network,
                                    token: token,
                                }
                            )



                            SetData(ProccessData)
                            const tmp2 = OutputsData.map(item => ({ ...item }));
                            const idx2 = tmp2.findIndex(item => item.address === row.address);
                            if (idx2 !== -1) tmp2[idx2].show = true;
                            SetOutputsData(tmp2);
                            SetReload(!Reload)
                        } catch (err) {

                            console.log(err)
                            ProccessData.push(
                                {
                                    id: row.address,
                                    text: row.address,
                                    type: "address",
                                    label: null,
                                    entity: row.entity,
                                    risk: null,
                                    metadata: null,
                                    x: x,
                                    y: y,
                                    main: row.address === address,
                                    inputs: [
                                        {
                                            id: AddressSelectedData.id,
                                            text: AddressSelectedData.id,
                                            value: row.value,
                                            time: BlockDate,
                                            symbol: row.symbole,
                                            DollarValue: row.valueInDollar,
                                            color: false
                                        },
                                    ],
                                    outputs: [],
                                    network: network,
                                    token: token,
                                }
                            )
                            SetData(ProccessData)

                            const tmp2 = OutputsData.map(item => ({ ...item }));
                            const idx2 = tmp2.findIndex(item => item.address === row.address);
                            if (idx2 !== -1) tmp2[idx2].show = true;
                            SetOutputsData(tmp2);
                            SetReload(!Reload)

                        } finally {
                            // SetLoading(false);
                            // SetShowGraph(true);
                        }
                    } else {
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: null,
                                entity: row.entity,
                                risk: null,
                                metadata: row.metadata,
                                x: x,
                                y: y,
                                main: row.address === hash,
                                inputs: [
                                    {
                                        id: AddressSelectedData.id,
                                        text: AddressSelectedData.id,
                                        value: row.value,
                                        time: BlockDate,
                                        symbol: row.symbole,
                                        DollarValue: row.valueInDollar,
                                        color: false
                                    },
                                ],
                                outputs: [],
                                network: network,
                                token: token,
                            }
                        )

                        SetData(ProccessData)

                        const tmp2 = OutputsData.map(item => ({ ...item }));
                        const idx2 = tmp2.findIndex(item => item.address === row.address);
                        if (idx2 !== -1) tmp2[idx2].show = true;
                        SetOutputsData(tmp2);
                        SetReload(!Reload)
                    }

                    check = false
                }
            }

        } else {
            if (!ProccessData[ProccessData.findIndex(item => item.id === row.address)].inputs.some(item => item.id === AddressSelectedData.id)) {
                ProccessData[ProccessData.findIndex(item => item.id === row.address)].inputs.push(
                    {
                        id: AddressSelectedData.id,
                        text: AddressSelectedData.id,
                        value: row.value,
                        time: BlockDate,
                        symbol: row.symbole,
                        DollarValue: row.valueInDollar,
                        color: false
                    }
                )
                SetData(ProccessData)

                const tmp2 = OutputsData.map(item => ({ ...item }));
                const idx2 = tmp2.findIndex(item => item.address === row.address);
                if (idx2 !== -1) tmp2[idx2].show = true;
                SetOutputsData(tmp2);
                SetReload(!Reload)
            }
        }


    }

    //table
    const addOrRemoveInput = (row) => {
        if (!row.loading) {
            if (row.show) {
                return (
                    <IndeterminateCheckBoxIcon
                        style={{
                            fontSize: "28px",
                            marginBottom: "0px",
                            color: "rgb(255,120,120)",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            removeInputSelectedData(row)
                        }}
                    />
                )
            } else {
                return (
                    <AddBoxIcon
                        style={{
                            fontSize: "28px",
                            marginBottom: "0px",
                            color: "green",
                            cursor: CanAdd ? "pointer" : 'inherit',
                        }}
                        onClick={() => {
                            if (CanAdd) {
                                addInputSelectedData(row)
                            }
                        }} />
                )
            }
        } else {
            return (
                <CircularProgress style={{ width: '25px', height: '25px', marginBottom: '-4px' }} />
            )
        }

    };
    const addOrRemoveOutput = (row) => {
        if (!row.loading) {
            if (row.show) {
                return (
                    <IndeterminateCheckBoxIcon
                        style={{
                            fontSize: "28px",
                            marginBottom: "0px",
                            color: "rgb(255,120,120)",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            removeOutputSelectedData(row)
                        }}
                    />
                )
            } else {
                return (
                    <AddBoxIcon
                        style={{
                            fontSize: "28px",
                            marginBottom: "0px",
                            color: "green",
                            cursor: CanAdd ? "pointer" : 'inherit',
                        }}
                        onClick={() => {
                            if (CanAdd) {
                                addOutputSelectedData(row)
                            }
                        }} />
                )
            }
        } else {
            return (
                <CircularProgress style={{ width: '25px', height: '25px', marginBottom: '-4px' }} />
            )
        }

    };
    const ValueField = (row) => {
        return (
            <p
                style={{
                    direction: "ltr",
                    fontSize: "13px",
                    marginTop: "-12px",
                    marginBottom: "-16px",
                }}
            >
                {ShowUSD
                    ? !isNaN(row.valueInDollar) ? formatSmallNumber(row.valueInDollar) : 'نامشخص'
                    : formatSmallNumber(row.value)}{" "}
                {ShowUSD ? "USD" : row.symbole}
            </p>
        );
    };
    const TrHash = (row) => {
        return (
            <div
                style={{ marginTop: "-12px", marginBottom: "-16px", fontSize: "14px" }}
            >
                {AddressFormat(row.address, 6, 'address', network)}
            </div>
        );
    };
    const CounterParty = (row) => {
        if (row.entity) {
            return (
                <a
                    href={`/panel/entity/${row.entity.uuid}`}
                    style={{
                        marginBottom: "0px",
                        textAlign: "right",
                        color: "orange",
                        fontSize: "14px",
                        marginTop: "-12px",
                        marginBottom: "-16px",
                        fontSize: "12px",
                    }}
                >
                    <span
                        style={{
                            background: "rgb(47, 163, 221)",
                            color: 'white',
                            padding: '1px 12px',
                            borderRadius: '4px'
                        }}
                    >
                        {row.entity.name}
                    </span>
                    {ShowAddress ? (
                        <>
                            <br />
                            {AddressFormat(row.address, 4, 'address', network)}
                        </>
                    ) : null}
                </a>
            );
        } else {
            return (
                <p
                    style={{
                        marginTop: "-12px",
                        marginBottom: "-16px",
                        fontSize: "12px",
                    }}
                >
                    <span style={{}}>نامشخص</span>
                    {ShowAddress ? (
                        <>
                            <br />
                            {AddressFormat(row.address, 4, 'address', network)}
                        </>
                    ) : null}
                </p>
            );
        }
    };

    const RemoveAddress = (hash) => {
        let GetData = Data
        GetData = GetData.filter(item => item.id !== hash)

        for (let i = 0; i < GetData.length; i++) {
            let GetInputsData = GetData[i].inputs
            GetInputsData = GetInputsData.filter(item => item.id !== hash)
            GetData[i].inputs = GetInputsData

            let GetOutputsData = GetData[i].outputs
            GetOutputsData = GetOutputsData.filter(item => item.id !== hash)
            GetData[i].outputs = GetOutputsData
        }

        SetData(GetData)
        SetReload(!Reload)

        RemoveTxChecker(GetData)

    }

    useEffect(() => {
        setInputLoading(true)
        setOutputLoading(true)
        SetActivityLoading(true)
        GetRequest(`${serverAddress}/explorer/search/?query=${AddressSelectedData.id}&network=${network}`)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response)
                    SetFee(response.data.data.fee)
                    SetblockNumber(response.data.data.block_number)
                    SetBlockDate(response.data.data.time)
                    if (Networks.find(item => item.symbole === network).type === 'account') {
                        SetValue(response.data.data.value)
                        const getData = (AccountBaseTr(Account_transaction(response.data.data, network, 1), network))
                        SetInputsData(getData.inputAddresses)
                        SetOutputsData(getData.outputAddresses)
                        setInputLoading(false)
                        setOutputLoading(false)
                        SetActivityLoading(false)

                    } else {
                        let sum = 0
                        for (let i = 0; i < response.data.data.outputs.length; i++) {
                            sum = sum + response.data.data.outputs[i].value
                        }
                        SetValue(sum.toFixed(5))
                        const getData = (UTXOTr(UTXO_Transaction(response.data.data, network, 1), network))
                        SetInputsData(getData.inputAddresses)
                        SetOutputsData(getData.outputAddresses)
                        SetInputTrNumber(response.data.data.total_inputs)
                        SetOutputTrNumber(response.data.data.total_outputs)
                        setInputLoading(false)
                        setOutputLoading(false)
                        SetActivityLoading(false)
                    }

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const inputColumns = [
        {
            header: "",
            cell: (row) => addOrRemoveInput(row),
        },
        {
            header: "آدرس تراکنش",
            cell: (row) => TrHash(row),
        },
        {
            header: "حجم تراکنش",
            cell: (row) => ValueField(row),
        },
        {
            header: "طرف مقابل",
            cell: (row) => CounterParty(row),
        },
    ];

    const outputColumns = [
        {
            header: "",
            cell: (row) => addOrRemoveOutput(row),
        },
        {
            header: "آدرس تراکنش",
            cell: (row) => TrHash(row),
        },
        {
            header: "حجم تراکنش",
            cell: (row) => ValueField(row),
        },
        {
            header: "طرف مقابل",
            cell: (row) => CounterParty(row),
        },
    ];

    return (
        <div className='text-textColor'>
            <h6 className="p-3 pb-0">
                <span>
                    <img src={`/images/${network}.png`} className='w-8 inline-block ' />
                    مشخصات تراکنش {Networks.find((item) => item.symbole === network).name}
                </span>
                <span className="float-left">

                    {AddressFormat(AddressSelectedData.id, 10, 'transaction', network)}
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className='inline-block cursor-pointer mr-2' onClick={() => { RemoveAddress(AddressSelectedData.id) }}>
                        <path fill="currentColor" d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z" />
                    </svg>
                </span>
            </h6>

            <div className="w-full m-0 mt-0 p-0">
                {ActivityLoading ? (
                    <div
                        className="pt-5"
                    >
                        <ExploreTopBoxLoading />
                    </div>
                ) : (
                    <div
                        className="flex flex-wrap m-0 p-3 pb-0"
                    >
                        {/* ستون ۱ */}
                        <div className="w-full md:w-1/2 m-0 mt-0 p-0">
                            <p className="text-[13px] text-textTitleColor mb-0">حجم تراکنش</p>

                            {true ? (
                                <div className="flex items-center font-bold">
                                    <svg fill="currentColor" height="20" width="20" className='inline-block ml-1' version="1.1" id="Filled_Icons"
                                        viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                                        <g id="Transaction-Filled">
                                            <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z" />
                                        </g>
                                    </svg>
                                    <small className="ml-1 font-bold">
                                        {network !== "BSC" ? network : "BNB"}
                                    </small>
                                    {Value}

                                </div>
                            ) : (
                                <p className="font-bold flex items-center">
                                    {/* <UserCheck
                                        size={15}
                                        style={{ color: "rgb(150,150,150)", marginLeft: "4px" }}
                                    /> */}
                                    نامشخص
                                </p>
                            )}
                        </div>

                        {/* ستون ۲ */}
                        <div className="w-full md:w-1/2 m-0 mt-0 p-0">
                            <p className="text-[13px] text-textTitleColor mb-0">کارمزد</p>
                            <p className="font-bold flex items-center">
                                <svg width="20" height="20" className='ml-1 inline-block' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <small className="ml-1">{network}</small>
                                {Fee}
                                
                            </p>
                        </div>

                        {/* ستون ۳ */}
                        <div className="w-full md:w-1/2 m-0 mt-0 p-0">
                            <p className="text-[13px] text-textTitleColor mb-0">زمان بلاک</p>
                            <p className="font-bold flex items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
                                    <path d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" />
                                </svg>
                                ({MiladiCalendar(BlockDate).hour}:{MiladiCalendar(BlockDate).minute}){" "}
                                {MiladiCalendar(BlockDate).year}/{MiladiCalendar(BlockDate).month}/
                                {MiladiCalendar(BlockDate).day}
                            </p>
                        </div>

                        <div className="w-full md:w-1/2 m-0 mt-0 p-0">
                            <p className="text-[13px] text-textTitleColor mb-0">شماره بلاک</p>
                            <p className="font-bold flex items-center">
                                <svg fill="currentColor" width="20" height="20" className='inline-block ml-1' viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.9530 39.4375 C 22.8671 39.4375 23.4296 38.9922 23.6171 38.1016 L 24.6718 33.0859 L 29.0312 33.0859 L 28.0702 37.6797 C 27.8593 38.6406 28.5390 39.4375 29.4999 39.4375 C 30.4374 39.4375 31.0468 38.9922 31.2343 38.1016 L 32.2890 33.0625 L 34.7265 33.0625 C 35.6405 33.0625 36.2968 32.3828 36.2968 31.4688 C 36.2968 30.6719 35.7343 30.0859 34.9609 30.0859 L 32.9218 30.0859 L 33.9296 25.3516 L 36.3905 25.3516 C 37.3046 25.3516 37.9609 24.6719 37.9609 23.7578 C 37.9609 22.9609 37.3983 22.3750 36.6249 22.3750 L 34.5390 22.3750 L 35.4530 18.0156 C 35.6405 17.0547 34.9374 16.2344 33.9765 16.2344 C 33.0624 16.2344 32.4765 16.7031 32.2890 17.5703 L 31.2812 22.3750 L 26.9218 22.3750 L 27.8124 18.0156 C 28.0234 17.0781 27.3671 16.2344 26.3827 16.2344 C 25.4452 16.2344 24.8593 16.7031 24.6718 17.5703 L 23.6874 22.3750 L 21.2030 22.3750 C 20.3124 22.3750 19.6327 23.0781 19.6327 23.9688 C 19.6327 24.7656 20.1952 25.3516 20.9921 25.3516 L 23.0312 25.3516 L 22.0468 30.0859 L 19.5390 30.0859 C 18.6249 30.0859 17.9687 30.7890 17.9687 31.6797 C 17.9687 32.4766 18.5312 33.0625 19.3280 33.0625 L 21.4374 33.0625 L 20.4765 37.6797 C 20.2890 38.6406 20.9921 39.4375 21.9530 39.4375 Z M 25.0936 30.3672 L 26.1718 25.1172 L 30.9062 25.1172 L 29.8046 30.3672 Z" /></svg>
                                {blockNumber}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <h6 className='p-3 pb-0 mb-0'>تنظیمات</h6>

            <div className="w-full m-0 mt-0 p-0">
                <div className="flex flex-wrap m-0 p-0 me-1">
                    <div className="w-full md:w-1/2 m-0 mt-0 p-0 flex items-center">
                        <Switch
                            checked={ShowUSD}
                            id="ShowPriceCheckbox"
                            onChange={(e) => setShowUSD(e.target.checked)}
                        />
                        <label
                            htmlFor="ShowPriceCheckbox"
                            className="ml-2 mt-0 cursor-pointer"
                        >
                            نمایش قیمت
                        </label>
                    </div>
                </div>
            </div>

            <h6 className='mt-3 p-3 pb-0'>
                مقادیر ورودی
            </h6>
            <div className='mt-2'>
                {
                    !InputLoading ?
                        <ExpandableTable
                            data={InputsData}
                            columns={inputColumns}
                            rowDetailsMode="row"
                            rowDetailsClassName="rounded-xl p-3"
                        />
                        :
                        <SkeletonLoading />
                }
                {
                    Networks.find(item => item.symbole === network).type !== 'account' ?
                        <Pagination
                            rtl
                            totalItems={InputTrNumber}
                            pageSize={10}
                            currentPage={InputFirst}
                            onPageChange={handlePaginationInput}
                        />
                        :
                        null
                }
            </div>

            <h6 className='mt-3 p-3 pb-0'>
                مقادیر خروجی
            </h6>
            <div className='mt-2 mb-4'>
                {
                    !OutputLoading ?
                        <ExpandableTable
                            data={OutputsData}
                            columns={outputColumns}
                            rowDetailsMode="row"
                            rowDetailsClassName="rounded-xl p-3"
                        />
                        :
                        <SkeletonLoading />
                }
                {
                    Networks.find(item => item.symbole === network).type !== 'account' ?
                        <Pagination
                            rtl
                            totalItems={OutputTrNumber}
                            pageSize={10}
                            currentPage={OutputFirst}
                            onPageChange={handlePaginationOutput}
                        />
                        :
                        null
                }

            </div>
        </div>
    )
}

export default TxBox
