import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App color_dark-gray">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<MainPage />} />
            <Route path="catalog/:slug" element={<CatalogPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
