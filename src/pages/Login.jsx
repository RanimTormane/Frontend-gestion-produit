import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const validate = () => {
    const e = {};
    if (!email) e.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Email invalide";
    if (!password) e.password = "Mot de passe requis";
    else if (password.length < 6)
      e.password = "Le mot de passe doit contenir au moins 6 caractères";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        mdp: password, // must match backend field name
      });

      const { token, user } = res.data;

      setMessage({ type: "success", text: "Connexion réussie !" });

      // Store token if needed
      // Après
      localStorage.setItem("token", token);
      localStorage.setItem("clientId", user._id); // 🔹 essentiel pour Card.jsx
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.nom);

      // Role-based navigation
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "client") {
        navigate("/");
      } else if (user.role === "fournisseur") {
        navigate("/fournisseur");
      } else {
        navigate("/"); // fallback route
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Erreur serveur",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left visual - shows as banner on mobile */}
          <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-400 p-6 sm:p-8">
            <div className="text-white max-w-sm text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Bienvenue sur l'Application de Gestion
              </h2>
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">
                Connecte-toi pour accéder à la gestion et au suivi de vos
                fournisseurs et produits.
              </p>
            </div>
          </div>

          {/* Right: form area */}
          <div className="p-6 sm:p-10">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shadow-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 3L2 9l10 6 10-6-10-6z" fill="#6366F1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Se connecter</h3>
                  <p className="text-sm text-gray-500">
                    Entrez vos identifiants pour continuer
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Pas de compte ?{" "}
                <a href="/register" className="text-indigo-600">
                  S'inscrire
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="exemple@domaine.tn"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.password ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Votre mot de passe"
                />
                {errors.password && (
                  <p id="password-error" className="mt-2 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-6 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#" className="text-indigo-600">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-2xl py-3 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-600 text-white hover:opacity-95 disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  "Se connecter"
                )}
              </button>

              <p className="mt-6 text-xs text-gray-400 text-center sm:text-left">
                En continuant, vous acceptez nos{" "}
                <a href="#" className="underline">
                  conditions
                </a>{" "}
                et notre{" "}
                <a href="#" className="underline">
                  politique de confidentialité
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
      {message && (
        <div
          className={
            message.type === "error" ? "text-red-500" : "text-green-500"
          }
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
