import { createTask } from "@/actions/task";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewTaskPage({ params }: Props) {
  const { id } = await params;
  const createTaskWithId = createTask.bind(null, id);

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h1 className="text-2xl font-semibold text-zinc-900">Crear tarea</h1>
      <form action={createTaskWithId} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-zinc-700">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Nombre de la tarea"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-zinc-700">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Descripción opcional"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 resize-none"
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