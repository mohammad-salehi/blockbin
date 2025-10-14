"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import "../style.css";
import toast from "react-hot-toast";
import Switch from '@mui/material/Switch';
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
import Select, { components } from 'react-select'
import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import { Modal, Button, Label, Input } from "@heathmont/moon-core-tw";
import CircularProgress from '@mui/material/CircularProgress';
import ReportModal from "@/components/Tracker/ReportBox/ReportBox";

const Page = () => {
  const params = useParams();
  const { network, hash } = params;
  const rest = Array.isArray(params.rest) ? params.rest : [];
  const token = rest[0];
  const contractAddress = rest[1];
  const id = rest[2];

  //actions
  const [Reload, SetReload] = useState(false);
  const [TakeSceenShot, SetTakeSceenShot] = useState(false);
  const [Loading, SetLoading] = useState(true);

  //graph Draw values
  const [NodesPosition, SetNodesPosition] = useState([]);
  const [SavedPositions, SetSavedPositions] = useState([]);
  const [Distance, SetDistance] = useState(300);
  const [Scale, SetScale] = useState(1);
  const [XPosition, SetXPosition] = useState(0);
  const [YPosition, SetYPosition] = useState(800);
  const [SelectedEdges, SetSelectedEdges] = useState([]);
  const [PaintedEdges, SetPaintedEdges] = useState([]);
  const [Data, SetData] = useState([]);
  const [Name, SetName] = useState("");
  const [Description, SetDescription] = useState("");

  //graph setting
  const [ShowPrice, SetShowPrice] = useState(false);
  const [ShowValues, SetShowValues] = useState(true);
  const [ShowTimes, SetShowTimes] = useState(true);
  const [ShowGuides, SetShowGuides] = useState(false);
  const [OpenSaveBox, SetOpenSaveBox] = useState(false);

  //start graph drawing
  const [ShowGraph, SetShowGraph] = useState(false);
  const [SelectTokenBox, SetSelectTokenBox] = useState(false);
  const [ReportBox, SetReportBox] = useState(false);

  useEffect(() => {
    document.title = `بلاک‌بین`;
  });

  const SetColor = (color) => {
    const Edges = [];
    for (let i = 0; i < PaintedEdges.length; i++) {
      Edges.push(PaintedEdges[i]);
    }
    for (let i = 0; i < SelectedEdges.length; i++) {
      if (
        !Edges.some(
          (item) =>
            item.from === SelectedEdges[i].from &&
            item.to === SelectedEdges[i].to
        )
      ) {
        Edges.push({
          from: SelectedEdges[i].from,
          to: SelectedEdges[i].to,
          color: color,
        });
      } else {
        Edges.find(
          (item) =>
            item.from === SelectedEdges[i].from &&
            item.to === SelectedEdges[i].to
        ).color = color;
      }
    }
    SetPaintedEdges(Edges);
    SetReload(!Reload);
  };
  const DeleteColor = () => {
    let Edges = PaintedEdges;
    for (let i = 0; i < SelectedEdges.length; i++) {
      Edges = Edges.filter(
        (item) =>
          item.from !== SelectedEdges[i].from || item.to !== SelectedEdges[i].to
      );
    }
    SetPaintedEdges(Edges);
  };

  const saveGraph = () => {
    let GraphName;
    let GraphDescription;

    GraphName = document.getElementById("GraphName").value;
    GraphDescription = document.getElementById("GraphDescription").value;

    if (GraphName !== "" || id !== undefined) {
      console.log(id)
      if (Data.length > 0) {
        if (id !== undefined) {
          SetLoading(true);
          //Error Done
          axios
            .put(
              `${serverAddress}/tracing/graph/${Number(id)}/`,
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
                  contractAddress,
                },
                title: GraphName,
              },
              { headers: { Authorization: `Bearer ${Cookies.get("access")}` } }
            )
            .then((response) => {
              SetLoading(false);
              //adad daghigh set she
              if (response.status === 200) {
                SetOpenSaveBox(false);

                // window.location.assign(`/tracker/loadGraph/${networkName}/${response.data.id}/${Token}`)
                return toast.success("با موفقیت ذخیره شد.", {
                  position: "bottom-left",
                });
              } else {
                return toast.error("ناموفق", {
                  position: "bottom-left",
                });
              }
            })
            .catch((err) => {
              SetLoading(false);
              try {
                if (err.response.status === 403) {
                  Cookies.set("refresh", "0");
                  Cookies.set("access", "0");
                  window.location.assign("/");
                } else if (err.response.status === 401) {
                  Cookies.set("refresh", "0");
                  Cookies.set("access", "0");
                  window.location.assign("/");
                } else {
                  return toast.error("ناموفق", {
                    position: "bottom-left",
                  });
                }
              } catch (error) {
                return toast.error("ناموفق", {
                  position: "bottom-left",
                });
              }
            });
        } else {
          SetLoading(true);
          //Error Done
          axios
            .post(
              `${serverAddress}/tracing/graph/`,
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
                  contractAddress,
                },
                title: GraphName,
              },
              { headers: { Authorization: `Bearer ${Cookies.get("access")}` } }
            )
            .then((response) => {
              SetLoading(false);
              if (response.status === 201) {
                SetOpenSaveBox(false);
                toast.success("با موفقیت ذخیره شد.", {
                  position: "bottom-left",
                });
                window.location.assign(
                  `/panel/tracker/${network}/${hash}/${token}/${contractAddress !== undefined ? contractAddress : ""}/${response.data.id}`
                );
              } else {
                return toast.error("ناموفق", {
                  position: "bottom-left",
                });
              }
            })
            .catch((err) => {
              SetLoading(false);
              console.log(err);
              try {
                if (err.response.status === 403) {
                  Cookies.set("refresh", "");
                  Cookies.set("access", "");
                  window.location.assign("/");
                  return toast.error("دوباره به حساب کاربری وارد شوید.", {
                    position: "bottom-left",
                  });
                } else if (err.response.status === 401) {
                  Cookies.set("refresh", "");
                  Cookies.set("access", "");
                  window.location.assign("/");
                  return toast.error("دوباره به حساب کاربری وارد شوید.", {
                    position: "bottom-left",
                  });
                } else {
                  return toast.error("ناموفق", {
                    position: "bottom-left",
                  });
                }
              } catch (error) {
                return toast.error("ناموفق", {
                  position: "bottom-left",
                });
              }
            });
        }
      } else {
        return toast.error("گراف رسم نشده است.", {
          position: "bottom-left",
        });
      }
    } else {
      return toast.error("عنوان گراف نباید خالی باشد.", {
        position: "bottom-left",
      });
    }
  };

  //start Drawing Graph
  useEffect(() => {
    // token selection checker
    if (id === undefined) {
      if (token === undefined) {
        if (
          Networks.find((item) => item.symbole === network).type === "account"
        ) {
          SetSelectTokenBox(true);
        } else {
          window.location.assign(`/tracker2/${network}/${hash}/${network}`);
        }
      } else {
        //Get Trs data
        let GetAddress;
        GetRequest(`${serverAddress}/explorer/network-detection/?query=${hash}`)
          .then((response) => {
            if (response.data.query === "address") {
              if (token === network) {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}`;
              } else {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}&page_number=1&page_size=10&type=token-20&contract_address=${contractAddress}`;
              }
            } else {
              if (
                Networks.find((item) => item.symbole === network).type ===
                "account"
              ) {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&network=${network}&page_number=1&page_size=100`;
              } else {
                GetAddress = `${serverAddress}/explorer/search/?query=${hash}&page_number=0&page_size=0&network=${network}&pageNumberFrom=1&pageSizeFrom=2&pageNumberTo=1&pageSizeTo=2`;
              }
            }
            GetRequest(GetAddress)
              .then(async (TrsResponse) => {
                if (TrsResponse.status === 200) {
                  if (
                    Networks.find((item) => item.symbole === network).type ===
                    "account"
                  ) {
                    if (response.data.query === "address") {
                      if (network === token) {
                        const getData = Account_Address(
                          TrsResponse.data.data,
                          hash,
                          network,
                          0
                        );
                        GetRequest(
                          `${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`
                        )
                          .then((RiskResponse) => {
                            let risk = null;
                            if (RiskResponse.status === 200) {
                              const risk = RiskResponse.data.risk_score;
                            }
                            let createdData = [
                              {
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
                              },
                            ];
                            SetData(createdData);
                            SetLoading(false);
                            SetShowGraph(true);
                          })
                          .catch((err) => {
                            let createdData = [
                              {
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
                              },
                            ];
                            SetData(createdData);
                            SetLoading(false);
                            SetShowGraph(true);
                          });
                      } else {
                        const getData = Account_Token_Address(
                          TrsResponse.data.data,
                          hash,
                          network,
                          0
                        );
                        GetRequest(
                          `${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`
                        )
                          .then((RiskResponse) => {
                            let risk = null;
                            if (RiskResponse.status === 200) {
                              risk = RiskResponse.data.risk_score;
                            }

                            let createdData = [
                              {
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
                              },
                            ];
                            SetData(createdData);
                            SetLoading(false);
                            SetShowGraph(true);
                          })
                          .catch((err) => {
                            let createdData = [
                              {
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
                              },
                            ];
                            SetData(createdData);
                            SetLoading(false);
                            SetShowGraph(true);
                          });
                      }
                    } else {
                      if (network === token) {
                        const getData = Account_transaction(
                          TrsResponse.data.data,
                          network,
                          0
                        );
                        let createdData = [];

                        createdData.push({
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
                              text: getData.FromLabel
                                ? getData.FromLabel
                                : getData.FromEntity
                                  ? getData.FromEntity.name
                                  : getData.from,
                              DollarValue: getData.valueInDollar,
                              value: getData.value,
                              time: getData.timestamp,
                              symbol: getData.symbole,
                              color: false,
                            },
                          ],
                          outputs: [
                            {
                              id: getData.to,
                              text: getData.ToLabel
                                ? getData.ToLabel
                                : getData.ToEntity
                                  ? getData.ToEntity.name
                                  : getData.to,
                              DollarValue: getData.valueInDollar,
                              value: getData.value,
                              time: getData.timestamp,
                              symbol: getData.symbole,
                              color: false,
                            },
                          ],
                        });
                        createdData.push({
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
                              color: false,
                            },
                          ],
                        });
                        createdData.push({
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
                          inputs: [
                            {
                              id: hash,
                              text: hash,
                              DollarValue: getData.valueInDollar,
                              value: getData.value,
                              time: getData.timestamp,
                              symbol: getData.symbole,
                              color: false,
                            },
                          ],
                          outputs: [],
                        });
                        let FromRisk = null;
                        let ToRisk = null;
                        GetRequest(
                          `${serverAddress}/explorer/risk-score/?address=${getData.from}&network=${network}`
                        )
                          .then((RiskResponse) => {
                            if (RiskResponse.status === 200) {
                              FromRisk = RiskResponse.data.risk_score;
                              GetRequest(
                                `${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`
                              )
                                .then((RiskResponse) => {
                                  if (RiskResponse.status === 200) {
                                    ToRisk = RiskResponse.data.risk_score;
                                    createdData.find(
                                      (item) => item.id === getData.from
                                    ).risk = FromRisk;
                                    createdData.find(
                                      (item) => item.id === getData.to
                                    ).risk = ToRisk;
                                  }
                                  SetData(createdData);
                                  SetLoading(false);
                                  SetShowGraph(true);
                                })
                                .catch((err) => {
                                  createdData.find(
                                    (item) => item.id === getData.from
                                  ).risk = FromRisk;
                                  SetData(createdData);
                                  SetLoading(false);
                                  SetShowGraph(true);
                                });
                            } else {
                              GetRequest(
                                `${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`
                              )
                                .then((RiskResponse) => {
                                  if (RiskResponse.status === 200) {
                                    ToRisk = RiskResponse.data.risk_score;
                                    createdData.find(
                                      (item) => item.id === getData.from
                                    ).risk = FromRisk;
                                    createdData.find(
                                      (item) => item.id === getData.to
                                    ).risk = ToRisk;
                                  }
                                  SetData(createdData);
                                  SetLoading(false);
                                  SetShowGraph(true);
                                })
                                .catch((err) => {
                                  createdData.find(
                                    (item) => item.id === getData.from
                                  ).risk = FromRisk;
                                  SetData(createdData);
                                  SetLoading(false);
                                  SetShowGraph(true);
                                });
                            }
                          })
                          .catch((err) => {
                            GetRequest(
                              `${serverAddress}/explorer/risk-score/?address=${getData.to}&network=${network}`
                            )
                              .then((RiskResponse) => {
                                if (RiskResponse.status === 200) {
                                  ToRisk = RiskResponse.data.risk_score;
                                  createdData.find(
                                    (item) => item.id === getData.to
                                  ).risk = ToRisk;
                                }
                                SetData(createdData);
                                SetLoading(false);
                                SetShowGraph(true);
                              })
                              .catch((err) => {
                                SetData(createdData);
                                SetLoading(false);
                                SetShowGraph(true);
                              });
                          });
                      } else {
                        const getData = Account_transaction(
                          TrsResponse.data.data,
                          network,
                          0
                        );

                        for (let i = 0; i < getData.logs.length; i++) {
                          if (getData.logs[i].symbole === token) {
                            let createdData = [];
                            createdData.push({
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
                                  text: getData.logs[i].FromLabel
                                    ? getData.logs[i].FromLabel
                                    : getData.logs[i].FromEntity
                                      ? getData.logs[i].FromEntity.name
                                      : getData.logs[i].from,
                                  DollarValue: getData.logs[i].valueInDollar,
                                  value: getData.logs[i].value,
                                  time: getData.timestamp,
                                  symbol: getData.logs[i].symbole,
                                  color: false,
                                },
                              ],
                              outputs: [
                                {
                                  id: getData.logs[i].to,
                                  text: getData.logs[i].ToLabel
                                    ? getData.logs[i].ToLabel
                                    : getData.logs[i].ToEntity
                                      ? getData.logs[i].ToEntity.name
                                      : getData.logs[i].to,
                                  DollarValue: getData.logs[i].valueInDollar,
                                  value: getData.logs[i].value,
                                  time: getData.timestamp,
                                  symbol: getData.logs[i].symbole,
                                  color: false,
                                },
                              ],
                            });
                            createdData.push({
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
                                  color: false,
                                },
                              ],
                            });
                            createdData.push({
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
                              inputs: [
                                {
                                  id: hash,
                                  text: hash,
                                  DollarValue: getData.logs[i].valueInDollar,
                                  value: getData.logs[i].value,
                                  time: getData.timestamp,
                                  symbol: getData.logs[i].symbole,
                                  color: false,
                                },
                              ],
                              outputs: [],
                            });

                            let FromRisk = null;
                            let ToRisk = null;
                            GetRequest(
                              `${serverAddress}/explorer/risk-score/?address=${getData.logs[i].from}&network=${network}`
                            )
                              .then((FromRiskResponse) => {
                                if (FromRiskResponse.status === 200) {
                                  FromRisk = FromRiskResponse.data.risk_score;
                                  GetRequest(
                                    `${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`
                                  )
                                    .then((ToRiskResponse) => {
                                      if (ToRiskResponse.status === 200) {
                                        ToRisk = ToRiskResponse.data.risk_score;
                                        createdData.find(
                                          (item) =>
                                            item.id === getData.logs[i].from
                                        ).risk = FromRisk;
                                        createdData.find(
                                          (item) =>
                                            item.id === getData.logs[i].to
                                        ).risk = ToRisk;
                                      }
                                      SetData(createdData);
                                      SetLoading(false);
                                      SetShowGraph(true);
                                    })
                                    .catch((err) => {
                                      createdData.find(
                                        (item) =>
                                          item.id === getData.logs[i].from
                                      ).risk = FromRisk;
                                      SetData(createdData);
                                      SetLoading(false);
                                      SetShowGraph(true);
                                    });
                                } else {
                                  GetRequest(
                                    `${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`
                                  )
                                    .then((ToRiskResponse) => {
                                      if (ToRiskResponse.status === 200) {
                                        ToRisk = ToRiskResponse.data.risk_score;
                                        createdData.find(
                                          (item) =>
                                            item.id === getData.logs[i].from
                                        ).risk = FromRisk;
                                        createdData.find(
                                          (item) =>
                                            item.id === getData.logs[i].to
                                        ).risk = ToRisk;
                                      }
                                      SetData(createdData);
                                      SetLoading(false);
                                      SetShowGraph(true);
                                    })
                                    .catch((err) => {
                                      createdData.find(
                                        (item) =>
                                          item.id === getData.logs[i].from
                                      ).risk = FromRisk;
                                      SetData(createdData);
                                      SetLoading(false);
                                      SetShowGraph(true);
                                    });
                                }
                              })
                              .catch((err) => {
                                GetRequest(
                                  `${serverAddress}/explorer/risk-score/?address=${getData.logs[i].to}&network=${network}`
                                )
                                  .then((ToRiskResponse) => {
                                    if (ToRiskResponse.status === 200) {
                                      ToRisk = ToRiskResponse.data.risk_score;
                                      createdData.find(
                                        (item) => item.id === getData.logs[i].to
                                      ).risk = ToRisk;
                                    }
                                    SetData(createdData);
                                    SetLoading(false);
                                    SetShowGraph(true);
                                  })
                                  .catch((err) => {
                                    SetData(createdData);
                                    SetLoading(false);
                                    SetShowGraph(true);
                                  });
                              });
                          }
                        }
                      }
                    }
                  } else {
                    if (response.data.query === "address") {
                      try {
                        // ۱. اجرا هم‌زمان دو درخواست
                        const [riskRes, detailRes] = await Promise.all([
                          GetRequest(
                            `${serverAddress}/explorer/risk-score/?address=${hash}&network=${network}`
                          ),
                          GetRequest(
                            `${serverAddress}/explorer/address-detail?query=${hash}`
                          ),
                        ]);

                        let createdData = [
                          {
                            id: hash,
                            text: hash,
                            type: "address",
                            label:
                              detailRes.status === 200
                                ? detailRes.data.label_tags.labels.length > 0
                                  ? detailRes.data.label_tags.labels.label
                                  : null
                                : null,
                            main: true,
                            entity:
                              detailRes.status === 200
                                ? detailRes.data.address_detail.entity !== null
                                  ? detailRes.data.address_detail.entity
                                  : null
                                : null,
                            risk:
                              riskRes.status === 200
                                ? riskRes.data.risk_score
                                : null,
                            x: 0,
                            y: 800,
                            metadata:
                              detailRes.status === 200
                                ? detailRes.data.address_detail.metadata !==
                                  null
                                  ? detailRes.data.address_detail.metadata.label
                                  : null
                                : null,
                            inputs: [],
                            outputs: [],
                          },
                        ];

                        SetData(createdData);
                        SetLoading(false);
                      } catch (err) {
                        console.log(err);
                        let createdData = [
                          {
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
                          },
                        ];

                        SetData(createdData);
                        SetLoading(false);
                      } finally {
                        SetLoading(false);
                        SetShowGraph(true);
                      }
                    } else {
                      const getData = UTXO_Transaction(
                        TrsResponse.data.data,
                        network,
                        0
                      );
                      let createdData = [];
                      let index = 0;
                      if (
                        getData.inputs[0].address === getData.outputs[0].address
                      ) {
                        index = 1;
                      }
                      createdData.push({
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
                            color: false,
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
                            color: false,
                          },
                        ],
                      });
                      createdData.push({
                        id: getData.inputs[0].address,
                        text: getData.inputs[0].address,
                        type: "address",
                        label: getData.inputs[0].Label
                          ? getData.inputs[0].Label
                          : null,
                        entity:
                          getData.inputs[0].entity !== null
                            ? getData.inputs[0].entity
                            : null,
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
                            color: false,
                          },
                        ],
                      });
                      createdData.push({
                        id: getData.outputs[index].address,
                        text: getData.outputs[index].address,
                        type: "address",
                        label: getData.outputs[index].Label
                          ? getData.outputs[index].Label
                          : null,
                        entity:
                          getData.outputs[index].entity !== null
                            ? getData.outputs[index].entity
                            : null,
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
                            color: false,
                          },
                        ],
                        outputs: [],
                      });

                      try {
                        // ۱. اجرا هم‌زمان دو درخواست
                        const [FromRisk, ToRisk] = await Promise.all([
                          GetRequest(
                            `${serverAddress}/explorer/risk-score/?address=${getData.inputs[0].address}&network=${network}`
                          ),
                          GetRequest(
                            `${serverAddress}/explorer/risk-score/?address=${getData.outputs[0].address}&network=${network}`
                          ),
                        ]);

                        (createdData.find(
                          (item) => item.id === getData.inputs[0].address
                        ).risk =
                          FromRisk.status === 200
                            ? FromRisk.data.risk_score
                            : null),
                          (createdData.find(
                            (item) => item.id === getData.outputs[0].address
                          ).risk =
                            FromRisk.ToRisk === 200
                              ? ToRisk.data.risk_score
                              : null),
                          SetData(createdData);
                        SetLoading(false);
                      } catch (err) {
                        console.log(err);

                        SetData(createdData);
                        SetLoading(false);
                      } finally {
                        SetLoading(false);
                        SetShowGraph(true);
                      }
                    }
                  }
                } else {
                  SetLoading(false);
                  return toast.error("آدرس موردنظر یافت نشد!", {
                    position: "bottom-left",
                  });
                }
              })
              .catch((error) => {
                SetLoading(false);
                console.log(error);
                return toast.error("آدرس موردنظر یافت نشد!", {
                  position: "bottom-left",
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      GetRequest(`${serverAddress}/tracing/graph/`)
        .then((response) => {
          console.log(response);
          SetLoading(false);

          for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].id === Number(id)) {
              SetName(response.data.results[i].title);
              SetDescription(response.data.results[i].value.GraphDescription);
              SetNodesPosition(response.data.results[i].value.NodesPosition);
              SetSavedPositions(response.data.results[i].value.SavedPositions);
              SetScale(response.data.results[i].value.Scale);
              SetXPosition(response.data.results[i].value.XPosition);
              SetYPosition(response.data.results[i].value.YPosition);
              SetPaintedEdges(response.data.results[i].value.PaintedEdges);
              SetData(response.data.results[i].value.Data);
              SetShowGraph(true);
            }
          }
        })
        .catch((err) => {
          SetLoading(false);
          console.log(err);
          if (err.response.status === 403) {
            Cookies.set("refresh", "");
            Cookies.set("access", "");
            window.location.assign("/");
          }
          if (err.response.status === 401) {
            Cookies.set("refresh", "");
            Cookies.set("access", "");
            window.location.assign("/");
          }
          return toast.error("خطا در دریافت اطلاعات", {
            position: "bottom-left",
          });
        });
    }
  }, []);

  const [ChangeNetworkBox, setChangeNetworkBox] = useState(false);
  const [selectedToken, setAddselectedToken] = useState(null);
  const [GraphTokens, SetGraphTokens] = useState([]);
  const [Tokens, SetTokens] = useState([]);
  const [SavedLink, setSavedLink] = useState(null);
  useEffect(() => {
    if (hash !== undefined) {
      GetRequest(
        `${serverAddress}/explorer/token-transfer-list/?query=${hash}&network=${network}`
      )
        .then((response) => {
          if (response.status === 204) {
            SetshowNetworkSelectionBox(false);
          }
          const getTokens = [];
          for (let i = 0; i < response.data.length; i++) {
            getTokens.push(response.data[i]);
          }
          SetTokens(getTokens);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    const tokenOptions = [];
    tokenOptions.push({
      value: network,
      label: network,
    });
    for (let i = 0; i < Tokens.length; i++) {
      if (!tokenOptions.some((item) => item.value === Tokens[i].symbol)) {
        tokenOptions.push({
          value: Tokens[i].symbol,
          label: Tokens[i].symbol,
          contract: Tokens[i].contract_address,
        });
      }
    }
    SetGraphTokens(tokenOptions);
  }, [Tokens]);
  const [selectedValue, setSelectedValue] = useState(
    GraphTokens.find((item) => item.value === token) || null
  );

  useEffect(() => {
    // وقتی token از بیرون تغییر کرد (مثلاً بعد از fetch)
    const found = GraphTokens.find((item) => item.value === token);
    setSelectedValue(found || null);
  }, [token, GraphTokens]);


  const themeColor = (key) => {
    const isDark = document.documentElement.classList.contains("dark");
    const map = {
      red: isDark ? "#ff0000" : "#ff0000",  // blue-400 / blue-600
      success: isDark ? "#16a34a" : "#16a34a",  // green-400 / green-600
      warning: isDark ? "#f59e0b" : "#f59e0b",  // amber-400 / amber-500
      yellow: isDark ? "#FFFF00" : "#FFFF00",  // violet-300 / violet-700
      sky: isDark ? "#9132a8" : "#9132a8",  // blue-300 / sky-400
    };
    return map[key];
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div id="tracker">
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
        ) : (
          <FullPageLoading />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          width: "240px",
          top: "10px",
          right: "10px",
          zIndex: "10000000000",
        }}
      ></div>

      {/* آکاردیون */}
      <div className="fixed top-[80px] right-0 h-[calc(100vh-60px)] flex items-start justify-end z-50">
        {/* دکمه باز و بسته شدن */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-boxColor text-textColor px-3 py-2 rounded-l-md shadow-md cursor-pointer hover:bg-boxbordercolor2 transition-all"
        >
          {open ? "→" : "←"}
        </button>

        {/* محتوای آکاردیون */}
        <div
          className={`bg-boxColor text-textColor shadow-lg  transition-all duration-500 overflow-hidden p-2 ${open ? "w-[400px] opacity-100" : "w-0 opacity-0"
            }`}
        >
          <div className="w-full m-0 p-0">
            {/* دکمه گزارش (فقط برای اکانت بیس) */}
            {Networks.find(item => item.symbole === network).type === 'account' && (
              <div className="m-0 p-0">
                <button
                  onClick={() => SetReportBox(true)}
                  className="hover:bg-bgPrimary cursor-pointer flex items-center gap-2 w-full px-2 py-2 rounded-md transition text-textColor"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 12H9M16 12H12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 8H15M12 8H8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 16H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-textColor">دریافت گزارش</span>
                </button>
              </div>
            )}

            {/* ذخیره */}
            <div className="m-0 p-0 mt-2">
              <button
                onClick={() => SetOpenSaveBox(true)}
                className="hover:bg-bgPrimary cursor-pointer flex items-center gap-2 w-full px-2 py-2 rounded-md transition text-textColor"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 8H8.6C8.03995 8 7.75992 8 7.54601 7.89101C7.35785 7.79513 7.20487 7.64215 7.10899 7.45399C7 7.24008 7 6.96005 7 6.4V3M17 21V14.6C17 14.0399 17 13.7599 16.891 13.546C16.7951 13.3578 16.6422 13.2049 16.454 13.109C16.2401 13 15.9601 13 15.4 13H8.6C8.03995 13 7.75992 13 7.54601 13.109C7.35785 13.2049 7.20487 13.3578 7.10899 13.546C7 13.7599 7 14.0399 7 14.6V21M21 9.32548V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H14.6745C15.1637 3 15.4083 3 15.6385 3.05526C15.8425 3.10425 16.0376 3.18506 16.2166 3.29472C16.4184 3.4184 16.5914 3.59135 16.9373 3.93726L20.0627 7.06274C20.4086 7.40865 20.5816 7.5816 20.7053 7.78343C20.8149 7.96237 20.8957 8.15746 20.9447 8.36154C21 8.59171 21 8.8363 21 9.32548Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-textColor">ذخیره</span>
              </button>
            </div>

            {/* سوئیچ‌ها */}
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 items-center px-2">
                <span className="py-2">نمایش حجم</span>
                <div className="text-left">
                  <Switch
                    defaultChecked={true}
                    onChange={(e) => SetShowValues(e.target.checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 items-center px-2 -mt-2">
                <span className="py-2">نمایش زمان</span>
                <div className="text-left">
                  <Switch
                    defaultChecked={true}
                    onChange={(e) => SetShowTimes(e.target.checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 items-center px-2 -mt-2">
                <span className="py-2">نمایش قیمت(دلار)</span>
                <div className="text-left">
                  <Switch
                    defaultChecked={false}
                    onChange={(e) => SetShowPrice(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* سوییچر شبکه/توکن */}
            <div className="mt-3 px-2">
              <label className="block mb-1">ترسیم بر اساس</label>

              <Dropdown
                // مقدار ثابت نگه داشته می‌شود
                value={selectedValue?.value}
                // onChange خنثی می‌شود تا Moon Dropdown چیزی تغییر ندهد
                onChange={() => { }}
              >
                <Dropdown.Trigger className="w-full">
                  <Button
                    as="span"
                    role="button"
                    variant="ghost"
                    className="flex items-center justify-between w-full px-10 py-2 cursor-pointer
        text-gray-700 border border-boxBorderColor
        rounded-lg dark:border-buttonBorderColor-dark focus:outline-none 
        dark:text-gray-100 appearance-none relative"
                  >
                    {selectedValue ? (
                      <span className="text-textColor flex items-center">
                        <img
                          src={`/images/${selectedValue.value}.png`}
                          alt={selectedValue.value}
                          className="w-5 h-5 inline-block ml-2"
                        />
                        {selectedValue.label || selectedValue.value}
                      </span>
                    ) : (
                      <span className="text-textColor opacity-70">Select token...</span>
                    )}
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Options
                  className="absolute right-0 mt-2 w-72 px-2 py-1
      text-gray-700 bg-bgColor dark:bg-buttonColor-dark
      border border-boxBorderColor dark:border-buttonBorderColor-dark 
      rounded-lg dark:text-gray-100 appearance-none z-50
      max-h-60 overflow-y-auto"
                >
                  {GraphTokens.map((item, index) => (
                    <Dropdown.Option value={item.value} key={index}>
                      {({ active }) => (
                        <MenuItem
                          isActive={active}
                          // اینجا انتخاب ظاهری انجام نمی‌شود
                          isSelected={false}
                          onClick={() => {
                            // فقط این منطق اجرا می‌شود:
                            setAddselectedToken({ value: item.value, contract: item.contract });
                            setChangeNetworkBox(true);
                            // Dropdown بسته شود:
                            document.activeElement?.blur();
                          }}
                          className={`border mt-2 mb-1 rounded-md border-gray-100 dark:border-buttonBorderColor-dark ${selectedValue?.value === item.value
                            ? "bg-boxColor border-boxBorderColor dark:bg-gray-700"
                            : "border-boxBorderColor"
                            } text-textColor`}
                        >
                          <MenuItem.Title>
                            <img
                              src={`/images/${item.value}.png`}
                              alt={item.value}
                              className="w-5 h-5 inline-block ml-2"
                            />
                            {item.label || item.value}
                          </MenuItem.Title>
                        </MenuItem>
                      )}
                    </Dropdown.Option>
                  ))}
                </Dropdown.Options>
              </Dropdown>

            </div>

            {/* افزودن رنگ (تم‌محور) */}
            <div className="mt-3 px-2">
              <label className="block mb-2">افزودن رنگ</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    SetColor(themeColor("red"));
                  }}
                  className="h-6 w-6 rounded ring-1 ring-black/10"
                  style={{
                    background: "var(--tw-ring-offset-shadow,0 0 #0000)",
                    backgroundColor: "transparent",
                  }}
                >
                  <span className="block cursor-pointer h-full w-full rounded bg-red-600" />
                </button>

                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    SetColor(themeColor("success"));
                  }}
                  className="h-6 w-6 rounded ring-1 ring-black/10"
                >
                  <span className="block cursor-pointer h-full w-full rounded bg-green-400" />
                </button>

                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    SetColor(themeColor("warning"));
                  }}
                  className="h-6 w-6 rounded ring-1 ring-black/10"
                >
                  <span className="block cursor-pointer h-full w-full rounded bg-amber-500 " />
                </button>

                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    SetColor(themeColor("yellow"));
                  }}
                  className="h-6 w-6 rounded ring-1 ring-black/10"
                >
                  <span className="block cursor-pointer h-full w-full rounded bg-yellow-300" />
                </button>

                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    SetColor(themeColor("sky"));
                  }}
                  className="h-6 w-6 rounded ring-1 ring-black/10"
                >
                  <span className="block cursor-pointer h-full w-full rounded bg-purple-500" />
                </button>

                <button
                  onClick={() => {
                    SetSelectedEdges([]);
                    DeleteColor();
                  }}
                  title="حذف رنگ"
                  className="ml-1 p-1 cursor-pointer rounded text-textColor transition"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className=""
                  >
                    <path
                      d="M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z"
                      transform="translate(-152 -1035)"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* راهنما */}
            <div className="mt-3 px-2">
              <button
                onClick={() => SetShowGuides(true)}
                className="hover:bg-bgPrimary cursor-pointer flex items-center gap-2 w-full px-2 py-2 rounded-md transition text-textColor"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.25 2C.56 2 0 2.56 0 3.25v8.5C0 12.44.56 13 1.25 13H5c.896 0 1.475.205 1.809.448.317.23.441.51.441.802a.75.75 0 001.5 0c0-.292.124-.572.441-.802.334-.243.913-.448 1.809-.448h3.75c.69 0 1.25-.56 1.25-1.25v-8.5C16 2.56 15.44 2 14.75 2H11c-1.154 0-2.106.354-2.772 1-.081.08-.157.161-.228.246A3.131 3.131 0 007.772 3C7.106 2.354 6.154 2 5 2H1.25zm7.5 9.967c.61-.309 1.372-.467 2.25-.467h3.5v-8H11c-.846 0-1.394.253-1.728.577-.335.325-.522.787-.522 1.34v6.55zm-1.5 0v-6.55c0-.553-.187-1.015-.522-1.34C6.394 3.753 5.846 3.5 5 3.5H1.5v8H5c.878 0 1.64.158 2.25.467z"
                  />
                </svg>
                <span className="text-textColor">راهنما</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* راهنما */}
      <Modal
        open={ShowGuides}
        onClose={() => SetShowGuides(false)}
        className="p-0"
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[50px] text-textColor p-4">
            <h5>
              راهنمای کار با ردیابی
            </h5>
            <div className="pe-3">
              <h6 className="mt-3 mb-3 font-bold">
                علامت و نشانه‌ها
              </h6>


              <img className="inline-block" style={{ width: '30px', height: '30px' }} src="/images/address.PNG" /> <Label className="inline-block">آدرس</Label>
              <br />
              <img className="inline-block" style={{ width: '30px', height: '30px' }} src="/images/tr.PNG" /> <Label className="inline-block">تراکنش</Label>
              <br />
              <img className="inline-block" style={{ width: '30px', height: '30px' }} src="/images/start.PNG" /> <Label className="inline-block">آدرس شروع کننده گراف</Label>
              <br />
              <h6 className=" font-bold">
                نوشته بالای آدرس ها
              </h6>
              مشخص کننده نوع کیف پول

              <h6 className="mt-3 font-bold">
                عدد ریسک
              </h6>

              از 70 به بالا: قرمز
              <br />
              از 50 تا 70: نارنجی
              <br />
              کمتر از 50: آبی

              <br />

              <h6 className="mt-3 font-bold">
                مشخص کردن مسیرها با رنگ های متفاوت
              </h6>

              <p>
                ابتدا با نگه‌داشتن کلید ctrl، یال های مورد نظر را انتخاب کرده و سپس با کلیک بر روی رنگ مورد نظر در بخش تنظیمات، رنگ یال های انتخاب شده را تغییر دهید.
              </p>

              <h6 className="mt-3 font-bold">
                برچسب تراکنش‌ها
              </h6>

              <p>
                بر روی هر یالی که بین یک تراکنش و یک آدرس قرار گرفته است، برچسبی شامل اطلاعات تراکنش از جمله زمان و حجم آن درج شده است.  <br />در بخش تنظیمات، کاربران امکان انتخاب نمایش یا پنهان‌سازی اطلاعات حجم و زمان تراکنش را دارند. <br /> همچنین کاربران می‌توانند قیمت دلاری تراکنش را نیز مشاهده کنند.
              </p>

              <h6 className="mt-3 font-bold">
                دانلود اطلاعات گراف
              </h6>

              <p>
                کاربران با افزودن رنگ به مسیر های گراف و انتخاب رنگ مورد نظر، می‌توانند اطلاعات آدرس و تراکنش های مسیر انتخاب شده را به صورت فایل اکسل دریافت کنند
              </p>
            </div>
          </Modal.Panel>
        </div>
      </Modal>

      {/* ذخیره */}
      <Modal
        open={OpenSaveBox}
        onClose={() => SetOpenSaveBox(false)}
        className="p-0"
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[50px] text-textColor p-4">
            <>
              <h6>ذخیره گراف</h6>
              <Input className='border border-boxBorderColor rounded-md mt-4' placeholder='عنوان گراف' id='GraphName' defaultValue={Name} />
              <Input className='border border-boxBorderColor rounded-md mt-4'
                id='GraphDescription'
                name='text'
                defaultValue={Description}
                placeholder='توضیحات'
              />
            </>
            <Button onClick={() => {
              SetName(document.getElementById('GraphName').value)
              SetDescription(document.getElementById('GraphDescription').value)
              saveGraph()
            }}
              className='bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4'
              color={'secondary'} style={{ height: '37px', width: '100%' }} >
              {
                Loading ?
                  // <LoadingButton />
                  <CircularProgress style={{ width: '25px', height: '25px', marginBottom: '-4px' }} />
                  :
                  <span>ذخیره</span>
              }
            </Button>
          </Modal.Panel>
        </div>
      </Modal>

      {/* گزارش */}
      <Modal
        open={ReportBox}
        onClose={() => SetReportBox(false)}
        className="p-0"
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[50px] text-textColor p-4">
            <ReportModal Data={Data} PaintedEdges={PaintedEdges} />
          </Modal.Panel>
        </div>
      </Modal>

      {/* تغییر شبکه */}
      <Modal
        open={ChangeNetworkBox}
        onClose={() => setChangeNetworkBox(false)}
        className="p-0"
      >
        <Modal.Backdrop />
        <div className="fixed inset-0 flex z-50 backdrop-blur-sm bg-white/10">
          <Modal.Panel className="w-full max-w-xl rounded-lg bg-boxColor  shadow-lg mt-[50px] text-textColor p-4">
            <h6> آیا از تغییر شبکه مورد نظر مطمئن هستید؟</h6>
            <small className="font-bold"> در صورتی که گراف ذخیره نشده باشد، اطلاعات مورد نظرتان از بین خواهد رفت</small>
            <br />
            <Button color={'warning'} style={{ height: '37px', width: '100%', marginRight: '4px' }}
              className='bg-boxBorderColor border border-boxBorderColor rounded-lg text-textColor w-full py-1 cursor-pointer mt-4'
              onClick={() => {
                window.location.assign(`/panel/tracker/${network}/${hash}/${selectedToken.value}/${selectedToken.contract !== undefined ? selectedToken.contract : ''}`)
              }}
            >
              تغییر
            </Button>
          </Modal.Panel>
        </div>
      </Modal>
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

    </div>
  );
};

export default Page;
