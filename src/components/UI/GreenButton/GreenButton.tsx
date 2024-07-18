import React from "react";
import Styles from "./GreenButton.module.css";

type GreenButtonProps = {
  size?: "s" | "m" | "l";
  text: string;
  icon?: "cart" | "success";
  iconPosition?: "left" | "right";
  isDisabled?: boolean;
  function: CallableFunction;
};

const GreenButton = (props: GreenButtonProps) => {
  const icons = {
    cart: "/icons/icon_cart.svg",
    success: "/icons/icon_success.svg",
  };
  const setIcon = (arg: GreenButtonProps["icon"]): string => {
    if (arg) {
      return `url('${icons[arg]}')`;
    }
    return "";
  };

  return (
    <button
      className={`bg_green ${Styles.button}`}
      disabled={props.isDisabled}
      onClick={() => props.function()}
    >
      {props.icon ? (
        <div
          className={Styles.image}
          style={{ backgroundImage: setIcon(props.icon) }}
        ></div>
      ) : (
        ""
      )}
      <span className={`color_dark-gray ${Styles.text}`}>{props.text}</span>
    </button>
  );
};

export default GreenButton;
