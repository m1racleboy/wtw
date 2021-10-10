export const adaptMovieToClient = (movie) => {
  movie = Object.assign(
    {},
    movie,
    {
      title: movie.name,
      poster: movie.poster_image,
      previewImage: movie.preview_image,
      backgroundImage: movie.background_image,
      backgroundColor: movie.background_color,
      movieLink: movie.video_link,
      previewMovieLink: movie.preview_video_link,
      scoresCount: movie.scores_count,
      runtime: movie.run_time,
      year: movie.released,
      isFavorite: movie.is_favorite,
    },
  );

  delete movie.name;
  delete movie.poster_image;
  delete movie.preview_image;
  delete movie.background_image;
  delete movie.background_color;
  delete movie.video_link;
  delete movie.preview_video_link;
  delete movie.scores_count;
  delete movie.run_time;
  delete movie.released;
  delete movie.is_favorite;

  return movie;
};

export const adaptUserDataToClient = (userData) => {
  userData = Object.assign(
    {},
    userData,
    {
      avatar: userData.avatar_url,
    },
  );

  delete userData.avatar_url;

  return userData;
};

export const adaptMoviesToClient = (movies) => movies.map((movie) => adaptMovieToClient(movie));
