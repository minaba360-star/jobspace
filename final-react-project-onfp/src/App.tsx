import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FormulaireInscription from "./components/FormulaireInscription";
import Login from "./components/Login";
import DashboardCandidat from "./components/DashboardCandidat";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardRecruteur from "./components/DashboardRecruteur";
import Accueil from "./components/Accueil";
import DetailOffre from "./components/DetailOffre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // ✅ On masque Navbar & Footer sur les dashboards (candidat/admin)
  const isDashboardPage =
    location.pathname.startsWith("/dashboard") || 
    location.pathname === "/admin";

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <main className="min-h-screen bg-gray-50">{children}</main>
      {!isDashboardPage && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Accueil />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<FormulaireInscription />} />

          {/* Dashboards */}
          <Route path="/dashboardcandidat" element={<DashboardCandidat />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/dashboardRecruteur" element={<DashboardRecruteur />} />

          {/* Détail offre */}
          <Route path="/offre/:id" element={<DetailOffre />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-red-600 font-semibold">
                Page non trouvée ❌
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
