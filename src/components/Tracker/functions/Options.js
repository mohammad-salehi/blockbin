
export const Options = {
    layout: {
        hierarchical: false
    },
    physics: false,

    edges: {
        width: 2,
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'horizontal',
            roundness: 0.2
        },
        arrows: {
            to: {
                enabled: true
            }
        },
        font: {
            size: 14,
            align: "middle",
            background: "white",
        },
        color: {
            color: 'rgb(50, 87, 155)',
            highlight: 'rgb(50, 87, 155)'
        },
        chosen: {
            edge: function (values, id, selected, hovering) {
                if (selected) {
                    values.shadow = true;
                    try {
                        values.shadowColor = values.color;
                    } catch (error) {
                        values.shadowColor = "rgba(0,0,0,1)"
                    }
                    values.shadowSize = 10;
                    values.shadowX = 0;
                    values.shadowY = 0;
                    values.width = 3;
                }
            }
        },
    },
    nodes: {
        borderWidth: 1,
        color: {
            border: "white",
            background: "white"
        },
        size: 15,
    },
    
    interaction: {
        selectable: true,
        hover: false,
        hoverConnectedEdges: false,
        dragNodes: true,
        multiselect: true
    },
    groups: {
        transaction: {
            shape: 'dot',
            size: 6,
            font: { size: 13, family: "Arial", color: 'rgb(50, 87, 155)' },
            color: {
                border: 'rgb(50, 87, 155)',
                background: 'rgb(50, 87, 155)',
                highlight: {
                    background: 'rgb(50, 87, 155)',
                    border: 'rgb(50, 87, 155)'
                }
            },
            borderWidth: 0,
            borderColor: "#344461"
        },
        address: {
            icon: {
                face: 'FontAwesome',
                code: '\uf007',  // آیکون مورد نظر
                size: 50,
                color: 'black'
            },
            font: { 
                size: 13, 
                face: "Vazir", 
                color: 'rgb(50, 87, 155)', 
                align: 'left' 
            },
            borderWidth: 2,
            borderColor: "#FF5733",
            align: 'horizontal',
            shape: 'circularImage',
        },
        hotWallet: {
            shape: 'text', // تغییر شکل به متن
            font: { 
                size: 12, 
                face: "Vazir", 
                color: 'rgb(50, 87, 155)', 
                align: 'left' 
            },
            borderWidth: 0, // حذف border
            size: 0, // غیرفعال کردن اندازه دایره
            color: {
                background: 'transparent',
                border: 'transparent',
                highlight: {
                    background: 'transparent',
                    border: 'transparent'
                }
            },
            interaction: {
                selectable: false,
                dragNodes: false
            }
        },
        labelNode: {
            font: { 
                size: 12, 
                face: "Vazir", 
                color: 'rgb(100,100,100)', 
                align: 'center' 
            },
            borderWidth: 1,
            borderColor: "#FF5733",
            align: 'horizontal',
            shape: 'box',
            color: {
                border: 'rgb(200,200,200)'
            },
            size: '15',
            interaction: {
                selectable: false,  // غیر فعال کردن انتخاب گره
                dragNodes: false,   // غیر فعال کردن جابجایی گره
            }
        },
        Arrow: {
            font: { 
                size: 10, 
                face: "Vazir", 
                color: 'rgb(50, 87, 155)', 
                align: 'left' 
            },
            borderWidth: 2,
            borderColor: "#FF5733",
            align: 'horizontal',
            shape: 'circularImage',
            color: {
                background: 'transparent',
                border: 'transparent',
                highlight: {
                    background: 'transparent',
                    border: 'transparent'
                }
            },
            size: '8',
            interaction: {
                selectable: false,  // غیر فعال کردن انتخاب گره
                dragNodes: false,   // غیر فعال کردن جابجایی گره
            }
        }
    }
}