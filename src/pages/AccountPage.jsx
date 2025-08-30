import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- importer useNavigate

export default function AccountPage() {
  const [user, setUser] = useState({ nom: "", email: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // <-- initialiser navigate

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ nom: res.data.nom, email: res.data.email });
      } catch (err) {
        console.error(err);
        setMessage({
          type: "error",
          text: "Erreur lors du chargement du profil",
        });
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = { ...user };
      if (password) payload.mdp = password;

      const res = await axios.put(
        "http://localhost:5000/api/users/update/me",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
      setPassword("");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Erreur serveur",
      });
    } finally {
      setLoading(false);
    }
  };

  // fonction pour revenir à la page utilisateur
  const handleBack = async () => {
    try {
      // Récupérer l'utilisateur depuis le backend
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const currentUser = res.data;

      if (currentUser.role === "admin") {
        navigate("/admin");
      } else if (currentUser.role === "client") {
        navigate("/");
      } else if (currentUser.role === "fournisseur") {
        navigate("/fournisseur");
      } else {
        navigate("/"); // fallback route
      }
    } catch (err) {
      console.error(err);
      // en cas d'erreur, retour à la page d'accueil
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
          Mon compte
        </h1>

        {message && (
          <div
            className={`mb-6 p-3 rounded-lg text-center font-medium ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="flex items-center gap-3 border rounded-xl p-3 hover:shadow-md transition">
            <User className="text-indigo-500" />
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border rounded-xl p-3 hover:shadow-md transition">
            <Mail className="text-indigo-500" />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Mot de passe */}
          <div className="flex items-center gap-3 border rounded-xl p-3 hover:shadow-md transition">
            <Lock className="text-indigo-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              className="w-full outline-none text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg"
          >
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </button>

          {/* Bouton retour */}
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </form>
      </div>
    </div>
  );
}
