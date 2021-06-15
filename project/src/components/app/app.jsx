import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieProp from '../movie-card-screen/movie-card.prop';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoginScreen from '../login-screen/login-screen';
import MovieDetailsScreen from '../movie-details-screen/movie-details-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { AppRoute } from '../../const';
export default function App(props) {
  const { movies } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <WelcomeScreen movies={movies} />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginScreen />
        </Route>
        <Route exact path={AppRoute.MOVIE}>
          <MovieDetailsScreen movies={movies} />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyListScreen movies={movies} />
        </Route>
        <Route exact path={AppRoute.REVIEW}>
          <AddReviewScreen movies={movies} />
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <PlayerScreen movies={movies} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  movies: PropTypes.arrayOf(MovieProp).isRequired,
};
