import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenue sur l'Application de Gestion des Fournisseurs et Produits
        </h1>
        <p className="text-gray-600 mb-6">
          Utilisez le menu de navigation pour accéder à la gestion des
          fournisseurs, des produits et aux rapports.
        </p>

        {/* Product list */}
        <h2 className="text-2xl font-semibold mb-4">Liste des Produits</h2>
        {!data ? (
          <div>Chargement...</div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((product) => (
              <Card
                key={product.id}
                title={product.nom}
                description={
                  <>
                    <p>Prix : {product.prix} €</p>
                    <p>{product.description}</p>
                    <p>Quantité : {product.quantiteStock}</p>
                    <p>
                      Date d'ajout :{" "}
                      {new Date(product.dateAjout).toLocaleDateString()}
                    </p>
                    <p>Statut : {product.statutProduit}</p>
                    <p>Type : {product.typeProduit}</p>
                  </>
                }
                bgColor="bg-blue-100"
              />
            ))}
          </div>
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
        <div className="mt-8">
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Se connecter
          </a>
          <span className="mx-2">|</span>
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            S'inscrire
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
