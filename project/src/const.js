export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  MOVIE: '/films/:id',
  MY_LIST: '/mylist',
  REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

export const APIRoute = {
  MOVIES: '/films',
  REVIEWS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROMO: '/promo',
  FAVORITE: '/favorite',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const Tabs = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

export const KeyCodes = {
  ESCAPE: 'Escape',
  F: 'KeyF',
  SPACE: 'Space',
};

export const ALL_GENRES = 'All genres';
export const MOVIES_COUNT_PER_STEP = 8;
export const MAX_COUNT_SIMILAR_MOVIES = 4;

