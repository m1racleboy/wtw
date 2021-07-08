import { ActionCreator } from './action';
import { AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { adaptMoviesToClient, adaptMovieToClient } from './adapter';
import { toast } from 'react-toastify';

export const fetchMovieList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.MOVIES)
    .then(({ data }) => dispatch(ActionCreator.loadMovies(adaptMoviesToClient(data))))
    .catch((err) => toast.error(err.message))
);

export const fetchHeaderMovie = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({ data }) => dispatch(ActionCreator.loadHeaderMovie(adaptMovieToClient(data))))
    .catch((err) => toast.error(err.message))
);

export const fetchSimilarMovies = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.MOVIES}/${id}/similar`)
    .then(({ data }) => dispatch(ActionCreator.loadSimilarMovies(data)))
);

export const fetchMovieReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({ data }) => dispatch(ActionCreator.loadMovieReviews(data)))
);

export const fetchFavoriteMovies = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({ data }) => dispatch(ActionCreator.loadFavoriteMovies(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => toast.error(err.message))
);

export const login = ({ login: email, password }) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, { email, password })
    .then(({ data }) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.replaceRoute(AppRoute.ROOT)))
    .catch((err) => toast.error(err.message))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGIN)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
    .then(() => dispatch(ActionCreator.replaceRoute(AppRoute.ROOT)))
);
