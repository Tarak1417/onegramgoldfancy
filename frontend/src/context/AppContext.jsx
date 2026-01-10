import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

 
             const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setCartCount((prev) => prev + 1);
  };

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const [products] = useState({
    panchalohalu: [
      {
        id: 1,
        name: "Panchalohalu Lakshmi Idol",
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1623072412800-2d84ec529b57",
      },
      {
        id: 2,
        name: "Panchalohalu Ganesh Idol",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
      },
      {
        id: 3,
        name: "Panchalohalu Pendant",
        price: 999,
        image:
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca7",
      },
    ],
  });

  const [miniProducts, setMiniProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);

    setTimeout(() => {
      setMiniProducts([
        {
          id: 1,
          name: "Gold Ring",
          image:
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
          category: "one-gram-gold",
        },
        {
          id: 2,
          name: "Gold Chain",
          image:
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca7",
          category: "one-gram-gold",
        },
        {
          id: 5,
          name: "Panchalohalu",
          image:
            "https://images.unsplash.com/photo-1623072412800-2d84ec529b57",
          category: "panchalohalu",
        },
      ]);

      setLoadingProducts(false);
    }, 800);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,

        user,
        setUser,

        cart,
        cartCount,
        addToCart,

        wishlist,
        toggleWishlist,

        products,
        miniProducts,
        loadingProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
