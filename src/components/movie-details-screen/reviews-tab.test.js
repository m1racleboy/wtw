import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ReviewsTab from './reviews-tab';

const reviews = [
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
      name: 'Nikita',
    },
    rating: 8.9,
    comment: '1Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 3,
    user: {
      id: 4,
      name: 'Max',
    },
    rating: 8.9,
    comment: '2Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director`s funniest and most exquisitely designed movies in years.',
    date: '2019-05-08T14:13:56.569Z',
  },
];

describe('Тестирование компонента ReviewsTab', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ReviewsTab reviews={reviews} />
      </Router>);

    expect(screen.getByText(`${reviews[0].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${reviews[1].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${reviews[2].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${reviews[0].user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${reviews[1].user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${reviews[2].user.name}`)).toBeInTheDocument();
  });
});
