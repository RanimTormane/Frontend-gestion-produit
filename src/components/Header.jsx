import React from "react";

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion Fournisseurs & Produits</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Accueil
          </a>
          <a href="/fournisseurs" className="hover:underline">
            Fournisseurs
          </a>
          <a href="/produits" className="hover:underline">
            Produits
          </a>
          <a href="/rapports" className="hover:underline">
            Rapports
          </a>
        </nav>
      </div>
    </header>
  );
}
