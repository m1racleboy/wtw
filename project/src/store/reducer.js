import { ActionType } from './action';
import { MOVIES_COUNT_PER_STEP, ALL_GENRES, AuthorizationStatus } from '../const';

const initialState = {
  currentGenre: ALL_GENRES,
  movies: [],
  renderedMoviesCount: MOVIES_COUNT_PER_STEP,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  headerMovie: {},
  similarMovies: [],
  reviews: [],
  favoriteMovies: [],
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
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.LOAD_HEADER_MOVIE:
      return {
        ...state,
        headerMovie: action.payload,
      };
    case ActionType.LOAD_SIMILAR_MOVIE:
      return {
        ...state,
        similarMovies: action.payload,
      };
    case ActionType.LOAD_FAVORITE_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload,
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
    case ActionType.POST_REVIEW:
      return {
        ...state,
        reviews: state.reviews.push(action.payload),
      };
    default:
      return state;
  }
};

export { reducer };
