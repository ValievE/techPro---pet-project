import React, { useState } from "react";
import Styles from "./Filter.module.css";
import { useOutsideClick } from "hooks/clickOutside";

const Filter = () => {
  const [valuesState, setValuesState] = useState<boolean>(false);
  const clickOutsidee = useOutsideClick(() => setValuesState(false));
  const changeValuesClass = () => {
    if (valuesState) {
      return `${Styles.values} ${Styles.values_active} bg_light-khaki`;
    }
    return Styles.values;
  };

  return (
    <div className={Styles.filter}>
      <h3 className={Styles.title}>Сортировка</h3>
      <div className={Styles.selector}>
        <button
          ref={clickOutsidee as React.RefObject<HTMLButtonElement>}
          className={Styles.value}
          onClick={() => setValuesState(!valuesState)}
        >
          <span className={`color_dark-gray ${Styles.name}`}>По-умолчанию</span>{" "}
          <div
            className={Styles.icon}
            style={valuesState ? { rotate: "180deg" } : {}}
          ></div>
        </button>
        <div className={changeValuesClass()}>
          <button className={Styles["list-component"]}>По-умолчанию</button>
          <button className={Styles["list-component"]}>По-умолчанию</button>
          <button className={Styles["list-component"]}>По-умолчанию</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
