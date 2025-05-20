import "./App.css";
import { Route, Routes } from "react-router";
import { FilmList } from "./pages/FilmList";
import { FilmDetails } from "./pages/FilmDetails";
import { CharacterDetails } from "./pages/CharacterDetails";
import { NotFound } from "./pages/NotFound";
import { MainLayout } from "./components/MainLayout";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmList />} />
        <Route path="film/:id" element={<FilmDetails />} />
        <Route path="character/:id" element={<CharacterDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
