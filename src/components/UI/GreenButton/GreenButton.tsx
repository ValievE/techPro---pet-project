import React from "react";
import Styles from "./GreenButton.module.css";

type GreenButtonProps = {
  size?: "s" | "m" | "l";
  text: string;
  icon: "cart";
  iconPosition?: "left" | "right";
  isDisabled?: boolean;
};

const GreenButton = (props: GreenButtonProps) => {
  const icons = {
    cart: "/icons/icon_cart.svg",
  };
  const setIcon = (arg: GreenButtonProps["icon"]): string => {
    return `url('${icons[arg]}')`;
  };

  return (
    <button className={`bg_green ${Styles.button}`} disabled={props.isDisabled}>
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
