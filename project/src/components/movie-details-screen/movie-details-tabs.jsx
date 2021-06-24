import React from 'react';
import PropTypes from 'prop-types';

import MovieProp from '../movie-card-screen/movie.prop';

import OverviewTab from '../movie-details-screen/overview-tab';
import DetailsTab from '../movie-details-screen/details-tab';
import ReviewsTab from '../movie-details-screen/reviews-tab';

import { Tabs } from '../../const';
import { reviews } from '../../mocks/reviews';


export default function MovieDetailsTabs(props) {
  const { currentTab, movie, onSetCurrentTab } = props;

  const getContentFromTab = (tab) => {
    switch (tab) {
      case Tabs.OVERVIEW: return <OverviewTab movie={movie} />;
      case Tabs.DETAILS: return <DetailsTab movie={movie} />;
      case Tabs.REVIEWS: return <ReviewsTab reviews={reviews} />;
      default: return 0;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${currentTab === Tabs.OVERVIEW ? 'film-nav__item--active' : ''}`} >
            <a href="#" className="film-nav__link" onClick={(evt) => { evt.preventDefault(); onSetCurrentTab(Tabs.OVERVIEW); }}>Overview</a>
          </li>
          <li className={`film-nav__item ${currentTab === Tabs.DETAILS ? 'film-nav__item--active' : ''}`} >
            <a href="#" className="film-nav__link" onClick={(evt) => { evt.preventDefault(); onSetCurrentTab(Tabs.DETAILS); }}>Details</a>
          </li>
          <li className={`film-nav__item ${currentTab === Tabs.REVIEWS ? 'film-nav__item--active' : ''}`} >
            <a href="#" className="film-nav__link" onClick={(evt) => { evt.preventDefault(); onSetCurrentTab(Tabs.REVIEWS); }}>Reviews</a>
          </li>
        </ul>
      </nav>
      {getContentFromTab(currentTab)}
    </div>
  );
}

MovieDetailsTabs.propTypes = {
  movie: MovieProp,
  currentTab: PropTypes.string.isRequired,
  onSetCurrentTab: PropTypes.func.isRequired,
};
