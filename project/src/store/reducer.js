import { ActionType } from './action';
import { MOVIES_COUNT_PER_STEP, ALL_GENRES, AuthorizationStatus } from '../const';

const initialState = {
  currentGenre: ALL_GENRES,
  movies: [],
  renderedMoviesCount: MOVIES_COUNT_PER_STEP,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload,
        isDataLoaded: true,
      };
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
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export { reducer };
