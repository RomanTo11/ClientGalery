import React, { useState } from "react";
import RegisterCard from "../../components/Forms/RegisterCard";
import { API_BASE_URL } from "../../api/config"; // <--- IMPORTA AQUÍ

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg(undefined);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("¡Registro exitoso! Ahora puedes iniciar sesión.");
        // Aquí puedes redirigir, limpiar el formulario, etc.
      } else {
        setMsg(data.message || "Error al registrarse");
      }
    } catch (err) {
      setMsg("Error de red o servidor");
    }
    setLoading(false);
  };

  return (
    <RegisterCard
      form={form}
      loading={loading}
      msg={msg}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;