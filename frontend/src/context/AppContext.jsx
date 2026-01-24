import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext(null);


const AppProvider = ({ children }) => {
  /* ------------------ UI ------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------ USER (FUTURE LOGIN) ------------------ */
  // Logged-in user (later)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  /* ------------------ GUEST (CURRENT FLOW) ------------------ */
  // Used when user is NOT logged in
  const [guest, setGuest] = useState(() => {
    const saved = localStorage.getItem("guest");
    return saved
      ? JSON.parse(saved)
      : { name: "", phone: "", address: "" };
  });

  const updateGuest = (data) => {
    setGuest((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    localStorage.setItem("guest", JSON.stringify(guest));
  }, [guest]);

  /* ------------------ CART ------------------ */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

 const addToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find((i) => i.id === product.id);

    if (exists) {
      toast.success("Quantity updated in cart 🛒");
      return prev.map((i) =>
        i.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    toast.success("Item added to cart 🛒");
    return [...prev, { ...product, quantity: 1 }];
  });
};


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
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
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ------------------ PRODUCTS (STATIC FOR NOW) ------------------ */
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


   /* ------------------ BUY NOW ------------------ */
  const buyNow = (product, navigate) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success("Proceeding to checkout 💳");
    navigate("/cart");
  };

  /* ------------------ CONTEXT ------------------ */
  return (
    <AppContext.Provider
      value={{
        /* UI */
        isMenuOpen,
        setIsMenuOpen,

        /* User (future) */
        user,
        setUser,

        /* Guest (current) */
        guest,
        updateGuest,

        /* Cart */
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,

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
