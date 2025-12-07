import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const { id } = useParams();
  const { movies = [] } = useSelector((state) => state.movies || {});

  const movie = movies.find((m) => String(m.id) === String(id));

  if (!movie) {
    return (
      <div className="text-white p-4">
        <div className="mb-4">
          <Link to="/" className="text-yellow-300">
            ← Back
          </Link>
        </div>
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="text-white p-4">
      <div className="mb-4">
        <Link to="/" className="text-yellow-300">
          ← Back
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.primaryImage?.url}
          alt={movie.originalTitle}
          className="w-full md:w-1/3 h-auto rounded"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{movie.originalTitle}</h1>
          <p className="mb-1">
            <strong>Year:</strong> {movie.startYear ?? movie.endYear}
          </p>
            <p className="mb-1">
            <strong>Type:</strong> {movie.type ??  "N/A"}
          </p>
          <p className="mb-1">
            <strong>Genres:</strong> {movie.genres?.join(", ")}
          </p>
          <p className="mb-1">
            <strong>Rating:</strong> {movie?.rating?.aggregateRating ?? "N/A"}
          </p>
            <p className="mb-1">
            <strong>Vote Count:</strong> {movie?.rating?.voteCount ?? "N/A"}
          </p>
            <p className="mb-1">
            <strong>Description:</strong> {movie?.plot ?? "N/A"}
          </p>
          {movie.titleType && (
            <p className="mb-1">
              <strong>Type:</strong> {movie.titleType}
            </p>
          )}
          {movie.description && <p className="mt-4">{movie.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
