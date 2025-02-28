import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Favorites from "./pages/Favorites";


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default AppRouter;