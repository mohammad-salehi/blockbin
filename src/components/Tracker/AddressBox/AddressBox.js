import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
// import NoData from '../../../../components/NoData/NoData';
import { Networks } from '@/functions/Networks';
import { MiladiCalendar } from '@/functions/miladiCalendar';
import { formatSmallNumber } from '@/functions/formatSmallNumber';
import Switch from "@mui/material/Switch";
// import { Card, Input, Label, Row, Col, Button } from "reactstrap";
import { useParams } from 'next/navigation'
import { serverAddress } from '@/functions/ServerAddress';
import { GetRequest } from '@/functions/GetRequest';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { AddressFormat } from '@/components/AddressFormat/AddressFormat';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast'
import { JalaliCalendar } from '@/functions/jalaliCalendar';
import { Account_Token_Address } from '@/functions/NetworksProcessor/Account_Token_Address';
import { Account_Address } from '@/functions/NetworksProcessor/Account_Address';
import { UTXO_Address } from '@/functions/NetworksProcessor/UTXO_Address';

const AddressBox = ({ Data, SetData, AddressSelectedData, Reload, SetReload }) => {
  const { network } = useParams();
  const { token } = useParams();
  const { contractAddress } = useParams();
  const { address } = useParams();

  const [AddressTransactions, SetAddressTransactions] = useState([])

  const [from_volume, setfrom_volume] = useState(false);
  const [end_volume, setend_volume] = useState(false);
  const [ShowUSD, setShowUSD] = useState(false);
  const [sort_order, Setsort_order] = useState('descending');
  const [sort_field, Setsort_field] = useState('time');
  const [ShowAddress, setShowAddress] = useState(false);
  const [first, setFirst] = useState(0);
  const [TrNumber, SetTrNumber] = useState(0);
  const [TableLoading, setTableLoading] = useState(false);
  const [CanAdd, setCanAdd] = useState(true);

  //activity values
  const [MiladiFirstActivity, SetMiladiFirstActivity] = useState(0)
  const [JalaliFirstActivity, SetJalaliFirstActivity] = useState(0)
  const [MiladiLastActivity, SetMiladiLastActivity] = useState(0)
  const [JalalaliLastActivity, SetJalalaliLastActivity] = useState(0)
  const [Balance, SetBalance] = useState(0)

  //
  const [ActivityLoading, SetActivityLoading] = useState(false)

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

  const GetMoreData = (page) => {
    setTableLoading(true)
    let address = `${serverAddress}/explorer/search/?query=${AddressSelectedData.id}&network=${network}`

    if (token !== network) {
      address = address + `&type=token-20&contractAddress=${contractAddress}`
    }

    // if (from_volume) {
    //   address = address + `$from_volume=${from_volume}`
    // }
    // if (end_volume) {
    //   address = address + `$end_volume=${end_volume}`
    // }
    // if (sort_order) {
    //   address = address + `$sort_order=${sort_order}`
    // }
    // if (sort_field) {
    //   address = address + `$sort_field=${sort_field}`
    // }
    address = address + `&page_number=${page}&page_size=10`

    if (token === network) {
      setTableLoading(true)

      let ProcessedAddress = address

      GetRequest(ProcessedAddress)
        .then((response) => {
          setTableLoading(false)

          if (Networks.find(item => item.symbole === network).type === 'account') {

            const getData = (Account_Address(response.data.data, AddressSelectedData.id, network, 0))
            const getTransactions = []
            for (let i = 0; i < getData.inputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    Data.some(item => item.id === getData.inputs[i].hash)
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].inputs.some(item => item.id === getData.inputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'in',
                  date: getData.inputs[i].timestamp,
                  hash: getData.inputs[i].hash,
                  symbole: token,
                  amount: getData.inputs[i].value,
                  valueInDollar: getData.inputs[i].ValueInDollar,
                  address: getData.inputs[i].address,
                  entity: getData.inputs[i].entity,
                  label: getData.inputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            for (let i = 0; i < getData.outputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    Data.some(item => item.id === getData.outputs[i].hash)
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].outputs.some(item => item.id === getData.outputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'out',
                  date: getData.outputs[i].timestamp,
                  hash: getData.outputs[i].hash,
                  symbole: token,
                  amount: getData.outputs[i].value,
                  valueInDollar: getData.outputs[i].ValueInDollar,
                  address: getData.outputs[i].address,
                  entity: getData.outputs[i].entity,
                  label: getData.outputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            SetAddressTransactions(getTransactions)
          } else {
            const getData = (UTXO_Address(AddressSelectedData.id, response.data.data, network, 0))
            const getTransactions = []
            for (let i = 0; i < getData.inputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    // Data.some(item => item.id === getData.inputs[i].hash)
                    true
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].inputs.some(item => item.id === getData.inputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'in',
                  date: getData.inputs[i].timestamp,
                  hash: getData.inputs[i].hash,
                  symbole: token,
                  amount: getData.inputs[i].value,
                  valueInDollar: getData.inputs[i].ValueInDollar,
                  address: getData.inputs[i].address,
                  entity: getData.inputs[i].entity,
                  label: getData.inputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            for (let i = 0; i < getData.outputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    // Data.some(item => item.id === getData.outputs[i].hash)
                    true
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].outputs.some(item => item.id === getData.outputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'out',
                  date: getData.outputs[i].timestamp,
                  hash: getData.outputs[i].hash,
                  symbole: token,
                  amount: getData.outputs[i].value,
                  valueInDollar: getData.outputs[i].ValueInDollar,
                  address: getData.outputs[i].address,
                  entity: getData.outputs[i].entity,
                  label: getData.outputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            SetAddressTransactions(getTransactions)
          }
        })
        .catch((err) => {
          console.log(err)
          setTableLoading(false)
        })
    } else {

      GetRequest(address)
        .then((response) => {
          setTableLoading(false)
          const getData = (Account_Token_Address(response.data.data, AddressSelectedData.id, network, 0))
          const getTransactions = []
          for (let i = 0; i < getData.logs.inputs.length; i++) {
            getTransactions.push(
              {
                show: Data.some(item => item.id === getData.logs.inputs[i].hash) ? true : false,
                loading: false,
                mode: 'in',
                date: getData.logs.inputs[i].timestamp,
                hash: getData.logs.inputs[i].hash,
                symbole: token,
                amount: getData.logs.inputs[i].value,
                valueInDollar: getData.logs.inputs[i].ValueInDollar,
                address: getData.logs.inputs[i].address,
                entity: getData.logs.inputs[i].entity,
                label: getData.logs.inputs[i].Label,
                Risk: null,
                metadata: null,
              }
            )
          }
          for (let i = 0; i < getData.logs.outputs.length; i++) {
            getTransactions.push(
              {
                show: Data.some(item => item.id === getData.logs.outputs[i].hash) ? true : false,
                loading: false,
                mode: 'out',
                date: getData.logs.outputs[i].timestamp,
                hash: getData.logs.outputs[i].hash,
                symbole: token,
                amount: getData.logs.outputs[i].value,
                valueInDollar: getData.logs.outputs[i].ValueInDollar,
                address: getData.logs.outputs[i].address,
                entity: getData.logs.outputs[i].entity,
                label: getData.logs.outputs[i].Label,
                Risk: null,
                metadata: null,
              }
            )
          }
          console.log(getTransactions)
          SetAddressTransactions(getTransactions)
        })
        .catch((err) => {
          setTableLoading(false)
        })
    }
  }

  const handlePagination = (page) => {
    console.log(page)
    setFirst(page.page * 10);
    GetMoreData(page.page + 1);
  };

  const removeSelectedData = (row) => {

    if (row.mode === 'out') {
      let GetData = Data
      let outputs = GetData.find(item => item.id === AddressSelectedData.id).outputs
      outputs = outputs.filter(item => item.id !== row.hash)
      GetData[GetData.findIndex(item => item.id === AddressSelectedData.id)].outputs = outputs

      let GetTrInputs = GetData.find(item => item.id === row.hash).inputs
      GetTrInputs = GetTrInputs.filter(item => item.id !== AddressSelectedData.id)
      GetData[GetData.findIndex(item => item.id === row.hash)].inputs = GetTrInputs
      SetData(GetData)
      SetReload(!Reload)
      RemoveTxChecker(GetData)
      const tmp2 = AddressTransactions.map(item => ({ ...item }));
      const idx2 = tmp2.findIndex(item => item.hash === row.hash);
      if (idx2 !== -1) tmp2[idx2].show = false;
      SetAddressTransactions(tmp2);
    }

    if (row.mode === 'in') {
      let GetData = Data
      let inputs = GetData.find(item => item.id === AddressSelectedData.id).inputs
      inputs = inputs.filter(item => item.id !== row.hash)
      GetData[GetData.findIndex(item => item.id === AddressSelectedData.id)].inputs = inputs

      let GetTrOutputs = GetData.find(item => item.id === row.hash).outputs
      GetTrOutputs = GetTrOutputs.filter(item => item.id !== AddressSelectedData.id)
      GetData[GetData.findIndex(item => item.id === row.hash)].outputs = GetTrOutputs
      SetData(GetData)
      SetReload(!Reload)
      RemoveTxChecker(GetData)
      const tmp2 = AddressTransactions.map(item => ({ ...item }));
      const idx2 = tmp2.findIndex(item => item.hash === row.hash);
      if (idx2 !== -1) tmp2[idx2].show = false;
      SetAddressTransactions(tmp2);
    }
  }

  const addSelectedData = async (row) => {
    let ProccessData = Data

    if (row.mode === 'out') {
      let SelectedAddress = AddressSelectedData
      if (!SelectedAddress.outputs.some(item => item.id === row.hash)) {
        SelectedAddress.outputs.push(
          {
            id: row.hash,
            text: row.hash,
            value: row.amount,
            time: row.date,
            symbol: row.symbole,
            DollarValue: row.valueInDollar,
            color: false
          }
        )
      }
      ProccessData.find(item => item.id === SelectedAddress.id).outputs = SelectedAddress.outputs
    } else if (row.mode === 'in') {
      let SelectedAddress = AddressSelectedData
      if (!SelectedAddress.inputs.some(item => item.id === row.hash)) {
        SelectedAddress.inputs.push(
          {
            id: row.hash,
            text: row.hash,
            value: row.amount,
            time: row.date,
            symbol: row.symbole,
            DollarValue: row.valueInDollar,
            color: false
          }
        )
      }
      ProccessData.find(item => item.id === SelectedAddress.id).inputs = SelectedAddress.inputs
    }

    if (!ProccessData.some(item => item.id === row.hash)) {

      let x = AddressSelectedData.x
      let y = AddressSelectedData.y

      if (row.mode === 'out') {
        x = x - 300
      } else {
        x = x + 300
      }

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
          ProccessData.push(
            {
              id: row.hash,
              text: row.hash,
              type: "transaction",
              label: null,
              entity: null,
              risk: null,
              metadata: null,
              x: x,
              y: y,
              main: row.hash === address,
              inputs: row.mode === 'out' ? [
                {
                  id: AddressSelectedData.id,
                  text: AddressSelectedData.id,
                  value: row.amount,
                  time: row.date,
                  symbol: row.symbole,
                  DollarValue: row.valueInDollar,
                  color: false
                },
              ] : [],
              outputs: row.mode === 'in' ? [
                {
                  id: AddressSelectedData.id,
                  text: AddressSelectedData.id,
                  value: row.amount,
                  time: row.date,
                  symbol: row.symbole,
                  DollarValue: row.valueInDollar,
                  color: false
                },
              ] : [],
              network: "TRX",
              token: "USDT",
            }
          )

          check = false
        }
      }

    }

    //اگر اکانت بیس بود، آدرس هم اصافه کنه
    if (Networks.find(item => item.symbole === network).type === 'account') {
      if (!ProccessData.some(item => item.id === row.address)) {
        let x = AddressSelectedData.x
        let y = AddressSelectedData.y

        if (row.mode === 'out') {
          x = x - 600
        } else {
          x = x + 600
        }

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
            const tmp = AddressTransactions.map(item => ({ ...item }));
            const idx = tmp.findIndex(item => item.hash === row.hash);
            if (idx !== -1) tmp[idx].loading = true;
            SetAddressTransactions(tmp);

            try {
              // ۱. اجرا هم‌زمان دو درخواست
              setCanAdd(false)
              const [riskRes, detailRes] = await Promise.all([
                GetRequest(`${serverAddress}/explorer/risk-score/?address=${row.address}&network=${network}`),
                GetRequest(`${serverAddress}/explorer/address-detail?query=${row.address}`)
              ]);


              ProccessData.push(
                {
                  id: row.address,
                  text: row.address,
                  type: "address",
                  label: row.label ? row.label : null,
                  entity: row.entity,
                  risk: riskRes.status === 200 ? riskRes.data.risk_score : null,
                  metadata: detailRes.status === 200 ? detailRes.data.address_detail.metadata !== null ? detailRes.data.address_detail.metadata.label : null : null,
                  x: x,
                  y: y,
                  main: row.hash === address,
                  inputs: row.mode === 'out' ? [
                    {
                      id: row.hash,
                      text: row.hash,
                      value: row.amount,
                      time: row.date,
                      symbol: row.symbole,
                      DollarValue: row.valueInDollar,
                      color: false
                    },
                  ] : [],
                  outputs: row.mode === 'in' ? [
                    {
                      id: row.hash,
                      text: row.hash,
                      value: row.amount,
                      time: row.date,
                      symbol: row.symbole,
                      DollarValue: row.valueInDollar,
                      color: false
                    },
                  ] : [],
                  network: "TRX",
                  token: "USDT",
                }
              )

              SetData(ProccessData)
              setCanAdd(true)

              const tmp2 = AddressTransactions.map(item => ({ ...item }));
              const idx2 = tmp2.findIndex(item => item.hash === row.hash);
              if (idx2 !== -1) tmp2[idx2].loading = false;
              SetAddressTransactions(tmp2);
              // SetLoading(false)
            } catch (err) {
              setCanAdd(true)

              console.log(err)
              ProccessData.push(
                {
                  id: row.address,
                  text: row.address,
                  type: "address",
                  label: row.label ? row.label : null,
                  entity: row.entity,
                  risk: null,
                  metadata: null,
                  x: x,
                  y: y,
                  main: row.hash === address,
                  inputs: row.mode === 'out' ? [
                    {
                      id: row.hash,
                      text: row.hash,
                      value: row.amount,
                      time: row.date,
                      symbol: row.symbole,
                      DollarValue: row.valueInDollar,
                      color: false
                    },
                  ] : [],
                  outputs: row.mode === 'in' ? [
                    {
                      id: row.hash,
                      text: row.hash,
                      value: row.amount,
                      time: row.date,
                      symbol: row.symbole,
                      DollarValue: row.valueInDollar,
                      color: false
                    },
                  ] : [],
                  network: "TRX",
                  token: "USDT",
                }
              )
              const tmp2 = AddressTransactions.map(item => ({ ...item }));
              const idx2 = tmp2.findIndex(item => item.hash === row.hash);
              if (idx2 !== -1) tmp2[idx2].loading = false;
              SetAddressTransactions(tmp2);

              SetData(ProccessData)
              // SetLoading(false)

            } finally {
              // SetLoading(false);
              // SetShowGraph(true);
            }


            check = false
          }
        }

      } else {
        let foundedNode = ProccessData.find(item => item.id === row.address)
        if (row.mode === 'out') {
          if (!foundedNode.inputs.some(item => item.id === row.hash)) {
            foundedNode.inputs.push(
              {
                id: row.hash,
                text: row.hash,
                value: row.amount,
                time: row.date,
                symbol: row.symbole,
                DollarValue: row.valueInDollar,
                color: false
              }
            )
          }
        } else {
          if (!foundedNode.outputs.some(item => item.id === row.hash)) {
            foundedNode.outputs.push(
              {
                id: row.hash,
                text: row.hash,
                value: row.amount,
                time: row.date,
                symbol: row.symbole,
                DollarValue: row.valueInDollar,
                color: false
              }
            )
          }
        }
        const idx = ProccessData.findIndex(item => item.id === row.address)
        if (idx !== -1) {
          ProccessData[idx] = foundedNode;
        }
      }
    }
    SetData(ProccessData)

    const tmp2 = AddressTransactions.map(item => ({ ...item }));
    const idx2 = tmp2.findIndex(item => item.hash === row.hash);
    if (idx2 !== -1) tmp2[idx2].show = true;
    SetAddressTransactions(tmp2);

    SetReload(!Reload)
  }

  //table
  const addOrRemove = (row) => {
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
              removeSelectedData(row)
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
                addSelectedData(row)
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
  const DateField = (row) => {
    return (
      <div style={{ marginBottom: "-12px" }}>
        <p
          style={{
            marginBottom: "-8px",
            fontSize: "13px",
            marginTop: "-8px",
            fontWeight: "bold",
          }}
        >{`${(MiladiCalendar(row.date).year)}/${(
          MiladiCalendar(row.date).month
        )}/${(MiladiCalendar(row.date).day)}`}</p>
        <small style={{ fontSize: "12px", color: "gray" }}>{`${(
          MiladiCalendar(row.date).hour
        )}:${(MiladiCalendar(row.date).minute)}`}</small>
      </div>
    );
  };
  const TrHash = (row) => {
    return (
      <div
        style={{ marginTop: "-12px", marginBottom: "-16px", fontSize: "14px" }}
      >
        {AddressFormat(row.hash, 6, 'transaction', network)}
      </div>
    );
  };
  const TrValue = (row) => {
    return (
      <p
        style={{
          color: row.mode === "in" ? "green" : "red",
          direction: "ltr",
          fontSize: "13px",
          marginTop: "-12px",
          marginBottom: "-16px",
        }}
      >
        {ShowUSD
          ? !isNaN(row.valueInDollar) ? formatSmallNumber(row.valueInDollar) : 'نامشخص'
          : formatSmallNumber(row.amount)}{" "}
        {ShowUSD ? "USD" : row.symbole}
      </p>
    );
  };
  const CounterParty = (row) => {
    if (row.entity) {
      return (
        <p
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
              {AddressFormat(row.address, 4, 'transaction', network)}
            </>
          ) : null}
        </p>
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
              {AddressFormat(row.address, 4, 'transaction', network)}
            </>
          ) : null}
        </p>
      );
    }
  };

  const createAddress = () => {
    let address = `${serverAddress}/explorer/search/?query=${AddressSelectedData.id}&network=${network}`

    if (token !== network) {
      address = address + `&type=token-20&contractAddress=${contractAddress}`
    }

    // if (from_volume) {
    //   address = address + `$from_volume=${from_volume}`
    // }
    // if (end_volume) {
    //   address = address + `$end_volume=${end_volume}`
    // }
    // if (sort_order) {
    //   address = address + `$sort_order=${sort_order}`
    // }
    // if (sort_field) {
    //   address = address + `$sort_field=${sort_field}`
    // }

    return address
  }

  //Get Data
  useEffect(() => {
    setFirst(0)
    let address = createAddress()
    setTableLoading(true)
    GetRequest(address)
      .then((response) => {
        if (Networks.find(item => item.symbole === network).type === 'account') {
          if (network === token) {
            const getData = (Account_Address(response.data.data, AddressSelectedData.id, network, 0))
            const getTransactions = []
            for (let i = 0; i < getData.inputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    Data.some(item => item.id === getData.inputs[i].hash)
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].inputs.some(item => item.id === getData.inputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'in',
                  date: getData.inputs[i].timestamp,
                  hash: getData.inputs[i].hash,
                  symbole: token,
                  amount: getData.inputs[i].value,
                  valueInDollar: getData.inputs[i].ValueInDollar,
                  address: getData.inputs[i].address,
                  entity: getData.inputs[i].entity,
                  label: getData.inputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            for (let i = 0; i < getData.outputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    Data.some(item => item.id === getData.outputs[i].hash)
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].outputs.some(item => item.id === getData.outputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'out',
                  date: getData.outputs[i].timestamp,
                  hash: getData.outputs[i].hash,
                  symbole: token,
                  amount: getData.outputs[i].value,
                  valueInDollar: getData.outputs[i].ValueInDollar,
                  address: getData.outputs[i].address,
                  entity: getData.outputs[i].entity,
                  label: getData.outputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            SetAddressTransactions(getTransactions)
          } else {
            const getData = (Account_Token_Address(response.data.data, AddressSelectedData.id, network, 0))
            const getTransactions = []
            for (let i = 0; i < getData.logs.inputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    // Data.some(item => item.id === getData.logs.inputs[i].hash)
                    true
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].inputs.some(item => item.id === getData.logs.inputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'in',
                  date: getData.logs.inputs[i].timestamp,
                  hash: getData.logs.inputs[i].hash,
                  symbole: token,
                  amount: getData.logs.inputs[i].value,
                  valueInDollar: getData.logs.inputs[i].ValueInDollar,
                  address: getData.logs.inputs[i].address,
                  entity: getData.logs.inputs[i].entity,
                  label: getData.logs.inputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            for (let i = 0; i < getData.logs.outputs.length; i++) {
              getTransactions.push(
                {
                  show: (
                    // Data.some(item => item.id === getData.logs.outputs[i].hash)
                    true
                    &&
                    Data[Data.findIndex(item => item.id === AddressSelectedData.id)].outputs.some(item => item.id === getData.logs.outputs[i].hash)
                  ) ? true : false,
                  loading: false,
                  mode: 'out',
                  date: getData.logs.outputs[i].timestamp,
                  hash: getData.logs.outputs[i].hash,
                  symbole: token,
                  amount: getData.logs.outputs[i].value,
                  valueInDollar: getData.logs.outputs[i].ValueInDollar,
                  address: getData.logs.outputs[i].address,
                  entity: getData.logs.outputs[i].entity,
                  label: getData.logs.outputs[i].Label,
                  Risk: null,
                  metadata: null,
                }
              )
            }
            SetAddressTransactions(getTransactions)
          }
        } else {
          const getData = (UTXO_Address(AddressSelectedData.id, response.data.data, network, 0))
          const getTransactions = []
          for (let i = 0; i < getData.inputs.length; i++) {
            getTransactions.push(
              {
                show: (
                  // Data.some(item => item.id === getData.inputs[i].hash)
                  true
                  &&
                  Data[Data.findIndex(item => item.id === AddressSelectedData.id)].inputs.some(item => item.id === getData.inputs[i].hash)
                ) ? true : false,
                loading: false,
                mode: 'in',
                date: getData.inputs[i].timestamp,
                hash: getData.inputs[i].hash,
                symbole: token,
                amount: getData.inputs[i].value,
                valueInDollar: getData.inputs[i].ValueInDollar,
                address: getData.inputs[i].address,
                entity: getData.inputs[i].entity,
                label: getData.inputs[i].Label,
                Risk: null,
                metadata: null,
              }
            )
          }
          for (let i = 0; i < getData.outputs.length; i++) {
            getTransactions.push(
              {
                show: (
                  // Data.some(item => item.id === getData.outputs[i].hash)
                  true
                  &&
                  Data[Data.findIndex(item => item.id === AddressSelectedData.id)].outputs.some(item => item.id === getData.outputs[i].hash)
                ) ? true : false,
                loading: false,
                mode: 'out',
                date: getData.outputs[i].timestamp,
                hash: getData.outputs[i].hash,
                symbole: token,
                amount: getData.outputs[i].value,
                valueInDollar: getData.outputs[i].ValueInDollar,
                address: getData.outputs[i].address,
                entity: getData.outputs[i].entity,
                label: getData.outputs[i].Label,
                Risk: null,
                metadata: null,
              }
            )
          }
          SetAddressTransactions(getTransactions)
        }
        setTableLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setTableLoading(false)
      })

  }, [from_volume, end_volume, sort_order, sort_field, AddressSelectedData])

  //set activities
  useEffect(() => {
    SetActivityLoading(true)
    if (token === network) {
      GetRequest(`${serverAddress}/explorer/address-aggregation/?query=${AddressSelectedData.id}&network=${network}`)
        .then((response) => {
          SetActivityLoading(false)
          if (response.status === 200) {
            SetTrNumber(response.data.transactions)
            const FA = response.data.first_activity > 10000000000 ? response.data.first_activity : response.data.first_activity * 1000
            const LA = response.data.last_activity > 10000000000 ? response.data.last_activity : response.data.last_activity * 1000
            SetJalaliFirstActivity(`${JalaliCalendar(FA).year}/${JalaliCalendar(FA).month}/${JalaliCalendar(FA).day}`)
            SetJalalaliLastActivity(`${JalaliCalendar(LA).year}/${JalaliCalendar(LA).month}/${JalaliCalendar(LA).day}`)
            SetMiladiFirstActivity(`${MiladiCalendar(FA).year}/${MiladiCalendar(FA).month}/${MiladiCalendar(FA).day}`)
            SetMiladiLastActivity(`${MiladiCalendar(LA).year}/${MiladiCalendar(LA).month}/${MiladiCalendar(LA).day}`)
            SetBalance(response.data.balance)
          }
        })
        .catch((err) => {
          SetActivityLoading(false)
        })
    } else {
      GetRequest(`${serverAddress}/explorer/token-transfer-list/?query=${AddressSelectedData.id}&network=${network}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            const Result = response.data.find(item => item.symbol === token)
            SetJalaliFirstActivity(`${JalaliCalendar(Result.first_activity).year}/${JalaliCalendar(Result.first_activity).month}/${JalaliCalendar(Result.first_activity).day}`)
            SetJalalaliLastActivity(`${JalaliCalendar(Result.last_activity).year}/${JalaliCalendar(Result.last_activity).month}/${JalaliCalendar(Result.last_activity).day}`)
            SetMiladiFirstActivity(`${MiladiCalendar(Result.first_activity).year}/${MiladiCalendar(Result.first_activity).month}/${MiladiCalendar(Result.first_activity).day}`)
            SetMiladiLastActivity(`${MiladiCalendar(Result.last_activity).year}/${MiladiCalendar(Result.last_activity).month}/${MiladiCalendar(Result.last_activity).day}`)
            SetBalance(Result.crypto_balance * Math.pow(10, -Result.decimals))
            SetActivityLoading(false)
          }
        })
        .catch((err) => { SetActivityLoading(false) })
    }

  }, [,AddressSelectedData])

  //transaction number
  useEffect(() => {
    if (network !== token) {
      GetRequest(`${serverAddress}/explorer/total-transaction/?type=asset_transactions&contract_address=${contractAddress}&query=${AddressSelectedData.id}&network=${network}`)
        .then((response) => {
          if (response.status === 200) {
            SetTrNumber(response.data.total_document)
          }
        })
    }
  }, [, AddressSelectedData])

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

  return (
    <div>
      <h6 className="p-3 pb-0">
        <span>
          مشخصات آدرس {Networks.find((item) => item.symbole === network).name}
        </span>
        <span className="float-left">
          {AddressSelectedData.risk !== null ? AddressSelectedData.risk + "%" : "نامشخص"}
          <ion-icon
            style={{
              color: "white",
              padding: "4px",
              borderRadius: "50%",
              marginBottom: "-6px",
              marginRight: "4px",
              background:
                AddressSelectedData.risk <= 25
                  ? "green"
                  : AddressSelectedData.risk <= 50
                  ? "blue"
                  : AddressSelectedData.risk < 70
                  ? "orange"
                  : "red",
              fontSize: "16px",
            }}
            name="flash"
          ></ion-icon>
        </span>
      </h6>
  
      {/* کارت آدرس */}
      <div
        className="w-full p-[15px] mr-0 shadow-none border-0 rounded-none"
        style={{ background: "rgb(240,240,240)" }}
      >
        <div className="border-0">
          <div>
            <a>{AddressSelectedData.id}</a>
            <a
              href={`/researcher/${network}/${AddressSelectedData.id}/address`}
              style={{ color: "inherit" }}
            >
              <ion-icon
                name="open-outline"
                style={{ fontSize: "20px", marginRight: "4px", marginBottom: "-4px" }}
                title="نمایش آدرس"
              ></ion-icon>
            </a>
  
            <ion-icon
              title="کپی آدرس"
              name="copy-outline"
              style={{
                fontSize: "20px",
                marginRight: "4px",
                marginBottom: "-4px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(AddressSelectedData.id);
                return toast.success("آدرس مورد نظر در کلیپ‌بورد کپی شد.", {
                  position: "bottom-left",
                });
              }}
            ></ion-icon>
  
            <ion-icon
              name="trash-outline"
              title="حذف آدرس"
              style={{
                fontSize: "20px",
                marginRight: "4px",
                marginBottom: "-4px",
                cursor: "pointer",
              }}
              onClick={() => {
                RemoveAddress(AddressSelectedData.id);
              }}
            ></ion-icon>
          </div>
        </div>
      </div>
  
      {/* وضعیت فعالیت و مشخصات */}
      <div className="m-0 mt-0 p-0 w-full">
        {ActivityLoading ? (
          <div className="pt-5" style={{ background: "rgb(240,240,240)" }}>
            loading...
          </div>
        ) : (
          <div
            className="m-0 p-3 pb-0"
            style={{ background: "rgb(240,240,240)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-0 p-0">
              <div className="m-0 p-0">
                <p className="text-[13px] text-gray-500 mb-0">مالک</p>
                {AddressSelectedData.entity !== null ? (
                  <a className="bg-[rgb(47,163,221)] text-white px-3 py-0.5 rounded">
                    {AddressSelectedData.entity.name}
                  </a>
                ) : (
                  <p className="font-bold">نامشخص</p>
                )}
              </div>
  
              <div className="m-0 p-0">
                <p className="text-[13px] text-gray-500 mb-0">موجودی</p>
                <p className="font-bold">
                  {Balance}
                  <small className="ml-1">{token}</small>
                </p>
              </div>
  
              <div className="m-0 p-0">
                <p className="text-[13px] text-gray-500 mb-0">اولین فعالیت</p>
                <p className="font-bold">{MiladiFirstActivity}</p>
              </div>
  
              <div className="m-0 p-0">
                <p className="text-[13px] text-gray-500 mb-0">آخرین فعالیت</p>
                <p className="font-bold">{MiladiLastActivity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
  
      {/* تنظیمات */}
      <h6 className="p-3 pb-0 mb-0">تنظیمات</h6>
      <div className="m-0 mt-0 p-0 w-full">
        <div className="m-0 p-0 pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={ShowUSD}
              id="ShowPriceCheckbox"
              onChange={(e) => {
                setShowUSD(e.target.checked);
              }}
            />
            <label htmlFor="ShowPriceCheckbox" className="mt-0 cursor-pointer">
              نمایش قیمت
            </label>
          </div>
  
          {Networks.find((item) => item.symbole === network).type === "account" ? (
            <div className="flex items-center gap-2">
              <Switch
                checked={ShowAddress}
                id="ShowAddressCheckbox"
                onChange={(e) => {
                  setShowAddress(e.target.checked);
                }}
              />
              <label htmlFor="ShowAddressCheckbox" className="mt-0 cursor-pointer">
                نمایش آدرس مقابل
              </label>
            </div>
          ) : null}
        </div>
      </div>
  
      {/* جدول تراکنش‌ها */}
      <div
        className="mt-3 border-y-2"
        style={{ borderColor: "rgb(240,240,240)" }}
      >
        {!TableLoading ? (
          AddressTransactions.length > 0 ? (
            <DataTable
              value={AddressTransactions}
              className="custom-data-table no-row-background GraphAddresBoxTable"
              style={{
                borderRadius: "0px",
                borderStyle: "none",
                boxShadow: "none",
              }}
            >
              <Column body={addOrRemove} bodyStyle={{ textAlign: "right", userSelect: "text" }} />
              <Column body={DateField} bodyStyle={{ textAlign: "right", userSelect: "text" }} header={<div>تاریخ</div>} />
              <Column body={TrHash} bodyStyle={{ textAlign: "right", userSelect: "text" }} header="آدرس تراکنش" />
              <Column body={TrValue} bodyStyle={{ textAlign: "right", userSelect: "text" }} header={<div>حجم تراکنش</div>} />
              {Networks.find((item) => item.symbole === network).type === "account" ? (
                <Column body={CounterParty} bodyStyle={{ textAlign: "right", userSelect: "text" }} header="طرف مقابل" />
              ) : null}
            </DataTable>
          ) : (
            "no data"
          )
        ) : (
          "loading"
        )}
  
        <Paginator
          className="paginator-table no-row-background"
          first={first}
          rows={10}
          totalRecords={TrNumber}
          rowsPerPageOptions={10}
          onPageChange={handlePagination}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{totalRecords} تراکنش"
        />
      </div>
    </div>
  );
  
}

export default AddressBox
