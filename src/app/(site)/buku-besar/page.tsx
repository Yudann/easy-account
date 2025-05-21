"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function BukuBesarPage() {
  const akunList = useSelector((state: RootState) => state.akun);
  const transaksiList = useSelector((state: RootState) => state.transaksi);

  const formatCurrency = (value: number | string) => {
    return Number(value).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Buku Besar</h1>

      {akunList.map((akun) => {
        // Filter transaksi yang menyentuh akun ini
        const transaksiAkun = transaksiList.filter(
          (trx) =>
            trx.debit.akunKode === akun.kode ||
            trx.kredit.akunKode === akun.kode
        );

        if (transaksiAkun.length === 0) return null;

        let saldo = 0;

        return (
          <div key={akun.kode}>
            <h2 className="text-xl font-semibold mb-2">
              {akun.nama} ({akun.kode})
            </h2>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Tanggal</th>
                  <th className="border px-2 py-1">Keterangan</th>
                  <th className="border px-2 py-1">Ref</th>
                  <th className="border px-2 py-1">Debit</th>
                  <th className="border px-2 py-1">Kredit</th>
                  <th className="border px-2 py-1">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {transaksiAkun.map((trx, i) => {
                  const isDebit = trx.debit.akunKode === akun.kode;
                  const nominal = isDebit
                    ? trx.debit.nominal
                    : trx.kredit.nominal;

                  saldo += isDebit ? nominal : -nominal;

                  return (
                    <tr key={i}>
                      <td className="border px-2 py-1">{trx.tanggal}</td>
                      <td className="border px-2 py-1">{trx.catatan}</td>
                      <td className="border px-2 py-1">
                        {isDebit ? trx.kredit.akunKode : trx.debit.akunKode}
                      </td>
                      <td className="border px-2 py-1">
                        {isDebit ? formatCurrency(nominal) : ""}
                      </td>
                      <td className="border px-2 py-1">
                        {!isDebit ? formatCurrency(nominal) : ""}
                      </td>
                      <td className="border px-2 py-1">
                        {formatCurrency(saldo)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
