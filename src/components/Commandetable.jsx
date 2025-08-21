// CommandesTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function CommandesTable() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/commandes/commandes") // adapte l'URL selon ton backend
      .then((res) => setCommandes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Liste des Commandes</h1>
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Numéro</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Statut</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Taxes</th>
            <th className="p-3 border">Adresse Livraison</th>
            <th className="p-3 border">Mode Paiement</th>
            <th className="p-3 border">Date Paiement</th>
            <th className="p-3 border">Client</th>
            <th className="p-3 border">Lignes</th>
          </tr>
        </thead>
        <tbody>
          {commandes.length > 0 ? (
            commandes.map((commande) => (
              <tr
                key={commande._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-3 border">{commande.numeroCommande}</td>
                <td className="p-3 border">
                  {commande.dateCommande
                    ? new Date(commande.dateCommande).toLocaleDateString()
                    : "-"}
                </td>
                <td
                  className={`p-3 border font-semibold ${
                    commande.statutCommande === "livrée"
                      ? "text-green-600"
                      : commande.statutCommande === "en attente"
                      ? "text-yellow-600"
                      : commande.statutCommande === "annulée"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {commande.statutCommande}
                </td>
                <td className="p-3 border">{commande.totalCommande} TND</td>
                <td className="p-3 border">{commande.taxesAppliquees} %</td>
                <td className="p-3 border">{commande.adresseLivraison}</td>
                <td className="p-3 border">{commande.modePaiement}</td>
                <td className="p-3 border">
                  {commande.datePaiement
                    ? new Date(commande.datePaiement).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3 border">
                  {commande.client ? commande.client : "-"}
                </td>
                <td className="p-3 border">
                  {commande.lignesCommande && commande.lignesCommande.length > 0
                    ? commande.lignesCommande.join(", ")
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center text-gray-500">
                Aucune commande trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
