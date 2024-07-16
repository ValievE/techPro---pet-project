import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CartContextProvider from "contexts/CartContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App color_dark-gray">
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<MainPage />} />
              <Route path="catalog/:slug" element={<CatalogPage />} />
            </Route>
          </Routes>
        </CartContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
