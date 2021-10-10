import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MovieProp from '../../props/movie.prop';
import { MOVIE_PREVIEW_HEIGHT, MOVIE_PREVIEW_WIDTH } from '../../const';

const PLAYER_TIMEOUT = 1000;

export default function VideoPlayer(props) {
  const { movie, isActive } = props;
  const { title, previewMovieLink, previewImage } = movie;
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
      ? <video src={previewMovieLink} ref={videoRef} width={MOVIE_PREVIEW_WIDTH} height={MOVIE_PREVIEW_HEIGHT} poster={previewImage} muted />
      : <img src={previewImage} alt={title} width={MOVIE_PREVIEW_WIDTH} height={MOVIE_PREVIEW_HEIGHT} />
  );
}

VideoPlayer.propTypes = {
  movie: MovieProp,
  isActive: PropTypes.bool.isRequired,
};
