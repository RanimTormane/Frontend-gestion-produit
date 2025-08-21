import { useEffect, useState } from "react";
import axios from "axios";

export default function Usertable() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // modal ajout
  const [isEditOpen, setIsEditOpen] = useState(false); // modal édition
  const [currentId, setCurrentId] = useState(null); // id du user à modifier

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    adresse: "",
    statut: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (user) => {
    setCurrentId(user._id);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mdp: "", // 🔹 tu peux laisser vide pour ne pas réécrire le mot de passe
      adresse: user.adresse,
      statut: user.statut,
      role: user.role,
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      axios
        .delete(`http://localhost:5000/api/users/delete/${id}`)
        .then(() => {
          setUsers(users.filter((u) => u._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCreate = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      mdp: "",
      adresse: "",
      statut: "",
      role: "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditOpen) {
        // 🔹 UPDATE
        const res = await fetch(
          `http://localhost:5000/api/users/update/${currentId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (res.ok) {
          setMessage("Utilisateur modifié avec succès !");
          fetchUsers();
          setIsEditOpen(false);
        } else {
          setMessage(data.message || "Erreur lors de la modification");
        }
      } else {
        // 🔹 CREATE
        const res = await fetch("http://localhost:5000/api/users/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage("Utilisateur ajouté avec succès !");
          fetchUsers();
          setIsOpen(false);
        } else {
          setMessage(data.message || "Erreur lors de l'ajout");
        }
      }
    } catch (error) {
      setMessage("Erreur serveur : " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👥 Liste des Utilisateurs</h1>

      {/* Bouton en haut à droite */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          + Ajouter un utilisateur
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 border-t">{user.nom}</td>
                  <td className="p-3 border-t">{user.prenom}</td>
                  <td className="p-3 border-t">{user.email}</td>
                  <td className="p-3 border-t">{user.role}</td>
                  <td
                    className={`p-3 border-t font-medium ${
                      user.statut === "Actif"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.statut}
                  </td>
                  <td className="p-3 border-t text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-4 text-center text-gray-500 italic"
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal (ajout & édition utilisent le même formulaire) */}
      {(isOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditOpen
                ? "Modifier un utilisateur"
                : "Ajouter un utilisateur"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="mdp"
                placeholder="Mot de passe"
                value={formData.mdp}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Statut --</option>
                <option value="actif">actif</option>
                <option value="inactif">inactif</option>
              </select>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Rôle --</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="fournisseur">Fournisseur</option>
              </select>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  {isEditOpen ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEditOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </form>
            {message && <p className="mt-4 text-center text-sm">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
