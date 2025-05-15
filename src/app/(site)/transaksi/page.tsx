"use client";

import Button from "@/components/Button";
import { ButtonType, ButtonVariant } from "@/components/Button/button.enum";
import Input from "@/components/Input";
import { akunList } from "@/lib/accounts";
import { useState } from "react";

export default function TransaksiForm({
  onAdd,
}: {
  onAdd: (data: any) => void;
}) {
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [akunDebit, setAkunDebit] = useState("");
  const [nominalDebit, setNominalDebit] = useState("");
  const [akunKredit, setAkunKredit] = useState("");
  const [nominalKredit, setNominalKredit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!akunDebit || !akunKredit || !nominalDebit || !nominalKredit) return;

    onAdd({
      tanggal,
      keterangan,
      debit: { akun: akunDebit, nominal: parseInt(nominalDebit) },
      kredit: { akun: akunKredit, nominal: parseInt(nominalKredit) },
    });

    setTanggal("");
    setKeterangan("");
    setAkunDebit("");
    setNominalDebit("");
    setAkunKredit("");
    setNominalKredit("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        required
      />
      <Input
        placeholder="Keterangan Umum"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />

      <div className="flex gap-4">
        <select
          value={akunDebit}
          onChange={(e) => setAkunDebit(e.target.value)}
          className="flex-1"
        >
          <option value="">-- Pilih Akun Debit --</option>
          {akunList.map((a) => (
            <option
              key={a.kode}
              value={a.kode}
            >{`${a.nama} - ${a.kode}`}</option>
          ))}
        </select>
        <Input
          placeholder="Nominal Debit"
          value={nominalDebit}
          onChange={(e) => setNominalDebit(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <select
          value={akunKredit}
          onChange={(e) => setAkunKredit(e.target.value)}
          className="flex-1"
        >
          <option value="">-- Pilih Akun Kredit --</option>
          {akunList.map((a) => (
            <option
              key={a.kode}
              value={a.kode}
            >{`${a.nama} - ${a.kode}`}</option>
          ))}
        </select>
        <Input
          placeholder="Nominal Kredit"
          value={nominalKredit}
          onChange={(e) => setNominalKredit(e.target.value)}
        />
      </div>

      <Button variant={ButtonVariant.PRIMARY} type={ButtonType.SUBMIT}>
        Simpan
      </Button>
    </form>
  );
}
