
export const SetEdgesData = (GraphData, PaintedEdges) => {
  const CreatedEdges = [];
  // ایجاد دیکشنری برای نگاشت آدرس به شناسه (id) جهت بهبود کارایی
  const addressToId = GraphData.reduce((map, node) => {
    map[node.id] = node.id;
    return map;
  }, {});

  // پردازش گره‌های اصلی (که mode === 'main' هستند)
  GraphData.forEach((node) => {
    if (node.type === 'address') {
      // پردازش آرایه "from"
      if (Array.isArray(node.inputs)) {
        node.inputs.forEach((edgeData) => {
          const sourceId = addressToId[edgeData.id];
          if (sourceId !== undefined) {
            if(PaintedEdges.some(item => (item.from === sourceId && item.to === node.id))) {
              CreatedEdges.push({
                from: sourceId,
                to: node.id,
                color:{color:PaintedEdges.find(item => (item.from === sourceId && item.to === node.id)).color}
              });
            } else {

              CreatedEdges.push({
                from: sourceId,
                to: node.id
              });
            }
          }
        });
      }

      // پردازش آرایه "to"
      if (Array.isArray(node.outputs)) {
        node.outputs.forEach((edgeData) => {
          const targetId = addressToId[edgeData.id];
          if (targetId !== undefined) {
            if(PaintedEdges.some(item => (item.from === node.id && item.to === targetId))) {
              CreatedEdges.push({
                from: node.id,
                to: targetId,
                color:{color:PaintedEdges.find(item => (item.from === node.id && item.to === targetId)).color}
              });
            } else {
              CreatedEdges.push({
                from: node.id,
                to: targetId
              });
            }
          }
        });
      }
    }
  });

  return CreatedEdges;
};