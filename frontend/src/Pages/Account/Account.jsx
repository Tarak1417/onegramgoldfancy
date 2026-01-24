import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-md mx-auto bg-black/60 border border-yellow-500/30 rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          My Account
        </h1>

        {user ? (
          <>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400">{user.phone}</p>
            </div>

            <button
              onClick={() => navigate("/favorites")}
              className="w-full py-3 border border-yellow-500/30 rounded-xl text-yellow-400"
            >
              My Favorites
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="w-full py-3 border border-yellow-500/30 rounded-xl text-yellow-400"
            >
              Order History
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 rounded-xl font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-yellow-500 rounded-xl font-semibold"
          >
            Login / Register
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
