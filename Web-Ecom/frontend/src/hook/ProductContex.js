import React, { createContext, useState } from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ProductContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </ProductContext.Provider>
  );
};
