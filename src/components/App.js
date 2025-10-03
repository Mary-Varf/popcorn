import Main from "./Main";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Search from "./Search";
import NavResult from "./NavResult";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import Box from "./Box";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useMovies } from "../useMovies";
import { useLocalStorageState } from "../useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleAddWatched = (movie) => {
    setWatchedMovies((movies) => [...movies, movie]);
  };
  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleDeleteMovie = (id) => {
    setWatchedMovies((movies) => movies.filter((movie) => movie.imdbID !== id));
  };

  const { movies, error, isLoading } = useMovies(query);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState([], "watched");

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              onWatched={handleAddWatched}
              movieId={selectedId}
              onCloseMovie={handleCloseMovie}
              watched={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
