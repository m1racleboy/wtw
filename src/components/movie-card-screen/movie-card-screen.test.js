import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MovieCardScreen from './movie-card-screen';

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
  year: 2014,
  isFavorite: false,
};

const isActive = true;

describe('Тестирование компонента MovieCardScreen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <MovieCardScreen
          movie={movieInfo}
          isActive={isActive}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      </Router>,
    );

    expect(getByText(`${movieInfo.title}`)).toBeInTheDocument();
  });
});
