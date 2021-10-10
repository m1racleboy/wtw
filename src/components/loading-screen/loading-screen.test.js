import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';

describe('Тестирование компонента загрузки',() => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();

    const result = render(
      <Router history={history}>
        <LoadingScreen />
      </Router>,
    );

    expect(result.getByTestId('loader')).toHaveTextContent('Loading ...');
  });
});
