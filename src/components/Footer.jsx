import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-4 mt-8">
      <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Application de Gestion des
        Fournisseurs et Produits. Tous droits réservés.
      </div>
    </footer>
  );
}
