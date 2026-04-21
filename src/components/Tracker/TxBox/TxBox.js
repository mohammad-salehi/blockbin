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
    console.log('rest')
    console.log(rest)
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
                                risk: data.logs[i].FromRisk,
                                metadata: data.logs[i].FromMetadata,
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
                                risk: data.logs[i].ToRisk,
                                metadata: data.logs[i].ToMetadata,
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
                                risk: data.FromRisk,
                                metadata: data.FromMetadata,
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
                                risk: data.ToRisk,
                                metadata: data.ToMetadata,
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
        GetRequest(`${serverAddress}/explorer/utxo/transaction/${AddressSelectedData.id}/?network=${network}&page_number_from=${page}&page_number_to=1&page_size_from=10&page_size_to=1`)
            .then((response) => {
                const getData = (UTXOTr(UTXO_Transaction(response.data.data.result, network, 1), network))
                SetInputsData(getData.inputAddresses)
                setInputLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setInputLoading(false)
            })
    }
    const onPageChangeOutput = (page) => {
        setOutputLoading(true)
        GetRequest(`${serverAddress}/explorer/utxo/transaction/${AddressSelectedData.id}/?network=${network}&page_number_from=1&page_number_to=${page}&page_size_from=1&page_size_to=10`)
            .then((response) => {
                const getData = (UTXOTr(UTXO_Transaction(response.data.data.result, network, 1), network))
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
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: row.Label,
                                entity: row.entity,
                                risk: row.risk ? row.risk*100 : null,
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

                    } else {
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: row.Label,
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
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: row.Label,
                                entity: row.entity,
                                risk: row.risk ? row.risk*100 : null,
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

                    } else {
                        ProccessData.push(
                            {
                                id: row.address,
                                text: row.address,
                                type: "address",
                                label: row.Label,
                                entity: row.entity,
                                risk: null,
                                metadata: null,
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
                    href={`/panel/entity/${row.entity.id}`}
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
        if (Networks.find(item => item.symbole === network).type === 'account') {
            GetRequest(`${serverAddress}/explorer/evm/transaction/${AddressSelectedData.id}/?network=${network}&page_number=1&page_size=10&transaction_type=ALL`)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        SetFee(response.data.data.result.fee)
                        SetblockNumber(response.data.data.result.block_number)
                        SetBlockDate(response.data.data.result.time)
                        SetValue(response.data.data.result.value)
                        const getData = (AccountBaseTr(Account_transaction(response.data.data.result, network, 1), network))
                        SetInputsData(getData.inputAddresses)
                        SetOutputsData(getData.outputAddresses)
                        setInputLoading(false)
                        setOutputLoading(false)
                        SetActivityLoading(false)


                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            GetRequest(`${serverAddress}/explorer/utxo/transaction/${AddressSelectedData.id}/?network=${network}&page_number=1&page_size=10`)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        SetFee(response.data.data.result.fee)
                        SetblockNumber(response.data.data.result.block_number)
                        SetBlockDate(response.data.data.result.time)
                        let sum = 0
                        for (let i = 0; i < response.data.data.result.outputs.length; i++) {
                            sum = sum + response.data.data.result.outputs[i].value
                        }
                        SetValue(sum.toFixed(5))
                        const getData = (UTXOTr(UTXO_Transaction(response.data.data.result, network, 1), network))
                        SetInputsData(getData.inputAddresses)
                        SetOutputsData(getData.outputAddresses)
                        SetInputTrNumber(response.data.data.result.total_inputs)
                        SetOutputTrNumber(response.data.data.result.total_outputs)
                        setInputLoading(false)
                        setOutputLoading(false)
                        SetActivityLoading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

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
        <div className="text-textColor">
          {/* Header */}
          <div className="relative rounded-2xl grad-border glass soft-glow overflow-hidden">
            {/* neon blobs (subtle in light) */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/3 dark:bg-cyan-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/3 dark:bg-fuchsia-500/12 blur-3xl" />
      
            <div className="relative p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl grid place-items-center border border-white/10 bg-white/5">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/8 via-transparent to-fuchsia-500/8 dark:from-cyan-500/12 dark:to-fuchsia-500/12" />
                    <img
                      src={`/images/${network}.png`}
                      className="relative w-7 h-7 object-contain drop-shadow"
                      alt={network}
                    />
                  </div>
      
                  <div className="leading-tight">
                    <div className="text-[11px] tracking-wide text-textTitleColor/80">مشخصات تراکنش</div>
                    <div className="font-extrabold text-[16px] md:text-[17px]">
                      {Networks.find((item) => item.symbole === network).name}
                    </div>
                    <div className="mt-1 text-[11px] text-textTitleColor/70">Transaction • Explorer</div>
                  </div>
                </div>
      
                <div className="flex items-center justify-between md:justify-end gap-2">
                  <div className="px-3 py-2 rounded-2xl border border-white/10 bg-black/10 dark:bg-black/20 font-mono text-[12px]">
                    {AddressFormat(AddressSelectedData.id, 10, "transaction", network)}
                  </div>
      
                  <button
                    type="button"
                    onClick={() => RemoveAddress(AddressSelectedData.id)}
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition active:scale-[0.98]"
                    title="حذف"
                  >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="opacity-90 group-hover:opacity-100">
                      <path
                        fill="currentColor"
                        d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"
                      />
                    </svg>
                    <span className="text-[12px] font-semibold">حذف</span>
                  </button>
                </div>
              </div>
      
              {/* Transaction Top Details */}
              <div className="mt-5">
                {ActivityLoading ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <ExploreTopBoxLoading />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Value */}
                      <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/20 p-4 hover:bg-black/15 dark:hover:bg-black/25 transition">
                        <p className="text-[11px] tracking-wide text-textTitleColor/80 mb-2">حجم تراکنش</p>
                        <div className="font-extrabold flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                            <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24">
                              <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z" />
                            </svg>
                          </span>
                          <small className="text-textTitleColor/70 font-semibold">{network !== "BSC" ? network : "BNB"}</small>
                          <span className="font-mono">{Value}</span>
                        </div>
                      </div>
      
                      {/* Fee */}
                      <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/20 p-4 hover:bg-black/15 dark:hover:bg-black/25 transition">
                        <p className="text-[11px] tracking-wide text-textTitleColor/80 mb-2">کارمزد</p>
                        <div className="font-extrabold flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <small className="text-textTitleColor/70 font-semibold">{network}</small>
                          <span className="font-mono">{Fee}</span>
                        </div>
                      </div>
      
                      {/* Block Time */}
                      <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/20 p-4 hover:bg-black/15 dark:hover:bg-black/25 transition">
                        <p className="text-[11px] tracking-wide text-textTitleColor/80 mb-2">زمان بلاک</p>
                        <p className="font-extrabold flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span className="font-mono text-[13px] md:text-[14px]">
                            ({MiladiCalendar(BlockDate).hour}:{MiladiCalendar(BlockDate).minute}){" "}
                            {MiladiCalendar(BlockDate).year}/{MiladiCalendar(BlockDate).month}/{MiladiCalendar(BlockDate).day}
                          </span>
                        </p>
                      </div>
      
                      {/* Block Number */}
                      <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/20 p-4 hover:bg-black/15 dark:hover:bg-black/25 transition">
                        <p className="text-[11px] tracking-wide text-textTitleColor/80 mb-2">شماره بلاک</p>
                        <p className="font-extrabold flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                            <svg fill="currentColor" width="16" height="16" viewBox="0 0 56 56">
                              <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z" />
                            </svg>
                          </span>
                          <span className="font-mono">{blockNumber}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      
          {/* Settings */}
          <div className="mt-4 relative rounded-2xl grad-border glass soft-glow overflow-hidden">
            <div className="relative p-4 md:p-6">
              <div className="flex items-center justify-between">
                <h6 className="font-extrabold mb-0">تنظیمات</h6>
                <span className="text-[11px] text-textTitleColor/70">Preferences</span>
              </div>
      
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Switch checked={ShowUSD} id="ShowPriceCheckbox" onChange={(e) => setShowUSD(e.target.checked)} />
                    <label htmlFor="ShowPriceCheckbox" className="cursor-pointer text-[13px] font-semibold">
                      نمایش قیمت
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Inputs */}
          <div className="mt-4 relative rounded-2xl grad-border glass soft-glow overflow-hidden">
            <div className="relative p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="font-extrabold mb-0">مقادیر ورودی</h6>
                  <div className="text-[11px] text-textTitleColor/70 mt-1">Inputs</div>
                </div>
                {Networks.find((item) => item.symbole === network).type !== "account" ? (
                  <span className="text-[12px] text-textTitleColor/80">
                    مجموع: <span className="font-bold text-textColor">{InputTrNumber}</span>
                  </span>
                ) : null}
              </div>
      
              {!InputLoading ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2 md:p-3">
                  <ExpandableTable
                    data={InputsData}
                    columns={inputColumns}
                    rowDetailsMode="row"
                    rowDetailsClassName="rounded-2xl p-3 border border-white/10 bg-black/10 dark:bg-black/20"
                  />
                </div>
              ) : (
                <SkeletonLoading />
              )}
      
              {Networks.find((item) => item.symbole === network).type !== "account" ? (
                <div className="mt-4">
                  <Pagination rtl totalItems={InputTrNumber} pageSize={10} currentPage={InputFirst} onPageChange={handlePaginationInput} />
                </div>
              ) : null}
            </div>
          </div>
      
          {/* Outputs */}
          <div className="mt-4 mb-4 relative rounded-2xl grad-border glass soft-glow overflow-hidden">
            <div className="relative p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="font-extrabold mb-0">مقادیر خروجی</h6>
                  <div className="text-[11px] text-textTitleColor/70 mt-1">Outputs</div>
                </div>
                {Networks.find((item) => item.symbole === network).type !== "account" ? (
                  <span className="text-[12px] text-textTitleColor/80">
                    مجموع: <span className="font-bold text-textColor">{OutputTrNumber}</span>
                  </span>
                ) : null}
              </div>
      
              {!OutputLoading ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2 md:p-3">
                  <ExpandableTable
                    data={OutputsData}
                    columns={outputColumns}
                    rowDetailsMode="row"
                    rowDetailsClassName="rounded-2xl p-3 border border-white/10 bg-black/10 dark:bg-black/20"
                  />
                </div>
              ) : (
                <SkeletonLoading />
              )}
      
              {Networks.find((item) => item.symbole === network).type !== "account" ? (
                <div className="mt-4">
                  <Pagination rtl totalItems={OutputTrNumber} pageSize={10} currentPage={OutputFirst} onPageChange={handlePaginationOutput} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
}

export default TxBox
