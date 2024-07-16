import React from "react";
import Styles from "./ButtonCross.module.css";

type Props = {
  state: ModalProps;
};

const ButtonCross = (props: Props) => {
  return (
    <button
      className={`bg_green ${Styles.button}`}
      onClick={() => props.state[1](false)}
    ></button>
  );
};

export default ButtonCross;
