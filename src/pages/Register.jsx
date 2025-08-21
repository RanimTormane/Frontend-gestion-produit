import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    confirmPassword: "",
    adresse: "",
    statut: "",
    accept: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Nom requis";
    if (!form.prenom.trim()) newErrors.prenom = "Prénom requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      newErrors.email = "Email invalide";
    if (form.mdp.length < 8) newErrors.mdp = "Mot de passe ≥ 8 caractères";
    if (form.mdp !== form.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    if (!form.adresse.trim()) newErrors.adresse = "Adresse requise";
    if (!form.statut.trim()) newErrors.statut = "Statut requis";
    if (!form.accept) newErrors.accept = "Veuillez accepter les conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          mdp: form.mdp,
          adresse: form.adresse,
          statut: form.statut,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Erreur lors de l'inscription");
      setServerMsg({
        type: "success",
        text: "Compte créé avec succès. Vous pouvez vous connecter.",
      });
      setForm({
        nom: "",
        prenom: "",
        email: "",
        mdp: "",
        confirmPassword: "",
        adresse: "",
        statut: "",
        accept: false,
      });
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setServerMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left visual / Promo area */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-400 p-8">
          <div className="text-white max-w-sm">
            <h2 className="text-3xl font-bold mb-3">Bienvenue 👋</h2>
            <p className="mb-6 opacity-90">
              Créez votre compte pour gérer vos produits, suivre vos
              fournisseurs et accéder à votre tableau de bord en toute
              simplicité.
            </p>
          </div>
        </div>

        {/* Right panel (form) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Créer un compte</h2>
          </div>

          {serverMsg && (
            <div
              className={`mb-4 border rounded-xl p-3 text-sm ${
                serverMsg.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {serverMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Ex: Tormane"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.nom ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.nom && (
                <p className="mt-1 text-xs text-red-600">{errors.nom}</p>
              )}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Ex: Ranim"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.prenom ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.prenom && (
                <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vous@exemple.com"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div
                className={`mt-1 w-full rounded-xl border flex items-center pr-2 ${
                  errors.mdp ? "border-red-400" : "border-gray-200"
                }`}
              >
                <input
                  type={showPwd ? "text" : "password"}
                  name="mdp"
                  value={form.mdp}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent px-4 py-2.5 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-xs px-2 py-1 rounded-lg hover:bg-gray-100"
                >
                  {showPwd ? "Masquer" : "Afficher"}
                </button>
              </div>
              {errors.mdp && (
                <p className="mt-1 text-xs text-red-600">{errors.mdp}</p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                type={showPwd ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={form.adresse}
                onChange={handleChange}
                placeholder="Votre adresse complète"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.adresse ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.adresse && (
                <p className="mt-1 text-xs text-red-600">{errors.adresse}</p>
              )}
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <input
                type="text"
                name="statut"
                value={form.statut}
                onChange={handleChange}
                placeholder="Ex: actif"
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-black/10 ${
                  errors.statut ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.statut && (
                <p className="mt-1 text-xs text-red-600">{errors.statut}</p>
              )}
            </div>

            {/* Acceptation */}
            <div className="flex items-start gap-3">
              <input
                id="accept"
                type="checkbox"
                name="accept"
                checked={form.accept}
                onChange={handleChange}
                className={`mt-1 h-5 w-5 rounded border ${
                  errors.accept ? "border-red-400" : "border-gray-300"
                }`}
              />
              <label htmlFor="accept" className="text-sm text-gray-600">
                J'accepte les{" "}
                <a className="underline hover:no-underline" href="#">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a className="underline hover:no-underline" href="#">
                  politique de confidentialité
                </a>
                .
              </label>
            </div>
            {errors.accept && (
              <p className="-mt-2 text-xs text-red-600">{errors.accept}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-2xl py-3 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-600 text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Création du compte…" : "S'inscrire"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Déjà un compte ?{" "}
            <a
              href="/login"
              className="font-semibold underline hover:no-underline"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
