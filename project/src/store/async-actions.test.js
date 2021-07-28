import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  fetchMovieList,
  fetchHeaderMovie,
  fetchSimilarMovies,
  fetchMovieReviews,
  fetchFavoriteMovies,
  postReview,
  postFavoriteStatus,
  checkAuth,
  login,
  logout
} from './api-actions';
import { loadFavoriteMovies, loadHeaderMovie, loadMovies, loadSimilarMovies, setFavoriteMovie } from './reducers/movie-data';
import { addReview, loadReviews } from './reducers/review-data';
import { loadUserData, requireAuthorization, signOut } from './reducers/user-data';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { adaptMoviesToClient, adaptMovieToClient, adaptUserDataToClient } from './adapter';
import browserHistory from '../browser-history';

const authInfo = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  'avatar_url': 'img/1.png',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

const movieInfo = {
  id: 1,
  name: 'The Grand Budapest Hotel',
  'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
  'preview_image': 'img/the-grand-budapest-hotel.jpg',
  'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
  'background_color': '#ffffff',
  'video_link': 'https://some-link',
  'preview_video_link': 'https://some-link',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave`s friend and protege.',
  rating: 8.9,
  'scores_count': 240,
  director: 'Wes Andreson',
  starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
  'run_time': 99,
  genre: 'Comedy',
  released: 2014,
  'is_favorite': false,
};

const reviewInfo = {
  id: 1,
  user: {
    id: 4,
    name: 'Kate Muir',
  },
  rating: 8.9,
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
  date: '2019-05-08T14:13:56.569Z',
};

let api = null;

describe('Асинхронные операции', () => {
  beforeAll(() => {
    api = createAPI(() => { });
  });

  it('Тест проверки авторизован ли пользователь и получения данных о пользователе', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, authInfo);

    return checkAuthLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadUserData(adaptUserDataToClient(authInfo)));
        expect(dispatch).toHaveBeenNthCalledWith(2, requireAuthorization(AuthorizationStatus.AUTH));
      });
  });

  it('Тест авторизации', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = { email: 'test@test.ru', password: '3228' };
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, authInfo);

    return loginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadUserData(adaptUserDataToClient(authInfo)));
        expect(dispatch).toHaveBeenNthCalledWith(2, requireAuthorization(AuthorizationStatus.AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(3, browserHistory.push(AppRoute.ROOT));
      });
  });

  it('Тест разлогирования', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const signOutLoader = logout();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204);

    return signOutLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, signOut());
        expect(dispatch).toHaveBeenNthCalledWith(2, browserHistory.push(AppRoute.ROOT));
      });
  });

  it('Тест получения списка фильмов', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchMovieListLoader = fetchMovieList();

    apiMock
      .onGet(APIRoute.MOVIES)
      .reply(200, [movieInfo, movieInfo, movieInfo, movieInfo]);

    return fetchMovieListLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadMovies(adaptMoviesToClient([movieInfo, movieInfo, movieInfo, movieInfo])));
      });
  });

  it('Тест получения фильма в шапке', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchHeaderMovieLoader = fetchHeaderMovie();

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, movieInfo);

    return fetchHeaderMovieLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadHeaderMovie(adaptMovieToClient(movieInfo)));
      });
  });

  it('Тест получения похожих фильмов', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const fetchSimilarMoviesLoader = fetchSimilarMovies(id);

    apiMock
      .onGet(`${APIRoute.MOVIES}/${id}/similar`)
      .reply(200, [movieInfo, movieInfo, movieInfo, movieInfo]);

    return fetchSimilarMoviesLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadSimilarMovies(adaptMoviesToClient([movieInfo, movieInfo, movieInfo, movieInfo])));
      });
  });

  it('Тест получения избранных фильмов', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchFavoriteMoviesLoader = fetchFavoriteMovies();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [movieInfo, movieInfo, movieInfo, movieInfo]);

    return fetchFavoriteMoviesLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFavoriteMovies(adaptMoviesToClient([movieInfo, movieInfo, movieInfo, movieInfo])));
      });
  });

  it('Тест получения списка комментариев к фильму', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const fetchMovieReviewsLoader = fetchMovieReviews(id);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, [reviewInfo, reviewInfo, reviewInfo]);

    return fetchMovieReviewsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadReviews([reviewInfo, reviewInfo, reviewInfo]));
      });
  });

  it('Тест отправления комментария', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const postReviewLoader = postReview({ id: id, rating: 10, comment: 'KEKW' });

    apiMock
      .onPost(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, { rating: 10, comment: 'KEKW' });

    return postReviewLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, addReview({ rating: 10, comment: 'KEKW' }));
        expect(dispatch).toHaveBeenNthCalledWith(2, browserHistory.length > 1 ? browserHistory.goBack() : browserHistory.push(AppRoute.ROOT));
      });
  });

  it('Тест изменения статуса избранного фильма', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const status = 0;
    const postFavoriteStatusLoader = postFavoriteStatus({ id: id, status: status});

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${id}/${status}`)
      .reply(200, { id: id, status: !status});

    return postFavoriteStatusLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, setFavoriteMovie({ id: id, status: !status }));
      });
  });
});
