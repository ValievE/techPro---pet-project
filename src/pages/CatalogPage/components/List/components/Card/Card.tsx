import React, { useContext } from "react";
import Styles from "./Card.module.css";
import SectionsData from "data/sections.json";
import { useOutletContext } from "react-router-dom";
import { CardContext } from "contexts/CardContext";

type CardItem = {
  object: CatalogObject;
  section?: string;
};

type GetContext = {
  cartItem: CartItem[];
  setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favItem: CartItem[];
  setFavItem: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Card = (props: CardItem) => {
  const MyNewContext = useContext(CardContext);

  const { cartItem, setCartItem, favItem, setFavItem } =
    useOutletContext<GetContext>();

  const checkCart = (id: number, section: string): string => {
    if (cartItem.find((item) => item.id === id && item.section === section)) {
      return "url('/icons/icon_cart_active.svg')";
    }
    return "url('/icons/icon_cart.svg')";
  };

  const checkFavorites = (id: number, section: string): string => {
    if (favItem.find((item) => item.id === id && item.section === section)) {
      return "url('/icons/icon_like_active.svg')";
    }
    return "url('/icons/icon_like.svg')";
  };

  const openCard = () => {
    MyNewContext?.modalState[1](true);
    MyNewContext?.cardInfo[1](props.object);
  };

  const addToCart = (id: number, section: Sections) => {
    const foundItem = cartItem.find(
      (item) => item.id === id && item.section === section
    );

    if (!foundItem) {
      setCartItem((oldValue) => [
        ...oldValue,
        {
          id: id,
          section: section,
          quantity: 1,
        },
      ]);
      return;
    }

    setCartItem((oldValue) => oldValue.filter((item) => item.id !== id));
  };

  const addToFav = (id: number, section: Sections) => {
    const foundItem = favItem.find(
      (item) => item.id === id && item.section === section
    );

    if (!foundItem) {
      setFavItem((oldValue) => [
        ...oldValue,
        {
          id: id,
          section: section,
          quantity: 1,
        },
      ]);
      return;
    }

    setFavItem((oldValue) => oldValue.filter((item) => item.id !== id));
  };

  const actualSection = SectionsData.find(
    (item) => item.path === props.section
  );

  return (
    <article className={`bg_white ${Styles.card}`}>
      <div
        className={Styles["card-img"]}
        style={{
          backgroundImage: `url('/catalog/${props?.section}/${props.object.fullname ? props.object.fullname : props.object.brand + " " + props.object.model}/${props.object.images[0]}')`,
        }}
      ></div>
      <div className={Styles["card-info"]}>
        <span className={Styles["card-title"]} onClick={() => openCard()}>
          {props.object.fullname
            ? props.object.fullname
            : `${props.object.brand} ${props.object.model}`}
        </span>
        <div className={Styles["card-text"]}>
          {actualSection?.crucialInfo.map((item) => {
            if (Object.keys(props.object.info).includes(item.key)) {
              return (
                <div className={Styles["card-text-line"]} key={item.key}>
                  <span className={Styles["card-property"]}>{item.title}</span>
                  <span className={Styles["card-value"]}>
                    {typeof props.object.info[
                      item.key as KeysOfDescriptionInfo
                    ] !== "boolean"
                      ? props.object.info[item.key as KeysOfDescriptionInfo]
                      : props.object.info[item.key as KeysOfDescriptionInfo]
                        ? "Присутствует"
                        : "Отсутствует"}
                  </span>
                </div>
              );
            }
          })}
        </div>
        <footer className={Styles["card-footer"]}>
          <span className={Styles["card-price"]}>
            {`${props.object.price} ₽`}{" "}
          </span>
          <div className={Styles["card-buttons"]}>
            <input
              onClick={() =>
                addToFav(props.object.id, props.section as Sections)
              }
              className={Styles["card-button"]}
              type="button"
              style={{
                backgroundImage: checkFavorites(
                  props.object.id,
                  props.section as string
                ),
              }}
            />
            <input
              onClick={() =>
                addToCart(props.object.id, props.section as Sections)
              }
              className={Styles["card-button"]}
              type="button"
              style={{
                backgroundImage: checkCart(
                  props.object.id,
                  props.section as string
                ),
              }}
            />
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Card;
