import React from "react";
import Styles from "./MainPage.module.css";
import Gallery from "../../components/Gallery/Gallery";

function MainPage() {
  return (
    <div className={Styles["main-page"]}>
      <h1 className={Styles.title}>Категории товаров</h1>
      <Gallery />
    </div>
  );
}

export default MainPage;
