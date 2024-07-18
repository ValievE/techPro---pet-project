import React, { useContext, useEffect } from "react";
import Styles from "./CatalogPage.module.css";
import List from "./components/List/List";
import Sections from "data/sections.json";
import Filters from "./components/Filters/Filters";
import ModalWindow from "components/ModalWindow/ModalWindow";
import ItemCard from "components/ItemCard/ItemCard";
import { Link, useParams } from "react-router-dom";
import { CardContext } from "contexts/CardContext";
import { ItemContext } from "contexts/ItemContext";
import CatalogContextProvider from "contexts/CatalogContext";

function CatalogPage() {
  const cardContextData = useContext(CardContext);
  const itemContextData = useContext(ItemContext);
  const pathParams = useParams();
  const actualPath = Sections.find(
    (item) => item.path === (pathParams.slug as string)
  );

  useEffect(() => {
    itemContextData?.[1](actualPath?.path as Sections);
  }, []);

  return (
    <div className={Styles["catalog-page"]}>
      <Link
        className={`${Styles["go-back-button"]} bg_light-khaki color_dark-gray`}
        to={"/"}
      >
        на главную
      </Link>
      <CatalogContextProvider>
        {cardContextData?.modalState[0] ? (
          <ModalWindow
            state={[
              cardContextData.modalState[0],
              cardContextData.modalState[1],
            ]}
          >
            <ItemCard />
          </ModalWindow>
        ) : (
          ""
        )}
        <h1 className={Styles.title}>{actualPath?.title}</h1>
        <section className={`bg_light-gray ${Styles.catalog}`}>
          <Filters />
          <List props={actualPath?.path as string} />
        </section>
      </CatalogContextProvider>
    </div>
  );
}

export default CatalogPage;
