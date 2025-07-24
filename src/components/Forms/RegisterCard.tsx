import React from "react";

interface RegisterCardProps {
  form: { username: string; email: string; password: string };
  loading: boolean;
  msg?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  form,
  loading,
  msg,
  handleChange,
  handleSubmit,
}) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
      <div className="flex flex-col items-center">
        
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crear mi cuenta en Essentia
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="name"
            required
            value={form.username}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-500 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-500 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            
          </div>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password" 
            required
            value={form.password}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-500 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full flex justify-center rounded-md bg-gray-950 px-3 py-2 text-white font-semibold hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {msg && (
          <div className="mt-4 text-center text-sm text-gray-700">{msg}</div>
        )}
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <a
          href="/login"
          className="font-semibold text-amber-800 hover:text-amber-500"
        >
          Iniciar sesión
        </a>
      </p>
    </div>
  </div>
);

export default RegisterCard;