import React, { useRef, useEffect, useState } from "react";
import { DataSet, Network } from "vis";
import { Options } from "../functions/Options";
import { SetEdgesData } from "./SetEdgesData";
// import AddressBox from "../AddressBox/AddressBox";
import { useParams } from 'next/navigation'
import { MiladiCalendar } from "@/functions/miladiCalendar";
import html2canvas from 'html2canvas';
// import TxBox from "../TxBox/TxBox";

const mainURL = process.env.NEXT_PUBLIC_API_URL;

const FuckingGraph_V2 = ({
  Data,
  NodesPosition,
  SetNodesPosition,
  Reload,
  SetReload,
  SetData,
  SetScale,
  Scale,
  SetXPosition,
  XPosition,
  SetYPosition,
  YPosition,
  ShowValues,
  ShowTimes,
  TakeSceenShot,
  ShowPrice,
  SetSelectedEdges,
  PaintedEdges
}) => {
  const networkRef = useRef(null);
  const [NewPositions, SetNewPositions] = useState(NodesPosition);
  const [OpenAddressModal, SetOpenAddressModal] = useState(false);
  const [OpenTxModal, SetOpenTxModal] = useState(false);
  const [AddressSelectedData, SetAddressSelectedData] = useState(null);
  const [IsStart, SetIsStart] = useState(false);
  const [ScreenShot, SetScreenShot] = useState(TakeSceenShot);

  const { network } = useParams();
  const { token } = useParams();

  const takeScreenshot = () => {
    const input = document.getElementById('myGraphDiv');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = imgData;
        link.click();
      });
  }

  useEffect(() => {
    let network;
    const edges = new DataSet([]);
    const nodes = new DataSet([]);

    //گرفتن عکس
    function adjustOverlappingPositions(array) {
      const seenPositions = new Set();

      for (let i = 0; i < array.length; i++) {
        let positionKey = `${array[i].x},${array[i].y}`;

        // افزایش y تا زمانی که موقعیت تکراری نباشد
        while (seenPositions.has(positionKey)) {
          array[i].y -= 100; // مقدار y را تغییر می‌دهیم
          positionKey = `${array[i].x},${array[i].y}`; // کلید جدید را ایجاد می‌کنیم
        }

        // موقعیت نهایی را به Set اضافه می‌کنیم
        seenPositions.add(positionKey);
      }

      return array;
    }

    //ساخت گره های آدرس
    const CreateNode = (array) => {
      for (let i = 0; i < array.length; i++) {
        let check = true;
        while (check) {
          let newNode;
          let showLabel = false;
          if (array[i].Label) {
            showLabel = array[i].Label;
          } else {
            showLabel = `...${array[i].text.substring(0, 7)}`;
          }
          newNode = {
            id: array[i].id,
            x: Number(array[i].x),
            y: Number(array[i].y),
            group: array[i].type,
            selectable: true,
            color: { border: array[i].risk !== null ? array[i].risk >= 70 ? "red" : array[i].risk >= 50 ? "orange" : 'blue' : 'blue' },
            address: array[i].text,
            image: array[i].entity === null ? "/images/location.png" : array[i].entity.image !== null ? mainURL + array[i].entity.image : "/images/location.png",
            label: array[i].type === "transaction" ? array[i].network : array[i].label !== null ? array[i].label : array[i].entity !== null ? array[i].entity.name : `...${(array[i].text).substring(0, 7)}`,
          };
          if (!NewPositions.some((item) => item.id === newNode.id)) {
            const AddNewPosition = NewPositions;
            AddNewPosition.push({
              id: newNode.id,
              x: newNode.x,
              y: newNode.y,
            });
            SetNewPositions(AddNewPosition);
          }
          let AddNewPosition = NewPositions;
          const adjustedNodes = adjustOverlappingPositions(AddNewPosition);
          SetNewPositions(adjustedNodes);
          nodes.add(newNode);
          check = false;
        }
      }
      SetNodesPosition(NewPositions);
    };

    //اول گره هایی که از قبل داشتیم رو بچینه، بعد گره های  جدید رو
    const newGraphData = [];
    for (let i = 0; i < Data.length; i++) {
      if (NewPositions.some((item) => item.id === Data[i].id)) {
        newGraphData.push(Data[i]);
      }
    }
    for (let i = 0; i < Data.length; i++) {
      if (!NewPositions.some((item) => item.id === Data[i].id)) {
        newGraphData.push(Data[i]);
      }
    }
    CreateNode(newGraphData);

    //یال ها
    const getEdges = SetEdgesData(Data, PaintedEdges);
    for (let i = 0; i < getEdges.length; i++) {
      edges.add(getEdges[i]);
    }

    //ساخت گره های هات ولت
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].metadata !== null) {
        const newNode = {
          id: Data[i].id + 'hotWallet',
          x:  Number(Data[i].x),
          y: Data[i].main ? Number(Data[i].y - 45) : Number(Data[i].y - 25),
          group: 'hotWallet',
          image: "/images/fire.png",
          label: Data[i].metadata,
          selectable: false,
          // غیرفعال کردن انتخاب و جابجایی گره
          interaction: {
            dragNodes: false,   // غیر فعال کردن جابجایی
          },

        };
        nodes.add(newNode);
      }
    }

    //ساخت گره های لیبل یال ها
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].type === 'address') {
        for (let j = 0; j < Data[i].inputs.length; j++) {
          const x = (Data[i].x + Data.find(item => item.id === Data[i].inputs[j].id).x) / 2
          const y = (Data[i].y + Data.find(item => item.id === Data[i].inputs[j].id).y) / 2
          let label = ``
          if (ShowValues) {
            if (ShowPrice) {
              if (typeof(Data[i].inputs[j].DollarValue) === 'number' && !isNaN(Data[i].inputs[j].DollarValue)) {
                label = label + `\u200E${(Data[i].inputs[j].DollarValue).toLocaleString()} USD`
              } else {
                label = 'قیمت نامشخص'
              }
            } else {
              label = label + `\u200E${(Data[i].inputs[j].value).toLocaleString()} ${Data[i].inputs[j].symbol}`
            }
          }
          if (ShowTimes && ShowValues) {
            label = label + ` \n `
          }
          if (ShowTimes) {
            if (typeof (Data[i].inputs[j].time) === 'number'  && !isNaN(Data[i].inputs[j].time)) {
              label = label + `\u200E ${MiladiCalendar(Data[i].inputs[j].time).year}/${MiladiCalendar(Data[i].inputs[j].time).month}/${MiladiCalendar(Data[i].inputs[j].time).day} - ${MiladiCalendar(Data[i].inputs[j].time).hour}:${MiladiCalendar(Data[i].inputs[j].time).minute}`
            } else {
              label = 'زمان نامشخص'
            }
          }
          
          const newNode = {
            id: Data[i].id + 'Tr' + Data[i].inputs[j].id,
            x: x,
            y: y,
            from: Data[i].id,
            to: Data[i].inputs[j].id,
            group: 'labelNode',
            label: label,
            selectable: false,
          }
          if (ShowTimes || ShowValues) {
            nodes.add(newNode)
          }
        }

        for (let j = 0; j < Data[i].outputs.length; j++) {
          const x = (Data[i].x + Data.find(item => item.id === Data[i].outputs[j].id).x) / 2
          const y = (Data[i].y + Data.find(item => item.id === Data[i].outputs[j].id).y) / 2
          let label = ``
          if (ShowValues) {
            if (ShowPrice) {
              if (typeof (Data[i].outputs[j].DollarValue) === 'number'  && !isNaN(Data[i].outputs[j].DollarValue)) {
                label = label + `\u200E${(Data[i].outputs[j].DollarValue).toLocaleString()} USD`
              } else {
                label = 'قیمت نامشخص'
              }
            } else {
              label = label + `\u200E${(Data[i].outputs[j].value).toLocaleString()} ${Data[i].outputs[j].symbol}`
            }
          }
          if (ShowTimes && ShowValues) {
            label = label + ` \n `
          }
          if (ShowTimes) {
            if (typeof (Data[i].outputs[j].time) === 'number'  && !isNaN(Data[i].outputs[j].time)) {
              label = label + `\u200E ${MiladiCalendar(Data[i].outputs[j].time).year}/${MiladiCalendar(Data[i].outputs[j].time).month}/${MiladiCalendar(Data[i].outputs[j].time).day} - ${MiladiCalendar(Data[i].outputs[j].time).hour}:${MiladiCalendar(Data[i].outputs[j].time).minute}`
            } else {
              label = 'زمان نامشخص'
            }
          }
          const newNode = {
            id: Data[i].id + 'Tr' + Data[i].outputs[j].id,
            x: x,
            y: y,
            from: Data[i].id,
            to: Data[i].outputs[j].id,
            group: 'labelNode',
            label: label,
            selectable: false,
          }
          if (ShowTimes || ShowValues) {
            nodes.add(newNode)
          }
        }
      }
    }

    //ساخت گره آدرس اصلی
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].main) {
        const x = Data[i].metadata === 'hotWallet' ? (Data[i].x + 10) : (Data[i].x)
        const y = (Data[i].y - 30)
        const newNode = {
          id: Data[i].id + `_Arrow`,
          x: x,
          y: y,
          group: 'Arrow',
          image: "/images/Arrow.png",
          label: ``,
          selectable: false,
        }
        nodes.add(newNode)
      }
    }

    const data = {
      nodes,
      edges,
    };

    network = new Network(networkRef.current, data, Options);

    //ثبت میزان زوم گراف
    network.on("zoom", function (params) {
      SetScale(params.scale)
    })

    //قرار دادن گراف در مختصات و زوم مورد نظر
    network.moveTo({ scale: (Scale), position: { x: XPosition, y: YPosition } });

    //باز شدن باکس اطلاعات آدرس و تراکنش وقتی کلیک میشه
    network.on("click", function (params) {
      if (!params.event.srcEvent.ctrlKey) {
        const nodeId = params.nodes[0];
        if (nodeId) {
          const clickedNode = nodes.get(nodeId);
          if (clickedNode.group === "address") {
            SetAddressSelectedData(Data.find(item => item.id === nodeId))
            SetOpenTxModal(false);
            SetOpenAddressModal(true);
          } else if (clickedNode.group === "transaction") {
            SetAddressSelectedData(Data.find(item => item.id === nodeId))
            SetOpenAddressModal(false);
            SetOpenTxModal(true);
          }
        } else {
          SetOpenAddressModal(false);
          SetOpenTxModal(false);
        }
      }
    });

    //ثبت مختصات کلی گراف
    network.on("dragEnd", function () {
      var FullPosition = network.getViewPosition();
      SetXPosition(FullPosition.x)
      SetYPosition(FullPosition.y)
    })

    //ثبت مختصات جدید گره ها وقتی جا به جا میشن
    network.on("dragEnd", function (params) {
      if (params.nodes.length === 1) {
        var MyNodeId = params.nodes[0];
        if (MyNodeId) {
          var newPosition = network.getPositions(MyNodeId);
          let GetData = Data
          GetData.find(item => item.id === MyNodeId).x = newPosition[MyNodeId].x
          GetData.find(item => item.id === MyNodeId).y = newPosition[MyNodeId].y
          SetData(GetData)
        }
      } else if (params.nodes.length > 1) {
        var MyNodeId = params.nodes;
        let GetData = Data
        if (MyNodeId) {
          for (let ii = 0; ii < MyNodeId.length; ii++) {
            var newPosition = network.getPositions(MyNodeId[ii]);
            GetData.find(item => item.id === MyNodeId[ii]).x = newPosition[MyNodeId[ii]].x
            GetData.find(item => item.id === MyNodeId[ii]).y = newPosition[MyNodeId[ii]].y
          }
          SetData(GetData)
        }
      }
    });

    // تغییر مکان آیکون هات ولت هنگام جا به جایی گره اصلی
    network.on("dragging", function (params) {
      if (params.nodes.length > 0) {
        var newPositions = network.getPositions(params.nodes);
        params.nodes.forEach(function (nodeId) {
          var MyNodeId = nodeId + 'hotWallet';
          var newPosition = { x: newPositions[nodeId].x, y: newPositions[nodeId].y - 30 };
          network.moveNode(MyNodeId, newPosition.x, newPosition.y);
        });
      }
    });

    // تغییر مکان آیکون هات ولت هنگام جا به جایی گره اصلی
    network.on("dragEnd", function (params) {
      if (params.nodes.length > 0) {
        var newPositions = network.getPositions(params.nodes);
        params.nodes.forEach(function (nodeId) {
          var MyNodeId = nodeId + 'hotWallet';
          var newPosition = { x: newPositions[nodeId].x, y: newPositions[nodeId].y - 30 };
          network.moveNode(MyNodeId, newPosition.x, newPosition.y);
        });
      }
    });

    // تغییر مکان لیبل ها هنگام جا به جایی گره اصلی
    network.on("dragging", function (params) {
      if (params.nodes.length > 0) {
        params.nodes.forEach(function (nodeId) {
          if (network.body.data.nodes.get().some(item => item.from === nodeId)) {
            const allLabels = network.body.data.nodes.get().filter(item => item.from === nodeId)
            for (let i = 0; i < allLabels.length; i++) {
              const newX = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).x + (network.getPositions(allLabels[i].to)[allLabels[i].to]).x) / 2
              const newy = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).y + (network.getPositions(allLabels[i].to)[allLabels[i].to]).y) / 2
              network.moveNode(allLabels[i].id, newX, newy)
            }
          }

          if (network.body.data.nodes.get().some(item => item.to === nodeId)) {
            const allLabels = network.body.data.nodes.get().filter(item => item.to === nodeId)
            for (let i = 0; i < allLabels.length; i++) {
              const newX = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).x + (network.getPositions(allLabels[i].to)[allLabels[i].to]).x) / 2
              const newy = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).y + (network.getPositions(allLabels[i].to)[allLabels[i].to]).y) / 2
              network.moveNode(allLabels[i].id, newX, newy)
            }
          }
        });
      }
    });

    // تغییر مکان لیبل ها هنگام جا به جایی گره اصلی
    network.on("dragEnd", function (params) {
      if (params.nodes.length > 0) {
        params.nodes.forEach(function (nodeId) {
          if (network.body.data.nodes.get().some(item => item.from === nodeId)) {
            const allLabels = network.body.data.nodes.get().filter(item => item.to === nodeId)
            for (let i = 0; i < allLabels.length; i++) {
              const newX = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).x + (network.getPositions(allLabels[i].to)[allLabels[i].to]).x) / 2
              const newy = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).y + (network.getPositions(allLabels[i].to)[allLabels[i].to]).y) / 2
              network.moveNode(allLabels[i].id, newX, newy)
            }
          }

          if (network.body.data.nodes.get().some(item => item.to === nodeId)) {
            const allLabels = network.body.data.nodes.get().filter(item => item.to === nodeId)
            for (let i = 0; i < allLabels.length; i++) {
              const newX = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).x + (network.getPositions(allLabels[i].to)[allLabels[i].to]).x) / 2
              const newy = ((network.getPositions(allLabels[i].from)[allLabels[i].from]).y + (network.getPositions(allLabels[i].to)[allLabels[i].to]).y) / 2
              network.moveNode(allLabels[i].id, newX, newy)
            }
          }
        });
      }
    });

    //نمیذاره لیبل ها و هات ولت ها و فلش گره اصلی قابل کلیک کردن باشند
    network.on("dragStart", function (params) {
      if (params.nodes.length > 0) {
        params.nodes.forEach(function (nodeId) {
          const clickedNode = nodes.get(nodeId);
          if (clickedNode.selectable === false) {
            network.unselectAll();
          }
        });
      }
    });

    // تغییر مکان فلش گره اصلی جا به جایی گره اصلی
    network.on("dragging", function (params) {
      if (params.nodes.length > 0) {
        var newPositions = network.getPositions(params.nodes);
        params.nodes.forEach(function (nodeId) {
          if (Data.some(item => item.id === nodeId)) {
            if (Data.find(item => item.id === nodeId).main) {
              var MyNodeId = nodeId + '_Arrow';
              var newPosition = { x: newPositions[nodeId].x, y: newPositions[nodeId].y - 30 };
              network.moveNode(MyNodeId, newPosition.x, newPosition.y);
            }
          }
        });
      }
    });

    // تغییر مکان فلش گره اصلی هنگام جا به جایی گره اصلی
    network.on("dragEnd", function (params) {
      if (params.nodes.length > 0) {
        var newPositions = network.getPositions(params.nodes);
        params.nodes.forEach(function (nodeId) {
          if (Data.some(item => item.id === nodeId)) {
            if (Data.find(item => item.id === nodeId).main) {
              var MyNodeId = nodeId + '_Arrow';
              var newPosition = { x: newPositions[nodeId].x, y: newPositions[nodeId].y - 30 };
              network.moveNode(MyNodeId, newPosition.x, newPosition.y);
            }
          }
        });
      }
    });

    // انتخاب یال
    network.on('select', function (event) {
      var selectedEdges = event.edges;
      let selected = []
      selectedEdges.forEach(function (edgeId) {
        var edge = data.edges.get(edgeId)
        selected.push(edge);
      });
      SetSelectedEdges(selected)
    });

  }, [Data, Reload, ShowValues, ShowTimes, ShowPrice, PaintedEdges]);

  useEffect(() => {
    if (!IsStart) {
      SetReload(!Reload)
      SetIsStart(true)
    }
  }, [])

  //دریافت خروجی
  useEffect(() => {
    if (ScreenShot !== TakeSceenShot) {
      takeScreenshot()
      SetScreenShot(TakeSceenShot)
    }
  }, [TakeSceenShot])

  return (
    <div
      id="myGraphDiv"
      ref={networkRef}
      style={{
        minWidth: "100%",
        transition: "0.3s",
        position: "absolute",
        top: "0px",
      }}
    >

      {/* <Modal
        isOpen={OpenAddressModal}
        className="sidebar-lg p-0 kuft "
        toggle={() => {
          SetOpenAddressModal(false);
        }}
        backdrop={false}
        modalClassName="modal-slide-in2222"
        contentClassName="pt-0"
        style={{ margin: "0px", maxWidth: '600px', pointerEvents: 'none', marginTop: '63px', maxHeight: 'calc(100vh - 60px)', overflowY: 'scroll', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
      >

        <AddressBox Reload={Reload} SetReload={SetReload} Data={Data} SetData={SetData} ShowUSD={false} ShowAddress={false} AddressSelectedData={AddressSelectedData} />
      </Modal>

      <Modal
        isOpen={OpenTxModal}
        className="sidebar-lg p-0 kuft "
        toggle={() => {
          SetOpenTxModal(false);
        }}
        backdrop={false}
        modalClassName="modal-slide-in2222"
        contentClassName="pt-0"
        style={{ margin: "0px", maxWidth: '600px', pointerEvents: 'none', marginTop: '63px', maxHeight: 'calc(100vh - 60px)', overflowY: 'scroll', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
      >

        <TxBox Reload={Reload} SetReload={SetReload} Data={Data} SetData={SetData} ShowUSD={false} ShowAddress={false} AddressSelectedData={AddressSelectedData} />
      </Modal> */}
    </div>
  );
};

export default FuckingGraph_V2;
