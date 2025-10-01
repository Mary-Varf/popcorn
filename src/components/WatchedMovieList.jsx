import { tempMovieData } from "./App";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = () => {
  return (
    <ul className="list">
      {tempMovieData?.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
