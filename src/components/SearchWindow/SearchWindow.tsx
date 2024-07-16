import React from "react";
import Styles from "./SearchWindow.module.css";

function SearchWindow() {
  return (
    <div className={Styles.search}>
      <button className={Styles["search-button"]}>
        <img
          className={Styles["search-img"]}
          src="/icons/icon_search_gray.svg"
          alt=""
        />
      </button>
      <input
        className={`bg_white ${Styles["search-input"]}`}
        type="text"
        placeholder="Поиск товара..."
      />
    </div>
  );
}

export default SearchWindow;
