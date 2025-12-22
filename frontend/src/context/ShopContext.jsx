import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <ShopContext.Provider
      value={{
        search,
        setSearch,
        showSearch,
        setShowSearch,
        totalQuantity,
        setTotalQuantity,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;














