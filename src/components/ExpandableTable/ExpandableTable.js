"use client";

import React, { useMemo, useState, useCallback } from "react";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}
function getAlignClass(a) {
  if (a === "center") return "text-center";
  if (a === "end") return "text-left rtl:text-right ltr:text-right";
  return "text-right rtl:text-right ltr:text-left";
}
const CaretRight = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
const CaretDown = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function ExpandableTable(props) {
  const {
    data,
    columns,
    searchKeys = [],
    pageSize,
    getRowId,
    getSubRows = (r) => r.subRows,
    onRowClick,
    defaultExpandedIds = [],
    renderProgress,
    rowDetails,
    rowDetailsClassName,
    rowDetailsMode = "inline",
    detailsColumnIndex = 0,
  } = props;

  const computeId = useCallback(
    (row, path) => (row.id ? String(row.id) : getRowId ? getRowId(row, path) : path),
    [getRowId]
  );

  const flatten = useCallback(
    (rows, level = 0, parentPath = "", parentId) => {
      const out = [];
      rows.forEach((r, idx) => {
        const path = parentPath ? `${parentPath}.${idx}` : `${idx}`;
        const id = computeId(r, path);
        out.push({ row: r, level, id, path, parent: parentId });
        const children = getSubRows(r);
        if (children?.length) {
          out.push(...flatten(children, level + 1, path, id));
        }
      });
      return out;
    },
    [computeId, getSubRows]
  );

  const flat = useMemo(() => flatten(data), [data, flatten]);
  const [expanded, setExpanded] = useState(new Set(defaultExpandedIds));
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const toggle = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const byId = useMemo(() => {
    const m = new Map();
    flat.forEach((f) => m.set(f.id, f));
    return m;
  }, [flat]);

  const childrenOf = useCallback((id) => flat.filter((f) => f.parent === id), [flat]);

  const rowMatches = useCallback(
    (r) => {
      const q = query.trim().toLowerCase();
      if (!q || !searchKeys.length) return true;
      return searchKeys.some((k) => {
        const v = r[k];
        return typeof v === "string" || typeof v === "number"
          ? String(v).toLowerCase().includes(q)
          : false;
      });
    },
    [query, searchKeys]
  );

  const subtreeMatches = useCallback(
    (id) => {
      const node = byId.get(id);
      if (!node) return false;
      if (rowMatches(node.row)) return true;
      return childrenOf(id).some((c) => subtreeMatches(c.id));
    },
    [byId, childrenOf, rowMatches]
  );

  const roots = useMemo(() => flat.filter((f) => f.level === 0), [flat]);

  const visibleRows = useMemo(() => {
    if (!query) return roots;
    return roots.filter((root) => subtreeMatches(root.id));
  }, [roots, query, subtreeMatches]);

  const total = visibleRows.length;
  const pageCount = pageSize ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount);
  const paginated = useMemo(() => {
    if (!pageSize) return visibleRows;
    const start = (currentPage - 1) * pageSize;
    return visibleRows.slice(start, start + pageSize);
  }, [visibleRows, pageSize, currentPage]);

  const renderCell = useCallback(
    (col, row) => {
      if (col.cell) return col.cell(row);
      if (col.accessorKey) {
        const v = row[col.accessorKey];
        if (
          typeof v === "number" &&
          col.accessorKey.toString().toLowerCase().includes("progress") &&
          renderProgress
        ) {
          return renderProgress(v);
        }
        return String(v ?? "");
      }
      return null;
    },
    [renderProgress]
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark bg-TableBorder shadow-sm px-2 ">
        <table className=" w-full text-sm border-separate border-spacing-y-2">
          <thead className="sticky top-0 bg-TableBorder text-textColor">
            <tr className="text-right">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={classNames(
                    "px-6 py-5 font-semibold text-titleText dark:text-titleText-dark",
                    i === 0 ? "first:rounded-tr-2xl rtl:first:rounded-tr-2xl" : "",
                    i === columns.length - 1 ? "last:rounded-tl-2xl rtl:last:rounded-tl-2xl" : "",
                    getAlignClass(c.align)
                  )}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((f) => {
              const node = f;
              const kids = childrenOf(node.id);
              const hasChildren = kids.length > 0;

              const detailNodes =
                hasChildren && rowDetails
                  ? kids.flatMap((k) => {
                      const raw = React.Children.toArray(rowDetails(k.row));
                      return raw.map((child, i) => {
                        const stableKey = `detail__p:${node.path}__c:${k.path}__i:${i}`;
                        return React.isValidElement(child)
                          ? React.cloneElement(child, { key: stableKey })
                          : <React.Fragment key={stableKey}>{child}</React.Fragment>;
                      });
                    })
                  : [];

              const hasDetails = detailNodes.length > 0;
              const canExpand = hasChildren && hasDetails;
              const isOpen = expanded.has(node.id);
              const showDetails = isOpen && hasDetails;

              return (
                <React.Fragment key={`row-${node.path}`}>
                  <tr
                    className="text-textColor"
                    onClick={() => onRowClick?.(node.row)}
                  >
                    {columns.map((c, ci) => (
                      <td
                        key={ci}
                        className={classNames(
                          "px-6 py-5 my-auto  bg-TableRow !border-0 ring-0 shadow-none",
                          "first:rounded-r-xl last:rounded-l-xl",
                          getAlignClass(c.align),
                          c.className
                        )}
                        style={c.width ? { width: c.width } : undefined}
                      >
                        {rowDetailsMode === "inline" && ci === detailsColumnIndex ? (
                          <div className="flex flex-col gap-0" style={{ paddingInlineStart: `${node.level * 1.25}rem` }}>
                            <div className="flex items-center gap-2">
                              {canExpand ? (
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggle(node.id); }}
                                  className="inline-flex items-center justify-center rounded hover:bg-gray-100 hover:dark:bg-gray-800 p-1"
                                  aria-label={isOpen ? "بستن" : "باز کردن"}
                                >
                                  {isOpen ? <CaretDown /> : <CaretRight />}
                                </button>
                              ) : (
                                <span className="inline-block" />
                              )}
                              <span>{renderCell(c, node.row)}</span>
                            </div>

                            {showDetails && (
                              <div className={classNames("mt-3 pt-3 !border-0 !ring-0 shadow-none", rowDetailsClassName)}>
                                <div className="flex flex-col gap-3">{detailNodes}</div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {ci === 0 && rowDetailsMode === "row" ? (
                              <div className="flex items-center gap-2" style={{ paddingInlineStart: `${node.level * 1.25}rem` }}>
                                {canExpand ? (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggle(node.id); }}
                                    className="inline-flex items-center justify-center rounded hover:bg-gray-100 hover:dark:bg-gray-800 p-1"
                                    aria-label={isOpen ? "بستن" : "باز کردن"}
                                  >
                                    {isOpen ? <CaretDown /> : <CaretRight />}
                                  </button>
                                ) : (
                                  <span className="inline-block" />
                                )}
                                <span className="text-titleText dark:text-titleText-dark">{renderCell(c, node.row)}</span>
                              </div>
                            ) : (
                              renderCell(c, node.row)
                            )}
                          </>
                        )}
                      </td>
                    ))}
                  </tr>

                  {rowDetailsMode === "row" && showDetails && (
                    <tr key={`detail-row-${node.path}`}>
                      <td
                        colSpan={columns.length}
                        className="bg-white dark:bg-bgColor-dark p-0 first:rounded-r-xl last:rounded-l-xl !border-0 ring-0 shadow-none "
                      >
                        <div className={classNames("px-6 py-4 shadow-none", rowDetailsClassName)}>
                          <div className="flex flex-col gap-3">{detailNodes}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-textColor bg-none rounded-xl">
                  <div className="flex justify-center items-center" style={{ height: "100px" }}>
                    <svg fill="currentColor" width="50" height="50" viewBox="0 0 462.035 462.035" xmlns="http://www.w3.org/2000/svg">
                      <path d="M457.83,158.441c-0.021-0.028-0.033-0.058-0.057-0.087l-50.184-62.48c-0.564-0.701-1.201-1.305-1.879-1.845
                        c-2.16-2.562-5.355-4.225-8.967-4.225H65.292c-3.615,0-6.804,1.661-8.965,4.225c-0.678,0.54-1.316,1.138-1.885,1.845l-50.178,62.48
                        c-0.023,0.029-0.034,0.059-0.057,0.087C1.655,160.602,0,163.787,0,167.39v193.07c0,6.5,5.27,11.771,11.77,11.771h438.496
                        c6.5,0,11.77-5.271,11.77-11.771V167.39C462.037,163.787,460.381,160.602,457.83,158.441z"/>
                    </svg>
                  </div>
                  <div style={{ textAlign: "center" }}>نتیجه‌ای یافت نشد</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
