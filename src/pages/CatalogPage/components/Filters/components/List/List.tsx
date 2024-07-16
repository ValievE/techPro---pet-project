import React from "react";
import Styles from "./List.module.css";
import Filter from "./components/Filter";

const List = () => {
  return (
    <div className={Styles.list}>
      <Filter key={1} />
      <Filter key={2} />
      <Filter key={3} />
      <Filter key={4} />
    </div>
  );
};

export default List;
