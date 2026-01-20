import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Panchalohalu from "./Pages/Panchalohalu";
import Onegramgold from "./Pages/Onegramgold";
import Account from "./Pages/Account/Account";
import Favorites from "./Pages/Favorites";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/panchalohalu" element={<Panchalohalu />} />
      <Route path="/category/one-gram-gold" element={<Onegramgold />} />
      <Route path="/account" element={<Account />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
