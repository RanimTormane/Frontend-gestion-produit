import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Card({ id, title, description, price, imageUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [adresseLivraison, setAdresseLivraison] = useState("");
  const [modePaiement, setModePaiement] = useState("carte bancaire");

  // Simulation client connecté
  const clientId = localStorage.getItem("clientId");

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantity(1);
    setAdresseLivraison("");
    setModePaiement("carte bancaire");
  };

  const handleConfirm = async () => {
    try {
      if (!clientId) {
        alert("❌ Aucun client connecté");
        return;
      }

      const payload = {
        numeroCommande: "CMD-" + Date.now(),
        dateCommande: new Date(),
        statutCommande: "en attente",
        totalCommande: price * quantity,
        taxesAppliquees: price * quantity * 0.19,
        adresseLivraison,
        modePaiement,
        datePaiement: new Date(), // ⚡ ajouté
        lignesCommande: [
          {
            produit: id,
            quantite: quantity,
            prixUnitaire: price,
          },
        ],
        client: clientId,
      };

      const res = await axios.post(
        "http://localhost:5000/api/commandes/create",
        payload
      );

      alert("✅ Commande créée avec succès !");
      console.log(res.data);
      closeModal();
    } catch (err) {
      console.error(
        "Erreur création commande :",
        err.response?.data || err.message
      );
      alert("❌ Erreur lors de la commande");
    }
  };

  return (
    <>
      <Link to={`/product/${id}`} className="block">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm cursor-pointer">
          {/* Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-40 object-cover"
            />

            <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">
              New
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{description}</p>

            {/* Price */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-green-600">
                TND {price}
              </span>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-colors duration-300"
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Commander {title}
            </h2>

            {/* Quantité */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Quantité :
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Adresse */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Adresse de livraison :
              </label>
              <input
                type="text"
                value={adresseLivraison}
                onChange={(e) => setAdresseLivraison(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ex: Tunis, centre ville"
              />
            </div>

            {/* Paiement */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700 font-medium">
                Mode de paiement :
              </label>
              <select
                value={modePaiement}
                onChange={(e) => setModePaiement(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="carte bancaire">Carte bancaire</option>
                <option value="cash">Cash à la livraison</option>
              </select>
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
