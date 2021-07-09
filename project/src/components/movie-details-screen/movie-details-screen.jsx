import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import MovieProp from '../../props/movie.prop';

import { AuthorizationStatus, MAX_COUNT_SIMILAR_MOVIES, Tabs } from '../../const';

import MovieDetailsTabs from './movie-details-tabs';
import MovieListScreen from '../movie-list-screen/movie-list-screen';
import Logo from '../logo/logo';
import UserStatus from '../user-status/user-status';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchSimilarMovies } from '../../store/api-actions';

export function MovieDetailsScreen(props) {
  const { movies, authorizationStatus } = props;
  const { id } = useParams();
  const movie = movies.find((element) => element.id === +id);

  const {
    title,
    backgroundImage,
    backgroundColor,
    genre,
    year,
  } = movie;

  const [currentTab, setCurrentTab] = useState(Tabs.OVERVIEW);
  const dispatch = useDispatch();
  const similarMovies = useSelector((state) => state.similarMovies);
  useEffect(() => {
    dispatch(fetchSimilarMovies(id));
  }, []);

  const handleSetCurrentTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <section style={{ backgroundColor: `${backgroundColor}` }} className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserStatus />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add" />
                    </svg>
                    <span>My list</span>
                  </button>}
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movie.poster} alt={`${title} poster`} width="218" height="327" />
            </div>
            <MovieDetailsTabs currentTab={currentTab} movie={movie} onSetCurrentTab={handleSetCurrentTab} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieListScreen movies={similarMovies.filter((similarMovie) => similarMovie.id !== movie.id).slice(0, MAX_COUNT_SIMILAR_MOVIES)} />
        </section>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

MovieDetailsScreen.propTypes = {
  movies: PropTypes.arrayOf(MovieProp).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  authorizationStatus: state.authorizationStatus,
});

export default connect(mapStateToProps)(MovieDetailsScreen);
