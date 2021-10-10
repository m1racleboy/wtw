import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Logo from './logo';

let history;
const mockStore = configureStore({});

describe('Тестирование компонента Logo', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('Должен отрендериться корректно', () => {
    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <Logo />
        </Router>
      </Provider>);

    expect(screen.getAllByText('W').length).toBe((2));
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
