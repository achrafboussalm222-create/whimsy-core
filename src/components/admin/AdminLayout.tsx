import { Link, useNavigate } from "react-router-dom";
import { LogOut, ExternalLink } from "lucide-react";
import { ReactNode } from "react";
import { Logo } from "../Brand";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream-soft">
      <header className="bg-brown text-cream px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2">
          <Logo dark />
          <span className="text-xs uppercase tracking-widest text-gold-soft ml-1">Admin</span>
        </Link>
        <div className="flex items-center gap-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-cream/70 hover:text-cream inline-flex items-center gap-1.5 transition-colors"
          >
            View Site <ExternalLink size={14} />
          </a>
          <button
            onClick={handleSignOut}
            className="text-sm text-cream/70 hover:text-cream inline-flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
