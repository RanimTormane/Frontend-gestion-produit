// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const user = { role: "fournisseur" };
  return (
    <div>
      <NavBar user={user} />
      <div className="flex">
        <Sidebar role={user.role} />

        <main className="flex-1 bg-gray-50 p-6">
          <Outlet /> {/* Nested route content goes here */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
