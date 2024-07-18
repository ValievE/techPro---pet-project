import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CartFavContextProvider from "contexts/CartFavContext";
import WarningContextProvider from "contexts/WarningContext";

function App() {
  return (
    <WarningContextProvider>
      <CartFavContextProvider>
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
      </CartFavContextProvider>
    </WarningContextProvider>
  );
}

export default App;
