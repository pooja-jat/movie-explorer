import { IoSearch } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, searchMovies } from "./features/movie/moviesSlice";

const App = () => {
  const { movies, isLoading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);

  const search = () => {
    dispatch(searchMovies({ searchText }));
  };

  const cancelSearch = () => {
    setSearchText("");
    dispatch(fetchAllMovies());
  };

  useEffect(() => {
    dispatch(fetchAllMovies({ genres }));
  }, []);

  const handleCheckbox = (genre) => {
    const doesExist = genres.find((g) => g === genre);
    let filteredGenres = [];
    if (doesExist) {
      filteredGenres = genres.filter((g) => g !== genre);
    } else {
      filteredGenres = [...genres, genre];
    }
    setGenres(filteredGenres);
    dispatch(fetchAllMovies({ genres: filteredGenres }));
  };

  return (
    <div className="rounded-md flex flex-row h-screen">
      <div className="bg-[#0C1113] w-1/6 p-4 text-white border-r border-gray-900 ">
        <div className="flex flex-row items-center">
          <BiSolidCameraMovie style={{ fontSize: "40px", marginBottom: 8 }} />
          <h1 className="px-4 text-xl font-bold">MovieMax</h1>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-300">
            <h1 className="font-bold text-lg">Genre</h1>
            <ul className="space-y-2">
              <li>
                <input
                  onChange={() => handleCheckbox("Action")}
                  className="mx-1"
                  type="checkbox"
                />
                Action
              </li>
              <li>
                <input
                  onChange={() => handleCheckbox("Comedy")}
                  className="mx-1"
                  type="checkbox"
                />
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
          <div className="flex flex-col gap-2 text-gray-300 bg-[#1C1F21] overflow-hidden px-2 rounded-lg">
            <select className="w-full text-white p-2  outline-none bg-[#1C1F21] ">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#0C1113] w-5/6 p-4 text-white h-screen overflow-y-scroll overflow-x-hidden ">
        <div className="flex flex-row gap-2">
          <div
            className="bg-[#1C1F21] w-[80%] p-1 px-4 rounded-md outline-none 
          border border-transparent hover:border-gray-400 focus:border-gray-500
          flex flex-row items-center"
          >
            <IoSearch />
            <input
              value={searchText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.target.value === "") {
                    cancelSearch();
                  }
                  search();
                }
              }}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-2 outline-none w-full"
              placeholder="Search movies..."
            />
          </div>
          <button
            onClick={search}
            className="cursor-pointer px-2 py-0.5 bg-[#1c1f21] border border-gray-500 rounded-md"
          >
            Search
          </button>
          <button
            onClick={cancelSearch}
            className="cursor-pointer px-2 py-0.5 bg-[#1c1f21] border border-gray-500 rounded-md"
          >
            Cancel
          </button>
        </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
            {isLoading ? (
              <p className="text-white font-bold">Loading...</p>
            ) : (
              movies?.map((movie) => {
                return (
                  <div className="" key={movie.id}>
                    <div className="  flex items-center justify-center">
                      <div className="relative sm:w-55 md:w-45 xl:w-55">
                        <img
                          src={movie.primaryImage?.url}
                          alt="Description"
                          className="h-[300px]"
                        />

                        <div className="absolute flex flex-row items-center justify-between backdrop-blur-sm  bg-white/20 background-blur text-black font-bold text-sm w-full px-2 top-0">
                          <div>{movie.startYear}</div>
                          <div>{movie.genres[0]}</div>
                        </div>
                        <span className="absolute bottom-2 right-4 bg-yellow-300 text-black font-bold text-sm px-2 rounded">
                          {movie?.rating?.aggregateRating}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 flex flex-col items-center justify-between">
                      <h2 className="font-semibold text-sm">
                        {movie.originalTitle}
                      </h2>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
