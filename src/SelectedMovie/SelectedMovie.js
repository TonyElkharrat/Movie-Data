import { useEffect, useRef, useState } from "react";
import StarRating from "../StarRating/StartRating";
import Loader from "../Loader/Loader";
import "../SelectedMovie/SelectedMovie.css";

const SelectedMovie = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  isWatched,
  watchedList,
}) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);
  const KEY = "15bec2bf";
  const countRef = useRef(0);

  const userRating = watchedList.find(
    (w) => w.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    imdbID,
    Genre: genre,
  } = movieDetails;

  useEffect(() => {
    if (movieRating) countRef.current = countRef.current + 1;
  }, [movieRating]);

  const handdleMovieRating = (rating) => {
    setMovieRating(Number(rating));
  };

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovieDetails(data);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (title) document.title = `Movie | ${title}`;
    return () => (document.title = "Movie Data");
  }, [title]);

  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", callBack);
    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movieDetails} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
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
                    onSetRating={handdleMovieRating}
                  />
                  {movieRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        onAddWatched({
                          Title: title,
                          Poster: poster,
                          imdbRating: Number(imdbRating),
                          userRating: movieRating,
                          runtime: Number(runtime.split(" ").at(0)),
                          imdbID,
                          userStarClickCount: countRef.current,
                        });
                        onCloseMovie();
                      }}
                    >
                      + Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>You Rated This Movie {userRating}⭐</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
