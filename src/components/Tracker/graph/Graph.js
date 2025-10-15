import React, { useRef, useEffect, useState } from "react";
import { DataSet, Network } from "vis";
import { buildOptions } from "../functions/Options";
import { SetEdgesData } from "./SetEdgesData";
import AddressBox from "../AddressBox/AddressBox";
import { useParams } from "next/navigation";
import { MiladiCalendar } from "@/functions/miladiCalendar";
import html2canvas from "html2canvas";
import { Modal } from "@heathmont/moon-core-tw";
import TxBox from "../TxBox/TxBox";

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
  PaintedEdges,
}) => {

  const [isDarkMode, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const containerRef = useRef(null);

  // vis refs
  const networkInstanceRef = useRef(null);
  const nodesRef = useRef(null);
  const edgesRef = useRef(null);
  const initializedRef = useRef(false);

  // latest values for event handlers
  const dataRef = useRef(Data);
  const showValuesRef = useRef(ShowValues);
  const showTimesRef = useRef(ShowTimes);
  const showPriceRef = useRef(ShowPrice);

  useEffect(() => { dataRef.current = Data; }, [Data]);
  useEffect(() => { showValuesRef.current = ShowValues; }, [ShowValues]);
  useEffect(() => { showTimesRef.current = ShowTimes; }, [ShowTimes]);
  useEffect(() => { showPriceRef.current = ShowPrice; }, [ShowPrice]);

  const [NewPositions, SetNewPositions] = useState(NodesPosition);
  const [OpenAddressModal, SetOpenAddressModal] = useState(false);
  const [OpenTxModal, SetOpenTxModal] = useState(false);
  const [AddressSelectedData, SetAddressSelectedData] = useState(null);
  const [IsStart, SetIsStart] = useState(false);
  const [ScreenShot, SetScreenShot] = useState(TakeSceenShot);

  const takeScreenshot = () => {
    const el = document.getElementById("myGraphDiv");
    if (!el || !el.isConnected) return;
    html2canvas(el).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = imgData;
      link.click();
    });
  };

  const downloadPng = (fileName = "graph.png") => {
    const net = networkInstanceRef.current;
    if (!net || !net.canvas || !net.canvas.frame || !net.canvas.frame.canvas) return;
  
    try {
      const canvas = net.canvas.frame.canvas; // بوم اصلی vis
      // کیفیت بهتر: به جای toDataURL از toBlob استفاده می‌کنیم
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (err) {
      console.error("Export failed:", err);
      alert("خروجی گرفتن از گراف ممکن نشد. احتمالاً به خاطر تصاویر cross-origin است.");
    }
  };
  // ---------- Effect 1: ساخت اولیه شبکه فقط یک‌بار ----------
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    nodesRef.current = new DataSet([]);
    edgesRef.current = new DataSet([]);

    const instance = new Network(
      containerRef.current,
      { nodes: nodesRef.current, edges: edgesRef.current },
      buildOptions(!!isDarkMode)
    );
    networkInstanceRef.current = instance;
    initializedRef.current = true;

    // ثبت میزان زوم
    instance.on("zoom", (params) => {
      SetScale(params.scale);
    });

    // کلیک روی گره‌ها: باز/بسته کردن مودال‌ها
    instance.on("click", (params) => {
      if (!params.event?.srcEvent?.ctrlKey) {
        const nodeId = params.nodes[0];
        if (nodeId) {
          const clicked = nodesRef.current.get(nodeId);
          if (clicked?.group === "address") {
            const item = dataRef.current.find((i) => i.id === nodeId);
            SetAddressSelectedData(item || null);
            SetOpenTxModal(false);
            SetOpenAddressModal(true);
          } else if (clicked?.group === "transaction") {
            const item = dataRef.current.find((i) => i.id === nodeId);
            SetAddressSelectedData(item || null);
            SetOpenAddressModal(false);
            SetOpenTxModal(true);
          }
        } else {
          SetOpenAddressModal(false);
          SetOpenTxModal(false);
        }
      }
    });

    // ثبت مختصات کلی گراف
    instance.on("dragEnd", () => {
      const pos = instance.getViewPosition();
      SetXPosition(pos.x);
      SetYPosition(pos.y);
    });

    // ثبت مختصات جدید گره‌ها
    instance.on("dragEnd", (params) => {
      if (!params?.nodes?.length) return;
      const dataCopy = [...dataRef.current];
      if (params.nodes.length === 1) {
        const id = params.nodes[0];
        const newPos = instance.getPositions(id);
        const i = dataCopy.findIndex((d) => d.id === id);
        if (i >= 0) {
          dataCopy[i] = {
            ...dataCopy[i],
            x: newPos[id].x,
            y: newPos[id].y,
          };
        }
      } else {
        params.nodes.forEach((id) => {
          const newPos = instance.getPositions(id);
          const i = dataCopy.findIndex((d) => d.id === id);
          if (i >= 0) {
            dataCopy[i] = {
              ...dataCopy[i],
              x: newPos[id].x,
              y: newPos[id].y,
            };
          }
        });
      }
      SetData(dataCopy);
      dataRef.current = dataCopy;
    });

    // جلوگیری از انتخاب گره‌های غیرقابل‌انتخاب
    instance.on("dragStart", (params) => {
      if (!params?.nodes?.length) return;
      params.nodes.forEach((nodeId) => {
        const clickedNode = nodesRef.current.get(nodeId);
        if (clickedNode?.selectable === false) {
          instance.unselectAll();
        }
      });
    });

    // انتخاب یال‌ها
    instance.on("select", (event) => {
      const sel = [];
      (event.edges || []).forEach((edgeId) => {
        const edge = edgesRef.current.get(edgeId);
        if (edge) sel.push(edge);
      });
      SetSelectedEdges(sel);
    });

    instance.on("dragging", function (params) {
      if (params.nodes.length > 0) {
        const allNodes = nodesRef.current.get();
        const movedIds = params.nodes;

        movedIds.forEach((nodeId) => {
          // گره‌هایی که labelNode هستن و به این نود وصلن
          const relatedLabels = allNodes.filter(
            (n) => n.group === "labelNode" && (n.from === nodeId || n.to === nodeId)
          );

          relatedLabels.forEach((labelNode) => {
            const fromPos = instance.getPositions(labelNode.from)[labelNode.from];
            const toPos = instance.getPositions(labelNode.to)[labelNode.to];
            if (fromPos && toPos) {
              const newX = (fromPos.x + toPos.x) / 2;
              const newY = (fromPos.y + toPos.y) / 2;
              instance.moveNode(labelNode.id, newX, newY);
            }
          });
        });
      }
    });

    // --- helper: هم‌زمان‌سازی لیبل‌ها، فلش و هات‌ولت برای نودهای در حال درگ ---
    const syncAttachedNodes = (instance, movedNodeIds) => {
      if (!movedNodeIds?.length) return;

      const allNodes = nodesRef.current.get(); // تمام نودها از DataSet
      const byId = new Map(allNodes.map((n) => [n.id, n]));

      movedNodeIds.forEach((nodeId) => {
        // 1) لیبل‌هایی که به این نود وصل هستند (from/to)
        const relatedLabels = allNodes.filter(
          (n) => n.group === "labelNode" && (n.from === nodeId || n.to === nodeId)
        );

        relatedLabels.forEach((labelNode) => {
          const fromPos = instance.getPositions(labelNode.from)[labelNode.from];
          const toPos = instance.getPositions(labelNode.to)[labelNode.to];
          if (fromPos && toPos) {
            const newX = (fromPos.x + toPos.x) / 2;
            const newY = (fromPos.y + toPos.y) / 2;
            instance.moveNode(labelNode.id, newX, newY);
          }
        });

        // 2) فلشِ آدرس اصلی (اگر وجود دارد)
        const arrowId = nodeId + "_Arrow";
        if (byId.has(arrowId)) {
          const pos = instance.getPositions(nodeId)[nodeId];
          if (pos) {
            instance.moveNode(arrowId, pos.x, pos.y - 30);
          }
        }

        // 3) نود هات‌ولت (اگر وجود دارد)
        const hotId = nodeId + "hotWallet";
        if (byId.has(hotId)) {
          const pos = instance.getPositions(nodeId)[nodeId];
          if (pos) {
            // اگر برای main آفست متفاوت داری، اینجا اعمال کن
            instance.moveNode(hotId, pos.x, pos.y - 30);
          }
        }
      });
    };

    // --- هنگام درگ: زنده جابه‌جا کن
    instance.on("dragging", (params) => {
      if (params?.nodes?.length) {
        syncAttachedNodes(instance, params.nodes);
      }
    });

    // --- پس از رها کردن: تثبیت نهایی
    instance.on("dragEnd", (params) => {
      if (params?.nodes?.length) {
        syncAttachedNodes(instance, params.nodes);
      }
    });
    // Cleanup فقط هنگام unmount
    return () => {
      if (networkInstanceRef.current) {
        try {
          networkInstanceRef.current.destroy();
        } catch (e) { }
        networkInstanceRef.current = null;
      }
      initializedRef.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, isDarkMode]);

  // ---------- Effect 2: آپدیت داده‌ها و موقعیت/زوم ----------
  useEffect(() => {
    if (!initializedRef.current) return;
    const instance = networkInstanceRef.current;
    const nodesDS = nodesRef.current;
    const edgesDS = edgesRef.current;
    if (!instance || !nodesDS || !edgesDS) return;

    // کمک‌تابع‌ها
    function adjustOverlappingPositions(array) {
      const seen = new Set();
      const copy = array.map((a) => ({ ...a }));
      for (let i = 0; i < copy.length; i++) {
        let key = `${copy[i].x},${copy[i].y}`;
        while (seen.has(key)) {
          copy[i].y -= 100;
          key = `${copy[i].x},${copy[i].y}`;
        }
        seen.add(key);
      }
      return copy;
    }

    // ساخت لیست نودها (آدرس/تراکنش/لیبل/هات‌ولت/فلش)
    const nodesArr = [];
    const edgesArr = [];

    // چیدمان: اول نودهای موجود، بعد جدیدها
    const newGraphData = [
      ...Data.filter((d) => NewPositions.some((p) => p.id === d.id)),
      ...Data.filter((d) => !NewPositions.some((p) => p.id === d.id)),
    ];

    const baseBlue = isDarkMode ? "#93c5fd" : "rgb(50, 87, 155)";

    // ایجاد نودهای address/transaction
    const newPositionsWork = [...NewPositions];
    for (let i = 0; i < newGraphData.length; i++) {
      const item = newGraphData[i];
      const label =
        item.type === "transaction"
          ? item.network
          : item.label !== null
            ? item.label
            : item.entity !== null
              ? item.entity.name
              : `...${item.text.substring(0, 7)}`;

              
      const node = {
        id: item.id,
        x: Number(item.x),
        y: Number(item.y),
        group: item.type,
        selectable: true,

        color: {
          border:
            item.risk !== null
              ? item.risk >= 70
                ? "red"
                : item.risk >= 50
                  ? "orange"
                  : baseBlue
              : baseBlue,
        },
        address: item.text,
        image:
          item.entity === null
            ? "/images/location.png"
            : item.entity.image !== null
              ? mainURL + item.entity.image
              : "/images/location.png",
        label,
      };

      if (!newPositionsWork.some((p) => p.id === node.id)) {
        newPositionsWork.push({ id: node.id, x: node.x, y: node.y });
      }
      nodesArr.push(node);
    }

    const adjusted = adjustOverlappingPositions(newPositionsWork);
    SetNewPositions(adjusted);
    SetNodesPosition(adjusted);

    // یال‌ها
    const builtEdges = SetEdgesData(Data, PaintedEdges);
    for (let i = 0; i < builtEdges.length; i++) edgesArr.push(builtEdges[i]);

    // هات‌ولت‌ها
    for (let i = 0; i < Data.length; i++) {
      const d = Data[i];
      if (d.metadata !== null) {
        nodesArr.push({
          id: d.id + "hotWallet",
          x: Number(d.x),
          y: d.main ? Number(d.y - 45) : Number(d.y - 25),
          group: "hotWallet",
          image: "/images/fire.png",
          label: d.metadata,
          selectable: false,
          interaction: { dragNodes: false },
        });
      }
    }

    // لیبل یال‌ها
    if (ShowValues || ShowTimes) {
      for (let i = 0; i < Data.length; i++) {
        const d = Data[i];
        if (d.type !== "address") continue;

        // inputs
        for (let j = 0; j < d.inputs.length; j++) {
          const other = Data.find((it) => it.id === d.inputs[j].id);
          if (!other) continue;
          const x = (d.x + other.x) / 2;
          const y = (d.y + other.y) / 2;
          let label = ``;

          if (ShowValues) {
            if (ShowPrice) {
              const v = d.inputs[j].DollarValue;
              label +=
                typeof v === "number" && !isNaN(v)
                  ? `\u200E${v.toLocaleString()} USD`
                  : "قیمت نامشخص";
            } else {
              label += `\u200E${d.inputs[j].value.toLocaleString()} ${d.inputs[j].symbol}`;
            }
          }
          if (ShowTimes && ShowValues) label += ` \n `;
          if (ShowTimes) {
            const t = d.inputs[j].time;
            if (typeof t === "number" && !isNaN(t)) {
              const m = MiladiCalendar(t);
              label += `\u200E ${m.year}/${m.month}/${m.day} - ${m.hour}:${m.minute}`;
            } else {
              label = "زمان نامشخص";
            }
          }

          nodesArr.push({
            id: d.id + "Tr" + d.inputs[j].id,
            x,
            y,
            from: d.id,
            to: d.inputs[j].id,
            group: "labelNode",
            label,
            selectable: false,
          });
        }

        // outputs
        for (let j = 0; j < d.outputs.length; j++) {
          const other = Data.find((it) => it.id === d.outputs[j].id);
          if (!other) continue;
          const x = (d.x + other.x) / 2;
          const y = (d.y + other.y) / 2;
          let label = ``;

          if (ShowValues) {
            if (ShowPrice) {
              const v = d.outputs[j].DollarValue;
              label +=
                typeof v === "number" && !isNaN(v)
                  ? `\u200E${v.toLocaleString()} USD`
                  : "قیمت نامشخص";
            } else {
              label += `\u200E${d.outputs[j].value.toLocaleString()} ${d.outputs[j].symbol}`;
            }
          }
          if (ShowTimes && ShowValues) label += ` \n `;
          if (ShowTimes) {
            const t = d.outputs[j].time;
            if (typeof t === "number" && !isNaN(t)) {
              const m = MiladiCalendar(t);
              label += `\u200E ${m.year}/${m.month}/${m.day} - ${m.hour}:${m.minute}`;
            } else {
              label = "زمان نامشخص";
            }
          }

          nodesArr.push({
            id: d.id + "Tr" + d.outputs[j].id,
            x,
            y,
            from: d.id,
            to: d.outputs[j].id,
            group: "labelNode",
            label,
            selectable: false,
          });
        }
      }
    }

    // فلش آدرس اصلی
    for (let i = 0; i < Data.length; i++) {
      const d = Data[i];
      if (d.main) {
        const x = d.metadata === "hotWallet" ? d.x + 10 : d.x;
        const y = d.y - 30;
        nodesArr.push({
          id: d.id + `_Arrow`,
          x,
          y,
          group: "Arrow",
          image: "/images/Arrow.png",
          label: ``,
          selectable: false,
        });
      }
    }

    // اعمال روی DataSet‌ها (بدون destroy)
    nodesDS.clear();
    edgesDS.clear();
    nodesDS.add(nodesArr);
    edgesDS.add(edgesArr);

    // آپدیت موقعیت/زوم
    instance.moveTo({ scale: Scale, position: { x: XPosition, y: YPosition } });

    // ——— حرکت هات‌ولت/فلش/لیبل‌ها هنگام drag/dragEnd ———
    // نکته: این بایندها را اینجا تکرار نکن چون یک‌بار در افکت اول هندل می‌شوند؛
    // برای حرکت پویا از بدنه‌ی بدنه‌ی شبکه و nodeها استفاده می‌کنیم:

    // حرکت هات‌ولت‌ها و فلش و لیبل‌ها: با هر آپدیت داده‌ها، یک tick اجرا می‌کنیم
    // تا اگر در این لحظه درگ فعال است، مکان sync شود.
    const bodyNodes = nodesDS.get();
    const idSet = new Set(bodyNodes.map((n) => n.id));
    // اگر لازم شد می‌توانی اینجا یک sync سبک انجام بدهی
    // (در عمل، درگ eventها همزمان کار می‌کنند)

  }, [Data, Reload, ShowValues, ShowTimes, ShowPrice, PaintedEdges, isDarkMode]);

  useEffect(() => {
    if (!networkInstanceRef.current) return;
    networkInstanceRef.current.setOptions(buildOptions(!!isDarkMode));
  }, [isDarkMode]);

  // شروع اولیه: یک بار ریلود
  useEffect(() => {
    if (!IsStart) {
      SetReload(!Reload);
      SetIsStart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // اسکرین‌شات
  useEffect(() => {
    if (ScreenShot !== TakeSceenShot) {
      takeScreenshot();
      SetScreenShot(TakeSceenShot);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TakeSceenShot]);

  return (
    <div
      id="myGraphDiv"
      ref={containerRef}

      style={{ minWidth: "100%", transition: "0.3s", backgroundImage: isDarkMode ? "" : "url('/images/light_graph_bg.png')" }}
    >
      <Modal
        open={OpenAddressModal}
        onClose={() => SetOpenAddressModal(false)}
        className="p-0"
      >
        <Modal.Backdrop />

        <Modal.Panel
          className="
      fixed left-[33px] top-[73px] h-[calc(100vh-60px)] 
      w-full max-w-2xl 
      bg-boxColor dark:bg-bgColor-dark 
      shadow-lg rounded-none
      text-titleText dark:text-titleText-dark
      overflow-y-auto
    "
        >
          <button onClick={() => downloadPng()}>دانلود اسکرین‌شات</button>
          <AddressBox
            Reload={Reload}
            SetReload={SetReload}
            Data={Data}
            SetData={SetData}
            ShowUSD={false}
            ShowAddress={false}
            AddressSelectedData={AddressSelectedData}
          />
        </Modal.Panel>
      </Modal>


      <Modal
        open={OpenTxModal}
        onClose={() => SetOpenTxModal(false)}
        className="p-0"
      >
        <Modal.Backdrop />

        <Modal.Panel
          className="
      fixed left-[33px] top-[73px] h-[calc(100vh-60px)] 
      w-full max-w-2xl 
      bg-boxColor dark:bg-bgColor-dark 
      shadow-lg rounded-none
      text-titleText dark:text-titleText-dark
      overflow-y-auto
    "
        >
          <TxBox
            Reload={Reload}
            SetReload={SetReload}
            Data={Data}
            SetData={SetData}
            ShowUSD={false}
            ShowAddress={false}
            AddressSelectedData={AddressSelectedData}
          />
        </Modal.Panel>
      </Modal>

    </div>
  );
};

export default FuckingGraph_V2;
