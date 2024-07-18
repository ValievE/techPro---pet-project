import React from "react";
import Styles from "./WarningPopup.module.css";

type Props = {
  children: React.ReactNode;
  type: "warning" | "error";
};

const WarningPopup = (props: Props) => {
  const setIcon = () => {
    if (props.type === "warning") {
      return `${Styles.icon} ${Styles["warning-icon"]}`;
    }
    return `${Styles.icon} ${Styles["error-icon"]}`;
  };
  return (
    <div className={Styles.popup}>
      <div className={setIcon()}></div>
      {props.children}
    </div>
  );
};

export default WarningPopup;
