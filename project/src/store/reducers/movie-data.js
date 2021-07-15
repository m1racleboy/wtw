import { MOVIES_COUNT_PER_STEP, ALL_GENRES } from '../../const';
import { createSlice } from '@reduxjs/toolkit';

export const movieData = createSlice({
  name: 'movieData',
  initialState: {
    currentGenre: ALL_GENRES,
    movies: [],
    renderedMoviesCount: MOVIES_COUNT_PER_STEP,
    headerMovie: {},
    similarMovies: [],
    favoriteMovies: [],
    isDataLoaded: false,
  },
  reducers: {
    loadMovies(state, action) {
      state.movies = [...action.payload];
      state.isDataLoaded = true;
    },
    loadHeaderMovie(state, action) {
      state.headerMovie = action.payload;
    },
    loadSimilarMovies(state, action) {
      state.similarMovies = [...action.payload];
    },
    loadFavoriteMovies(state, action) {
      state.favoriteMovies = [...action.payload];
    },
    changeCurrentGenre(state, action) {
      state.currentGenre = action.payload;
      state.renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    },
    changeRenderedMoviesCount(state) {
      state.renderedMoviesCount += MOVIES_COUNT_PER_STEP;
    },
    resetRenderedMoviesCount(state) {
      state.renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    },
  },
});

export default movieData.reducer;
export const { loadMovies, loadHeaderMovie, loadSimilarMovies, loadFavoriteMovies, changeCurrentGenre, changeRenderedMoviesCount, resetRenderedMoviesCount } = movieData.actions;
