import React from "react";
import { ShoppingCart, User } from "lucide-react"; // ⚡ icône panier
import NavBar from "./NavBar";
export default function Header() {
  const user = localStorage.getItem("userName");
  console.log(user);
  return (
    <header className="bg-[#f6c7b3] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Titre */}
        <h1 className="text-2xl font-bold">Gestion Fournisseurs & Produits</h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
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

          {/* Bouton panier */}
          <button className="relative bg-white text-[#f6c7b3] p-2 rounded-full shadow hover:bg-gray-100 transition">
            <ShoppingCart className="w-6 h-6" />
          </button>
          <NavBar user={user} />
        </nav>
      </div>
    </header>
  );
}
/* <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              3
            </span>*/
