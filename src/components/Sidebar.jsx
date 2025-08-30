// Sidebar.jsx
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Truck,
  Settings,
  Layers,
  ShoppingCart,
  BarChart3,
  Bell,
  Package, // pour gérer produits
} from "lucide-react";

export default function Sidebar({ role }) {
  return (
    <div className="bg-gray-900 text-gray-100 w-64 min-h-screen shadow-xl flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Si ADMIN */}
        {role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Users size={20} />
              <span>Manage Users</span>
            </Link>

            <Link
              to="/admin/livraison"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Truck size={20} />
              <span>Manage Livraisons</span>
            </Link>

            <Link
              to="/admin/categorie"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Layers size={20} />
              <span>Categories</span>
            </Link>

            <Link
              to="/admin/commande"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <ShoppingCart size={20} />
              <span>Commandes</span>
            </Link>

            <Link
              to="/admin/rapports"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <BarChart3 size={20} />
              <span>Rapports</span>
            </Link>

            <Link
              to="/admin/alertes"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Bell size={20} />
              <span>Alertes</span>
            </Link>

            <Link
              to="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </>
        )}

        {/* Si FOURNISSEUR */}
        {role === "fournisseur" && (
          <>
            <Link
              to="/fournisseur/manageproducts"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Package size={20} />
              <span>Manage Products</span>
            </Link>

            <Link
              to="/fournisseur/settings"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
