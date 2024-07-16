import React from "react";
import Styles from "./Gallery.module.css";
import Card from "components/Gallery/components/Card/Card";
import SectionsData from "data/sections.json";
import { Link } from "react-router-dom";

const GalleryList: GalleryCard[] = [...(SectionsData as GalleryCard[])];

function Gallery() {
  return (
    <section className={Styles.gallery}>
      {GalleryList.map((item) => {
        return (
          <Link
            className={Styles["card-link"]}
            to={`catalog/${item.path}`}
            key={item.path}
          >
            <Card {...item} key={item.id} />;
          </Link>
        );
      })}
    </section>
  );
}

export default Gallery;
