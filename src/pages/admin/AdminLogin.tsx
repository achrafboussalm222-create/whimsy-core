import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Logo } from "../../components/Brand";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-cream-soft rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-2 mb-6 text-brown/70">
            <Lock size={18} />
            <h1 className="font-display text-2xl text-brown">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-brown/50 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream border border-brown/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-brown/50 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream border border-brown/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            {error && <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-olive text-cream rounded-full px-6 py-3 font-medium mt-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brown/40 mt-6">
          This login was created for you in the Supabase dashboard — see the README if you need to reset it.
        </p>
      </div>
    </div>
  );
}
