import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-cream">
      <p className="font-display italic text-2xl text-brown/60 mb-4">Hmm, we couldn't find that page.</p>
      <Link to="/" className="bg-olive text-cream rounded-full px-6 py-3 text-sm font-medium">
        Back to Home
      </Link>
    </div>
  );
}
