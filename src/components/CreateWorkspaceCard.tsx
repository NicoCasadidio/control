"use client";

import { useState, useRef } from "react";
import { createWorkspace } from "@/actions/workspace";
import { Plus } from "lucide-react";

interface Props {
  showAsButton?: boolean;
}

export default function CreateWorkspaceCard({ showAsButton = false }: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await createWorkspace(formData);
    setOpen(false);
    formRef.current?.reset();
  }

  if (showAsButton) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="inline-block px-4 py-2 bg-[#0047ab] hover:bg-[#0037a3] text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
        >
          Create your first workspace
        </button>

        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-white">Crear workspace</h2>
              <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#cbd5e1]">
                    Nombre del workspace
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Mi workspace"
                    className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group rounded-lg border-2 border-dashed border-[#475569] bg-[#1a2642]/40 p-6 hover:border-[#0047ab] hover:bg-[#1a2642]/60 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3"
      >
        <div className="w-10 h-10 rounded-lg bg-[#475569]/30 group-hover:bg-[#0047ab]/20 flex items-center justify-center transition-colors">
          <Plus className="w-6 h-6 text-[#94a3b8] group-hover:text-[#0047ab]" />
        </div>
        <span className="text-sm font-medium text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors">
          Crear Workspace
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Crear workspace</h2>
            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-[#cbd5e1]">
                  Nombre del workspace
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Mi workspace"
                  className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
