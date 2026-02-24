import React, { useEffect, useState } from "react";
import ExpandableTable from "@/components/ExpandableTable/ExpandableTable";
import { AddressFormat } from "@/components/AddressFormat/AddressFormat";

import { formatSmallNumber } from "@/functions/formatSmallNumber";
import Pagination from "@/components/Pagination/Pagination";
import { useParams } from "next/navigation";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import SkeletonLoading from "@/components/SkeletonLoading/SkeletonLoading";
import { UTXOTr } from "@/functions/ExploreProcessor";
import { Networks } from "@/functions/Networks";
const InputsTable = ({ SetTotalUSDValue }) => {
  const [First, SetFirst] = useState(0);
  const [TotalInputs, SetTotalInputs] = useState(0);
  const [Loading, SetLoading] = useState(false);

  const params = useParams();

  const query = params.query;
  const network = params.network;
  const hash = params.hash;

  const TrValue = (rowData) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span>{formatSmallNumber(rowData.value)}</span>

        <small style={{}} className="ml-1">
          {network !== "BSC" ? network : "BNB"}
        </small>
      </div>
    );
  };

  const columns = [
    {
      header: "آدرس مبدا",
      cell: (row) => (
        <div>
          {AddressFormat(row.address, 8, "address", network, true)}
          <span>
            {row.Entity !== null ? (
              <a href={`/panel/entity/${row.Entity.id ?? ''}`} className="mr-1 bg-BgGreen text-TextGreen px-2 rounded-lg cursor-pointer">
                {row.Entity.name}
              </a>
            ) : null}
          </span>
        </div>
      ),
    },
    {
      header: "حجم تراکنش",
      cell: (row) => <div className="p-0">{TrValue(row)}</div>,
    },
  ];

  const [filteredData, SetFiltredData] = useState([]);

  useEffect(() => {
    SetLoading(true);
    GetRequest(
      `${serverAddress}/explorer/utxo/transaction/${hash}/?network=${network}&page_number_from=${First * 5 + 1}&page_size_from=5&page_number_to=1&page_size_to=1`
    )
      .then((response) => {
        SetTotalInputs(response.data.data.result.total_inputs)
        const array = [];
        const getData = UTXOTr(
          response.data.data.result,
          network,
          Networks.find((item) => item.symbole === network).name
        );
        console.log(getData)
        for (let i = 0; i < getData.inputData.length; i++) {
          array.push({
            address: getData.inputData[i].address.address,
            value: getData.inputData[i].BTCAmount,
            Entity: getData.inputData[i].address.entity.name ? getData.inputData[i].address.entity : null ,
          });
        }
        SetLoading(false);
        SetFiltredData(array);
      })
      .catch((err) => {
        console.log(err);
        SetLoading(false);
      });
  }, [, First]);

  return (
    <div>
      {!Loading ? (
        <>
          <ExpandableTable
            data={filteredData} // ← فقط دیتای فیلترشده را بده
            columns={columns}
            rowDetailsMode="row"
            rowDetailsClassName="rounded-xl p-3"
          />
          <Pagination
            rtl
            totalItems={TotalInputs}
            pageSize={5}
            currentPage={First + 1}
            onPageChange={(e) => {
              SetFirst(e - 1);
            }}
          />
        </>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark shadow-sm px-2 ">
          <SkeletonLoading />
        </div>
      )}
    </div>
  );
};

export default InputsTable;
