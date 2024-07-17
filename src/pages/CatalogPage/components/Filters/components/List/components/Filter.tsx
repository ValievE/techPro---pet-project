import React, { useContext, useEffect, useState } from "react";
import Styles from "./Filter.module.css";
import { useOutsideClick } from "hooks/clickOutside";
import { useSearchParams } from "react-router-dom";
import { CatalogContext } from "contexts/CatalogContext";

type FilterData = {
  title: string;
  values: readonly string[];
  param: string;
};

const Filter = (props: FilterData) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catalogContextData = useContext(CatalogContext);
  const filterAllValues = props.values
    ? ["По-умолчанию", ...props.values]
    : ["По-умолчанию"];
  const [valuesState, setValuesState] = useState<boolean>(false);
  const clickOutsidee = useOutsideClick(() => setValuesState(false));
  const changeValuesClass = () => {
    if (valuesState) {
      return `${Styles.values} ${Styles.values_active} bg_light-khaki`;
    }
    return Styles.values;
  };

  const [selectedFilterValue, setSelectedFilterValue] = useState<string>(
    filterAllValues[0]
  );

  // const checkAvailable = (arg: string) => {
  //   if (arg === "По-умолчанию" || props.param === "brand") {
  //     return false;
  //   }

  //   const foundObject = catalogContextData?.visisbleCatalogList[0]?.find(
  //     (item) =>
  //       Object.keys(item).includes(props.param)
  //         ? item[props.param as keyof CatalogObject] === arg
  //         : Object.keys(item.info).includes(props.param)
  //           ? item.info[props.param as keyof CatalogObject["info"]] === arg
  //           : ""
  //   );
  //   if (foundObject) {
  //     return false;
  //   }
  //   return true;
  // };

  const callFilter = (value: string, filter: string) => {
    setSelectedFilterValue(value);
    if (value === "По-умолчанию") {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, value);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    for (const value of searchParams.entries()) {
      if (value[0] === props.param && value[1] !== filterAllValues[0]) {
        setSelectedFilterValue(value[1]);
      }
    }
  }, []);

  const changeColor = (arg: string): string => {
    if (selectedFilterValue === arg) {
      return `${Styles["list-component"]} ${Styles["list-component_active"]}`;
    }
    return `${Styles["list-component"]}`;
  };

  return (
    <div className={Styles.filter}>
      <h3 className={Styles.title}>{props.title}</h3>
      <div className={Styles.selector}>
        <button
          ref={clickOutsidee as React.RefObject<HTMLButtonElement>}
          className={Styles.value}
          onClick={() => setValuesState(!valuesState)}
        >
          <span className={`color_dark-gray ${Styles.name}`}>
            {selectedFilterValue}
          </span>
          <div
            className={Styles.icon}
            style={valuesState ? { rotate: "180deg" } : {}}
          ></div>
        </button>
        <div className={changeValuesClass()}>
          {filterAllValues.length
            ? filterAllValues.map((filterValue, filterIndex) => (
                <button
                  className={changeColor(filterValue)}
                  key={filterIndex}
                  onClick={() => callFilter(filterValue, props.param)}
                  // disabled={checkAvailable(filterValue)}
                >
                  {filterValue}
                </button>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Filter;
