"use client";

import FullPageLoading from "@/components/FullPageLoading/FullPageLoading";
import Main from "@/layouts/Explorer/Main/Main";

export default function Page() {

  return (
    <div className="px-4 xl:px-0"> {/* ← فاصله افقی در موبایل، بدون فاصله در دسکتاپ */}

      <Main/>

    </div>
  );
}
