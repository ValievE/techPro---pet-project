import React, { useContext, useState } from "react";
import { CardContext } from "contexts/CardContext";
import { ItemContext } from "contexts/ItemContext";
import Styles from "./ItemCard.module.css";
import Params from "./components/Params/Params";
import GreenButton from "components/UI/GreenButton/GreenButton";

const ItemCard = () => {
  const cardContextData = useContext(CardContext);
  const itemContextData = useContext(ItemContext);
  const [bigImage, setBigImage] = useState<number>(0);
  const cardItem = cardContextData?.cardInfo[0];

  const setTitle = (): string => {
    const newTitle: string = cardItem?.fullname
      ? cardItem.fullname
      : `${cardItem?.brand} ${cardItem?.model}`;
    return newTitle;
  };

  const setImage = (arg: number): string => {
    const url = `url('/catalog/${itemContextData?.[0]}/${cardItem?.fullname ? cardItem?.fullname : cardItem?.brand + " " + cardItem?.model}/${cardItem?.images[arg]}')`;
    return url;
  };

  const setBorder = (arg: number): string => {
    if (arg === bigImage) {
      return "2px solid rgb(206, 206, 206)";
    }
    return "none";
  };

  const changeImage = (arg: "left" | "right") => {
    if (arg === "left") {
      setBigImage((oldValue) =>
        oldValue - 1 < 0
          ? (cardItem?.images.length as number) - 1
          : oldValue - 1
      );
    }
    if (arg === "right") {
      setBigImage((oldValue) =>
        oldValue + 1 > (cardItem?.images.length as number) - 1
          ? 0
          : oldValue + 1
      );
    }
  };

  return (
    <div className={Styles.body}>
      <div className={Styles.images}>
        <div
          className={Styles["big-image"]}
          style={{ backgroundImage: setImage(bigImage) }}
        >
          {(cardItem?.images.length as number) > 1 && (
            <>
              <button
                className={`${Styles["big-image__selector"]} ${Styles["big-image__selector_left"]}`}
                onClick={() => changeImage("left")}
              ></button>
              <button
                className={`${Styles["big-image__selector"]} ${Styles["big-image__selector_right"]}`}
                onClick={() => changeImage("right")}
              ></button>
            </>
          )}
        </div>
        {(cardItem?.images.length as number) > 1 && (
          <div className={`${Styles.previews} custom-scroll`}>
            {cardItem?.images.map((image, imageIndex) => (
              <div
                className={Styles.preview}
                key={image}
                style={{
                  backgroundImage: setImage(imageIndex),
                  outline: setBorder(imageIndex),
                }}
                onClick={() => setBigImage(imageIndex)}
              ></div>
            ))}
          </div>
        )}
      </div>
      <h2 className={Styles.title}>{setTitle()}</h2>
      <div className={`${Styles.params} custom-scroll`}>
        <Params />
      </div>
      <footer className={Styles.footer}>
        <span
          className={Styles.price}
        >{`${cardContextData?.cardInfo[0]?.price} ₽`}</span>
        <GreenButton text="В корзину" icon="cart" />
      </footer>
    </div>
  );
};

export default ItemCard;
