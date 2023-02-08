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

export const getSelectedMovieData = createAsyncThunk(
  'getSelectedMovieData',
  async (payload: { movieId: string, movieType: string }, { rejectWithValue }) => {
    try {
      return await DataApi.getSelectedMovieData({ movieId: payload.movieId, movieType: payload.movieType });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);