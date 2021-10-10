import { loadUserData, requireAuthorization, signOut } from './reducers/user-data';
import { loadReviews, addReview } from './reducers/review-data';
import {
  loadMovies,
  loadHeaderMovie,
  loadSimilarMovies,
  loadFavoriteMovies,
  changeCurrentGenre,
  changeRenderedMoviesCount,
  resetRenderedMoviesCount,
  setFavoriteMovie
} from './reducers/movie-data';
import { AuthorizationStatus } from '../const';

const authInfo = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  avatar: 'img/1.png',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
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

const movieInfo = {
  id: 1,
  title: 'The Grand Budapest Hotel',
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
  backgroundColor: '#ffffff',
  movieLink: 'https://some-link',
  previewMovieLink: 'https://some-link',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave`s friend and protege.',
  rating: 8.9,
  scoresCount: 240,
  director: 'Wes Andreson',
  starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
  runtime: 99,
  genre: 'Comedy',
  year: 1234,
  isFavorite: false,
};

describe('Тестирование экшенов', () => {
  it('Должен вернуть действие userData/requireAuthorization и статус авторизации', () => {
    expect(requireAuthorization(AuthorizationStatus.AUTH))
      .toEqual({
        type: 'userData/requireAuthorization',
        payload: AuthorizationStatus.AUTH,
      });
  });

  it('Должен вернуть действие userData/loadUserData и данные о пользователе', () => {
    expect(loadUserData(authInfo))
      .toEqual({
        type: 'userData/loadUserData',
        payload: authInfo,
      });
  });

  it('Должен вернуть действие userData/signOut', () => {
    expect(signOut())
      .toEqual({
        type: 'userData/signOut',
        payload: undefined,
      });
  });

  it('Должен вернуть действие reviewData/loadReviews и список комментариев', () => {
    expect(loadReviews([reviewInfo, reviewInfo, reviewInfo]))
      .toEqual({
        type: 'reviewData/loadReviews',
        payload: [reviewInfo, reviewInfo, reviewInfo],
      });
  });

  it('Должен вернуть действие reviewData/addReview и комментарий для отправки', () => {
    expect(addReview(reviewInfo))
      .toEqual({
        type: 'reviewData/addReview',
        payload: reviewInfo,
      });
  });

  it('Должен вернуть действие movieData/loadMovies и список фильмов', () => {
    expect(loadMovies([movieInfo, movieInfo, movieInfo]))
      .toEqual({
        type: 'movieData/loadMovies',
        payload: [movieInfo, movieInfo, movieInfo],
      });
  });

  it('Должен вернуть действие movieData/loadHeaderMovie и фильм в шапке', () => {
    expect(loadHeaderMovie(movieInfo))
      .toEqual({
        type: 'movieData/loadHeaderMovie',
        payload: movieInfo,
      });
  });

  it('Должен вернуть действие movieData/loadSimilarMovies и список похожих фильмов', () => {
    expect(loadSimilarMovies([movieInfo, movieInfo]))
      .toEqual({
        type: 'movieData/loadSimilarMovies',
        payload: [movieInfo, movieInfo],
      });
  });

  it('Должен вернуть действие movieData/loadFavoriteMovies и список избранных фильмов', () => {
    expect(loadFavoriteMovies([movieInfo, movieInfo]))
      .toEqual({
        type: 'movieData/loadFavoriteMovies',
        payload: [movieInfo, movieInfo],
      });
  });

  it('Должен вернуть действие movieData/changeCurrentGenre и выбранный жанр', () => {
    expect(changeCurrentGenre('Horror'))
      .toEqual({
        type: 'movieData/changeCurrentGenre',
        payload: 'Horror',
      });
  });

  it('Должен вернуть действие movieData/changeRenderedMoviesCount', () => {
    expect(changeRenderedMoviesCount())
      .toEqual({
        type: 'movieData/changeRenderedMoviesCount',
        payload: undefined,
      });
  });

  it('Должен вернуть действие movieData/resetRenderedMoviesCount', () => {
    expect(resetRenderedMoviesCount())
      .toEqual({
        type: 'movieData/resetRenderedMoviesCount',
        payload: undefined,
      });
  });

  it('Должен вернуть действие movieData/setFavoriteMovie и фильм, который был добавлен в избранное (или удален)', () => {
    expect(setFavoriteMovie(movieInfo))
      .toEqual({
        type: 'movieData/setFavoriteMovie',
        payload: movieInfo,
      });
  });
});
