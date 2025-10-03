import { useEffect, useRef, useState } from "react";
import { KEY } from "../helper";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../useKey";

const MovieDetails = ({ movieId, onCloseMovie, onWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserrating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const { Title: title } = movie;

  const watchedUserRating = watched.find(
    (movie) => movieId === movie.imdbID
  )?.userRating;

  const getMovieDetails = async () => {
    try {
      setMovie({});
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
      );
      if (!res.ok)
        throw new Error("Something whent wrong with fetching movie.");

      const data = await res.json();
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);

  const habdleAdd = () => {
    const newWatchedMovie = {
      imdbID: movieId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie?.imdbRating ?? 0),
      runtime: movie.Runtime?.split(" ").at(0),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onWatched(newWatchedMovie);
    onCloseMovie();
  };

  const setRating = (rating) => {
    setUserrating(rating);
  };

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Popcorn | ${title}`;

    return () => {
      document.title = "Popcorn";
    };
  }, [title]);

  useKey("Escape", onCloseMovie);

  return (
    movie?.Title && (
      <div className="details">
        {!isLoading && !error && (
          <>
            <button className="btn-back" onClick={onCloseMovie}>
              🔙
            </button>
            <header>
              <img src={movie?.Poster} alt={`Poster of ${movie?.Title}`} />
              <div className="details-overview">
                <h2>{movie?.Title}</h2>
                <p>{movie?.Released}</p>
                <p>{movie?.Genre}</p>
                <p>
                  <span>⭐</span>
                  {movie?.imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setRating}
                    />

                    {userRating > 0 && (
                      <button className="btn-add" onClick={habdleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You have already rated this movie ⭐{watchedUserRating}⭐.
                  </p>
                )}
              </div>
              <p>
                <em>{movie?.Plot}</em>
              </p>
              <p>Starring {movie?.Actors}</p>
              <p>Directed by {movie?.Director}</p>
            </section>
          </>
        )}
        {isLoading && !error && <Loader />}
        {error && <ErrorMessage error={error} />}
      </div>
    )
  );
};
export default MovieDetails;
