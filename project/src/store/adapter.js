export const adaptToClient = (movies) =>
  movies.map((movie) => {
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
  });

// export function adaptToServer(film) {
//   const movie = Object.assign(
//     {},
//     film,
//     {
//       'name': film.title,
//       'poster_image': film.poster,
//       'preview_image': film.previewImage,
//       'background_image': film.backgroundImage,
//       'background_color': film.backgroundColor,
//       'video_link': film.movieLink,
//       'preview_video_link': film.previewMovieLink,
//       'scores_count': film.scoresCount,
//       'run_time': film.runtime,
//       'released': film.year,
//       'is_favorite': film.isFavorite,
//     },
//   );

//   delete movie.title;
//   delete movie.poster;
//   delete movie.previewImage;
//   delete movie.backgroundImage;
//   delete movie.backgroundColor;
//   delete movie.movieLink;
//   delete movie.previewMovieLink;
//   delete movie.scoresCount;
//   delete movie.runtime;
//   delete movie.year;
//   delete movie.isFavorite;

//   return movie;
// }
