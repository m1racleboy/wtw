import React from 'react';
import ReactRouter from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import PlayerScreen from './player-screen';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';

const initialState = {
  movie: {
    movies: [
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
        genre: 'Horror',
        year: 1333,
        isFavorite: false,
      },
      {
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
      },
    ],
  },
};

let history;
const mockStore = configureStore([thunk]);
const movie = initialState.movie.movies[0];

describe('Тестирование компонента PlayerScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 2 });
    history = createMemoryHistory();
    history.push(AppRoute.PLAYER);
    window.HTMLMediaElement.prototype.play = () => { };
    window.HTMLMediaElement.prototype.pause = () => { };
    window.HTMLMediaElement.prototype.requestFullscreen = () => { };
  });

  it('Должен отрендериться корректно', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <PlayerScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(document.querySelector('.player__play')).toBeInTheDocument();
    expect(document.querySelector('.player__exit')).toBeInTheDocument();
    expect(document.querySelector('.player__video')).toBeInTheDocument();
  });

  it('Должен перевести пользователя на предыдущую страницу по клику на кнопку Exit', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>this is the previous page</h1>
            </Route>
            <Route>
              <PlayerScreen />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/this is the previous page/i)).not.toBeInTheDocument();
    userEvent.click(document.querySelector('.player__exit'));
    expect(screen.queryByText(/this is the previous page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();
  });

  it('Должен развернуть плеер на полный экран', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <PlayerScreen />
        </Router>
      </Provider>,
    );

    userEvent.click(document.querySelector('.player__full-screen'));
    expect(Document.fullscreenElement).not.toBe(null);
  });
});
