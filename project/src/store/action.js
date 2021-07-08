export const ActionType = {
  CHANGE_CURRENT_GENRE: 'changeCurrentGenre',
  RESET_MOVIES_BOARD: 'resetMoviesBoard',
  MOVIES_COUNT_STEP: 'moviesCountStep',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  LOAD_MOVIES: 'loadMovies',
};

export const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
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
