import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <main className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          CONTROL
        </h1>
        <p className="text-lg text-zinc-500 max-w-sm">
          Organizá tu equipo y tus tareas en un solo lugar.
        </p>
        <Link
          href="/sign-up"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Empezar gratis
        </Link>
      </main>
    </div>
  );
}