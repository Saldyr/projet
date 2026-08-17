import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-base-300/70 bg-base-100/90 p-8 text-center shadow-sm backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
          <h1 className="mt-3 text-3xl font-bold text-base-content">Page introuvable</h1>
          <p className="mt-3 text-base-content/70">
            La page que tu cherches n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link to="/" className="btn btn-primary mt-6 rounded-full px-6">
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
