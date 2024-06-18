import React, { createContext, useReducer, useContext } from "react";

const ProductsContext = createContext();

const addProducts = (state, action) => {
  switch (action.type) {
    case "AddPizza":
      return [...state, action.payload];
    case "RemovePizza":
      const index = state.findIndex((product) => product.id === action.payload);
      if (index >= 0) {
        const updatedState = [...state];
        updatedState.splice(index, 1);
        return updatedState;
      }
      return state;
    case "CleanCart":
      return [];
    default:
      return state;
  }
};

export const ProductsProvider = ({ children }) => {
  const [Cart, dispatch] = useReducer(addProducts, []);

  const calculateTotal = () => {
    return Cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <ProductsContext.Provider value={{ Cart, dispatch, calculateTotal }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useCart = () => useContext(ProductsContext);
