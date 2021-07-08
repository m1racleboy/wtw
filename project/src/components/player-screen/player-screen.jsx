import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import MovieProp from '../../props/movie.prop';
import { connect } from 'react-redux';

export function PlayerScreen(props) {
  const { movies } = props;
  const { id } = useParams();
  const movie = movies.find((element) => element.id === +id);

  const {
    poster,
    runtime,
    title,
  } = movie;
  return (
    <div className="player">
      <video src="#" className="player__video" poster={poster}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">{runtime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

PlayerScreen.propTypes = {
  movies: PropTypes.arrayOf(MovieProp).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps)(PlayerScreen);
