import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyListScreen from './my-list-screen';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';

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
    favoriteMovies: [
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
        isFavorite: true,
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
  },
};

const api = createAPI(() => { });
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe('Тестирование компонента MyListScreen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.MY_LIST);

    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByTestId('my-list-movies')).toBeInTheDocument();
  });
});
