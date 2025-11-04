import React, { useEffect, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";

const EntityTypes = (props) => {
    const [PersianEntityNumber, SetPersianEntityNumber] = useState(0);
    const [EntityNumber, SetEntityNumber] = useState(0);

    useEffect(() => {
        GetRequest(`${serverAddress}/entity/filter-process/?limit=1&offset=0&type=${props.id}`)
            .then((response) => {
                if (response.status === 200) {
                    SetEntityNumber(response.data.count)
                } else {
                    SetEntityNumber(0)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        GetRequest(`${serverAddress}/entity/filter-process/?countries=106&limit=1&offset=0&type=${props.id}`)
            .then((response) => {
                if (response.status === 200) {
                    SetPersianEntityNumber(response.data.count)
                } else if (response.status === 204) {
                    SetPersianEntityNumber(0)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div
            className="animated-border-box bg-gradient-main shadow-none font-iranSans text-sm h-full"
            style={{ "--dynamic-color": props.NetworkColor }}
        >
            <a className="cursor-pointer"  href={`/panel/entity/types/${props.symbol}`}>
                {/* Row 1 */}
                <div className="flex flex-wrap items-center">
                    {/* Col */}
                    <div className="w-full md:w-1/2 px-6 py-2">
                        <div className="flex flex-col">
                            <h4
                                style={{
                                    display: "inline-block",
                                    marginLeft: "8px",
                                    fontWeight: "bold",
                                }}
                                className="text-textColor font-bold"
                            >
                                {props.name}
                            </h4>
                        </div>
                    </div>

                    {/* Col (لوگو) */}
                    <div className="w-full md:w-1/2 px-6 py-2 text-left">
                        <img
                            src={`${props.logo}`}
                            style={{ width: "60px", display: "inline-block" }}
                            alt=""
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap">
                    {/* Col */}
                    <div className="w-full px-6">
                        <div className="flex flex-col">
                            <h6 style={{ fontWeight: "100" }} className="text-textColor">
                                <span className="font-bold">
                                    {EntityNumber.toLocaleString()}
                                </span> موجودیت</h6>
                        </div>
                    </div>

                    {/* Col */}
                    <div className="w-full px-6 pt-2">
                        <div className="flex flex-col">
                            <h6 style={{ fontWeight: "100" }} className="text-textColor">
                                <span className="font-bold">
                                    {PersianEntityNumber.toLocaleString()}
                                </span> موجودیت ایرانی</h6>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default EntityTypes;
