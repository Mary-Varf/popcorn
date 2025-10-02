import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watchedMovies, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watchedMovies?.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={`watched-${movie.imdbID}`}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
