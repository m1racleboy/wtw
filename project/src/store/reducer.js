import { ActionType } from './action';
import { MOVIES_COUNT_PER_STEP, ALL_GENRES } from '../const';
import { movies } from '../mocks/movie';

const initialState = {
  currentGenre: ALL_GENRES,
  movies: movies,
  renderedMoviesCount: MOVIES_COUNT_PER_STEP,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
      };
    case ActionType.MOVIES_COUNT_STEP:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        renderedMoviesCount: state.renderedMoviesCount + MOVIES_COUNT_PER_STEP,
      };
    case ActionType.RESET_MOVIES_BOARD:
      return {
        ...state,
        movies: state.movies.map((movie) => ({
          ...movie,
          starring: [
            ...movie.starring,
          ],
        })),
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
      };
    default:
      return state;
  }
};

export { reducer };
