const WatchedMovie = ({ movie, onDeleteMovie }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        {!Number.isNaN(+movie.imdbRating) && (
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
        )}
        {!Number.isNaN(+movie.userRating) && (
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
        )}
        {!Number.isNaN(+movie.runtime) && (
          <p>
            <span>⏳</span>
            <span>
              {Number.isNaN(+movie.runtime)} {movie.runtime} min
            </span>
          </p>
        )}
        <button
          className="btn-delete"
          onClick={() => onDeleteMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
