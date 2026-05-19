import { createWorkspace } from "@/actions/workspace";

export default function NewWorkspacePage() {
  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h1 className="text-2xl font-semibold text-zinc-900">Crear workspace</h1>
      <form action={createWorkspace} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Mi equipo"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Crear
        </button>
      </form>
    </div>
  );
}