import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Página no encontrada</h1>
      <p className="text-sm text-zinc-500">La página que buscás no existe.</p>
      <Link
        href="/dashboard"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        Volver al dashboard
      </Link>
    </div>
  );
}