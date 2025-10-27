import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_ENDPOINTS } from '../config/api';

interface User {
  email: string;
  password: string;
  prenom?: string;
  nom?: string;
  role?: "admin" | "candidat" | "recruteur";
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = API_ENDPOINTS.candidats;

  // ✅ Si déjà connecté, rediriger selon le rôle
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored) as User;
      if (parsed.role === "admin") navigate("/admin");
      if (parsed.role === "candidat") navigate("/dashboardcandidat");
      if (parsed.role === "recruteur") navigate("/recruteur-dashboard");
    }
  }, [navigate]);

  // ✅ Fonction de connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- Vérifier si admin ---
      const adminEmails = ["minaba360@gmail.com", "alinemangane8@gmail.com"];
      const adminPassword = "admin123";

      if (adminEmails.includes(email) && password === adminPassword) {
        const adminUser: User = {
          email, role: "admin", nom: "Administrateur",
          password: ""
        };
        localStorage.setItem("user", JSON.stringify(adminUser));

        Swal.fire({
          icon: "success",
          title: "Bienvenue Administrateur !",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/admin", { replace: true });
        return;
      }

      // --- Vérifier si candidat ---
      const resCand = await fetch(API_URL);
      const candidats: User[] = await resCand.json();
      const candidat = candidats.find(
        (u) => u.email === email && u.password === password
      );

      if (candidat) {
        const userData = { ...candidat, role: "candidat" };
        localStorage.setItem("user", JSON.stringify(userData));

        Swal.fire({
          icon: "success",
          title: `Bienvenue ${candidat.prenom ?? ""} ${candidat.nom ?? ""} !`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboardcandidat", { replace: true });
        return;
      }

      // --- Vérifier si recruteur ---
      const recruteurEmails = ["amina@gmail.com", "aline@gmail.com"];
      const recruteurPassword = "recrut123";
    
      if (recruteurEmails.includes(email) && password === recruteurPassword) {
        const recruteurUser: User = {
          email, role: "recruteur", nom: "Recruteur",
          password: ""
        };
        localStorage.setItem("user", JSON.stringify(recruteurUser));

        Swal.fire({
          icon: "success",
          title: "Bienvenue Recruteur !",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboardRecruteur", { replace: true });
        return;
      }


      // ❌ Aucun utilisateur trouvé
      Swal.fire({
        icon: "error",
        title: "Email ou mot de passe incorrect !",
        showConfirmButton: false,
        timer: 1800,
      });
    } catch (err) {
      console.error("Erreur :", err);
      Swal.fire({
        icon: "warning",
        title: "⚠️ Serveur inaccessible",
        text: "Vérifie que ton json-server est bien lancé sur le port 3000.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Connexion à votre espace
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@mail.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" /> Se souvenir de moi
            </label>
            <Link
              to="/mot-de-passe-oublie"
              className="text-sm text-blue-700 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-white w-full border-2 bg-blue-800 hover:bg-blue-500 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-center text-gray-600 text-sm mt-3">
            Pas encore de compte ?{" "}
            <Link
              to="/inscription"
              className="text-blue-700 font-semibold hover:underline"
            >
              S’inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
