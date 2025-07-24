import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Agrega esto
import LoginCard from "../../components/Forms/LoginCard";
import { API_BASE_URL } from "../../api/config"; // Usa la misma config que Register

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | undefined>();
  const navigate = useNavigate(); // <-- Agrega esto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMsg(undefined);
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirige según el rol
      if (data.user.rol === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/"); // <-- Home
      }
    } else {
      setMsg(data.message || "Error al iniciar sesión");
    }
  } catch (err) {
    setMsg("Error de red o servidor");
  }
  setLoading(false);
};

  return (
    <LoginCard
      form={form}
      loading={loading}
      msg={msg}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;