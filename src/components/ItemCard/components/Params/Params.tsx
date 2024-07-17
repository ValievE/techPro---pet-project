import React, { useContext } from "react";
import { CardContext } from "contexts/CardContext";
import cardParams from "data/cardParams.json";
import Styles from "./Params.module.css";

const Params = () => {
  const newCardContext = useContext(CardContext);

  function setValue(value: string | number | boolean, key: string) {
    if (typeof value === "boolean") {
      return value ? "Присутствует" : "Отсутствует";
    }
    if (typeof value === "number") {
      if (key === "weight") {
        return `${value} кг`;
      }
      if (key === "guarantee") {
        return `${value} мес`;
      }
      return `${value} мм`;
    }
    return value;
  }

  const setParam = (param: CardParam) => {
    if (newCardContext?.cardInfo) {
      const objectKeys = Object.keys(
        newCardContext.cardInfo[0] as CatalogObject
      );

      const sizeKeys = Object.keys(newCardContext.cardInfo[0]?.size as object);

      const infoKeys = Object.keys(
        newCardContext.cardInfo[0]?.info as DescriptionInfo
      );

      const allKeys = [...objectKeys, ...sizeKeys, ...infoKeys];

      const objectValues = Object.entries(
        newCardContext.cardInfo[0] as CatalogObject
      );

      const nestedValues = objectValues
        .filter((item) => {
          if (!Array.isArray(item[1]) && typeof item[1] === "object") {
            return item[1];
          }
        })
        .map((item) => Object.entries(item[1]))
        .flat();

      const allValues = [...objectValues, ...nestedValues].filter(
        (item) => typeof item[1] !== "object"
      );

      const actualValue = allValues.find((item) => item[0] === param.key);

      if (allKeys.includes(param.key) && actualValue?.[1]) {
        return (
          <div className={Styles.param} key={param.key}>
            <span className={Styles.name}>{param.param}</span>
            <div className={Styles.dots}></div>
            <span className={Styles.value}>
              {setValue(actualValue?.[1], param.key)}
            </span>
          </div>
        );
      }
    }
    return "";
  };

  return (
    <div className={Styles.body}>
      {(cardParams as CardParams[]).map((paramSection) =>
        paramSection.params.filter((param) => setParam(param)).length ? (
          <div className={Styles.section} key={paramSection.id}>
            <span className={Styles.section__title}>{paramSection.title}</span>
            {paramSection.params.map((param) => setParam(param))}
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Params;
