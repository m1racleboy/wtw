import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import AddReviewScreen from './add-review-screen';
import ReactRouter from 'react-router';

const initialState = {
  user: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {
      id: 322,
      name: 'Nikita',
      avatar: 'img/avatar.jpg',
      token: 'YXNkYUBnbWFpbC5jb20=',
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
        isFavorite: false,
      },
    ],
  },
};

const id = 2;
const movie = initialState.movie.movies.find((element) => element.id === id);

const mockStore = configureStore([thunk]);

describe('Тестирование компонента AddReviewScreen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: id });

    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <AddReviewScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(`${movie.title}`)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
