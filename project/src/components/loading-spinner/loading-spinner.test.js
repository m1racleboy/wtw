import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoadingSpinner from './loading-spinner';

describe('Тестирование компонента spinner', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    const result = render(
      <Router history={history}>
        <LoadingSpinner />
      </Router>,
    );

    expect(result.getByTestId('Spinner')).toHaveTextContent('Spinner');
  });
});
