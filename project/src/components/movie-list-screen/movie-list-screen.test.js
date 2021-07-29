import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ALL_GENRES } from '../../const';
import MovieListScreen from './movie-list-screen';

const movieInfo = [
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
    year: 2014,
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
    genre: 'Comedy',
    year: 2014,
    isFavorite: false,
  },
];

const mockStore = configureStore({});

describe('Тестирование компонента movie-list-screen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={
        mockStore({
          movie: {
            currentGenre: ALL_GENRES,
          },
        })
      }
      >
        <Router history={history}>
          <MovieListScreen movies={movieInfo} />
        </Router>
      </Provider >,
    );

    expect(screen.getByText(movieInfo[0].title)).toBeInTheDocument();
    expect(screen.getByText(movieInfo[1].title)).toBeInTheDocument();
  });
});
