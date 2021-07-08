import React from 'react';
import PropTypes from 'prop-types';

import MovieProp from '../../props/movie.prop';

import MovieListScreen from '../movie-list-screen/movie-list-screen';
import Logo from '../logo/logo';
import UserStatus from '../user-status/user-status';
import { connect } from 'react-redux';

export function MyListScreen(props) {
  const { movies } = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserStatus />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieListScreen movies={movies.filter((movie) => movie.isFavorite)} />
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

MyListScreen.propTypes = {
  movies: PropTypes.arrayOf(MovieProp).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps)(MyListScreen);
