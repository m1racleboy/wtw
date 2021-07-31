import React from 'react';
import ReactRouter from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './app';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus, AppRoute, ALL_GENRES, MOVIES_COUNT_PER_STEP } from '../../const';
import { adaptMoviesToClient, adaptMovieToClient } from '../../store/adapter';
import { createAPI } from '../../services/api';

const movieInfo = [
  {
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
];

const reviewInfo = [
  {
    id: 1,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 2,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 3,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
];

const authInfo = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  avatar: 'img/1.png',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

let history = null;
let store = null;
let fakeApp = null;
const api = createAPI(() => { });

describe('Маршрутизация приложения', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      movie: {
        currentGenre: ALL_GENRES,
        movies: adaptMoviesToClient(movieInfo),
        renderedMoviesCount: MOVIES_COUNT_PER_STEP,
        headerMovie: adaptMovieToClient(movieInfo[0]),
        similarMovies: adaptMoviesToClient([movieInfo[0], movieInfo[1]]),
        favoriteMovies: adaptMoviesToClient([movieInfo[0], movieInfo[1]]),
        isDataLoaded: true,
      },
      review: { reviews: reviewInfo },
      user: { authorizationStatus: AuthorizationStatus.AUTH, userData: authInfo },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('Переход на главную страницу', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('Переход на страницу фильма', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 1 });
    history.push(AppRoute.MOVIE);
    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('Переход на страницу плеера', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 1 });
    history.push(AppRoute.PLAYER);

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00:00/i)).toBeInTheDocument();
  });

  it('Переход на страницу 404', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
