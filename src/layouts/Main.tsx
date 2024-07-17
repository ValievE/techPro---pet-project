import React, { useEffect, useState } from "react";
import "./Main.css";
import { Link, Outlet, useLocation } from "react-router-dom";
// import ThemeSelector from "../components/ThemeSelector/ThemeSelector";
// import SearchWindow from "../components/SearchWindow/SearchWindow";
import ModalWindow from "components/ModalWindow/ModalWindow";
import Cart from "components/Cart/Cart";
import CardContext from "contexts/CardContext";
import ItemContextProvider from "contexts/ItemContext";

function Main() {
  // const actualPath = useLocation();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [favItem, setFavItem] = useState<CartItem[]>([]);
  const [isCartModalOpened, setIsCartModalOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!cartItem.length || !favItem.length) {
      if (localStorage.length) {
        localStorage.getItem("cartItems")
          ? setCartItem(JSON.parse(localStorage.getItem("cartItems") as string))
          : setCartItem([]);
        localStorage.getItem("favItems")
          ? setFavItem(JSON.parse(localStorage.getItem("favItems") as string))
          : setFavItem([]);
      }
    }
  }, []);

  useEffect(() => {
    if (cartItem.length || favItem.length) {
      localStorage.clear();
      localStorage.setItem("cartItems", JSON.stringify(cartItem));
      localStorage.setItem("favItems", JSON.stringify(favItem));
    }
  }, [cartItem, favItem]);

  return (
    <div className="main">
      {isCartModalOpened ? (
        <ModalWindow state={[isCartModalOpened, setIsCartModalOpened]}>
          <Cart {...{ cartItem, setCartItem }} />
        </ModalWindow>
      ) : (
        ""
      )}
      <header className="header">
        {/* <ThemeSelector /> */}
        <Link className="logo" to={"/"}>
          <img className="logo-img" src="/logo/logo_dark.svg" alt="" />
          <span className="logo-text color_dark-gray">
            СОБЕРИ СВОЙ КОМПЬЮТЕР
          </span>
        </Link>
        <div className="header-buttons">
          {/* <button className="button-user-cabinet bg_gray">
            <img
              className="button-user-cabinet__img"
              src="/icons/icon_user_darkgray.svg"
              alt=""
            />
            <span className="button-user-cabinet__text">{"Иванов И."}</span>
          </button> */}
          <button
            className="button-cart bg_green-fade"
            onClick={() => {
              setIsCartModalOpened(true);
            }}
          >
            <img
              className="button-cart__img"
              src="/icons/icon_cart.svg"
              alt=""
            />
            {cartItem.length > 0 ? (
              <span className="button-cart__text">{cartItem.length}</span>
            ) : (
              ""
            )}
          </button>
        </div>
      </header>
      {/* {!actualPath.pathname.includes("catalog") ? <SearchWindow /> : ""} */}
      <ItemContextProvider>
        <CardContext>
          <Outlet context={{ cartItem, setCartItem, favItem, setFavItem }} />
        </CardContext>
      </ItemContextProvider>
    </div>
  );
}

export default Main;
