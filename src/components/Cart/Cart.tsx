import React from "react";
import Styles from "./Cart.module.css";
import GreenButton from "components/UI/GreenButton/GreenButton";
import Card from "./components/Card/Card";

type CartProps = {
  cartItem: CartItem[];
  setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart = (props: CartProps) => {
  const deleteOrder = (itemId: number, itemSection: Sections) => {
    props.setCartItem((oldValue) =>
      oldValue.filter(
        (oldItem) =>
          `${oldItem.id} ${oldItem.section}` !== `${itemId} ${itemSection}`
      )
    );
  };

  const changeQuantity = (
    itemId: number,
    itemSection: Sections,
    action: boolean
  ) => {
    if (props.cartItem) {
      const foundItem = props.cartItem.find(
        (item) => `${item.section}${item.id}` === `${itemSection}${itemId}`
      );

      if (action && foundItem?.quantity) {
        foundItem.quantity = foundItem?.quantity + 1;
      } else if (foundItem?.quantity) {
        foundItem.quantity = foundItem?.quantity - 1;
      }
      if (foundItem) {
        if (foundItem?.quantity) {
          props.setCartItem((oldValue) => {
            const foundItemIndex = oldValue.indexOf(
              oldValue.find(
                (item) =>
                  `${item.section}${item.id}` === `${itemSection}${itemId}`
              ) as CartItem
            );
            const newValue = oldValue.splice(
              foundItemIndex,
              1,
              foundItem as CartItem
            );
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
        {props.cartItem.length ? "" : <div className={Styles.empty}></div>}
        {props.cartItem.map((currentItem) => (
          <Card
            {...currentItem}
            index={props.cartItem.indexOf(currentItem)}
            deleteOrder={deleteOrder}
            changeQuantity={changeQuantity}
            key={`${currentItem.section}${currentItem.id}`}
          />
        ))}
      </div>
      <GreenButton
        text="перейти к оплате"
        icon="cart"
        isDisabled={props.cartItem.length ? false : true}
      />
    </section>
  );
};

export default Cart;
