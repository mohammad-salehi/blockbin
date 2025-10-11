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
          {AddressFormat(row.address, 8, "address", "TRX", true)}
          <span>
            {row.Entity !== null ? (
              <span className="mr-1 bg-BgRed text-TextRed px-2 rounded-lg cursor-pointer">
                {row.Entity.name}
              </span>
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
      `${serverAddress}/explorer/search/?query=${hash}&page_number=0&page_size=0&network=${network}&pageNumberFrom=1&pageSizeFrom=1&pageNumberTo=${First * 5 + 1}&pageSizeTo=5`
    )
      .then((response) => {
        SetTotalInputs(response.data.data.total_inputs)
        const array = [];
        const getData = UTXOTr(
          response.data.data,
          network,
          Networks.find((item) => item.symbole === network).name
        );
        for (let i = 0; i < getData.outputData.length; i++) {
          array.push({
            address: getData.outputData[i].address.address,
            value: getData.outputData[i].BTCAmount,
            Entity: getData.outputData[i].address.entity,
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
