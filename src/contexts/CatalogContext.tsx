import React, { createContext, PropsWithChildren, useState } from "react";

type CatalogContextType = {
  bufferedCatalogList: [
    CatalogObject[],
    React.Dispatch<React.SetStateAction<CatalogObject[]>>,
  ];
  visisbleCatalogList: [
    CatalogObject[],
    React.Dispatch<React.SetStateAction<CatalogObject[]>>,
  ];
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined
);

const CatalogContextProvider = ({ children }: PropsWithChildren) => {
  const value = {
    bufferedCatalogList: useState<CatalogObject[]>([]),
    visisbleCatalogList: useState<CatalogObject[]>([]),
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};

export default CatalogContextProvider;
