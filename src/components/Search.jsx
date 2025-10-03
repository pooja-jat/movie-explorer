import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMovies,
  searchMovies,
  setSearchText,
} from "../features/movie/moviesSlice";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const { searchText } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const search = () => {
    dispatch(searchMovies({ searchText }));
  };

  const cancelSearch = async () => {
    dispatch(setSearchText(""));
    dispatch(fetchAllMovies({ genre: "", year: 2025 }));
  };

  return (
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
          onChange={(e) => dispatch(setSearchText(e.target.value))}
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
  );
};

export default Search;
