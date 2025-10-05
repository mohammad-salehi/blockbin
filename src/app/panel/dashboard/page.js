"use client";

import FullPageLoading from "@/components/FullPageLoading/FullPageLoading";
import Main from "@/layouts/Explorer/Main/Main";
import { useState } from "react";

export default function Page() {

  const [Loading, SetLoading] = useState(false)

  return (
    <div className="px-4 xl:px-0"> {/* ← فاصله افقی در موبایل، بدون فاصله در دسکتاپ */}
      {
        Loading ?
          <FullPageLoading />
          :
          null
      }
      <Main SetLoading={SetLoading}/>

    </div>
  );
}
