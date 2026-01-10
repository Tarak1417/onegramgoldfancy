import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Panchalohalu from "./Pages/Panchalohalu";
import Onegramgold from "./Pages/Onegramgold";
import Account from "./Pages/Account/Account";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/panchalohalu" element={<Panchalohalu />} />
      <Route path="/category/one-gram-gold" element={<Onegramgold />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
};

export default App;
