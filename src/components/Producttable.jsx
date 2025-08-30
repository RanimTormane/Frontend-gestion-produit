import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // modal ajout
  const [isEditOpen, setIsEditOpen] = useState(false); // modal édition
  const [currentId, setCurrentId] = useState(null);

  // 🔹 Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    quantiteStock: "",
    typeProduit: "",
    statutProduit: "",
    idcategorie: "",
    idfournisseur: "",
    imageURL: null, // ⚡ fichier image
  });

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

  const handleEdit = (product) => {
    setCurrentId(product._id);
    setFormData({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      quantiteStock: product.quantiteStock,
      typeProduit: product.typeProduit,
      statutProduit: product.statutProduit,
      idcategorie: product.idcategorie,
      idfournisseur: product.idfournisseur,
      imageURL: null, // ⚡ on ne recharge pas le fichier directement
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      axios
        .delete(`http://localhost:5000/api/products/delete/${id}`)
        .then(() => {
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCreate = () => {
    setFormData({
      nom: "",
      description: "",
      prix: "",
      quantiteStock: "",
      typeProduit: "",
      statutProduit: "",
      idcategorie: "",
      idfournisseur: "",
      imageURL: null,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      for (let key in formData) {
        if (formData[key] !== null) {
          dataToSend.append(key, formData[key]);
        }
      }

      if (isEditOpen) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/products/update/${currentId}`,
          dataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage("Produit modifié avec succès !");
        fetchProducts(page);
        setIsEditOpen(false);
      } else {
        // CREATE
        await axios.post(
          "http://localhost:5000/api/products/create",
          dataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage("Produit ajouté avec succès !");
        fetchProducts(page);
        setIsOpen(false);
      }
    } catch (error) {
      setMessage("Erreur serveur : " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageURL") {
      setFormData({ ...formData, imageURL: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Liste des Produits</h1>

      {/* Bouton Ajouter */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Nom</th>
              <th className="p-3">Description</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Quantité</th>
              <th className="p-3">Type</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Image</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 border-t">{product.nom}</td>
                  <td className="p-3 border-t">{product.description}</td>
                  <td className="p-3 border-t">{product.prix} DT</td>
                  <td className="p-3 border-t">{product.quantiteStock}</td>
                  <td className="p-3 border-t">{product.typeProduit}</td>
                  <td
                    className={`p-3 border-t font-medium ${
                      product.statutProduit === "disponible"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.statutProduit}
                  </td>
                  <td className="p-3 border-t">
                    {product.imageURL ? (
                      <img
                        src={product.imageURL}
                        alt={product.nom}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 border-t text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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
                  colSpan="8"
                  className="p-4 text-center text-gray-500 italic"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {/* Modal (ajout & édition) */}
      {(isOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditOpen ? "Modifier un produit" : "Ajouter un produit"}
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
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={formData.prix}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="quantiteStock"
                placeholder="Quantité en stock"
                value={formData.quantiteStock}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="typeProduit"
                placeholder="Type de produit"
                value={formData.typeProduit}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="statutProduit"
                placeholder="Statut (ex: disponible / rupture)"
                value={formData.statutProduit}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="idcategorie"
                placeholder="ID Catégorie"
                value={formData.idcategorie}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="idfournisseur"
                placeholder="ID Fournisseur"
                value={formData.idfournisseur}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              {/* ⚡ Champ fichier image */}
              <input
                type="file"
                name="imageURL"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

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
