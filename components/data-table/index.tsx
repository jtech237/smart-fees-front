"use client";

import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  retryFunction?: () => void;
  enableSorting?: boolean;
  pageSizes?: number[];
  enablePagination?: boolean;
  searchableColumns?: (keyof T)[];
  enableFilter?: boolean;
}

const DataTable = <T extends object>({
  columns,
  data,
  isLoading = true,
  emptyMessage = "Aucune donnée disponible!",
  error,
  retryFunction,
  enableSorting = false,
  enablePagination = false,
  pageSizes= [5,10,25,50,100],
  searchableColumns,
  enableFilter = false,
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  // Filtrage des données en fonction de la recherche
  const filteredData = useMemo(() => {
    if (!searchQuery || !enableFilter) return memoizedData;

    const lowerCaseQuery = searchQuery.toLowerCase();
    const searchableKeys =
      searchableColumns?.map((col) => String(col)) ||
      Object.keys(memoizedData[0] || {});

    return memoizedData.filter((row) =>
      searchableKeys.some((key) =>
        String(row[key])?.toLowerCase().includes(lowerCaseQuery),
      ),
    );
  }, [searchQuery, memoizedData, searchableColumns]);

  const table = useReactTable({
    columns: memoizedColumns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    state: {
      ...(enablePagination && { pagination }),
    },
    ...(enablePagination && { onPaginationChange: setPagination }),
  });

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        {retryFunction && (
          <button onClick={retryFunction} className="underline">
            Réessayer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {enableFilter && (
        <>
          {/* Barre de recherche */}
          <div className="mb-4 flex items-center">
            <div className="ml-auto w-1/2">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </>
      )}

      {/* Tableau */}
      <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700"
                  aria-sort={
                    enableSorting
                      ? header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                      : undefined
                  }
                  onClick={
                    enableSorting
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{
                    cursor:
                      enableSorting && header.column.getCanSort()
                        ? "pointer"
                        : "default",
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {enableSorting &&
                        (header.column.getIsSorted() === "asc"
                          ? "▲"
                          : header.column.getIsSorted() === "desc"
                            ? "▼"
                            : null)}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Chargement...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between py-4">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </button>
          <span>
            Page {table.getState().pagination?.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </span>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
            className="border rounded-md px-2 py-1"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} lignes par page
              </option>
            ))}
          </select>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
