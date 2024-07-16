import React from "react";
import Styles from "./ModalWindow.module.css";
import ButtonCross from "components/UI/ButtonCross/ButtonCross";

type Props = {
  state: ModalProps;
  children: React.ReactNode;
};

const ModalWindow = (props: Props) => {
  const { state } = props;
  return (
    <div
      onClick={() => {
        state[1](false);
      }}
      className={Styles.body}
    >
      <div className={Styles.window} onClick={(e) => e.stopPropagation()}>
        <ButtonCross state={state} />
        {props.children}
      </div>
    </div>
  );
};

export default ModalWindow;
