import { WatchedMovie } from "../WatchedMovie/WatchedMovie";

export const WatchedMoviesList = ({ watched, onDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
};
