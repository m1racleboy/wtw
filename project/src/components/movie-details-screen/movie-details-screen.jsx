import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus, MAX_COUNT_SIMILAR_MOVIES, Tabs } from '../../const';
import MovieListScreen from '../movie-list-screen/movie-list-screen';
import Logo from '../logo/logo';
import UserStatus from '../user-status/user-status';
import { fetchSimilarMovies } from '../../store/api-actions';
import OverviewTab from '../movie-details-screen/overview-tab';
import DetailsTab from '../movie-details-screen/details-tab';
import ReviewsTab from '../movie-details-screen/reviews-tab';

export default function MovieDetailsScreen() {
  const dispatch = useDispatch();
  const similarMovies = useSelector((state) => state.movie.similarMovies);
  const movies = useSelector((state) => state.movie.movies);
  const authorizationStatus = useSelector((state) => state.user.authorizationStatus);
  const { id } = useParams();
  const movie = movies.find((element) => element.id === +id);

  const {
    title,
    backgroundImage,
    backgroundColor,
    genre,
    year,
  } = movie;

  const getContentFromTab = (tab) => {
    switch (tab) {
      case Tabs.OVERVIEW: return <OverviewTab movie={movie} />;
      case Tabs.DETAILS: return <DetailsTab movie={movie} />;
      case Tabs.REVIEWS: return <ReviewsTab id={+id} />;
      default: return <div><h2 style={{ color: 'black', marginTop: '50px', lineHeight: '50px', textAlign: 'center' }}>Что-то не так...<br /> пока ждешь закажи пиццу!</h2></div>;
    }
  };

  const [currentTab, setCurrentTab] = useState(Tabs.OVERVIEW);

  useEffect(() => {
    dispatch(fetchSimilarMovies(id));
  }, [id]);

  useEffect(() => {
    getContentFromTab(currentTab);
  }, [currentTab]);

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
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  {Object.values(Tabs).map((tab) => (
                    <li key={tab} className={`film-nav__item ${currentTab === tab ? 'film-nav__item--active' : ''}`} >
                      <a href="#" className="film-nav__link" onClick={(evt) => { evt.preventDefault(); setCurrentTab(tab); }}>{tab}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              {getContentFromTab(currentTab)}
            </div>
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
