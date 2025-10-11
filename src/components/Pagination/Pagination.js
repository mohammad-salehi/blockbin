"use client";
import React, { useMemo } from "react";



function usePagination(totalItems, currentPage, pageSize) {
  return useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return { pages, totalPages };
    }

    const siblings = 1;
    const left = Math.max(2, currentPage - siblings);
    const right = Math.min(totalPages - 1, currentPage + siblings);

    pages.push(1);
    if (left > 2) pages.push("…");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);

    return { pages, totalPages };
  }, [totalItems, currentPage, pageSize]);
}

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = "",
  rtl = false,
  compact = false,
}) {
  const { pages, totalPages } = usePagination(totalItems, currentPage, pageSize);

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalItems, currentPage * pageSize);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const dir = rtl ? "rtl" : "ltr";
  const arrowPrev = rtl ? "→" : "←";
  const arrowNext = rtl ? "←" : "→";

  const size = compact ? "h-8 px-2 text-sm" : "h-10 px-3 text-sm";

  return (
    <div dir={dir} className={`w-full flex flex-col gap-3 ${className}`}>

      <div className="flex items-center justify-center gap-1 mt-4">
        <button
          className={`border-boxBorderColor rounded-xl border bg-PaginationBg   ${size} disabled:opacity-40 text-titleText ${!isFirst ? 'cursor-pointer text-textColor' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst}
        >
          {arrowPrev}
        </button>

        {pages.map((p, i) => (
          <button
            key={`${p}-${i}`}
            className={`rounded-xl border  ${size} ${
              p === currentPage
                ? "bg-primary-500 bg-PaginationSelectedBg text-textColor border-boxBorderColor"
                : "bg-primary-500 bg-PaginationBg text-textColor border-boxBorderColor cursor-pointer"
            }`}
            onClick={() => typeof p === "number" && onPageChange(p)}
            disabled={p === "…"}
          >
            {p}
          </button>
        ))}

        <button
          className={`rounded-xl border bg-PaginationBg border-boxBorderColor  ${size} disabled:opacity-40 text-titleText ${!isLast ? 'cursor-pointer text-textColor' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast}
        >
          {arrowNext}
        </button>
      </div>
    </div>
  );
}
