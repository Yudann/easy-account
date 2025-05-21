"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DataTable from "@/components/DataTable";
import { ColDef } from "ag-grid-community";

type LabaRugiItem = {
  nama: string;
  tipe: "Pendapatan" | "Beban";
  nominal: number;
};

export default function LabaRugiPage() {
  const transaksi = useSelector((state: RootState) => state.transaksi);
  const akunList = useSelector((state: RootState) => state.akun);

  const laporan: LabaRugiItem[] = [];

  // Filter hanya akun Pendapatan dan Beban
  const akunPendapatanBeban = akunList.filter(
    (akun) => akun.tipe === "Pendapatan" || akun.tipe === "Beban"
  );

  akunPendapatanBeban.forEach((akun) => {
    let total = 0;

    transaksi.forEach((trx) => {
      // Hitung debit ke akun Pendapatan/Beban
      if (trx.debit?.akunKode === akun.kode) {
        total += trx.debit.nominal;
      }
      // Hitung kredit dari akun Pendapatan/Beban
      if (trx.kredit?.akunKode === akun.kode) {
        total -= trx.kredit.nominal;
      }
    });

    // Untuk Pendapatan, nominal positif adalah kredit (pendapatan bertambah di kredit)
    // Untuk Beban, nominal positif adalah debit (beban bertambah di debit)
    const nominal =
      akun.tipe === "Pendapatan" ? Math.abs(total) : Math.abs(total);

    laporan.push({
      nama: akun.nama,
      tipe: akun.tipe as "Pendapatan" | "Beban",
      nominal: nominal,
    });
  });

  const totalPendapatan = laporan
    .filter((item) => item.tipe === "Pendapatan")
    .reduce((sum, item) => sum + item.nominal, 0);

  const totalBeban = laporan
    .filter((item) => item.tipe === "Beban")
    .reduce((sum, item) => sum + item.nominal, 0);

  const labaBersih = totalPendapatan - totalBeban;

  const columnDefs: ColDef<LabaRugiItem>[] = [
    { headerName: "Nama Akun", field: "nama" },
    { headerName: "Tipe", field: "tipe" },
    {
      headerName: "Nominal",
      field: "nominal",
      valueFormatter: ({ value }) =>
        typeof value === "number" ? value.toLocaleString("id-ID") : value,
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Laporan Laba Rugi</h1>
      <DataTable columnDefs={columnDefs} rowData={laporan} />

      <div className="mt-4 p-4 bg-gray-100 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Ringkasan</h2>
        <div className="flex justify-between">
          <span>Total Pendapatan:</span>
          <span>Rp{totalPendapatan.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Beban:</span>
          <span>Rp{totalBeban.toLocaleString("id-ID")}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Laba Bersih:</span>
          <span>Rp{labaBersih.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
