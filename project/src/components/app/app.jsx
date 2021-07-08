import React from 'react';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoginScreen from '../login-screen/login-screen';
import MovieDetailsScreen from '../movie-details-screen/movie-details-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { AppRoute } from '../../const';

import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../welcome-screen/welcome-screen';

export function App(props) {
  const { authorizationStatus, isDataLoaded } = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <WelcomeScreen />
        </Route>
        <Route exact path={AppRoute.LOGIN} render={() => <LoginScreen />}>
        </Route>
        <Route exact path={AppRoute.MOVIE}>
          <MovieDetailsScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render={() => <MyListScreen />}
        >
        </PrivateRoute>
        <PrivateRoute
          exact
          path={AppRoute.REVIEW}
          render={() => <AddReviewScreen />}
        >
        </PrivateRoute>
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
  authorizationStatus: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
});

export default connect(mapStateToProps, null)(App);
