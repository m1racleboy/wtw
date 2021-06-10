import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoginScreen from '../login-screen/login-screen';
import MovieDetailsScreen from '../movie-details-screen/movie-details-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { AppRoute } from '../../const';
export default function App({ headerMovie, movies }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <WelcomeScreen headerMovie={headerMovie} movies={movies} />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginScreen />
        </Route>
        <Route exact path={AppRoute.MOVIE}>
          <MovieDetailsScreen />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyListScreen />
        </Route>
        <Route exact path={AppRoute.REVIEW}>
          <AddReviewScreen />
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <PlayerScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      movieLink: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
    })).isRequired,
};
