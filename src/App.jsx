import { IoSearch } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "./features/movie/moviesSlice";

const App = () => {
  const { movies, isLoading, isError } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);
  console.log(movies);

  if (isLoading) return <p className="text-white font-bold">Loading...</p>;
  if (isError) return <p className="text-red-500">{isError}</p>;

  return (
    <div className="rounded-md flex flex-row h-screen">
      <div className="bg-[#0C1113] w-1/4 p-4 text-white border-r border-gray-900 ">
        <div className="flex flex-row items-center">
          <BiSolidCameraMovie style={{ fontSize: "40px", marginBottom: 8 }} />
          <h1 className="px-4 text-xl font-bold">MovieMax</h1>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-300">
            <ul className="space-y-2">
              <li>
                <input className="mx-1" type="checkbox" />
                Action
              </li>
              <li>
                <input className="mx-1" type="checkbox" />
                Comedy
              </li>
              <li>
                <input className="mx-1" type="checkbox" />
                Drama
              </li>
              <li>
                <input className="mx-1" type="checkbox" />
                Horror
              </li>
              <li>
                <input className="mx-1" type="checkbox" />
                Thriller
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 text-gray-300">
            <select className="w-full text-white p-2 rounded-lg outline-none bg-[#1C1F21]">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#0C1113] w-3/4 p-4 text-white h-screen overflow-y-scroll overflow-x-hidden ">
        <div className="flex flex-row justify-between">
          <div
            className="bg-[#1C1F21] w-[80%] p-1 px-4 rounded-md outline-none 
          border border-transparent hover:border-gray-400 focus:border-gray-500
          flex flex-row items-center"
          >
            <IoSearch />
            <input
              className="px-2 outline-none w-full"
              placeholder="Search movies..."
            />
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
            {movies.map((movie) => {
              return (
                <div key={movie.id}>
                  <div className="relative sm:w-55 md:w-45 xl:w-55">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Description"
                      className="w-full"
                    />
                    <span className="absolute bottom-2 right-4 bg-yellow-300 text-black font-bold text-sm px-2 rounded">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="p-3">
                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                    <p className="text-sm text-gray-300">
                      {movie.release_date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
