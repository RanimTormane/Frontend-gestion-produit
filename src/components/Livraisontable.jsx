// LivraisonsTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Livraisontable() {
  const [livraisons, setLivraisons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/livraisons/Livraisons")
      .then((res) => setLivraisons(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Liste des Livraisons</h1>
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Date Expédition</th>
            <th className="p-3 border">Prévue</th>
            <th className="p-3 border">Effective</th>
            <th className="p-3 border">Statut</th>
            <th className="p-3 border">Notes Livreur</th>
            <th className="p-3 border">Client (ID)</th>
            <th className="p-3 border">Commande</th>
          </tr>
        </thead>
        <tbody>
          {livraisons.length > 0 ? (
            livraisons.map((livraison) => (
              <tr
                key={livraison._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-3 border">
                  {livraison.dateExpedition
                    ? new Date(livraison.dateExpedition).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3 border">
                  {livraison.dateLivraisonPrevue
                    ? new Date(
                        livraison.dateLivraisonPrevue
                      ).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3 border">
                  {livraison.dateLivraisonEffective
                    ? new Date(
                        livraison.dateLivraisonEffective
                      ).toLocaleDateString()
                    : "-"}
                </td>
                <td
                  className={`p-3 border font-semibold ${
                    livraison.statutLivraison === "Livrée"
                      ? "text-green-600"
                      : livraison.statutLivraison === "En cours"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {livraison.statutLivraison}
                </td>
                <td className="p-3 border">{livraison.notesLivreur || "-"}</td>
                <td className="p-3 border">{livraison.iduser || "-"}</td>
                <td className="p-3 border">{livraison.commande || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                Aucune livraison trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
