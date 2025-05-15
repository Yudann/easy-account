// src/redux/slices/accountSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface Account {
  code: string;
  name: string;
}

const initialState: Account[] = [
  { code: '101', name: 'Kas' },
  { code: '102', name: 'Piutang Usaha' },
  { code: '103', name: 'Perlengkapan' },
  { code: '104', name: 'Sewa Dibayar di Muka' },
  { code: '105', name: 'Peralatan' },
  { code: '201', name: 'Hutang Usaha' },
  { code: '202', name: 'Hutang Bank' },
  { code: '301', name: 'Modal Pemilik' },
  { code: '302', name: 'Prive Pemilik' },
  { code: '401', name: 'Pendapatan Jasa' },
  { code: '402', name: 'Pendapatan Bunga' },
  { code: '501', name: 'Beban Listrik' },
  { code: '502', name: 'Beban Pemeliharaan' },
  { code: '503', name: 'Beban Telepon' },
  { code: '504', name: 'Beban Lain-Lain' },
  { code: '505', name: 'Beban Gaji' },
];

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
});

export default accountSlice.reducer;
