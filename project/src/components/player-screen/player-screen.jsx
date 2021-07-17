import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import browserHistory from '../../browser-history';
import { adaptTimeToPlayer } from '../../utils/movie';
import { KeyCodes } from '../../const';
import LoadingSpinner from '../loading-spinner/loading-spinner';

const BAG_VALUE = 25;
const MAX_PERCENT = 100;
const START_VOLUME_VALUE = 0.1;
const VIDEO_READY_VALUE = 3;

export default function PlayerScreen() {
  const movies = useSelector((state) => state.movie.movies);
  const { id } = useParams();
  const movie = movies.find((element) => element.id === +id);

  const [isLoading, setIsLoading] = useState(true);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [toggleBarStatus, setToggleBarStatus] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const movieRef = useRef();
  const progressBarRef = useRef();

  const {
    previewMovieLink,
    previewImage,
    title,
  } = movie;

  const handleExitClick = () => {
    movieRef.current.pause();
    browserHistory.goBack();
  };
  const handlePlayButtonClick = () => setPlayerStatus(!playerStatus);

  const handleToggleScreen = () => {
    if (!movieRef.current.fullscreenElement) {
      movieRef.current.requestFullscreen();
    }
    else if (movieRef.current.fullscreenEnabled) {
      movieRef.current.exitFullScreen();
    }
  };

  const handleProgressUpdate = () => {
    const duration = movieRef.current.duration;
    const currentTime = movieRef.current.currentTime;
    progressBarRef.current.value = MAX_PERCENT * currentTime / duration;
    setTimeLeft(adaptTimeToPlayer(duration - currentTime));
    setToggleBarStatus(progressBarRef.current.value);
  };

  const handleMovieRewind = (e) => {
    const duration = movieRef.current.duration;
    const progressBarWidth = e.target.offsetWidth;
    const clickPosition = e.clientX - BAG_VALUE;
    e.target.value = MAX_PERCENT * clickPosition / progressBarWidth;
    setPlayerStatus((prev) => !prev);
    movieRef.current.currentTime = duration * (clickPosition / progressBarWidth);
    setPlayerStatus((prev) => !prev);
  };

  useEffect(() => {
    playerStatus ? movieRef.current.play() : movieRef.current.pause();
  }, [playerStatus]);

  useEffect(() => {
    movieRef.current.onloadeddata = () => {
      movieRef.current.volume = START_VOLUME_VALUE;
      if (movieRef.current.readyState >= VIDEO_READY_VALUE) {
        setIsLoading(false);
      }
    };

    return () => {
      if (movieRef.current) {
        movieRef.current = null;
      }
    };
  }, [previewMovieLink]);

  return (
    <div className="player">
      <video
        src={previewMovieLink}
        ref={movieRef}
        className="player__video"
        poster={previewImage}
        tabIndex="0"
        onKeyDown={(e) => {
          e.code === KeyCodes.F && handleToggleScreen();
          e.code === KeyCodes.SPACE && handlePlayButtonClick();
          e.code === KeyCodes.ESCAPE && handleExitClick();
        }}
        onDoubleClick={handleToggleScreen}
        onClick={handlePlayButtonClick}
        onTimeUpdate={handleProgressUpdate}
      >
      </video>

      <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>
      {isLoading && <LoadingSpinner />}
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              ref={progressBarRef}
              className="player__progress"
              value="0"
              max="100"
              onClick={(e) => handleMovieRewind(e)}
            >
            </progress>
            <div tabIndex="0" className="player__toggler" style={{ left: `${toggleBarStatus}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayButtonClick}>
            {playerStatus
              ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
              :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>}
          </button>
          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen" onClick={handleToggleScreen}>
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
