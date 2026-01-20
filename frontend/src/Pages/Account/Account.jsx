import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">

      {/* Top Bar */}
      <div className="max-w-md mx-auto mb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  text-yellow-400 hover:text-yellow-500 transition"
        >
          {/* Back Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Account Card */}
      <div className="max-w-md mx-auto bg-black/60 border border-yellow-500/20 rounded-2xl p-6 space-y-6">

        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          My Account
        </h1>

        {/* User Info */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold">Guest User</p>
          <p className="text-sm text-gray-400">Not logged in</p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
            Login / Register
          </button>

          <button
  onClick={() => navigate("/favorites")}
  className="w-full py-3 rounded-xl bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition"
>
  My Favorites
</button>


          <button className="w-full py-3 rounded-xl bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition">
            Order History
          </button>
        </div>

      </div>
    </div>
  );
};

export default Account;
