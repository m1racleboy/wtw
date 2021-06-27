export const ActionType = {
  CHANGE_CURRENT_GENRE: 'changeCurrentGenre',
  RESET_MOVIES_BOARD: 'resetMoviesBoard',
  MOVIES_COUNT_STEP: 'moviesCountStep',
};

export const ActionCreator = {
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
};
