import Link from "next/link";
import { CheckCircle2, Users, Zap, MessageSquare, BarChart3, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Navigation */}
      <nav className="border-b border-[#1e293b] sticky top-0 z-50 bg-[#020617]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0047ab] rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <span className="text-lg font-bold text-white">CONTROL</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-[#cbd5e1] hover:text-white transition-colors text-sm">
              Iniciar sesión
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] text-white text-sm px-4 py-2 transition-colors font-medium"
            >
              Comenzar
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#0047ab]/10 border border-[#0047ab]/20">
              <span className="text-[#0047ab] text-sm font-medium">Gestión de tareas para equipos modernos</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              Organiza tu equipo.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047ab] to-[#0047ab]/70">
                Entrega más rápido.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-2xl mx-auto mb-8 leading-relaxed">
              CONTROL reúne el trabajo de tu equipo. Asigna tareas, rastrea el progreso, colabora en tiempo real y mantén a todos alineados en un mismo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/sign-up"
                className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] text-white px-8 py-4 font-semibold transition-colors text-center"
              >
                Comenzar gratis
              </Link>
              <Link
                href="/sign-in"
                className="rounded-md border border-[#1e293b] hover:border-[#0047ab] text-white px-8 py-4 font-semibold transition-colors text-center"
              >
                Iniciar sesión
              </Link>
            </div>

            <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] rounded-lg border border-[#1e293b] p-12 overflow-hidden">
              <div className="space-y-4">
                <div className="h-3 bg-[#1e293b] rounded w-3/4"></div>
                <div className="h-3 bg-[#1e293b] rounded w-1/2"></div>
                <div className="space-y-3 mt-6">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-[#0047ab] rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="h-2 bg-[#1e293b] rounded w-full"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="h-2 bg-[#1e293b] rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Todo lo que tu equipo necesita
              </h2>
              <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto">
                Herramientas simples y poderosas construidas para la colaboración y productividad
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Espacios de trabajo</h3>
                <p className="text-[#94a3b8]">
                  Crea espacios dedicados para cada proyecto. Invita miembros del equipo y gestiona roles con permisos granulares.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Gestión de tareas</h3>
                <p className="text-[#94a3b8]">
                  Crea y organiza tareas con descripciones, fechas límite y niveles de prioridad. Rastrea el estado de pendiente a completado.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Comentarios y discusión</h3>
                <p className="text-[#94a3b8]">
                  Discute tareas directamente con tu equipo. Mantén toda la comunicación en contexto y busable.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sincronización en tiempo real</h3>
                <p className="text-[#94a3b8]">
                  Ve las actualizaciones al instante. Los cambios se sincronizan en tu equipo en tiempo real para que todos estén en la misma página.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Seguimiento del progreso</h3>
                <p className="text-[#94a3b8]">
                  Monitorea el progreso de las tareas y las tasas de finalización. Entiende qué está hecho, en progreso y pendiente de un vistazo.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-8 hover:border-[#0047ab] transition-colors">
                <div className="w-12 h-12 bg-[#0047ab]/20 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-[#0047ab]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Seguro y privado</h3>
                <p className="text-[#94a3b8]">
                  Tus datos están encriptados y seguros. Controla quién tiene acceso a tus espacios de trabajo e información.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Simple de empezar
              </h2>
              <p className="text-lg text-[#cbd5e1]">
                Organiza tu equipo en minutos, no en días
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0047ab] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    1
                  </div>
                  <div className="w-1 h-24 bg-gradient-to-b from-[#0047ab] to-transparent mt-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Crea un workspace</h3>
                  <p className="text-[#cbd5e1]">
                    Configura un workspace para tu equipo o proyecto. Puedes crear múltiples workspaces para mantener organizados diferentes equipos.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0047ab] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    2
                  </div>
                  <div className="w-1 h-24 bg-gradient-to-b from-[#0047ab] to-transparent mt-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Invita a tu equipo</h3>
                  <p className="text-[#cbd5e1]">
                    Envía invitaciones a los miembros del equipo por correo electrónico. Establece su rol como administrador o miembro según sus responsabilidades.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0047ab] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    3
                  </div>
                  <div className="w-1 h-24 bg-gradient-to-b from-[#0047ab] to-transparent mt-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Crea y asigna tareas</h3>
                  <p className="text-[#cbd5e1]">
                    Añade tareas con descripciones, fechas límite y asígnalas a los miembros del equipo. Establece niveles de prioridad para mantener a todos enfocados.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0047ab] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Colabora y entrega</h3>
                  <p className="text-[#cbd5e1]">
                    Comenta en tareas, actualiza el progreso y rastrea la finalización. Mantén a todos alineados mientras el trabajo avanza.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              ¿Listo para tomar el control?
            </h2>
            <p className="text-lg text-[#cbd5e1] mb-8">
              Comienza a organizar el trabajo de tu equipo hoy. Solo te toma un minuto empezar.
            </p>
            <Link
              href="/sign-up"
              className="inline-block rounded-md bg-[#0047ab] hover:bg-[#0037a3] text-white px-8 py-4 font-semibold transition-colors"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1e293b] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0047ab] rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">C</span>
                </div>
                <span className="text-lg font-bold text-white">CONTROL</span>
              </div>
              <div className="flex gap-8 text-sm text-[#94a3b8]">
                <Link href="/sign-in" className="hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
                <Link href="/sign-up" className="hover:text-white transition-colors">
                  Comenzar
                </Link>
              </div>
            </div>
            <div className="border-t border-[#1e293b] mt-8 pt-8 text-center text-sm text-[#64748b]">
              <p>© 2026 CONTROL. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}