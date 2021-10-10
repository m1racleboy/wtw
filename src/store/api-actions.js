import { AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { adaptMoviesToClient, adaptMovieToClient, adaptUserDataToClient } from './adapter';
import { toast } from 'react-toastify';
import browserHistory from '../browser-history';
import { loadFavoriteMovies, loadHeaderMovie, loadMovies, loadSimilarMovies, setFavoriteMovie } from './reducers/movie-data';
import { addReview, loadReviews } from './reducers/review-data';
import { loadUserData, requireAuthorization, signOut } from './reducers/user-data';

export const fetchMovieList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.MOVIES)
    .then(({ data }) => dispatch(loadMovies(adaptMoviesToClient(data))))
    .catch((err) => toast.error(err.message))
);

export const fetchHeaderMovie = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({ data }) => dispatch(loadHeaderMovie(adaptMovieToClient(data))))
    .catch((err) => toast.error(err.message))
);

export const fetchSimilarMovies = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.MOVIES}/${id}/similar`)
    .then(({ data }) => dispatch(loadSimilarMovies(adaptMoviesToClient(data))))
);

export const fetchMovieReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({ data }) => dispatch(loadReviews(data)))
);

export const fetchFavoriteMovies = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({ data }) => dispatch(loadFavoriteMovies(adaptMoviesToClient(data))))
);

export const postReview = ({ id, comment, rating }) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, { comment, rating })
    .then(({ data }) => dispatch(addReview(data)))
    .then(() => dispatch(browserHistory.length > 1 ? browserHistory.goBack() : browserHistory.push(AppRoute.ROOT)))
    .catch((err) => toast.error(err.message))
);

export const postFavoriteStatus = ({ id, status }) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`, { status })
    .then(({ data }) => dispatch(setFavoriteMovie(adaptMovieToClient(data))))
    .catch((err) => toast.error(err.message))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({ data }) => dispatch(loadUserData(adaptUserDataToClient(data))))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => toast.error(err.message))
);

export const login = ({ login: email, password }) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, { email, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(loadUserData(adaptUserDataToClient(data)));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(browserHistory.push(AppRoute.ROOT)))
    .catch((err) => toast.error(err.message))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(signOut()))
    .then(() => dispatch(browserHistory.push(AppRoute.ROOT)))
    .catch((err) => toast.error(err.message))
);
