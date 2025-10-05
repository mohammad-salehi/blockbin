import React, { useEffect, useState } from "react";
// import { Card, Col, Row } from 'reactstrap'   ← حذف
import "./style.css";
// import { GetRequest } from '../../../../newProcessors/GetRequest'
// import { serverAddress } from '../../../../address'
// import { getSymbole } from '../../../../newProcessors/NetworksData'

const RoundedColorBox = (props) => {
    const [Price, SetPrice] = useState(123000);
    const [Block, SetBlock] = useState(2891022);

    // useEffect(() => {
    //     try {
    //         document.documentElement.style.setProperty('--dynamic-color', '#01153a');

    //     } catch (error) {
    //         document.documentElement.style.setProperty('--dynamic-color', 'black');

    //     }
    //     GetRequest(`${serverAddress}/explorer/price-service/?timestamp=${Math.trunc(Date.now() / 1000)}&symbol=${props.symbol !== 'BSC' ? props.symbol : 'BNB'}`)
    //         .then((response) => {
    //             SetPrice(response.data.price)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    //     GetRequest(`${serverAddress}/explorer/latest-block-info/?network=${props.symbol}`)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 SetBlock(response.data.block_number)
    //             }
    //         })
    // }, [])

    return (
        <div
            className="animated-border-box bg-gradient-main shadow-none font-iranSans text-sm"
            style={{ "--dynamic-color": props.NetworkColor }}
        >
            {/* Row 1 */}
            <div className="flex flex-wrap items-center">
                {/* Col */}
                <div className="w-full md:w-1/2 px-6 py-4">
                    <div className="flex flex-col">
                        <h4
                            style={{
                                display: "inline-block",
                                marginLeft: "8px",
                                marginBottom: "-14px",
                                fontWeight: "100",
                            }}
                            className="text-textColor font-bold"
                        >
                            {props.name}
                        </h4>

                        <h6
                            className="mt-3 text-textColor font-bold"
                            style={{
                                display: "inline-block",
                                marginLeft: "8px",
                                marginBottom: "-14px",
                            }}

                        >
                            {props.symbol}
                        </h6>
                    </div>
                </div>

                {/* Col (لوگو) */}
                <div className="w-full md:w-1/2 px-6 py-4 text-left">
                    <img
                        src={`/images/${props.logo}`}
                        style={{ width: "48px", display: "inline-block" }}
                        alt=""
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap">
                {/* Col */}
                <div className="w-full md:w-1/2 px-6 py-4">
                    <div className="flex flex-col">
                        <h6 style={{ fontWeight: "100" }} className="text-textColor">آخرین بلاک</h6>
                        <h6 style={{}} className="text-textColor font-bold">
                            {Block ? Block.toLocaleString() : "نامشخص"}
                        </h6>
                    </div>
                </div>

                {/* Col */}
                <div className="w-full md:w-1/2 px-6 py-4">
                    <div className="flex flex-col">
                        <h6 style={{ fontWeight: "100" }} className="text-textColor">قیمت</h6>
                        <h6 style={{}} className="text-textColor font-bold">
                            {Price ? `${Number(Price).toLocaleString()}$` : "نامشخص"}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoundedColorBox;
