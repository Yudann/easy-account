"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DataTable from "@/components/DataTable";
import { ColDef } from "ag-grid-community";

interface JurnalRow {
  kdoe: string;
  nama: string;
  tipe: string;
}

export default function KodeAkunPage() {
  const transaksi = useSelector((state: RootState) => state.akun);
  const columnDefs: ColDef<JurnalRow>[] = [
    { field: "kdoe", headerName: "Kode" },
    { field: "nama", headerName: "Nama Akun" },
    { field: "tipe", headerName: "Jenis" },
  ];

  const rowData = transaksi.flatMap((trx) => [
    {
      kdoe: trx.kode,
      nama: trx.nama,
      tipe: trx.tipe,
    },
  ]);

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold mb-4">Kode Akun</h1>
      <DataTable columnDefs={columnDefs} rowData={rowData} quickFilter />
    </div>
  );
}
