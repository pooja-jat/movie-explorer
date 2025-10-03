import { useDispatch } from "react-redux";
import { fetchAllMovies, setSearchText } from "../features/movie/moviesSlice";

const GenreSelection = () => {
  const dispatch = useDispatch();

  // on genre change
  const handleGenreSelection = (genre) => {
    dispatch(setSearchText(""));
    dispatch(fetchAllMovies({ genre: genre }));
  };

  return (
    <div className="flex w-full px-2 cursor-pointer  text-gray-300 bg-[#1C1F21] overflow-hidden rounded-lg">
      <select
        onChange={(e) => handleGenreSelection(e.target.value)}
        className="cursor-pointer w-full text-white p-2  outline-none bg-[#1C1F21] "
      >
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Thriller">Thriller</option>
      </select>
    </div>
  );
};

export default GenreSelection;
