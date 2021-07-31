import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoginScreen from '../login-screen/login-screen';
import MovieDetailsScreen from '../movie-details-screen/movie-details-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { isCheckedAuth } from '../welcome-screen/welcome-screen';
import { useSelector } from 'react-redux';

export default function App() {
  const authorizationStatus = useSelector((state) => state.user.authorizationStatus);
  const isDataLoaded = useSelector((state) => state.movie.isDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <WelcomeScreen />
      </Route>
      <Route
        exact
        path={AppRoute.LOGIN}
        render={() => (
          authorizationStatus === AuthorizationStatus.AUTH
            ? <Redirect to={AppRoute.ROOT} />
            : <LoginScreen />
        )}
      />
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
  );
}

