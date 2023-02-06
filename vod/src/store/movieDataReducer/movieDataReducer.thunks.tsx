import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataApi } from '../../api/dataApi/DataApi';

export const getAllData = createAsyncThunk(
  'getAllData',
  async (payload: {}, { rejectWithValue }) => {
    try {
      return await DataApi.getAllData();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
