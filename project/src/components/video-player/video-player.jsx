import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MovieProp from '../movie-card-screen/movie-card.prop';

const PLAYER_TIMEOUT = 1000;

export default function VideoPlayer(props) {
  const { movie, isActive } = props;
  const { poster, title, previewMovieLink } = movie;
  const videoRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      isActive && videoRef.current.play();
    }, PLAYER_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    isActive
      ? <video src={previewMovieLink} ref={videoRef} width={280} height={175} poster={poster} muted />
      : <img src={poster} alt={title} width={280} height={175} />
  );
}

VideoPlayer.propTypes = {
  movie: MovieProp,
  isActive: PropTypes.bool.isRequired,
};
