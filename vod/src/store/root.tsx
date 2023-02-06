
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { movieDataReducer } from './movieDataReducer/movieDataReducer.slice';

const rootReducer = combineReducers({
  movieData: movieDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export { store };
