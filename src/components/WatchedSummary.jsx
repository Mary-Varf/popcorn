import { average } from "../helper";

const WatchedSummary = ({ watchedMovies }) => {
  const avgImdbRating = average(
    watchedMovies
      ?.filter((movie) => !Number.isNaN(movie.imdbRating))
      ?.map((movie) => movie.imdbRating)
  );
  const avgUserRating = average(
    watchedMovies
      ?.filter((movie) => !Number.isNaN(movie.imdbRating))
      .map((movie) => movie.userRating)
  );
  const avgRuntime = average(watchedMovies?.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating?.toFixed(2)}</span>
        </p>
        {!Number.isNaN(avgRuntime) ? (
          <p>
            <span>⏳</span>
            <span>{avgRuntime?.toFixed(0)} min</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WatchedSummary;
