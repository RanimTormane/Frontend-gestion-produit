// Sidebar.jsx
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Truck,
  Settings,
  Layers, // Catégories
  ShoppingCart, // Commandes
  BarChart3, // Rapports
  Bell, // Alertes
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="bg-gray-900 text-gray-100 w-64 min-h-screen shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center space-x-2 border-b border-gray-700">
        <h2 className="text-xl font-bold tracking-wide">⚡ Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
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

        {/* Catégories */}
        <Link
          to="/admin/categorie"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
        >
          <Layers size={20} />
          <span>Categories</span>
        </Link>

        {/* Commandes */}
        <Link
          to="/admin/commande"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
        >
          <ShoppingCart size={20} />
          <span>Commandes</span>
        </Link>

        {/* Rapports */}
        <Link
          to="/admin/rapports"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
        >
          <BarChart3 size={20} />
          <span>Rapports</span>
        </Link>

        {/* Alertes */}
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
      </nav>
    </div>
  );
}
