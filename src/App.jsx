import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "./features/movie/moviesSlice";
import { Routes, Route } from "react-router-dom";

import Logo from "./components/Logo";
import MovieList from "./components/MovieList";
import GenreSelection from "./components/GenreSelection";
import MovieDetail from "./components/MovieDetail";

const Layout = ({ children }) => (
  <div className="w-full  flex flex-col md:flex-row h-screen rounded-md text-white">
    <div className="p-4 flex flex-1 bg-[#0C1113] w-full md:w-2/6 lg:w-2/6 xl:w-1/6  md:border-r border-gray-900 ">
      <div className="p-4 flex flex-1 flex-row md:flex-col gap-4">
        <Logo />
        <GenreSelection />
      </div>
    </div>
    <div className="p-4  bg-[#0C1113] md:w-4/6 lg:w-4/6 xl:w-5/6  h-screen overflow-y-scroll overflow-x-hidden ">
      {children}
    </div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  // first load
  useEffect(() => {
    dispatch(fetchAllMovies({ genre: "", year: 2025 }));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <MovieList />
          </Layout>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <Layout>
            <MovieDetail />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
