import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_GENRES } from '../../const';
import { changeCurrentGenre, resetRenderedMoviesCount } from '../../store/reducers/movie-data';

export default function GenresList() {
  const dispatch = useDispatch();
  const currentGenre = useSelector((state) => state.movie.currentGenre);
  const movies = useSelector((state) => state.movie.movies);
  const onGenreTabClick = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('a')) {
      dispatch(changeCurrentGenre(evt.target.textContent));
      dispatch(resetRenderedMoviesCount());
    }
  };

  const uniqueGenres = new Set(movies.map((movie) => movie.genre));

  return (
    <ul className="catalog__genres-list" onClick={onGenreTabClick}>
      {[ALL_GENRES, ...Array.from(uniqueGenres)].map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}
