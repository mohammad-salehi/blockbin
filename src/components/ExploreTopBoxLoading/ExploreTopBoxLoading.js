import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function ExploreTopBoxLoading() {
  const items = [100, 70, 90, 60]; // درصد عرض هر خط

  return (
    <div className="space-y-3 mt-4 mb-1">
      {items.map((width, i) => (
        <div key={i} className="flex items-center justify-start gap-3">
          {/* دایره‌ی سمت راست */}
          <Skeleton
            variant="circular"
            width={37}
            height={37}
            className="bg-boxColor"
          />

          {/* خط اسکلتی */}
          <Skeleton
            variant="rectangular"
            width={`${width}%`}
            height={37}
            className="rounded-md bg-boxColor flex-1"
          />
        </div>
      ))}
    </div>
  );
}
