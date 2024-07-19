import React, { useContext } from "react";
import Styles from "./Card.module.css";
import SectionsData from "data/sections.json";
import { CardContext } from "contexts/CardContext";
import { CartFavContext } from "contexts/CartFavContext";
import { WarningContext } from "contexts/WarningContext";
import { AddToCart } from "hooks/addToCart";

type CardItem = {
  object: CatalogObject;
  section?: string;
};

const Card = (props: CardItem) => {
  const cardContextData = useContext(CardContext);
  const cartFavContextData = useContext(CartFavContext);
  const warningContextData = useContext(WarningContext);

  const checkCart = (id: number, section: string): string => {
    if (
      cartFavContextData?.cartList[0].find(
        (item) => item.id === id && item.section === section
      )
    ) {
      return "url('/icons/icon_cart_active.svg')";
    }
    return "url('/icons/icon_cart.svg')";
  };

  const checkFavorites = (id: number, section: string): string => {
    if (
      cartFavContextData?.favList[0].find(
        (item) => item.id === id && item.section === section
      )
    ) {
      return "url('/icons/icon_like_active.svg')";
    }
    return "url('/icons/icon_like.svg')";
  };

  const openCard = () => {
    cardContextData?.modalState[1](true);
    cardContextData?.cardInfo[1](props.object);
  };

  const addToFav = (id: number, section: Sections) => {
    const foundItem = cartFavContextData?.favList[0].find(
      (item) => item.id === id && item.section === section
    );

    if (!foundItem) {
      if (cartFavContextData?.favList[0]) {
        const newWarning = {
          id: warningContextData?.warningList[0].length
            ? warningContextData.warningList[0][
                warningContextData?.warningList[0].length - 1
              ].id + 1
            : 0,
          text: "Товар добавлен в избранное",
          type: "warning" as const,
        };
        warningContextData?.warningList[1]((oldValue) => {
          const newArray = oldValue.map((item) => item);
          newArray.push(newWarning);
          return newArray;
        });
        cartFavContextData?.favList[1]((oldValue) => [
          ...(oldValue as CartItem[]),
          {
            id: id,
            section: section,
            quantity: 1,
            price: props.object.price,
          },
        ]);
      }
      return;
    }

    cartFavContextData?.favList[1]((oldValue) =>
      oldValue!.filter((item) => item.id !== id)
    );
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
                AddToCart(
                  props.object.id,
                  props.section as Sections,
                  props.object.price,
                  cartFavContextData,
                  warningContextData
                )
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
