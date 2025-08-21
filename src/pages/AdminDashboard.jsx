// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* Nested route content goes here */}
      </main>
    </div>
  );
}
