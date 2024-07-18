import React from "react";
import Styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Styles.loader}>
      <div className={Styles["big-fragment"]}></div>
      <div className={Styles["small-fragment"]}></div>
    </div>
  );
};

export default Loader;
