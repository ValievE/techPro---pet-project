import React, { createContext, PropsWithChildren, useState } from "react";

type ItemContextType = [
  Sections | undefined,
  React.Dispatch<React.SetStateAction<Sections | undefined>>,
];

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);

const ItemContextProvider = ({ children }: PropsWithChildren) => {
  const value = useState<Sections | undefined>();

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemContextProvider;
