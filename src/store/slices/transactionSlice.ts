// store/slices/transaksiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaksi {
  tanggal: string;
  debit: {
    akunKode: string;
    nominal: number;
    keterangan: string;
  };
  kredit: {
    akunKode: string;
    nominal: number;
    keterangan: string;
  };
  catatan: string;
}

const initialState: Transaksi[] = [];

const transaksiSlice = createSlice({
  name: 'transaksi',
  initialState,
  reducers: {
    tambahTransaksi: (state, action: PayloadAction<Transaksi>) => {
      state.push(action.payload);
    },
  },
});

export const { tambahTransaksi } = transaksiSlice.actions;
export default transaksiSlice.reducer;
