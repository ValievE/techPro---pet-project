import React from "react";
import Styles from "./Card.module.css";

function Card(props: GalleryCard) {
  const { title, url } = props;
  return (
    <article
      className={Styles.card}
      style={{
        backgroundImage: `url('${url}')`,
      }}
    >
      <h2 className={`bg_gray color_dark-gray ${Styles.title}`}>{title}</h2>
    </article>
  );
}

export default Card;
