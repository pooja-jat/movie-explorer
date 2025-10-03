import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "./features/movie/moviesSlice";

import Logo from "./components/Logo";
import MovieList from "./components/MovieList";
import GenreSelection from "./components/GenreSelection";

const App = () => {
  const dispatch = useDispatch();

  // first load
  useEffect(() => {
    dispatch(fetchAllMovies({ genre: "", year: 2025 }));
  }, []);

  return (
    <div className="w-full  flex flex-col md:flex-row h-screen rounded-md text-white">
      <div className="p-4 flex flex-1 bg-[#0C1113] w-full md:w-2/6 lg:w-2/6 xl:w-1/6  md:border-r border-gray-900 ">
        <div className="p-4 flex flex-1 flex-row md:flex-col gap-4">
          <Logo />
          <GenreSelection />
        </div>
      </div>
      <div className="p-4  bg-[#0C1113] md:w-4/6 lg:w-4/6 xl:w-5/6  h-screen overflow-y-scroll overflow-x-hidden ">
        <MovieList />
      </div>
    </div>
  );
};

export default App;
