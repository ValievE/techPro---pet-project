import React, { createContext, PropsWithChildren, useState } from "react";

export const CartContext = createContext<ModalProps | undefined>(undefined);

const CartContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <CartContext.Provider value={useState<boolean>(false)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
