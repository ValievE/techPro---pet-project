import React, { createContext, PropsWithChildren, useState } from "react";

type CardContextType = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  cardInfo: [
    CatalogObject | null,
    React.Dispatch<React.SetStateAction<CatalogObject | null>>,
  ];
};

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);

const CardContextProvider = ({ children }: PropsWithChildren) => {
  const value = {
    modalState: useState<boolean>(false),
    cardInfo: useState<CatalogObject | null>(null),
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardContextProvider;
