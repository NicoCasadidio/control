"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En progreso" },
  { value: "done", label: "Completado" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
  { value: "none", label: "Sin prioridad" },
];

export default function SearchAndFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ← Leer SIEMPRE de searchParams, no guardar en state local
  const currentSearch = searchParams.get("search") || "";
  const currentStatuses = searchParams.get("status")?.split(",").filter(Boolean) ?? [];
  const currentPriorities = searchParams.get("priority")?.split(",").filter(Boolean) ?? [];

  const [search, setSearch] = useState(currentSearch);

  // Debounce: cuando search cambia, espera 300ms antes de actualizar URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (search.trim()) {
          params.set("search", search.trim());
        } else {
          params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]); // ← SOLO search, nada más

  const handleStatusChange = (value: string, checked: boolean) => {
    const updated = checked
      ? [...currentStatuses, value]
      : currentStatuses.filter((s) => s !== value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set("status", updated.join(","));
    } else {
      params.delete("status");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePriorityChange = (value: string, checked: boolean) => {
    const updated = checked
      ? [...currentPriorities, value]
      : currentPriorities.filter((p) => p !== value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set("priority", updated.join(","));
    } else {
      params.delete("priority");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 rounded-lg border border-[#1e293b] bg-[#0f172a]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
        <input
          type="text"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[#1a2642] border border-[#1e293b] rounded-md text-white placeholder-[#64748b] focus:border-[#0047ab] focus:outline-none text-sm transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-medium text-[#94a3b8] mb-2 uppercase tracking-wide">
            Estado
          </p>
          <div className="flex flex-wrap gap-4">
            {STATUS_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentStatuses.includes(opt.value)}
                  onChange={(e) => handleStatusChange(opt.value, e.target.checked)}
                  className="w-4 h-4 accent-[#0047ab] cursor-pointer"
                />
                <span className="text-sm text-[#cbd5e1]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-[#94a3b8] mb-2 uppercase tracking-wide">
            Prioridad
          </p>
          <div className="flex flex-wrap gap-4">
            {PRIORITY_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPriorities.includes(opt.value)}
                  onChange={(e) => handlePriorityChange(opt.value, e.target.checked)}
                  className="w-4 h-4 accent-[#0047ab] cursor-pointer"
                />
                <span className="text-sm text-[#cbd5e1]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}