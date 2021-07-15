import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AddReviewFormScreen from '../add-review-form-screen/add-review-form-screen';
import Logo from '../logo/logo';
import UserStatus from '../user-status/user-status';

export default function AddReviewScreen() {
  const movies = useSelector((state) => state.movie.movies);
  const { id } = useParams();
  const movie = movies.find((element) => element.id === +id);

  const {
    title,
    backgroundImage,
    backgroundColor,
    poster,
  } = movie;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: `${backgroundColor}` }}>
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

          <UserStatus />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={poster} alt={`${title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewFormScreen />
    </section>
  );
}

