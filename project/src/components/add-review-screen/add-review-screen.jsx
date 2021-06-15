import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import MovieProp from '../movie-card-screen/movie-card.prop';

import AddReviewFormScreen from '../add-review-form-screen/add-review-form-screen';
import Logo from '../logo/logo';

export default function AddReviewScreen(props) {
  const { movies } = props;
  const { id } = useParams();
  const [movie] = movies.filter((element) => element.id === id);

  const {
    title,
    backgroundImage,
    poster,
  } = movie;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={poster} alt={`${title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewFormScreen />
    </section>
  );
}

AddReviewScreen.propTypes = {
  movies: PropTypes.arrayOf(MovieProp).isRequired,
};
