import { Akun } from "@/store/slices/accountSlice";

export const akunList: Akun[]  = [
  { kode: '101', nama: 'Kas', tipe: 'Aset' },
  { kode: '102', nama: 'Piutang Usaha', tipe: 'Aset' },
  { kode: '103', nama: 'Perlengkapan', tipe: 'Aset' },
  { kode: '104', nama: 'Sewa Dibayar di Muka', tipe: 'Aset' },
  { kode: '105', nama: 'Peralatan', tipe: 'Aset' },
  { kode: '201', nama: 'Hutang Usaha', tipe: 'Liabilitas' },
  { kode: '202', nama: 'Hutang Bank', tipe: 'Liabilitas' },
  { kode: '301', nama: 'Modal Pemilik', tipe: 'Ekuitas' },
  { kode: '302', nama: 'Prive Pemilik', tipe: 'Ekuitas' },
  { kode: '401', nama: 'Pendapatan Jasa', tipe: 'Pendapatan' },
  { kode: '402', nama: 'Pendapatan Bunga', tipe: 'Pendapatan' },
  { kode: '501', nama: 'Beban Listrik', tipe: 'Beban' },
  { kode: '502', nama: 'Beban Pemeliharaan', tipe: 'Beban' },
  { kode: '503', nama: 'Beban Telepon', tipe: 'Beban' },
  { kode: '504', nama: 'Beban Lain-Lain', tipe: 'Beban' },
  { kode: '505', nama: 'Beban Gaji', tipe: 'Beban' },
];
