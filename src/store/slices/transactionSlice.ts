// src/redux/slices/transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  entries: {
    accountCode: string;
    accountName: string;
    debit: number;
    credit: number;
  }[];
}

const initialState: Transaction[] = [];

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.push(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      return state.filter((tx) => tx.id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
