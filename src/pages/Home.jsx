import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card"; // ✅ utilise ton nouveau composant
import axios from "axios";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // tu peux changer la taille des pages
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = (page) => {
    axios
      .get(
        `http://localhost:5000/api/products/products?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      {/* ✅ Bannière Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
          src="/images/banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Bienvenue sur notre boutique
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">
        <p className="text-gray-600 mb-6">
          Utilisez le menu de navigation pour accéder à la gestion des
          fournisseurs, des produits et aux rapports.
        </p>

        {/* Product list */}
        <h2 className="text-2xl font-semibold mb-4">Liste des Produits</h2>
        {products.length === 0 ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                id={product._id} // ✅ Ajout de l'id
                title={product.nom}
                description={product.description}
                price={product.prix}
                imageUrl={product.imageURL} // ✅ affichera l'image du backend
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            ⬅️ Précédent
          </button>
          <span className="px-3 py-1">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Suivant ➡️
          </button>
        </div>

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
