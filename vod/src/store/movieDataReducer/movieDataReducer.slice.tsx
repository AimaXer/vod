import { createSlice } from '@reduxjs/toolkit';
import { getAllData, getSelectedMovieData } from './movieDataReducer.thunks';
import { MovieDataItem } from './types';

export interface MoviesData {
  allData: [];
  selectedMovieData: MovieDataItem | undefined;
}

const initialState: MoviesData = {
  allData: [],
  selectedMovieData: undefined
};

const slice = createSlice({
  name: 'movieDataReducer',
  initialState,
  reducers: {
    clearDataState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.pending, (state) => {
      state = initialState;
    });
    builder.addCase(getAllData.fulfilled, (state, { payload }) => {
      state.allData = payload.data;
    });
    builder.addCase(getAllData.rejected, (state, { error }) => {
      state = initialState;
    });
    builder.addCase(getSelectedMovieData.pending, (state) => {
      state = initialState;
    });
    builder.addCase(getSelectedMovieData.fulfilled, (state, { payload }) => {
      state.selectedMovieData = payload.data;
    });
    builder.addCase(getSelectedMovieData.rejected, (state, { error }) => {
      state = initialState;
    });
  }
});

export const {
  reducer: movieDataReducer,
  actions: { clearDataState: clearDataStateAction },
} = slice;
