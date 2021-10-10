import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import OverviewTab, { getRatingLevel } from './overview-tab';

const movie = {
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
};

describe('Тестирование компонента OverviewTab', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <OverviewTab movie={movie} />
      </Router>);

    expect(screen.getByText(`Director: ${movie.director}`)).toBeInTheDocument();
    expect(screen.getByText(`${movie.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${getRatingLevel(movie.rating)}`)).toBeInTheDocument();
    expect(screen.getByText(`${movie.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${movie.starring.join(', ')}`)).toBeInTheDocument();
  });
});
