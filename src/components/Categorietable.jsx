// CategoriesTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories/categories") // adapte l'URL selon ton backend
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📂 Liste des Catégories</h1>
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Nom</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Image</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((categorie) => (
              <tr
                key={categorie._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-3 border">{categorie.nomCategorie}</td>
                <td className="p-3 border">{categorie.descriptionCategorie}</td>
                <td className="p-3 border">{categorie.typeCategorie}</td>
                <td className="p-3 border">
                  {categorie.imageCategorie ? (
                    <img
                      src={categorie.imageCategorie}
                      alt={categorie.nomCategorie}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Aucune catégorie trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
