import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watchedMovies }) => {
  return (
    <ul className="list">
      {watchedMovies?.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
