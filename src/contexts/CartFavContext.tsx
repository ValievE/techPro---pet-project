import React, { createContext, PropsWithChildren, useState } from "react";

export type CartFavContextType = {
  cartList: [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>];
  favList: [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>];
};

export const CartFavContext = createContext<CartFavContextType | undefined>(
  undefined
);

const CartFavContextProvider = ({ children }: PropsWithChildren) => {
  const value = {
    cartList: useState<CartItem[]>([]),
    favList: useState<CartItem[]>([]),
  };

  return (
    <CartFavContext.Provider value={value}>{children}</CartFavContext.Provider>
  );
};

export default CartFavContextProvider;
