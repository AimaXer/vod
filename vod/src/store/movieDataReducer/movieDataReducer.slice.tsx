import { createSlice } from '@reduxjs/toolkit';
import { getAllData } from './movieDataReducer.thunks';

export interface MoviesData {
  allData: [];
}

const initialState: MoviesData = {
  allData: [],
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
  }
});

export const {
  reducer: movieDataReducer,
  actions: { clearDataState: clearDataStateAction },
} = slice;
