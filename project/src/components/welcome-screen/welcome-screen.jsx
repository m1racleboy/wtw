import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieListScreen from '../movie-list-screen/movie-list-screen';
import GenresList from '../genre-list/genres-list';
import UserStatus from '../user-status/user-status';
import Logo from '../logo/logo';
import { ALL_GENRES, AuthorizationStatus } from '../../const';
import browserHistory from '../../browser-history';
import { postFavoriteStatus } from '../../store/api-actions';

export const isCheckedAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.UNKNOWN;

function getMoviesByGenre(movies, genre) {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
}

export default function WelcomeScreen() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const headerMovie = useSelector((state) => state.movie.headerMovie);
  const currentGenre = useSelector((state) => state.movie.currentGenre);
  const authorizationStatus = useSelector((state) => state.user.authorizationStatus);

  const {
    id,
    title,
    genre,
    year,
    backgroundImage,
    poster,
    isFavorite,
  } = headerMovie;

  const handlePlayClick = () => browserHistory.push(`/player/${id}`);
  const handleFavoriteClick = (evt) => {
    evt.preventDefault();

    dispatch(postFavoriteStatus({
      id: id,
      status: +!isFavorite,
    }));
  };

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
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteClick}>
                    {isFavorite
                      ?
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add" />
                      </svg>}
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
