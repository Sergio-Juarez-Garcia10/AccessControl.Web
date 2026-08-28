import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Panel", icon: DashboardIcon, end: true },
  { to: "/visitas", label: "Visitas", icon: VisitsIcon },
  { to: "/personas", label: "Personas", icon: PersonsIcon },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-paper bg-paper-texture flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:shrink-0 bg-ink text-paper">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-mono text-xs tracking-[0.25em] text-seal uppercase">
            Registro No. 001
          </p>
          <h1 className="font-semibold text-lg mt-1">Bitácora de Accesos</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-paper/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10 text-[11px] text-paper/50 font-mono">
          v1.0 · uso interno
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden bg-ink text-paper px-4 py-3.5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-seal uppercase leading-none">
            Registro No. 001
          </p>
          <h1 className="font-semibold text-base mt-0.5">
            Bitácora de Accesos
          </h1>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-ink text-paper border-t border-white/10 flex z-40">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                isActive ? "text-seal" : "text-paper/60"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function DashboardIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function VisitsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M5 12h9" />
      <path d="M10 7l5 5-5 5" />
      <path d="M19 5v14" />
    </svg>
  );
}

function PersonsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.6 2.9-6 5.5-6s5.5 2.4 5.5 6" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.7 14.3c2.1.3 4.3 2.1 4.3 5.7" />
    </svg>
  );
}
