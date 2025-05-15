// app/jurnal-umum/page.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DataTable from "@/components/DataTable";
import { ColDef } from "ag-grid-community";

interface JurnalRow {
  tanggal: string;
  keterangan: string;
  ref: string;
  debit: string;
  kredit: string;
}

export default function JurnalUmumPage() {
  const transaksi = useSelector((state: RootState) => state.transaksi);

  const columnDefs: ColDef<JurnalRow>[] = [
    { field: "tanggal", headerName: "Tanggal" },
    { field: "keterangan", headerName: "Keterangan" },
    { field: "ref", headerName: "Ref" },
    { field: "debit", headerName: "Debit (Rp)" },
    { field: "kredit", headerName: "Kredit (Rp)" },
  ];

  const rowData = transaksi.flatMap((trx) => [
    {
      tanggal: trx.tanggal,
      keterangan: trx.debit.keterangan,
      ref: trx.debit.akunKode,
      debit: trx.debit.nominal.toLocaleString(),
      kredit: trx.kredit.nominal.toLocaleString(),
    },
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Jurnal Umum</h1>
      <DataTable columnDefs={columnDefs} rowData={rowData} quickFilter />
    </div>
  );
}
