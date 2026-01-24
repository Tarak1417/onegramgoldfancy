import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/admin/login",
      { email, password }
    );

    // ✅ STORE TOKEN CORRECTLY
    localStorage.setItem("token", res.data.token);

    navigate("/admin/dashboard");
  };

  return null;
};

export default AdminLogin;
