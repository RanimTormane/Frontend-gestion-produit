import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Productdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Champs dynamiques
  const [quantite, setQuantite] = useState(1);
  const [adresseLivraison, setAdresseLivraison] = useState("");
  const [modePaiement, setModePaiement] = useState("carte bancaire");

  // Simulation client connecté (récupéré depuis localStorage)
  const clientId = localStorage.getItem("clientId");

  const handleCommander = async () => {
    try {
      const payload = {
        numeroCommande: "CMD-" + Date.now(),
        dateCommande: new Date(),
        statutCommande: "en attente",
        totalCommande: product.prix * quantite,
        taxesAppliquees: product.prix * quantite * 0.19,
        adresseLivraison: adresseLivraison,
        modePaiement: modePaiement,
        lignesCommande: [
          {
            produit: product._id,
            quantite: quantite,
            prixUnitaire: product.prix,
          },
        ],
        client: clientId, // ⚡ récupéré dynamiquement
      };

      const res = await axios.post(
        "http://localhost:5000/api/commandes/create",
        payload
      );

      alert("✅ Commande créée avec succès !");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la commande");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-6">Chargement...</p>;

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8 flex flex-row gap-10">
        {/* Image produit */}
        <div className="flex-1">
          <img
            src={product.imageURL}
            alt={product.nom}
            className="w-full max-h-[600px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Infos produit */}
        <div className="flex-1 flex flex-col justify-start">
          <h1 className="text-4xl font-extrabold mb-4">{product.nom}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          {/* Prix */}
          <p className="text-4xl font-bold text-indigo-700 mb-2">
            {product.prix},00 TND
          </p>

          {/* 🔹 Champs dynamiques */}
          <label className="block mb-2">Quantité :</label>
          <input
            type="number"
            value={quantite}
            min="1"
            onChange={(e) => setQuantite(parseInt(e.target.value))}
            className="border p-2 rounded mb-4"
          />

          <label className="block mb-2">Adresse de livraison :</label>
          <input
            type="text"
            value={adresseLivraison}
            onChange={(e) => setAdresseLivraison(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
            placeholder="Ex: Tunis, centre ville"
          />

          <label className="block mb-2">Mode de paiement :</label>
          <select
            value={modePaiement}
            onChange={(e) => setModePaiement(e.target.value)}
            className="border p-2 rounded mb-6"
          >
            <option value="carte bancaire">Carte bancaire</option>
            <option value="cash">Cash à la livraison</option>
          </select>

          {/* Bouton commander */}
          <button
            onClick={handleCommander}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition"
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}
