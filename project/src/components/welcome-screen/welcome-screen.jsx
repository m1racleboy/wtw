import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MovieProp from '../../props/movie.prop';

import MovieListScreen from '../movie-list-screen/movie-list-screen';
import GenresList from '../genre-list/genres-list';
import UserStatus from '../user-status/user-status';
import Logo from '../logo/logo';

import { ALL_GENRES, AuthorizationStatus } from '../../const';

export const isCheckedAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.UNKNOWN;

function getMoviesByGenre(movies, genre) {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
}

export function WelcomeScreen(props) {
  const { currentGenre, movies, authorizationStatus, headerMovie } = props;

  const {
    title,
    genre,
    year,
    backgroundImage,
    poster,
  } = headerMovie;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserStatus />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <MovieListScreen movies={getMoviesByGenre(movies, currentGenre)} />
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

WelcomeScreen.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(MovieProp).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  headerMovie: MovieProp,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  movies: state.movies,
  authorizationStatus: state.authorizationStatus,
  headerMovie: state.headerMovie,
});

export default connect(mapStateToProps)(WelcomeScreen);
