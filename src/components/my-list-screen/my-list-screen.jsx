import React, { useEffect } from 'react';

import MovieListScreen from '../movie-list-screen/movie-list-screen';
import Logo from '../logo/logo';
import UserStatus from '../user-status/user-status';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteMovies } from '../../store/api-actions';

export default function MyListScreen() {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.movie.favoriteMovies);

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserStatus />
      </header>

      <section className="catalog">
        <h2 data-testid='my-list-movies' className="catalog__title visually-hidden">Catalog</h2>
        <MovieListScreen movies={favoriteMovies} />
      </section>

      <footer className="page-footer">
        <Logo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div >
  );
}
