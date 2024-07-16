import React from "react";
import Styles from "./Filters.module.css";
import List from "./components/List/List";

const Filters = () => {
  return (
    <div className={`bg_white ${Styles.filters}`}>
      <h2 className={Styles.title}>Фильтры</h2>
      <List />
    </div>
  );
};

export default Filters;
