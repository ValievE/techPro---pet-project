import React, { useContext } from "react";
import Styles from "./List.module.css";
import Filter from "./components/Filter";
import FiltersData from "data/filters.json";
import { ItemContext } from "contexts/ItemContext";
import { CatalogContext } from "contexts/CatalogContext";

const List = () => {
  const catalogContextData = useContext(CatalogContext);
  const itemContextData = useContext(ItemContext);
  const actualFilters = FiltersData.filter((filter) =>
    filter.sections.includes(itemContextData?.[0] as string)
  );

  const sortByPriceData = {
    title: "Сортировка",
    values: ["По возрастанию цены", "По убыванию цены"],
    param: "price",
  };

  const setFilterData = (
    title: string,
    mainParam?: string,
    descParam?: string
  ) => {
    const filterValues: string[] = mainParam
      ? (catalogContextData?.bufferedCatalogList[0]
          ?.flatMap((item) => item[mainParam as keyof CatalogObject])
          .filter(
            (value, index, thisArray) => thisArray.indexOf(value) === index
          ) as string[])
      : descParam
        ? (catalogContextData?.bufferedCatalogList[0]
            ?.flatMap(
              (item) => item.info[descParam as keyof CatalogObject["info"]]
            )
            .filter(
              (value, index, thisArray) => thisArray.indexOf(value) === index
            ) as string[])
        : ["none"];
    const filterData = {
      title: title,
      values: filterValues,
      param: mainParam ? (mainParam as string) : (descParam as string),
    };
    return filterData;
  };

  return (
    <div className={Styles.list}>
      <Filter {...sortByPriceData} key={"sortByPrice"} />
      {actualFilters.sort().map((item) => (
        <Filter
          {...setFilterData(
            item.title,
            item.main_parameter,
            item.desc_parameter
          )}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default List;
