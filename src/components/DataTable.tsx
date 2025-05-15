"use client";

import "@/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Input from "./Input";
import { ButtonVariant } from "@/components/Button/button.enum";

// Register ag-grid modules
// ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps<TData extends object = any> {
  height?: string;
  rowHeight?: number;
  columnDefs: ColDef<TData>[]; // Kolom
  rowData: TData[]; // Data baris
  quickFilter?: boolean;
  pagination?: boolean;
  showCreateButton?: boolean;
  createButtonPath?: string;
}

export default function DataTable<TData extends object>({
  rowHeight = 50,
  columnDefs,
  rowData,
  quickFilter,
  pagination = true,
  showCreateButton = true,
  createButtonPath,
}: DataTableProps<TData>) {
  const gridRef = useRef<AgGridReact<TData>>(null);
  const [filteredData, setFilteredData] = useState<TData[]>(rowData);

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
  };

  const onFilterInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      const filtered = rowData.filter((row) =>
        Object.values(row).some((cellValue) =>
          String(cellValue).toLowerCase().includes(value)
        )
      );
      setFilteredData(filtered);
    },
    [rowData]
  );

  const maxGridHeight = 600; // Max height for the grid

  return (
    <div className="w-full">
      {quickFilter && (
        <div className="w-full flex justify-between items-center mb-4">
          <div>
            {showCreateButton && createButtonPath && (
              <Link href={createButtonPath}>
                <Button variant={ButtonVariant.PRIMARY}>Create</Button>
              </Link>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search..."
              id="input-filter"
              onInput={onFilterInputChanged}
            />
          </div>
        </div>
      )}

      <div
        className="ag-theme-quartz py-3 rounded-md"
        style={{
          maxHeight: maxGridHeight,
          overflowY: "auto",
        }}
      >
        <AgGridReact<TData>
          //   modules={[ClientSideRowModelModule]}
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          rowModelType="clientSide"
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationAutoPageSize={pagination}
          rowHeight={rowHeight}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
