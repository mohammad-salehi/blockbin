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
import { JalaliCalendar } from '@/functions/jalaliCalendar';
import { Account_Token_Address } from '@/functions/NetworksProcessor/Account_Token_Address';
import { Account_Address } from '@/functions/NetworksProcessor/Account_Address';
import { UTXO_Address } from '@/functions/NetworksProcessor/UTXO_Address';
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable';
import ExploreTopBoxLoading from '@/components/ExploreTopBoxLoading/ExploreTopBoxLoading';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';

const AddressBox = ({ Data, SetData, AddressSelectedData, Reload, SetReload }) => {
  const params = useParams();
  const { network, hash } = params;
  const rest = Array.isArray(params.rest) ? params.rest : [];
  const token = rest[0];            
  const contractAddress = rest[1];  
  const id = rest[2]; 
  const [AddressTransactions, SetAddressTransactions] = useState([])

  const [from_volume, setfrom_volume] = useState(false);
  const [end_volume, setend_volume] = useState(false);
  const [ShowUSD, setShowUSD] = useState(false);
  const [sort_order, Setsort_order] = useState('descending');
  const [sort_field, Setsort_field] = useState('time');
  const [ShowAddress, setShowAddress] = useState(false);
  const [first, setFirst] = useState(1);
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
    address = address + `&page_number=${page}&page_size=10`

    if (token !== network) {
      address = address + `&type=token-20&contract_address=${contractAddress}`
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
    setFirst(page);
    GetMoreData(page);
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
              main: row.hash === hash,
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
                  main: row.hash === hash,
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
              cursor: "pointer",
            }}
            className='text-TextRed'
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
              cursor: CanAdd ? "pointer" : 'inherit',
            }}
            className='text-TextGreen'
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
        className={row.mode === 'in' ? ` text-TextGreen` : ` text-TextRed`}
        style={{
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
            className={row.mode === 'in' ? `bg-BgGreen text-TextGreen` : `bg-BgRed text-TextRed`}
            style={{

              padding: '1px 12px',
              borderRadius: '4px'
            }}
          >
            {row.entity.name}
          </span>
          {ShowAddress ? (
            <div>
              <br />
              {AddressFormat(row.address, 4, 'transaction', network)}
            </div>
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
    setFirst(1)
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

  }, [, AddressSelectedData])

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

  const columns = [
    {
      header: "",
      cell: (row) => addOrRemove(row),
    },
    {
      header: "تاریخ",
      cell: (row) => DateField(row),
    },
    {
      header: "آدرس تراکنش",
      cell: (row) => TrHash(row),
    },
    {
      header: "حجم تراکنش",
      cell: (row) => TrValue(row),
    },
    ...(Networks.find((item) => item.symbole === network)?.type === "account"
      ? [
        {
          header: "طرف مقابل",
          cell: (row) => CounterParty(row),
        },
      ]
      : []),
  ];

  return (
    <div className='text-textColor'>
      <h6 className="p-3 pb-0">
        <span>
          <img src={`/images/${network}.png`} className='w-8 inline-block ' />
          مشخصات آدرس {Networks.find((item) => item.symbole === network).name}
        </span>
        <span className="float-left">

          {AddressFormat(AddressSelectedData.id, 10, 'transaction', network)}
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className='inline-block cursor-pointer mr-2' onClick={() => { RemoveAddress(AddressSelectedData.id) }}>
            <path fill="currentColor" d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z" />
          </svg>
        </span>
      </h6>

      {/* وضعیت فعالیت و مشخصات */}
      <div className="m-0 mt-4 p-0 w-full ">
        {ActivityLoading ? (
          <div className="p-2  bg-TableBorder" >
            <ExploreTopBoxLoading/>
          </div>
        ) : (
          <div
            className="m-0 p-3 pb-3 bg-TableBorder"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-0 p-0">
              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">مالک</p>
                {AddressSelectedData.entity !== null ? (
                  <a className="bg-BgGreen text-TextGreen px-3 py-0.5 rounded">
                    {AddressSelectedData.entity.name}
                  </a>
                ) : (
                  <p className="font-bold">نامشخص</p>
                )}
              </div>

              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">ریسک</p>
                {AddressSelectedData.risk !== null ? (
                  <p className="font-bold">
                    <svg fill={AddressSelectedData.risk === null ? 'currentColor' : AddressSelectedData.risk < 25 ? 'green' : AddressSelectedData.risk < 50 ? 'blue' : AddressSelectedData.risk < 70 ? 'orange' : 'red'} height="20px" width="20px" version="1.1" id="Layer_1" className='inline-block ml-1'
                      viewBox="0 0 512 512" >
                      <g>
                        <g>
                          <path d="M507.494,426.066L282.864,53.537c-5.677-9.415-15.87-15.172-26.865-15.172c-10.995,0-21.188,5.756-26.865,15.172
			L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h449.259
			c11.314,0,21.751-6.093,27.315-15.944C513.508,447.839,513.336,435.755,507.494,426.066z M256.167,167.227
			c12.901,0,23.817,7.278,23.817,20.178c0,39.363-4.631,95.929-4.631,135.292c0,10.255-11.247,14.554-19.186,14.554
			c-10.584,0-19.516-4.3-19.516-14.554c0-39.363-4.63-95.929-4.63-135.292C232.021,174.505,242.605,167.227,256.167,167.227z
			 M256.498,411.018c-14.554,0-25.471-11.908-25.471-25.47c0-13.893,10.916-25.47,25.471-25.47c13.562,0,25.14,11.577,25.14,25.47
			C281.638,399.11,270.06,411.018,256.498,411.018z"/>
                        </g>
                      </g>
                    </svg>
                    <span className="ml-1">{AddressSelectedData.risk}%</span>
                  </p>
                ) : (
                  <p className="font-bold">نامشخص</p>
                )}
              </div>

              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">اولین فعالیت</p>
                <p className="font-bold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                    <path d="M12 12V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {MiladiFirstActivity}</p>
              </div>

              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">آخرین فعالیت</p>
                <p className="font-bold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='inline-block ml-1'>
                    <path d="M12 12V17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {MiladiLastActivity}</p>
              </div>

              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">موجودی</p>

                <p className="font-bold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-1 inline-block'>
                    <path d="M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 10.5C22 10.4226 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.5774 22 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="18" cy="12" r="1" fill="currentColor" />
                    <path d="M13 4C16.7712 4 18.6569 4 19.8284 5.17157C20.6366 5.97975 20.8873 7.1277 20.965 9M10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15M9 4.00093C5.8857 4.01004 4.23467 4.10848 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C3.82475 19.4816 4.69989 19.7706 6 19.8985" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {Balance}
                  <small className="ml-1">{token}</small>
                </p>
              </div>

              <div className="m-0 p-0">
                <p className="text-[13px] text-textTitleColor mb-0">تعداد تراکنش‌ها</p>

                <p className="font-bold">
                  <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='inline-block ml-1'>
                    <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z" />
                  </svg>
                  {TrNumber}
                </p>
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
        className="mt-3 mb-4 "
      >
        {!TableLoading ? (
          <ExpandableTable
            data={AddressTransactions}          // ← فقط دیتای فیلترشده را بده
            columns={columns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />

        ) : (
          <SkeletonLoading />
        )}
        <Pagination
          rtl
          totalItems={TrNumber}
          pageSize={10}
          currentPage={first}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );

}

export default AddressBox
