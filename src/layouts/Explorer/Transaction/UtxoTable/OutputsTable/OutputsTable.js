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
const OutputsTable = ({ SetTotalUSDValue }) => {
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
      header: "آدرس مقصد",
      cell: (row) => (
        <div>
          {AddressFormat(row.address, 8, "address", network, true)}
          <span>
            {row.Entity !== null ? (
              <a href={`/panel/entity/${row.Entity.id?? ''}`} className="mr-1 bg-BgRed text-TextRed px-2 rounded-lg cursor-pointer">
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
      `${serverAddress}/explorer/utxo/transaction/${hash}/?network=${network}&page_number_from=1&page_size_from=1&page_number_to=${First * 5 + 1}&page_size_to=5`
    )
      .then((response) => {
        SetTotalInputs(response.data.data.result.total_outputs)
        const array = [];
        const getData = UTXOTr(
          response.data.data.result,
          network,
          Networks.find((item) => item.symbole === network).name
        );
        for (let i = 0; i < getData.outputData.length; i++) {
          array.push({
            address: getData.outputData[i].address.address,
            value: getData.outputData[i].BTCAmount,
            Entity: getData.outputData[i].address.entity.name ? getData.outputData[i].address.entity : null,
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

export default OutputsTable;
