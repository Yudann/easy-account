// app/jurnal-umum/page.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DataTable from "@/components/DataTable";
import { ColDef } from "ag-grid-community";
import { akunList } from "@/lib/accounts";

interface JurnalRow {
  tanggal: string;
  keterangan: string;
  ref: string;
  debit: string;
  kredit: string;
}

export default function JurnalUmumPage() {
  const transaksi = useSelector((state: RootState) => state.transaksi);
  const getNamaAkun = (kode: string) => {
    const akun = akunList.find((a) => a.kode === kode);
    return akun?.nama ?? "Akun Tidak Ditemukan";
  };
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
      keterangan: getNamaAkun(trx.debit.akunKode),
      ref: trx.debit.akunKode,
      debit: trx.debit.nominal.toLocaleString(),
      kredit: "",
    },
    {
      tanggal: "",
      keterangan: getNamaAkun(trx.kredit.akunKode),
      ref: trx.kredit.akunKode,
      debit: "",
      kredit: trx.kredit.nominal.toLocaleString(),
    },
    {
      tanggal: "",
      keterangan: `(${trx.catatan})`,
      ref: "",
      debit: "",
      kredit: "",
    },
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Jurnal Umum</h1>
      <DataTable columnDefs={columnDefs} rowData={rowData} quickFilter />
    </div>
  );
}
