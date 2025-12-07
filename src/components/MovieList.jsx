import { useSelector } from "react-redux";
import Search from "./Search";
import { Link } from "react-router-dom";

const MovieList = () => {
  const { movies: _movies, isLoading } = useSelector((state) => state.movies);

  const movies = _movies ?? [];
  return (
    <div>
      <Search />
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 my-4">
          {isLoading ? (
            <p className="text-white font-bold">Loading...</p>
          ) : (
            movies
              .filter((movie) => movie?.primaryImage?.url)
              .map((movie) => {
                return (
                  <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <div className="">
      <div className="  flex items-center justify-center">
        <div className="relative sm:w-55 md:w-45 xl:w-55">
          <img
            src={movie.primaryImage?.url}
            alt={movie.originalTitle}
            className="w-full h-[220px] md:h-[250px] lg:h-[250px] xl:h-[280px]"
          />

          <div className="absolute flex flex-row items-center justify-between backdrop-blur-sm  bg-white/20 background-blur text-black font-bold text-sm w-full px-2 top-0">
            <div>{movie.endYear ?? movie.startYear}</div>
            <div>{movie.genres?.[0]}</div>
          </div>
          <span className="absolute bottom-2 right-4 bg-yellow-300 text-black font-bold text-sm px-2 rounded">
            {movie?.rating?.aggregateRating}
          </span>
        </div>
      </div>
      <div className="p-2 flex flex-col items-center justify-between">
        <h2 className="font-semibold text-sm">{movie.originalTitle}</h2>
      </div>
    </div>
  );
};

export default MovieList;
