export const ActionType = {
  CHANGE_CURRENT_GENRE: 'changeCurrentGenre',
  RESET_MOVIES_BOARD: 'resetMoviesBoard',
  MOVIES_COUNT_STEP: 'moviesCountStep',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  LOAD_MOVIES: 'loadMovies',
  LOAD_REVIEWS: 'loadReviews',
  LOAD_HEADER_MOVIE: 'loadPromo',
  LOAD_SIMILAR_MOVIE: 'loadSimilarMovie',
  LOAD_FAVORITE_MOVIES: 'loadFavoriteMovies',
};

export const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
  loadMovieReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadHeaderMovie: (promo) => ({
    type: ActionType.LOAD_HEADER_MOVIE,
    payload: promo,
  }),
  loadSimilarMovies: (similarMovies) => ({
    type: ActionType.LOAD_SIMILAR_MOVIE,
    payload: similarMovies,
  }),
  loadFavoriteMovies: (favoriteMovies) => ({
    type: ActionType.LOAD_SIMILAR_MOVIE,
    payload: favoriteMovies,
  }),
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_GENRE,
    payload: genre,
  }),
  resetMoviesBoard: () => ({
    type: ActionType.RESET_MOVIES_BOARD,
  }),
  moviesCountStep: () => ({
    type: ActionType.MOVIES_COUNT_STEP,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};
