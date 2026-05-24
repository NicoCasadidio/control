"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

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

interface Option {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  align: "left" | "right";
}

function FilterDropdown({ label, options, selectedValues, onChange, align }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const count = selectedValues.length;
  const buttonLabel = count > 0 ? `${label} (${count})` : label;
  const menuPositionClass = align === "right" ? "right-0" : "left-0";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#1a2642] border border-[#1e293b] rounded-md text-sm text-[#cbd5e1] hover:border-[#0047ab] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
      >
        <span className={count > 0 ? "text-[#0047ab] font-medium" : ""}>{buttonLabel}</span>
        <ChevronDown
          className={"w-3.5 h-3.5 transition-transform duration-200 " + (isOpen ? "rotate-180" : "")}
        />
      </button>

      {isOpen && (
        <div
          className={"absolute top-full mt-1 z-50 min-w-[160px] bg-[#0f172a] border border-[#1e293b] rounded-md shadow-lg py-1 " + menuPositionClass}
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#1a2642] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(opt.value)}
                onChange={(e) => onChange(opt.value, e.target.checked)}
                className="w-4 h-4 accent-[#0047ab] cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-[#cbd5e1]">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchAndFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatuses = searchParams.get("status")?.split(",").filter(Boolean) ?? [];
  const currentPriorities = searchParams.get("priority")?.split(",").filter(Boolean) ?? [];

  const [search, setSearch] = useState(currentSearch);

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
  }, [search]);

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
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
        <input
          type="text"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[#1a2642] border border-[#1e293b] rounded-md text-white placeholder-[#64748b] focus:border-[#0047ab] focus:outline-none text-sm transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <FilterDropdown
          label="Estado"
          options={STATUS_OPTIONS}
          selectedValues={currentStatuses}
          onChange={handleStatusChange}
          align="left"
        />
        <FilterDropdown
          label="Prioridad"
          options={PRIORITY_OPTIONS}
          selectedValues={currentPriorities}
          onChange={handlePriorityChange}
          align="right"
        />
      </div>
    </div>
  );
}
