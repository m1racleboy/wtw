import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import UserStatus from './user-status';

const mockStore = configureStore({});

describe('Тестирование компонента UserStatus когда пользователь авторизован', () => {
  it('Должен отрендерить автар пользователя и кнопку Sign out', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        user: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userData: {
            id: 322,
            name: 'Nikita',
            avatar: 'img/avatar.jpg',
            token: 'YXNkYUBnbWFpbC5jb20=',
          },
        },
      })}
      >
        <Router history={history}>
          <UserStatus />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });


  it('Должен отрендерить кнопку Sign in', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        user: {
          authorizationStatus: AuthorizationStatus.NO_AUTH,
          userData: {},
        },
      })}
      >
        <Router history={history}>
          <UserStatus />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
