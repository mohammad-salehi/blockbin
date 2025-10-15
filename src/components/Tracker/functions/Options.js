// functions/Options.js
export const buildOptions = (isDark) => {
    const palette = isDark
      ? {
          text: "#e5e7eb",         // slate-200
          subtext: "#9ca3af",      // slate-400
          edge: "#6ea8ff",
          nodeBorder: "#93c5fd",
          nodeBg: "#0b1220",       // نزدیک به bg-gray-900
          boxBorder: "#374151",    // gray-700
          labelBg: "rgba(17,24,39,.6)", // نیمه‌شفاف روی دارک
        }
      : {
          text: "#111827",         // gray-900
          subtext: "#4b5563",      // gray-600
          edge: "rgb(50, 87, 155)",
          nodeBorder: "#1f3a5f",
          nodeBg: "#ffffff",
          boxBorder: "rgb(200,200,200)",
          labelBg: "#ffffff",
        };
  
    return {
      layout: { hierarchical: false },
      physics: false,
  
      edges: {
        width: 2,
        smooth: {
          type: "cubicBezier",
          forceDirection: "horizontal",
          roundness: 0.2,
        },
        arrows: { to: { enabled: true } },
        font: {
          size: 14,
          align: "middle",
          color: palette.text,
          background: palette.labelBg,
        },
        color: {
          color: palette.edge,
          highlight: palette.edge,
        },
        chosen: {
          edge(values, id, selected) {
            if (selected) {
              values.shadow = true;
              values.shadowColor = values.color || "rgba(0,0,0,1)";
              values.shadowSize = 10;
              values.shadowX = 0;
              values.shadowY = 0;
              values.width = 3;
            }
          },
        },
      },
  
      nodes: {
        borderWidth: 1,
        color: {
          border: palette.nodeBorder,
          background: palette.nodeBg,
        },
        size: 15,
      },
  
      interaction: {
        selectable: true,
        hover: false,
        hoverConnectedEdges: false,
        dragNodes: true,
        multiselect: true,
      },
  
      groups: {
        transaction: {
          shape: "dot",
          size: 6,
          font: { size: 13, family: "Arial", color: palette.edge },
          color: {
            border: palette.edge,
            background: palette.edge,
            highlight: { background: palette.edge, border: palette.edge },
          },
          borderWidth: 0,
          borderColor: "#344461",
        },
  
        address: {
          icon: { face: "FontAwesome", code: "\uf007", size: 50, color: isDark ? "black" : "black" },
          font: { size: 13, face: "Vazir", color: palette.edge, align: "left" },
          borderWidth: 2,
          borderColor: "#FF5733",
          align: "horizontal",
          shape: "circularImage",
        },
        address: {
          shape: "circularImage",
          icon: { face: "FontAwesome", code: "\uf007", size: 50, color: "black" },
          font: { size: 13, face: "Vazir", color: palette.edge, align: "left" },
          borderWidth: 2,
          borderColor: "#FF5733",
          color: {
            background: "#ffffff",
          },
          shapeProperties: {
            useBorderWithImage: true,
          },
          align: "horizontal",
        },
        hotWallet: {
          shape: "text",
          font: { size: 12, face: "Vazir", color: palette.edge, align: "left" },
          borderWidth: 0,
          size: 0,
          color: {
            background: "transparent",
            border: "transparent",
            highlight: { background: "transparent", border: "transparent" },
          },
          interaction: { selectable: false, dragNodes: false },
        },
  
        labelNode: {
          font: { size: 12, face: "Vazir", color: palette.subtext, align: "center" },
          borderWidth: 1,
          borderColor: "#FF5733",
          align: "horizontal",
          shape: "box",
          color: {
            border: palette.boxBorder,
            background: isDark ? "rgba(31,41,55,.6)" : "#fff", // gray-800 نیمه‌شفاف
          },
          size: 15,
          interaction: { selectable: false, dragNodes: false },
        },
  
        Arrow: {
          font: { size: 10, face: "Vazir", color: palette.edge, align: "left" },
          borderWidth: 2,
          borderColor: palette.edge,
          align: "horizontal",
          shape: "circularImage",
          color: {
            background: "transparent",
            border: "transparent",
            highlight: { background: "transparent", border: "transparent" },
          },
          size: 8,
          interaction: { selectable: false, dragNodes: false },
        },
      },
    };
  };
  