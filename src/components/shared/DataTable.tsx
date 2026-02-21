"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  exportable?: boolean;
  exportFilename?: string;
  ariaLabel?: string;
}

type SortDirection = "ascending" | "descending" | "none";

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = "Rechercher...",
  searchKey,
  exportable = false,
  exportFilename = "export",
  ariaLabel = "Tableau de donnees",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("none");

  const filtered = useMemo(() => {
    if (!search || !searchKey) return data;
    return data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search, searchKey]);

  const sorted = useMemo(() => {
    if (!sortCol || sortDir === "none") return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[sortCol] ?? "");
      const bVal = String((b as Record<string, unknown>)[sortCol] ?? "");
      const cmp = aVal.localeCompare(bVal, "fr");
      return sortDir === "ascending" ? cmp : -cmp;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSort = (colKey: string) => {
    if (sortCol === colKey) {
      setSortDir((prev) =>
        prev === "none" ? "ascending" : prev === "ascending" ? "descending" : "none"
      );
    } else {
      setSortCol(colKey);
      setSortDir("ascending");
    }
    setPage(1);
  };

  const handleExportCSV = () => {
    const headers = columns.map((c) => c.header).join(",");
    const rows = sorted.map((item) =>
      columns
        .map((c) => {
          const val = (item as Record<string, unknown>)[c.key];
          return `"${String(val ?? "").replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${exportFilename}.csv`;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-green-100">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700" aria-hidden="true" />
            <label htmlFor="table-search" className="sr-only">
              {searchPlaceholder}
            </label>
            <input
              id="table-search"
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-green-200 bg-green-50 text-green-950 placeholder:text-green-700/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            />
          </div>
        )}
        {exportable && (
          <button
            onClick={handleExportCSV}
            aria-label="Exporter en CSV"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-green-200 text-green-700 hover:bg-green-50 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Exporter CSV
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table role="grid" aria-label={ariaLabel} className="w-full text-sm">
          <thead>
            <tr className="border-b border-green-100 bg-green-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sortCol === col.key ? sortDir : undefined}
                  className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-green-950 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
                    >
                      {col.header}
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-green-700">
                  Aucun resultat trouve
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr key={item.id} className="border-b border-green-50 last:border-0 hover:bg-green-50/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-green-100">
          <p className="text-xs text-green-700">
            {(page - 1) * ITEMS_PER_PAGE + 1} - {Math.min(page * ITEMS_PER_PAGE, sorted.length)} sur{" "}
            {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Page precedente"
              className="p-2 rounded-lg hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4 text-green-700" aria-hidden="true" />
            </button>
            <span className="text-sm text-green-950 font-medium px-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Page suivante"
              className="p-2 rounded-lg hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-4 w-4 text-green-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
