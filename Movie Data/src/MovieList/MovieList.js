import { Movie } from "../Movie/Movie";
import "../MovieList/MovieList.css";

export const MovieList = ({ movies, onClick }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie onClicks={onClick} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
