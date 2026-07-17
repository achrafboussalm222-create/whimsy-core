import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import ConfigWarning from "./components/ConfigWarning";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { isSupabaseConfigured } from "./lib/supabase";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductForm from "./pages/admin/AdminProductForm";

function PublicSite() {
  const location = useLocation();
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/product/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="bg-cream text-brown font-body">
      {!isSupabaseConfigured && <ConfigWarning />}

      {isAdminRoute ? (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute>
                <AdminProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute>
                <AdminProductForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : (
        <PublicSite />
      )}
    </div>
  );
}
