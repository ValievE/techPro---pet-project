import React, { useEffect, useState } from "react";
import Styles from "./Card.module.css";
import SectionsData from "data/sections.json";

type CartCardProps = {
  id: number;
  section: Sections;
  quantity: number;
  index: number;
  deleteOrder: CallableFunction;
  changeQuantity: CallableFunction;
};

const Card = (props: CartCardProps) => {
  const { id, section, quantity, index, deleteOrder, changeQuantity } = props;
  const [orderObject, setOrderObject] = useState<CatalogObject>();

  useEffect(() => {
    async function getData() {
      const Data = (await import(`data/${section}.json`))
        .default as CatalogObject[];
      const foundOrder = Data.find((item) => item.id === id);
      setOrderObject(foundOrder);
    }
    getData();
  }, []);

  const setPrice = (): string => {
    let price: number = 0;
    if (orderObject?.price) {
      price = quantity * orderObject?.price;
    }
    return `${price} ₽`;
  };

  const actualSection = SectionsData.find((item) => item.path === section);

  const setImage = (): string => {
    console.log(section);
    const url: string = `/catalog/${section}/${orderObject?.fullname ? orderObject?.fullname : orderObject?.brand + " " + orderObject?.model}/1.webp`;
    return `url('${url}')`;
  };

  const setInfo = (): string => {
    let orderInfo: string = "";
    let newOrderInfo: string = "";
    actualSection?.crucialInfo.map((item) => {
      if (
        Object.keys(orderObject?.info as CatalogObject["info"]).includes(
          item.key
        )
      ) {
        newOrderInfo =
          typeof orderObject?.info[item.key as KeysOfDescriptionInfo] !==
          "boolean"
            ? (orderObject?.info[item.key as KeysOfDescriptionInfo] as string)
            : orderObject?.info[item.key as KeysOfDescriptionInfo]
              ? "Присутствует"
              : "Отсутствует";
        if (orderInfo.length) {
          orderInfo = orderInfo + " | " + item.title + " " + newOrderInfo;
          return;
        }
        orderInfo = item.title + " " + newOrderInfo;
      }
    });
    return orderInfo;
  };

  return (
    <div className={`${Styles.body} bg_white`}>
      <span className={Styles.number}>{index + 1}</span>
      <div
        className={Styles.image}
        style={{ backgroundImage: orderObject ? setImage() : "" }}
      ></div>
      <div className={Styles["main-info"]}>
        <h2 className={Styles["main-info__title"]}>
          {orderObject?.fullname
            ? orderObject?.fullname
            : `${orderObject?.brand} ${orderObject?.model}`}
        </h2>
        <span className={Styles["main-info__description"]}>
          {orderObject ? setInfo() : ""}
        </span>
      </div>
      <div className={Styles.quantity}>
        <span className={Styles.quantity__input}>{`${quantity} шт`}</span>
        <div className={Styles.quantity__buttons}>
          <button
            className={`${Styles.quantity__button} bg_gray`}
            onClick={() => changeQuantity(id, section, true)}
          >
            +
          </button>
          <button
            className={`${Styles.quantity__button} bg_gray`}
            onClick={() => changeQuantity(id, section, false)}
          >
            -
          </button>
        </div>
      </div>
      <span className={Styles.price}>{orderObject ? setPrice() : ""}</span>
      <input
        className={`${Styles["delete-button"]} bg_gray`}
        type="button"
        onClick={() => deleteOrder(id, section)}
      />
    </div>
  );
};

export default Card;
