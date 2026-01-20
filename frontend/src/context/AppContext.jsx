import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  /* ------------------ UI STATE ------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------ USER ------------------ */
  const [user, setUser] = useState(null);

  /* ------------------ CART ------------------ */
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ------------------ WISHLIST ------------------ */
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ------------------ PRODUCTS ------------------ */
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

  /* ------------------ MINI PRODUCTS ------------------ */
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

  /* ------------------ CONTEXT VALUE ------------------ */
  return (
    <AppContext.Provider
      value={{
        /* UI */
        isMenuOpen,
        setIsMenuOpen,

        /* User */
        user,
        setUser,

        /* Cart */
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,

        /* Wishlist */
        wishlist,
        toggleWishlist,

        /* Products */
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
