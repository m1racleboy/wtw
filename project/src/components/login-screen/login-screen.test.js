import React from 'react';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';


const mockStore = configureStore({});

describe('Тестирование компонента LoginScreen', () => {
  it('Должен отрендериться корректно', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.LOGIN);

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@gmail.com');
    userEvent.type(screen.getByTestId('password'), '322');

    expect(screen.getByDisplayValue(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/322/i)).toBeInTheDocument();
  });
});
