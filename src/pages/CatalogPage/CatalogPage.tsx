import React from "react";
import Styles from "./CatalogPage.module.css";
import List from "./components/List/List";
import Sections from "data/sections.json";
import Filters from "./components/Filters/Filters";
import { useParams } from "react-router-dom";

function CatalogPage() {
  const pathParams = useParams();
  const actualPath = Sections.find(
    (item) => item.path === (pathParams.slug as string)
  );
  return (
    <div className={Styles["catalog-page"]}>
      <h1 className={Styles.title}>{actualPath?.title}</h1>
      <section className={`bg_light-gray ${Styles.catalog}`}>
        <Filters />
        <List props={actualPath?.path as string} />
      </section>
    </div>
  );
}

export default CatalogPage;
