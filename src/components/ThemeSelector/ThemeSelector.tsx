import React, { useState } from "react";
import Styles from "./ThemeSelector.module.css";

type ThemeSelectorText = "светлая тема" | "тёмная тема";

function ThemeSelector() {
  const [state, changeState] = useState("светлая тема" as ThemeSelectorText);
  function updateState(): ThemeSelectorText {
    changeState(state === "светлая тема" ? "тёмная тема" : "светлая тема");
    return state;
  }
  return (
    <div
      className={
        state === "светлая тема"
          ? Styles.selector
          : `color_white ${Styles.selector}`
      }
      onClick={updateState}
    >
      <div
        className={
          state === "светлая тема"
            ? `bg_dark-gray ${Styles.slider}`
            : `bg_graphite-gray ${Styles.slider}`
        }
      >
        <div
          className={
            state === "светлая тема"
              ? `bg_white ${Styles.slider__item_light} ${Styles.slider__item}`
              : `bg_white ${Styles.slider__item_dark} ${Styles.slider__item}`
          }
        ></div>
      </div>
      <span className={Styles.selector__text}>{state}</span>
    </div>
  );
}

export default ThemeSelector;
