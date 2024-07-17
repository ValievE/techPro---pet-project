import React, { createContext, PropsWithChildren, useState } from "react";

type CatalogContextType = {
  bufferedCatalogList: [
    CatalogObject[] | undefined,
    React.Dispatch<React.SetStateAction<CatalogObject[] | undefined>>,
  ];
  visisbleCatalogList: [
    CatalogObject[] | undefined,
    React.Dispatch<React.SetStateAction<CatalogObject[] | undefined>>,
  ];
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined
);

const CatalogContextProvider = ({ children }: PropsWithChildren) => {
  const value = {
    bufferedCatalogList: useState<CatalogObject[] | undefined>(undefined),
    visisbleCatalogList: useState<CatalogObject[] | undefined>(undefined),
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};

export default CatalogContextProvider;
