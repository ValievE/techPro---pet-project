import React, { useEffect, useState } from "react";
import Styles from "./List.module.css";
import Card from "./components/Card/Card";
type Props = {
  props: string;
};

const List = (props: Props) => {
  const [listData, setListData] = useState<CatalogObject[]>();
  const section = props.props;
  useEffect(() => {
    async function getData() {
      const Data = (await import(`data/${section}.json`))
        .default as CatalogObject[];
      setListData(Data);
    }
    getData();
  }, []);

  return (
    <div className={`${Styles.list} custom-scroll`}>
      {listData?.length
        ? listData.map((item) => (
            <Card object={item} section={props.props} key={item.id} />
          ))
        : ""}
    </div>
  );
};

export default List;
