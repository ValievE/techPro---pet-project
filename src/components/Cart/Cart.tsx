import React, { useContext } from "react";
import Styles from "./Cart.module.css";
import GreenButton from "components/UI/GreenButton/GreenButton";
import Card from "./components/Card/Card";
import { CartFavContext } from "contexts/CartFavContext";
import { WarningContext } from "contexts/WarningContext";
import { CreateWarning } from "hooks/createWarning";

const Cart = () => {
  const cartFavContextData = useContext(CartFavContext);
  const warningContextData = useContext(WarningContext);

  const deleteOrder = (itemId: number, itemSection: Sections) => {
    cartFavContextData?.cartList[1]((oldValue) =>
      oldValue.filter(
        (oldItem) =>
          `${oldItem.id} ${oldItem.section}` !== `${itemId} ${itemSection}`
      )
    );
  };

  const fakeBuy = () => {
    const newWarning = {
      id: warningContextData?.warningList[0].length
        ? warningContextData.warningList[0][
            warningContextData?.warningList[0].length - 1
          ].id + 1
        : 0,
      text: "Ошибка. Не удается выполнить операцию",
      type: "error" as const,
    };
    if (warningContextData) {
      CreateWarning(newWarning, warningContextData);
    }
  };

  const getPrice = () => {
    if (cartFavContextData?.cartList[0].length) {
      const price: number = cartFavContextData.cartList[0].reduce(
        (acc, number) => acc + number.price * number.quantity,
        0
      );
      return price;
    }
    return 0;
  };

  const changeQuantity = (
    itemId: number,
    itemSection: Sections,
    action: boolean
  ) => {
    if (cartFavContextData?.cartList[0]) {
      const foundItem = cartFavContextData.cartList[0].find(
        (item) => `${item.section}${item.id}` === `${itemSection}${itemId}`
      );

      if (action && foundItem?.quantity) {
        foundItem.quantity = foundItem?.quantity + 1;
      } else if (foundItem?.quantity) {
        foundItem.quantity = foundItem?.quantity - 1;
      }

      if (foundItem) {
        if (foundItem?.quantity) {
          cartFavContextData.cartList[1]((oldValue) => {
            const foundItemIndex = oldValue.indexOf(
              oldValue.find(
                (item) =>
                  `${item.section}${item.id}` === `${itemSection}${itemId}`
              ) as CartItem
            );
            const newValue = oldValue.map((x) => x);
            newValue.splice(foundItemIndex, 1, foundItem as CartItem);
            return newValue;
          });
          return;
        }
        deleteOrder(itemId, itemSection);
        return;
      }
    }
  };
  return (
    <section className={Styles.body}>
      <h1 className={Styles.title}>Корзина</h1>
      <div className={`custom-scroll ${Styles.list}`}>
        {cartFavContextData?.cartList[0].length ? (
          ""
        ) : (
          <div className={Styles.empty}></div>
        )}
        {cartFavContextData?.cartList[0].map((currentItem) => (
          <Card
            {...currentItem}
            index={cartFavContextData.cartList[0].indexOf(currentItem)}
            deleteOrder={deleteOrder}
            changeQuantity={changeQuantity}
            key={`${currentItem.section}${currentItem.id}`}
          />
        ))}
      </div>
      <footer
        className={Styles.footer}
        style={{ gridTemplateColumns: getPrice() ? `50% 50%` : `100%` }}
      >
        {getPrice() ? (
          <span className={Styles.summary}>{`Сумма: ${getPrice()}₽`}</span>
        ) : (
          ""
        )}
        <GreenButton
          text="перейти к оплате"
          icon="cart"
          isDisabled={cartFavContextData?.cartList[0].length ? false : true}
          function={() => {
            fakeBuy();
          }}
        />
      </footer>
    </section>
  );
};

export default Cart;
