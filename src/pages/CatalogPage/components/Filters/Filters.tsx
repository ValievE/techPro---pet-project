import React, { useState } from "react";
import Styles from "./Filters.module.css";
import List from "./components/List/List";
import ButtonCross from "components/UI/ButtonCross/ButtonCross";
import GreenButton from "components/UI/GreenButton/GreenButton";

const Filters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const setClass = (): string => {
    const newValue = isFiltersOpen
      ? `${Styles.filters} ${Styles.filters_opened} bg_white`
      : `${Styles.filters} bg_white`;
    return newValue;
  };

  return (
    <>
      <button className={Styles.burger} onClick={() => setIsFiltersOpen(true)}>
        Фильтры
      </button>
      <div className={setClass()}>
        <h2 className={Styles.title}>Фильтры</h2>
        <List />
        <div className={Styles.filters__buttons}>
          <ButtonCross
            state={[isFiltersOpen, setIsFiltersOpen]}
            key={"exitFilters"}
          />
          <GreenButton
            text="Применить"
            function={() => setIsFiltersOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
