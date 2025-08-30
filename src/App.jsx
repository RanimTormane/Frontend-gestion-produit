import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserPage from "./pages/AdminUserPage";
import AdminLivraisonPage from "./pages/AdminLivraisonPage";
import AdminCategoriePage from "./pages/AdminCategoriePage";
import AdminCommandePage from "./pages/AdminComandePage";
import ProductDetail from "./pages/Productdetails";
import FournPage from "./pages/FournPage";
import FournProductPage from "./pages/FournProductPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<AdminUserPage />} />
          <Route path="livraison" element={<AdminLivraisonPage />} />
          <Route path="categorie" element={<AdminCategoriePage />} />
          <Route path="commande" element={<AdminCommandePage />} />
        </Route>
        <Route path="/fournisseur" element={<FournPage />}>
          <Route path="manageproducts" element={<FournProductPage />} />
        </Route>
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
