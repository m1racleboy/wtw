import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactRouter from 'react-router';
import MovieDetailsScreen from './movie-details-screen';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import { AppRoute } from '../../const';

const initialState = {
  user: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {
      id: 1,
      email: 'Oliver.conner@gmail.com',
      name: 'Oliver.conner',
      avatar: 'img/1.png',
      token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
    },
  },
  movie: {
    movies: [
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
        isFavorite: true,
      },
    ],
    similarMovies: [
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
        isFavorite: true,
      },
    ],
  },
  review: {
    reviews:
      [
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
      ],
  },
};

const api = createAPI(() => { });
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe('Тестирование компонента MovieDetailsScreen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 2 });
    history.push(AppRoute.MOVIE);

    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <MovieDetailsScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId('movie-details-screen')).toBeInTheDocument();
  });
});
