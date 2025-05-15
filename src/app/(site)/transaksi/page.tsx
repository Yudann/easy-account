"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { tambahTransaksi } from "@/store/slices/transactionSlice";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ButtonVariant } from "@/components/Button/button.enum";
import MessageBox from "@/components/MessageBox";

export default function TransaksiPage() {
  const akunList = useSelector((state: RootState) => state.akun);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    tanggal: "",
    debitAkun: "",
    kreditAkun: "",
    debitNominal: "",
    kreditNominal: "",
    keterangan: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = () => {
    if (
      !form.tanggal ||
      !form.debitAkun ||
      !form.kreditAkun ||
      !form.debitNominal ||
      !form.kreditNominal ||
      !form.keterangan
    ) {
      setMessage({ type: "error", text: "Semua field wajib diisi!" });
      return;
    }

    dispatch(
      tambahTransaksi({
        tanggal: form.tanggal,
        debit: {
          akunKode: form.debitAkun,
          nominal: Number(form.debitNominal),
          keterangan: form.keterangan,
        },
        kredit: {
          akunKode: form.kreditAkun,
          nominal: Number(form.kreditNominal),
          keterangan: form.keterangan,
        },
        catatan: form.keterangan,
      })
    );

    setMessage({ type: "success", text: "Transaksi berhasil ditambahkan!" });

    setForm({
      tanggal: "",
      debitAkun: "",
      kreditAkun: "",
      debitNominal: "",
      kreditNominal: "",
      keterangan: "",
    });
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl md:text-3xl font-bold mb-4">
        Tambah Transaksi Baru
      </h1>

      {message && (
        <MessageBox
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Tanggal */}
      <div>
        <label className="block mb-1 font-medium">Tanggal Transaksi</label>
        <Input
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
        />
      </div>

      {/* Akun Debit */}
      <div>
        <label className="block mb-1 font-medium">Akun Debit</label>
        <select
          value={form.debitAkun}
          onChange={(e) => setForm({ ...form, debitAkun: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Pilih Akun Debit</option>
          {akunList.map((akun) => (
            <option key={akun.kode} value={akun.kode}>
              {akun.nama} ({akun.kode})
            </option>
          ))}
        </select>
      </div>

      {/* Nominal Debit */}
      <div>
        <label className="block mb-1 font-medium">Nominal Debit</label>
        <Input
          type="number"
          placeholder="Masukkan nominal debit"
          value={form.debitNominal}
          onChange={(e) => setForm({ ...form, debitNominal: e.target.value })}
        />
      </div>

      {/* Akun Kredit */}
      <div>
        <label className="block mb-1 font-medium">Akun Kredit</label>
        <select
          value={form.kreditAkun}
          onChange={(e) => setForm({ ...form, kreditAkun: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Pilih Akun Kredit</option>
          {akunList.map((akun) => (
            <option key={akun.kode} value={akun.kode}>
              {akun.nama} ({akun.kode})
            </option>
          ))}
        </select>
      </div>

      {/* Nominal Kredit */}
      <div>
        <label className="block mb-1 font-medium">Nominal Kredit</label>
        <Input
          type="number"
          placeholder="Masukkan nominal kredit"
          value={form.kreditNominal}
          onChange={(e) => setForm({ ...form, kreditNominal: e.target.value })}
        />
      </div>

      {/* Keterangan */}
      <div>
        <label className="block mb-1 font-medium">Keterangan</label>
        <Input
          placeholder="Masukkan keterangan transaksi"
          value={form.keterangan}
          onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
        />
      </div>

      <Button variant={ButtonVariant.PRIMARY} onClick={handleSubmit}>
        Tambah Transaksi
      </Button>
    </div>
  );
}
