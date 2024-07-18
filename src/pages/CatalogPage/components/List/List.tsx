import React, { useContext, useEffect } from "react";
import Styles from "./List.module.css";
import Card from "./components/Card/Card";
import { CatalogContext } from "contexts/CatalogContext";
import { useSearchParams } from "react-router-dom";
import Loader from "components/UI/Loader/Loader";

type Props = {
  props: string;
};

const List = (props: Props) => {
  const catalogContextData = useContext(CatalogContext);
  const section = props.props;

  useEffect(() => {
    async function getData() {
      const Data = (await import(`data/${section}.json`))
        .default as CatalogObject[];
      catalogContextData?.bufferedCatalogList[1](Data);
      catalogContextData?.visisbleCatalogList[1](Data);
    }
    getData();
  }, []);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let newArray: CatalogObject[] = [];
    if (catalogContextData && catalogContextData.bufferedCatalogList[0]) {
      newArray = catalogContextData!.bufferedCatalogList[0]!.map(
        (item) => item
      );
    }
    for (const value of searchParams.entries()) {
      const filterName = value[0].toLowerCase();
      const filterValue = value[1].toLowerCase();
      if (catalogContextData && catalogContextData?.visisbleCatalogList[0]) {
        if (filterName === "price") {
          newArray = newArray.sort((firstValue, secondValue) => {
            if (filterValue === "по возрастанию цены") {
              return firstValue.price - secondValue.price;
            }
            if (filterValue === "по убыванию цены") {
              return secondValue.price - firstValue.price;
            }
            return firstValue.id - secondValue.id;
          });
        }
        newArray = newArray.filter((item) =>
          Object.keys(item).includes(filterName as keyof CatalogObject) &&
          filterName !== "price"
            ? (
                item[filterName as keyof CatalogObject] as string
              ).toLowerCase() === filterValue
            : Object.keys(item.info).includes(
                  filterName as keyof CatalogObject["info"]
                )
              ? (
                  item.info[filterName as keyof CatalogObject["info"]] as string
                ).toLowerCase() === filterValue
              : item
        );
      }
    }
    catalogContextData?.visisbleCatalogList[1](newArray.map((item) => item));
  }, [catalogContextData!.bufferedCatalogList[0], searchParams]);

  return (
    <div className={`${Styles.list} custom-scroll`}>
      {catalogContextData?.visisbleCatalogList[0]?.length ? (
        catalogContextData.visisbleCatalogList[0].map((item) => (
          <Card object={item} section={props.props} key={item.id} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default List;
