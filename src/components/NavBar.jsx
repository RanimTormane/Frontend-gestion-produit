// NavBar.jsx
import { Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // hook pour navigation

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("userRole");

    window.location.href = "/login"; // redirection vers login
  };

  const handleAccount = () => {
    navigate("/account"); // redirection vers la page AccountPage
  };

  return (
    <>
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-50">
        {/* Left: Logo / Title */}
        <div className="flex items-center gap-2">
          {user.role === "admin" ? (
            <span className="text-xl font-bold text-gray-800">
              ⚡ Admin Dashboard
            </span>
          ) : user.role === "fournisseur" ? (
            <span className="text-xl font-bold text-gray-800">
              ⚡ Fournisseur Dashboard
            </span>
          ) : (
            <span className="text-xl font-bold text-gray-800">{user}</span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* User */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 relative"
            onClick={toggleModal}
          >
            <User size={22} />
            <span className="text-sm font-medium">{user.role}</span>

            {/* Modal dropdown */}
            {isModalOpen && (
              <div className="absolute right-0 top-10 bg-white border rounded-xl shadow-lg w-40 p-3 flex flex-col gap-2 z-50">
                <button
                  onClick={handleAccount}
                  className="text-left px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Compte
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
