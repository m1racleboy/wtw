import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found-screen';

describe('Тестирование компонента Not found', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    expect(getByText('404. Page not found')).toBeInTheDocument();
  });
});
