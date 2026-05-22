import { createWorkspace } from "@/actions/workspace";

export default function NewWorkspacePage() {
  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Crear workspace</h1>
        <p className="text-[#94a3b8]">Configura un nuevo espacio para tu equipo</p>
      </div>
      <form action={createWorkspace} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[#cbd5e1]">
            Nombre del workspace
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Mi equipo"
            className="rounded-md border border-[#1e293b] bg-[#0f172a] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
        >
          Crear workspace
        </button>
      </form>
    </div>
  );
}