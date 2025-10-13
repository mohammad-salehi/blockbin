"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";
// import SearchTokens from "./components/TokenSelection/SearchTokens";
// import LoadingButton from "../../components/loadinButton/LoadingButton";
import toast from 'react-hot-toast'

// import ReportModal from "./components/ReportBox/ReportBox";
import { Networks } from "@/functions/Networks";
// import { selectThemeColors } from '@utils'
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import { Account_Address } from "@/functions/NetworksProcessor/Account_Address";
import { Account_Token_Address } from "@/functions/NetworksProcessor/Account_Token_Address";
import { Account_transaction } from "@/functions/NetworksProcessor/Account_transaction";
import { UTXO_Transaction } from "@/functions/NetworksProcessor/UTXO_Transaction";
import FuckingGraph_V2 from "@/components/Tracker/graph/Graph";
import FullPageLoading from "@/components/FullPageLoading/FullPageLoading";

const Page = () => {

  const { id } = useParams()
  const { hash } = useParams()
  const { network } = useParams()
  const { token } = useParams()
  const { contractAddress } = useParams()

  //actions
  const [Reload, SetReload] = useState(false);
  const [TakeSceenShot, SetTakeSceenShot] = useState(false);
  const [Loading, SetLoading] = useState(true);

  //graph Draw values
  const [NodesPosition, SetNodesPosition] = useState([]);
  const [SavedPositions, SetSavedPositions] = useState([])
  const [Distance, SetDistance] = useState(300)
  const [Scale, SetScale] = useState(1)
  const [XPosition, SetXPosition] = useState(0)
  const [YPosition, SetYPosition] = useState(800)
  const [SelectedEdges, SetSelectedEdges] = useState([]);
  const [PaintedEdges, SetPaintedEdges] = useState([])
  const [Data, SetData] = useState([]);
  const [Name, SetName] = useState('')
  const [Description, SetDescription] = useState('')

  //graph setting
  const [ShowPrice, SetShowPrice] = useState(false)
  const [ShowValues, SetShowValues] = useState(true)
  const [ShowTimes, SetShowTimes] = useState(true)
  const [ShowGuides, SetShowGuides] = useState(false)
  const [OpenSaveBox, SetOpenSaveBox] = useState(false)


  //start graph drawing
  const [ShowGraph, SetShowGraph] = useState(false);
  const [SelectTokenBox, SetSelectTokenBox] = useState(false);
  const [ReportBox, SetReportBox] = useState(false);

  useEffect(() => {
    document.title = `بلاک‌بین`
  })

  const SetColor = (color) => {
    const Edges = []
    for (let i = 0; i < PaintedEdges.length; i++) {
      Edges.push(PaintedEdges[i])
    }
    for (let i = 0; i < SelectedEdges.length; i++) {
      if (!Edges.some(item => (item.from === SelectedEdges[i].from && item.to === SelectedEdges[i].to))) {
        Edges.push(
          {
            from: SelectedEdges[i].from,
            to: SelectedEdges[i].to,
            color: color
          }
        )
      } else {
        Edges.find(item => (item.from === SelectedEdges[i].from && item.to === SelectedEdges[i].to)).color = color
      }
    }
    SetPaintedEdges(Edges)
    SetReload(!Reload)
  }
  const DeleteColor = () => {
    let Edges = PaintedEdges
    for (let i = 0; i < SelectedEdges.length; i++) {
      Edges = Edges.filter(item => (item.from !== SelectedEdges[i].from && item.to !== SelectedEdges[i].to))
    }
    SetPaintedEdges(Edges)
  }

  const saveGraph = () => {

    let GraphName
    let GraphDescription

    GraphName = document.getElementById('GraphName').value
    GraphDescription = document.getElementById('GraphDescription').value

    if (GraphName !== '' || id !== undefined) {
      if (Data.length > 0) {
        if (id !== undefined) {
          SetLoading(true)
          //Error Done
          axios.put(`${serverAddress}/tracing/graph/${Number(id)}/`,
            {
              value: {
                GraphName: GraphName,
                NodesPosition,
                SavedPositions,
                Scale,
                XPosition,
                YPosition,
                PaintedEdges,
                Data,
                GraphDescription: GraphDescription,
                network,
                token,
                contractAddress
              },
              title: GraphName,
            },
            { headers: { Authorization: `Bearer ${Cookies.get('access')}` } })
            .then((response) => {
              SetLoading(false)
              //adad daghigh set she
              if (response.status === 200) {
                SetOpenSaveBox(false)

                // window.location.assign(`/tracker/loadGraph/${networkName}/${response.data.id}/${Token}`)
                return toast.success('با موفقیت ذخیره شد.', {
                  position: 'bottom-left'
                })

              } else {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            })
            .catch((err) => {
              SetLoading(false)
              try {
                if (err.response.status === 403) {
                  Cookies.set('refresh', '0')
                  Cookies.set('access', '0')
                  window.location.assign('/')
                } else if (err.response.status === 401) {
                  Cookies.set('refresh', '0')
                  Cookies.set('access', '0')
                  window.location.assign('/')
                } else {
                  return toast.error('ناموفق', {
                    position: 'bottom-left'
                  })
                }
              } catch (error) {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            })
        } else {
          SetLoading(false)
          //Error Done
          axios.post(`${serverAddress}/tracing/graph/`,
            {
              value: {
                GraphName: GraphName,
                NodesPosition,
                SavedPositions,
                Scale,
                XPosition,
                YPosition,
                PaintedEdges,
                Data,
                GraphDescription: GraphDescription,
                network,
                token,
                contractAddress
              },
              title: GraphName,

            },
            { headers: { Authorization: `Bearer ${Cookies.get('access')}` } })
            .then((response) => {
              SetLoading(false)
              if (response.status === 201) {
                SetOpenSaveBox(false)
                window.location.assign(`/tracker2/load/${network}/${response.data.id}/${token}/${contractAddress !== undefined ? contractAddress : ''}`)
              } else {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            })
            .catch((err) => {
              SetLoading(false)
              console.log(err)
              try {
                if (err.response.status === 403) {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                  return toast.error('دوباره به حساب کاربری وارد شوید.', {
                    position: 'bottom-left'
                  })
                } else if (err.response.status === 401) {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                  return toast.error('دوباره به حساب کاربری وارد شوید.', {
                    position: 'bottom-left'
                  })
                } else {
                  return toast.error('ناموفق', {
                    position: 'bottom-left'
                  })
                }
              } catch (error) {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            })
        }
      } else {
        return toast.error('گراف رسم نشده است.', {
          position: 'bottom-left'
        })
      }
    } else {
      return toast.error('عنوان گراف نباید خالی باشد.', {
        position: 'bottom-left'
      })
    }
  }

  //start Drawing Graph
  useEffect(() => {
    // token selection checker
    if (id === undefined) {

      if (token === undefined) {
        if (Networks.find(item => item.symbole === network).type === 'account') {
          SetSelectTokenBox(true)
        } else {
          window.location.assign(`/tracker2/${network}/${hash}/${network}`)
        }
      } else {
        //Get Trs data
        let GetAddress
        GetRequest(`${serverAddress}/explorer/network-detection/?query=${hash}`)
          .then((response) => {
            if (response.data.query === 'address') {
              if (token === network) {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}`
              } else {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}&page_number=1&page_size=10&type=token-20&contract_address=${contractAddress}`
              }
            } else {
              if (Networks.find(item => item.symbole === network).type === 'account') {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}&page_number=1&page_size=100`
              } else {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&page_number=0&page_size=0&network=${network}&pageNumberFrom=1&pageSizeFrom=2&pageNumberTo=1&pageSizeTo=2`
              }
            }
            GetRequest(GetAddress)
              .then(async (TrsResponse) => {
                if (TrsResponse.status === 200) {
                  if (Networks.find(item => item.symbole === network).type === 'account') {
                    if (response.data.query === 'address') {
                      if (network === token) {
                        const getData = (Account_Address(TrsResponse.data.data, hash, network, 0))
                        GetRequest(`${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`)
                          .then((RiskResponse) => {
                            let risk = null
                            if (RiskResponse.status === 200) {
                              const risk = (RiskResponse.data.risk_score)
                            }
                            let createdData = [{
                              id: hash,
                              text: hash,
                              type: "address",
                              label: getData.Label ? getData.Label : null,
                              main: true,
                              entity: getData.entity,
                              risk: risk,
                              x: 0,
                              y: 800,
                              metadata: getData.metadata,
                              inputs: [],
                              outputs: [],
                            }]
                            SetData(createdData)
                            SetLoading(false)
                            SetShowGraph(true)
                          })
                          .catch((err) => {
                            let createdData = [{
                              id: hash,
                              text: hash,
                              type: "address",
                              label: getData.Label ? getData.Label : null,
                              main: true,
                              entity: getData.entity,
                              risk: null,
                              x: 0,
                              y: 800,
                              metadata: getData.metadata,
                              inputs: [],
                              outputs: [],
                            }]
                            SetData(createdData)
                            SetLoading(false)
                            SetShowGraph(true)
                          })

                      } else {
                        const getData = (Account_Token_Address(TrsResponse.data.data, hash, network, 0))
                        GetRequest(`${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`)
                          .then((RiskResponse) => {
                            let risk = null
                            if (RiskResponse.status === 200) {
                              risk = (RiskResponse.data.risk_score)
                            }
                            
                            let createdData = [{
                              id: hash,
                              text: hash,
                              type: "address",
                              label: getData.Label ? getData.Label : null,
                              main: true,
                              entity: getData.entity,
                              risk: risk,
                              x: 0,
                              y: 800,
                              metadata: getData.metadata,
                              inputs: [],
                              outputs: [],
                            }]
                            SetData(createdData)
                            SetLoading(false)
                            SetShowGraph(true)
                          })
                          .catch((err) => {
                            let createdData = [{
                              id: hash,
                              text: hash,
                              type: "address",
                              label: getData.Label ? getData.Label : null,
                              main: true,
                              entity: getData.entity,
                              risk: null,
                              x: 0,
                              y: 800,
                              metadata: getData.metadata,
                              inputs: [],
                              outputs: [],
                            }]
                            SetData(createdData)
                            SetLoading(false)
                            SetShowGraph(true)
                          })
                      }
                    } else {
                      if (network === token) {
                        const getData = (Account_transaction(TrsResponse.data.data, network, 0))
                        let createdData = []

                        createdData.push(
                          {
                            id: hash,
                            text: hash,
                            type: "transaction",
                            label: null,
                            entity: null,
                            risk: null,
                            metadata: null,
                            x: 0,
                            y: 800,
                            main: true,
                            network: network,
                            inputs: [
                              {
                                id: getData.from,
                                text: getData.FromLabel ? getData.FromLabel : getData.FromEntity ? getData.FromEntity.name : getData.from,
                                DollarValue: getData.valueInDollar,
                                value: getData.value,
                                time: getData.timestamp,
                                symbol: getData.symbole,
                                color: false
                              },
                            ],
                            outputs: [
                              {
                                id: getData.to,
                                text: getData.ToLabel ? getData.ToLabel : getData.ToEntity ? getData.ToEntity.name : getData.to,
                                DollarValue: getData.valueInDollar,
                                value: getData.value,
                                time: getData.timestamp,
                                symbol: getData.symbole,
                                color: false
                              },
                            ],
                          }
                        )
                        createdData.push(
                          {
                            id: getData.from,
                            text: getData.from,
                            type: "address",
                            label: getData.FromLabel,
                            entity: getData.FromEntity,
                            risk: null,
                            x: 300,
                            y: 800,
                            metadata: getData.FromMetadata,
                            main: false,
                            inputs: [],
                            outputs: [
                              {
                                id: hash,
                                text: hash,
                                DollarValue: getData.valueInDollar,
                                value: getData.value,
                                time: getData.timestamp,
                                symbol: getData.symbole,
                                color: false
                              },
                            ],
                          },
                        )
                        createdData.push(
                          {
                            id: getData.to,
                            text: getData.to,
                            type: "address",
                            label: getData.ToLabel,
                            entity: getData.ToEntity,
                            risk: null,
                            x: -300,
                            y: 800,
                            metadata: getData.ToMetadata,
                            main: false,
                            inputs: [{
                              id: hash,
                              text: hash,
                              DollarValue: getData.valueInDollar,
                              value: getData.value,
                              time: getData.timestamp,
                              symbol: getData.symbole,
                              color: false
                            }],
                            outputs: [],
                          },
                        )
                        let FromRisk = null
                        let ToRisk = null
                        GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.from}&network=${network}`)
                          .then((RiskResponse) => {
                            if (RiskResponse.status === 200) {
                              FromRisk = (RiskResponse.data.risk_score)
                              GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`)
                                .then((RiskResponse) => {
                                  if (RiskResponse.status === 200) {
                                    ToRisk = (RiskResponse.data.risk_score)
                                    createdData.find(item => item.id === getData.from).risk = FromRisk
                                    createdData.find(item => item.id === getData.to).risk = ToRisk
                                  }
                                  SetData(createdData)
                                  SetLoading(false)
                                  SetShowGraph(true)
                                })
                                .catch((err) => {
                                  createdData.find(item => item.id === getData.from).risk = FromRisk
                                  SetData(createdData)
                                  SetLoading(false)
                                  SetShowGraph(true)
                                })
                            }else {
                              GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`)
                              .then((RiskResponse) => {
                                if (RiskResponse.status === 200) {
                                  ToRisk = (RiskResponse.data.risk_score)
                                  createdData.find(item => item.id === getData.from).risk = FromRisk
                                  createdData.find(item => item.id === getData.to).risk = ToRisk
                                }
                                SetData(createdData)
                                SetLoading(false)
                                SetShowGraph(true)
                              })
                              .catch((err) => {
                                createdData.find(item => item.id === getData.from).risk = FromRisk
                                SetData(createdData)
                                SetLoading(false)
                                SetShowGraph(true)
                              })
                            }
                          })
                          .catch((err) => {
                            GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`)
                              .then((RiskResponse) => {
                                if (RiskResponse.status === 200) {
                                  ToRisk = (RiskResponse.data.risk_score)
                                  createdData.find(item => item.id === getData.to).risk = ToRisk
                                }
                                SetData(createdData)
                                SetLoading(false)
                                SetShowGraph(true)
                              })
                              .catch((err) => {
                                SetData(createdData)
                                SetLoading(false)
                                SetShowGraph(true)
                              })
                          })

                      } else {
                        const getData = (Account_transaction(TrsResponse.data.data, network, 0))

                        for (let i = 0; i < getData.logs.length; i++) {
                          if (getData.logs[i].symbole === token) {
                            let createdData = []
                            createdData.push(
                              {
                                id: hash,
                                text: hash,
                                type: "transaction",
                                label: null,
                                entity: null,
                                risk: null,
                                metadata: null,
                                x: 0,
                                y: 800,
                                main: true,
                                network: network,
                                inputs: [
                                  {
                                    id: getData.logs[i].from,
                                    text: getData.logs[i].FromLabel ? getData.logs[i].FromLabel : getData.logs[i].FromEntity ? getData.logs[i].FromEntity.name : getData.logs[i].from,
                                    DollarValue: getData.logs[i].valueInDollar,
                                    value: getData.logs[i].value,
                                    time: getData.timestamp,
                                    symbol: getData.logs[i].symbole,
                                    color: false
                                  },
                                ],
                                outputs: [
                                  {
                                    id: getData.logs[i].to,
                                    text: getData.logs[i].ToLabel ? getData.logs[i].ToLabel : getData.logs[i].ToEntity ? getData.logs[i].ToEntity.name : getData.logs[i].to,
                                    DollarValue: getData.logs[i].valueInDollar,
                                    value: getData.logs[i].value,
                                    time: getData.timestamp,
                                    symbol: getData.logs[i].symbole,
                                    color: false
                                  },
                                ],
                              }
                            )
                            createdData.push(
                              {
                                id: getData.logs[i].from,
                                text: getData.logs[i].from,
                                type: "address",
                                label: getData.logs[i].FromLabel,
                                entity: getData.logs[i].FromEntity,
                                risk: null,
                                x: 300,
                                y: 800,
                                metadata: getData.logs[i].FromMetadata,
                                main: false,
                                inputs: [],
                                outputs: [
                                  {
                                    id: hash,
                                    text: hash,
                                    DollarValue: getData.logs[i].valueInDollar,
                                    value: getData.logs[i].value,
                                    time: getData.timestamp,
                                    symbol: getData.logs[i].symbole,
                                    color: false
                                  },
                                ],
                              },
                            )
                            createdData.push(
                              {
                                id: getData.logs[i].to,
                                text: getData.logs[i].to,
                                type: "address",
                                label: getData.logs[i].ToLabel,
                                entity: getData.logs[i].ToEntity,
                                risk: null,
                                x: -300,
                                y: 800,
                                metadata: getData.logs[i].ToMetadata,
                                main: false,
                                inputs: [{
                                  id: hash,
                                  text: hash,
                                  DollarValue: getData.logs[i].valueInDollar,
                                  value: getData.logs[i].value,
                                  time: getData.timestamp,
                                  symbol: getData.logs[i].symbole,
                                  color: false
                                }],
                                outputs: [],
                              },
                            )

                            let FromRisk = null
                            let ToRisk = null
                            GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.logs[i].from}&network=${network}`)
                              .then((FromRiskResponse) => {
                                if (FromRiskResponse.status === 200) {
                                  FromRisk = (FromRiskResponse.data.risk_score)
                                  GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`)
                                    .then((ToRiskResponse) => {
                                      if (ToRiskResponse.status === 200) {
                                        ToRisk = (ToRiskResponse.data.risk_score)
                                        createdData.find(item => item.id === getData.logs[i].from).risk = FromRisk
                                        createdData.find(item => item.id === getData.logs[i].to).risk = ToRisk

                                      }
                                      SetData(createdData)
                                      SetLoading(false)
                                      SetShowGraph(true)
                                    })
                                    .catch((err) => {
                                      createdData.find(item => item.id === getData.logs[i].from).risk = FromRisk
                                      SetData(createdData)
                                      SetLoading(false)
                                      SetShowGraph(true)
                                    })
                                } else {
                                  GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`)
                                  .then((ToRiskResponse) => {
                                    if (ToRiskResponse.status === 200) {
                                      ToRisk = (ToRiskResponse.data.risk_score)
                                      createdData.find(item => item.id === getData.logs[i].from).risk = FromRisk
                                      createdData.find(item => item.id === getData.logs[i].to).risk = ToRisk

                                    }
                                    SetData(createdData)
                                    SetLoading(false)
                                    SetShowGraph(true)
                                  })
                                  .catch((err) => {
                                    createdData.find(item => item.id === getData.logs[i].from).risk = FromRisk
                                    SetData(createdData)
                                    SetLoading(false)
                                    SetShowGraph(true)
                                  })
                                }
                              })
                              .catch((err) => {
                                GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`)
                                  .then((ToRiskResponse) => {
                                    if (ToRiskResponse.status === 200) {
                                      ToRisk = (ToRiskResponse.data.risk_score)
                                      createdData.find(item => item.id === getData.logs[i].to).risk = ToRisk
                                    }
                                    SetData(createdData)
                                    SetLoading(false)
                                    SetShowGraph(true)
                                  })
                                  .catch((err) => {
                                    SetData(createdData)
                                    SetLoading(false)
                                    SetShowGraph(true)
                                  })
                              })
                          }
                        }

                      }
                    }
                  } else {
                    if (response.data.query === 'address') {
                      try {
                        // ۱. اجرا هم‌زمان دو درخواست
                        const [riskRes, detailRes] = await Promise.all([
                          GetRequest(`${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`),
                          GetRequest(`${serverAddress}/explorer/address-detail?query=${hash}`)
                        ]);

                        let createdData = [{
                          id: hash,
                          text: hash,
                          type: "address",
                          label: detailRes.status === 200 ? detailRes.data.label_tags.labels.length > 0 ? detailRes.data.label_tags.labels.label : null : null,
                          main: true,
                          entity: detailRes.status === 200 ? detailRes.data.address_detail.entity !== null ? detailRes.data.address_detail.entity : null : null,
                          risk: riskRes.status === 200 ? riskRes.data.risk_score : null,
                          x: 0,
                          y: 800,
                          metadata: detailRes.status === 200 ? detailRes.data.address_detail.metadata !== null ? detailRes.data.address_detail.metadata.label : null : null,
                          inputs: [],
                          outputs: [],
                        }]

                        SetData(createdData)
                        SetLoading(false)
                      } catch (err) {
                        console.log(err)
                        let createdData = [{
                          id: hash,
                          text: hash,
                          type: "address",
                          label: null,
                          main: true,
                          entity: null,
                          risk: null,
                          x: 0,
                          y: 800,
                          metadata: null,
                          inputs: [],
                          outputs: [],
                        }]

                        SetData(createdData)
                        SetLoading(false)

                      } finally {
                        SetLoading(false);
                        SetShowGraph(true);
                      }

                    } else {
                      const getData = (UTXO_Transaction(TrsResponse.data.data, network, 0))
                      let createdData = []
                      let index = 0
                      if (getData.inputs[0].address === getData.outputs[0].address) {
                        index = 1
                      }
                      createdData.push(
                        {
                          id: hash,
                          text: hash,
                          type: "transaction",
                          label: null,
                          entity: null,
                          risk: null,
                          metadata: null,
                          x: 0,
                          y: 800,
                          main: true,
                          network: network,
                          inputs: [
                            {
                              id: getData.inputs[0].address,
                              text: getData.inputs[0].address,
                              DollarValue: getData.inputs[0].valueInDollar,
                              value: getData.inputs[0].value,
                              time: getData.time,
                              symbol: getData.symbole,
                              color: false
                            },
                          ],
                          outputs: [
                            {
                              id: getData.outputs[index].address,
                              text: getData.outputs[index].address,
                              DollarValue: getData.outputs[index].valueInDollar,
                              value: getData.outputs[index].value,
                              time: getData.time,
                              symbol: getData.symbole,
                              color: false
                            },
                          ],
                        }
                      )
                      createdData.push(
                        {
                          id: getData.inputs[0].address,
                          text: getData.inputs[0].address,
                          type: "address",
                          label: getData.inputs[0].Label ? getData.inputs[0].Label : null,
                          entity: getData.inputs[0].entity !== null ? getData.inputs[0].entity : null,
                          risk: null,
                          x: 300,
                          y: 800,
                          metadata: getData.inputs[0].metadata,
                          main: false,
                          inputs: [],
                          outputs: [
                            {
                              id: hash,
                              text: hash,
                              DollarValue: getData.inputs[0].valueInDollar,
                              value: getData.inputs[0].value,
                              time: getData.time,
                              symbol: getData.symbole,
                              color: false
                            },
                          ],
                        },
                      )
                      createdData.push(
                        {
                          id: getData.outputs[index].address,
                          text: getData.outputs[index].address,
                          type: "address",
                          label: getData.outputs[index].Label ? getData.outputs[index].Label : null,
                          entity: getData.outputs[index].entity !== null ? getData.outputs[index].entity : null,
                          risk: null,
                          x: -300,
                          y: 800,
                          metadata: getData.outputs[index].metadata,
                          main: false,
                          inputs: [
                            {
                              id: hash,
                              text: hash,
                              DollarValue: getData.outputs[index].valueInDollar,
                              value: getData.outputs[index].value,
                              time: getData.time,
                              symbol: getData.symbole,
                              color: false
                            },
                          ],
                          outputs: [],
                        },
                      )

                      try {
                        // ۱. اجرا هم‌زمان دو درخواست
                        const [FromRisk, ToRisk] = await Promise.all([
                          GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.inputs[0].address}&network=${network}`),
                          GetRequest(`${serverAddress}/explorer/risk-score/?address=${getData.outputs[0].address}&network=${network}`),
                        ]);

                        createdData.find(item => item.id === getData.inputs[0].address).risk = FromRisk.status === 200 ? FromRisk.data.risk_score : null,
                          createdData.find(item => item.id === getData.outputs[0].address).risk = FromRisk.ToRisk === 200 ? ToRisk.data.risk_score : null,
                          SetData(createdData)
                        SetLoading(false)
                      } catch (err) {
                        console.log(err)


                        SetData(createdData)
                        SetLoading(false)

                      } finally {
                        SetLoading(false);
                        SetShowGraph(true);
                      }
                    }
                  }
                } else {
                  SetLoading(false)
                  return toast.error('آدرس موردنظر یافت نشد!', {
                    position: 'bottom-left'
                  })
                }
              })
              .catch((error) => {
                SetLoading(false)
                console.log(error)
                return toast.error('آدرس موردنظر یافت نشد!', {
                  position: 'bottom-left'
                })
              })
          })
          .catch((err) => { console.log(err) })
      }
    } else {
      GetRequest(`${serverAddress}/tracing/graph/`)
        .then((response) => {
          console.log(response)
          SetLoading(false)

          for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].id === Number(id)) {
              SetName(response.data.results[i].title)
              SetDescription(response.data.results[i].value.GraphDescription)
              SetNodesPosition(response.data.results[i].value.NodesPosition)
              SetSavedPositions(response.data.results[i].value.SavedPositions)
              SetScale(response.data.results[i].value.Scale)
              SetXPosition(response.data.results[i].value.XPosition)
              SetYPosition(response.data.results[i].value.YPosition)
              SetPaintedEdges(response.data.results[i].value.PaintedEdges)
              SetData(response.data.results[i].value.Data)
              SetShowGraph(true)
            }
          }

        })
        .catch((err) => {
          SetLoading(false)
          console.log(err)
          if (err.response.status === 403) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          if (err.response.status === 401) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          return toast.error('خطا در دریافت اطلاعات', {
            position: 'bottom-left'
          })
        })
    }

  }, [])

  const [ChangeNetworkBox, setChangeNetworkBox] = useState(false)
  const [selectedToken, setAddselectedToken] = useState(null)
  const [GraphTokens, SetGraphTokens] = useState([])
  const [Tokens, SetTokens] = useState([])
  const [SavedLink, setSavedLink] = useState(null)
  useEffect(() => {
    if (hash !== undefined) {
      GetRequest(`${serverAddress}/explorer/token-transfer-list/?query=${hash}&network=${network}`)
        .then((response) => {
          if (response.status === 204) {
            SetshowNetworkSelectionBox(false)
          }
          const getTokens = []
          for (let i = 0; i < response.data.length; i++) {
            getTokens.push(response.data[i])
          }
          SetTokens(getTokens)
        })
        .catch((err) => { console.log(err) })
    }
  }, [])
  useEffect(() => {
    const tokenOptions = []
    tokenOptions.push(
      {
        value: network,
        label: network
      }
    )
    for (let i = 0; i < Tokens.length; i++) {
      if (!tokenOptions.some(item => item.value === Tokens[i].symbol)) {
        tokenOptions.push(
          {
            value: Tokens[i].symbol,
            label: Tokens[i].symbol,
            contract: Tokens[i].contract_address
          }
        )
      }
    }
    SetGraphTokens(tokenOptions)

  }, [Tokens])

  return (
    <div>
      <div id="tracker" >
        {ShowGraph ? (
          <FuckingGraph_V2
            Data={Data}
            SetReload={SetReload}
            Reload={Reload}
            SetData={SetData}
            SetNodesPosition={SetNodesPosition}
            NodesPosition={NodesPosition}
            Distance={Distance}
            SetSavedPositions={SetSavedPositions}
            SavedPositions={SavedPositions}
            SetScale={SetScale}
            Scale={Scale}
            SetXPosition={SetXPosition}
            XPosition={XPosition}
            SetYPosition={SetYPosition}
            YPosition={YPosition}
            ShowTimes={ShowTimes}
            ShowValues={ShowValues}
            TakeSceenShot={TakeSceenShot}
            ShowPrice={ShowPrice}
            SetSelectedEdges={SetSelectedEdges}
            SelectedEdges={SelectedEdges}
            PaintedEdges={PaintedEdges}
          />

        ) : <FullPageLoading/>}
      </div>
      <div style={{
        position: 'absolute',
        width: '240px',
        top: '10px',
        right: '10px',
        zIndex: '10000000000'
      }}>

      </div>

      {/* راهنما */}
      {/* <Modal
        isOpen={ShowGuides}
        toggle={() => {
          SetShowGuides(false)
        }}
        className="modal-dialog-centered"
        modalClassName={"modal-danger"}
        style={{ minWidth: "40%", padding: "0px" }}
      >
        <ModalBody
          style={{ padding: "12px", borderRadius: "12px", overflow: "hidden" }}
        >
          <h5>
            راهنمای کار با ردیابی
          </h5>
          <div className="pe-3">
            <h6 className="mt-3">
              علامت و نشانه‌ها
            </h6>


            <img style={{ width: '30px', height: '30px' }} src="/images/address.PNG" /> <Label>آدرس</Label>
            <br />
            <img style={{ width: '30px', height: '30px' }} src="/images/tr.PNG" /> <Label>تراکنش</Label>
            <br />
            <img style={{ width: '30px', height: '30px' }} src="/images/hotWallet.PNG" /> <Label>هات‌ولت</Label>
            <br />
            <img style={{ width: '30px', height: '30px' }} src="/images/start.PNG" /> <Label>آدرس شروع کننده گراف</Label>
            <br />

            <h6 className="mt-3">
              عدد ریسک
            </h6>

            از 70 به بالا: قرمز
            <br />
            از 50 تا 70: نارنجی
            <br />
            کمتر از 50: آبی

            <br />

            <h6 className="mt-3">
              مشخص کردن مسیرها با رنگ های متفاوت
            </h6>

            <p>
              ابتدا با نگه‌داشتن کلید ctrl، یال های مورد نظر را انتخاب کرده و سپس با کلیک بر روی رنگ مورد نظر در بخش تنظیمات، رنگ یال های انتخاب شده را تغییر دهید.
            </p>

            <h6 className="mt-3">
              برچسب تراکنش‌ها
            </h6>

            <p>
              بر روی هر یالی که بین یک تراکنش و یک آدرس قرار گرفته است، برچسبی شامل اطلاعات تراکنش از جمله زمان و حجم آن درج شده است.  <br />در بخش تنظیمات، کاربران امکان انتخاب نمایش یا پنهان‌سازی اطلاعات حجم و زمان تراکنش را دارند. <br /> همچنین کاربران می‌توانند قیمت دلاری تراکنش را نیز مشاهده کنند.
            </p>
          </div>


        </ModalBody>
      </Modal> */}

      {/* انتخاب توکن */}
      {/* <Modal
        isOpen={SelectTokenBox}
        
        className="modal-dialog-centered"
        modalClassName={"modal-danger"}
        style={{ minWidth: "30%", padding: "0px" }}
      >
        <ModalBody
          style={{ padding: "0px", borderRadius: "12px", overflow: "hidden", padding:'8px'}}
        >
          <SearchTokens SetData={SetData} />
          <Button onClick={() => {
            window.history.back()
          }} style={{
            width:'100%',
          }}>
            بازگشت
          </Button>
        </ModalBody>
      </Modal> */}

      {/* ذخیره گراف */}
      {/* <Modal
        isOpen={OpenSaveBox}
        className='modal-dialog-centered'
        toggle={() => { SetOpenSaveBox(false) }}
        modalClassName={'modal-danger'}
      >
        <ModalBody>

          <>
            <h6>ذخیره گراف</h6>
            <Input placeholder='عنوان گراف' id='GraphName' defaultValue={Name} />
            <Input
              id='GraphDescription'
              type='textarea'
              name='text'
              defaultValue={Description}
              className='mt-3'
              placeholder='توضیحات'
              style={{ minHeight: '100px' }}
            />
          </>
          <Button onClick={() => {
            SetName(document.getElementById('GraphName').value)
            SetDescription(document.getElementById('GraphDescription').value)
            saveGraph()
          }}
            color={'secondary'} style={{ height: '37px', width: '100%' }} className={"mt-3"}>
            {
              Loading ?
                <LoadingButton />
                :
                <span>ذخیره</span>
            }
          </Button>
        </ModalBody>
      </Modal> */}

      {/* گزارش */}
      {/* <Modal
        isOpen={ReportBox}
        toggle={() => {
          SetReportBox(false)
        }}
        className="modal-dialog-centered"
        modalClassName={"modal-danger"}
        style={{ minWidth: "20%", padding: "0px" }}
      >
        <ModalBody
          style={{ padding: "12px", borderRadius: "12px", overflow: "hidden" }}
        >
          <ReportModal Data={Data} PaintedEdges={PaintedEdges} />
        </ModalBody>
      </Modal> */}

      
      {/* تغییر شبکه */}
      {/* <Modal
        isOpen={ChangeNetworkBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setChangeNetworkBox(!ChangeNetworkBox)}
      >
        <ModalBody>
          <h6>گراف ذخیره نشده است. آیا از تغییر شبکه مورد نظر مطمئن هستید؟</h6>
          <br/>
          <Button color={'secondary'} style={{height:'37px', width:'calc(50% - 5px)',marginLeft:'4px'}} onClick={
            () => {
              setSavedLink(`/tracker2/${network}/${hash}/${selectedToken.value}/${selectedToken.contract !== undefined ? selectedToken.contract : ''}`)
              SetOpenSaveBox(!OpenSaveBox)
            }
          }>
            ذخیره
          </Button>
          <Button color={'warning'} style={{height:'37px', width:'calc(50% - 5px)',marginRight:'4px'}}
            onClick={() => {
              window.location.assign(`/tracker2/${network}/${hash}/${selectedToken.value}/${selectedToken.contract !== undefined ? selectedToken.contract : ''}`)
            }}
          >
            تغییر
          </Button>
        </ModalBody>

      </Modal> */}
    </div>
  );
};

export default Page;
