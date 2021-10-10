import movieData,
{
  loadMovies,
  loadHeaderMovie,
  loadSimilarMovies,
  loadFavoriteMovies,
  changeCurrentGenre,
  changeRenderedMoviesCount,
  resetRenderedMoviesCount,
  setFavoriteMovie
} from './movie-data';
import { MOVIES_COUNT_PER_STEP, ALL_GENRES } from '../../const';

const initialState = {
  headerMovie: {
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
  },
  movies: [
    {
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
    },
    {
      id: 2,
      title: 'The Grand Budapest Hotel2',
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
      genre: 'Horror',
      year: 1333,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'The Grand Budapest Hotel3',
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
      genre: 'KEKW',
      year: 2222,
      isFavorite: false,
    },
  ],
};

const moviesWithFavoriteMovie = [{
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
  isFavorite: true,
},
{
  id: 2,
  title: 'The Grand Budapest Hotel2',
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
  genre: 'Horror',
  year: 1333,
  isFavorite: false,
},
{
  id: 3,
  title: 'The Grand Budapest Hotel3',
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
  genre: 'KEKW',
  year: 2222,
  isFavorite: false,
}];

const favoriteMovie = {
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
  isFavorite: true,
};

const renderedMovies = 16;

describe('Тестирование редьюсера movieData', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(movieData(undefined, {}))
      .toEqual({
        currentGenre: ALL_GENRES,
        movies: [],
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
        headerMovie: {},
        similarMovies: [],
        favoriteMovies: [],
        isDataLoaded: false,
      });
  });

  it('Должен загрузить список фильмов', () => {
    expect(movieData({ movies: [], isDataLoaded: false }, loadMovies(initialState.movies)))
      .toEqual({
        movies: initialState.movies,
        isDataLoaded: true,
      });
  });

  it('Должен загрузить фильм в шапке', () => {
    expect(movieData({ headerMovie: {} }, loadHeaderMovie(initialState.headerMovie)))
      .toEqual({
        headerMovie: initialState.headerMovie,
      });
  });

  it('Должен загрузить список похожих фильмов', () => {
    expect(movieData({ similarMovies: [] }, loadSimilarMovies(initialState.movies)))
      .toEqual({
        similarMovies: initialState.movies,
      });
  });

  it('Должен загрузить список избранных фильмов', () => {
    expect(movieData({ favoriteMovies: [] }, loadFavoriteMovies(initialState.movies)))
      .toEqual({
        favoriteMovies: initialState.movies,
      });
  });

  it('Должен изменить выбранный жанр', () => {
    expect(movieData({ currentGenre: ALL_GENRES, renderedMoviesCount: renderedMovies }, changeCurrentGenre('Horror')))
      .toEqual({
        currentGenre: 'Horror',
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
      });
  });

  it('Должен изменить количество отрендеренных фильмов', () => {
    expect(movieData({ renderedMoviesCount: renderedMovies }, changeRenderedMoviesCount()))
      .toEqual({
        renderedMoviesCount: renderedMovies + MOVIES_COUNT_PER_STEP,
      });
  });

  it('Должен сбросить количество отрендеренных фильмов', () => {
    expect(movieData({ renderedMoviesCount: renderedMovies }, resetRenderedMoviesCount()))
      .toEqual({
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
      });
  });

  it('Должен изменить состояние isFavorite у фильма в шапке и в списке всех фильмов', () => {
    expect(movieData({ movies: initialState.movies, headerMovie: initialState.headerMovie }, setFavoriteMovie(favoriteMovie)))
      .toEqual({
        movies: moviesWithFavoriteMovie,
        headerMovie: favoriteMovie,
      });
  });
});
