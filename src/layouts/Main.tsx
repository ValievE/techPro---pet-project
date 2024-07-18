import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { Link, Outlet, useLocation } from "react-router-dom";
// import ThemeSelector from "../components/ThemeSelector/ThemeSelector";
// import SearchWindow from "../components/SearchWindow/SearchWindow";
import ModalWindow from "components/ModalWindow/ModalWindow";
import Cart from "components/Cart/Cart";
import CardContext from "contexts/CardContext";
import ItemContextProvider from "contexts/ItemContext";
import { CartFavContext } from "contexts/CartFavContext";
import { WarningContext } from "contexts/WarningContext";
import WarningPopup from "components/WarningPopup/WarningPopup";

function Main() {
  // const actualPath = useLocation();
  const warningContextData = useContext(WarningContext);
  const cartFavContextData = useContext(CartFavContext);
  const [isCartModalOpened, setIsCartModalOpened] = useState<boolean>(false);

  useEffect(() => {
    if (
      !cartFavContextData?.cartList[0].length ||
      !cartFavContextData?.favList[0].length
    ) {
      if (localStorage.length) {
        localStorage.getItem("cartItems")
          ? cartFavContextData?.cartList[1](
              JSON.parse(localStorage.getItem("cartItems") as string)
            )
          : cartFavContextData?.cartList[1]([]);
        localStorage.getItem("favItems")
          ? cartFavContextData?.favList[1](
              JSON.parse(localStorage.getItem("favItems") as string)
            )
          : cartFavContextData?.favList[1]([]);
      }
    }
  }, []);

  useEffect(() => {
    if (
      cartFavContextData?.cartList[0].length ||
      cartFavContextData?.favList[0].length
    ) {
      localStorage.clear();
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartFavContextData?.cartList[0])
      );
      localStorage.setItem(
        "favItems",
        JSON.stringify(cartFavContextData?.favList[0])
      );
    }
  }, [cartFavContextData?.cartList[0], cartFavContextData?.favList[0]]);

  return (
    <div className="main">
      {isCartModalOpened ? (
        <ModalWindow state={[isCartModalOpened, setIsCartModalOpened]}>
          <Cart />
        </ModalWindow>
      ) : (
        ""
      )}

      {warningContextData!.warningList[0].length > 0 && (
        <div className="warning-popups">
          {warningContextData?.warningList[0].map((warning) => (
            <WarningPopup type={warning.type} key={warning.id}>
              <p>{warning.text}</p>
            </WarningPopup>
          ))}
        </div>
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
            {(cartFavContextData?.cartList[0].length as number) > 0 ? (
              <span className="button-cart__text">
                {cartFavContextData?.cartList[0].length}
              </span>
            ) : (
              ""
            )}
          </button>
        </div>
      </header>
      {/* {!actualPath.pathname.includes("catalog") ? <SearchWindow /> : ""} */}
      <ItemContextProvider>
        <CardContext>
          <Outlet />
        </CardContext>
      </ItemContextProvider>
    </div>
  );
}

export default Main;
