import { Navbar } from "./NavBar/Navbar";
import { Main } from "./Main/Main";
import { useState } from "react";
import { Search } from "./Search/Search";
import { NumResult } from "./NumResult/NumResult";
import { Box } from "./Box/Box";
import { WatchedSummary } from "./WatchedBox/WatchedBox";
import { MovieList } from "./MovieList/MovieList";
import { WatchedMoviesList } from "./WatchedMovieList/WatchedMoviesList";
import Loader from "./Loader/Loader";
import Error from "./Error/Error";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import useMovies from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import Footer from "./Footer/Footer";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");

  const [watched, setWatched] = useLocalStorageState([]);
  const handleMovieClose = () => {
    setSelectedId(null);
  };

  const handleAddWatch = (movie) => {
    setWatched((watched) => [...watched, movie]);
    console.log(movie);
  };

  const handleDeleteWatched = (id) => {
    setWatched(watched.filter((m) => m.imdbID !== id));
  };

  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  const handleMovieSelected = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : (
            <MovieList
              onClick={handleMovieSelected}
              movies={movies}
              onWatched={handleAddWatch}
            ></MovieList>
          )}
          {error ? <Error message={error} /> : null}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleMovieClose}
              onAddWatched={handleAddWatch}
              isWatched={watched.map((m) => m.imdbID).includes(selectedId)}
              watchedList={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
      <Footer />
    </>
  );
}
