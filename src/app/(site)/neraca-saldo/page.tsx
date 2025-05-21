"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DataTable from "@/components/DataTable";
import { ColDef } from "ag-grid-community";

type Saldo = {
  kode: string;
  nama: string;
  debit: number;
  kredit: number;
};

export default function NeracaSaldoPage() {
  const transaksi = useSelector((state: RootState) => state.transaksi);
  const akunList = useSelector((state: RootState) => state.akun);

  const saldoPerAkun: Record<string, Saldo> = {};

  transaksi.forEach((trx) => {
    const debitAkun = akunList.find((a) => a.kode === trx.debit.akunKode);
    const kreditAkun = akunList.find((a) => a.kode === trx.kredit.akunKode);

    if (debitAkun) {
      if (!saldoPerAkun[debitAkun.kode]) {
        saldoPerAkun[debitAkun.kode] = {
          kode: debitAkun.kode,
          nama: debitAkun.nama,
          debit: 0,
          kredit: 0,
        };
      }
      saldoPerAkun[debitAkun.kode].debit += trx.debit.nominal;
    }

    if (kreditAkun) {
      if (!saldoPerAkun[kreditAkun.kode]) {
        saldoPerAkun[kreditAkun.kode] = {
          kode: kreditAkun.kode,
          nama: kreditAkun.nama,
          debit: 0,
          kredit: 0,
        };
      }
      saldoPerAkun[kreditAkun.kode].kredit += trx.kredit.nominal;
    }
  });

  const data: Saldo[] = Object.values(saldoPerAkun);

  const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
  const totalKredit = data.reduce((sum, item) => sum + item.kredit, 0);

  const columnDefs: ColDef<Saldo>[] = [
    { headerName: "Kode Akun", field: "kode" },
    { headerName: "Nama Akun", field: "nama" },
    {
      headerName: "Debit",
      field: "debit",
      valueFormatter: ({ value }: { value: number }) =>
        value ? value.toLocaleString() : "0",
    },
    {
      headerName: "Kredit",
      field: "kredit",
      valueFormatter: ({ value }: { value: number }) =>
        value ? value.toLocaleString() : "0",
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Neraca Saldo</h1>
      <DataTable columnDefs={columnDefs} rowData={data} />

      <div className="mt-4 p-4 bg-gray-100 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Total Saldo</h2>
        <div className="flex justify-between">
          <span>Total Debit:</span>
          <span>{totalDebit.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Kredit:</span>
          <span>{totalKredit.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
