import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Search, Inbox, Settings, BarChart3 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { AdminGate, isAdminAuthed } from './AdminGate';
import { TextInput } from '@/components/ui/TextInput';
import { useSubmissionsStore } from '@/state/submissionsStore';
import { StorageKeys } from '@/lib/storage/localStorage';
import { Badge } from '@/components/ui/Badge';

const NAV = [
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3, disabled: true },
  { to: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

export function AdminLayout() {
  const [authed, setAuthed] = useState(isAdminAuthed());
  const [search, setSearch] = useState('');
  const total = useSubmissionsStore((s) => s.submissions.length);
  const loc = useLocation();

  if (!authed) return <AdminGate onSuccess={() => setAuthed(true)} />;

  const signOut = () => {
    try {
      sessionStorage.removeItem(StorageKeys.adminSession);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  };

  return (
    <div className="bg-admin-canvas flex min-h-dvh w-full">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col border-r border-slate-200/70 bg-white/70 px-4 py-6 backdrop-blur md:flex">
          <Logo className="px-2" />
          <nav className="mt-8 flex flex-col gap-0.5">
            {NAV.map((n) => {
              const active = loc.pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.disabled ? '#' : n.to}
                  className={[
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition',
                    active
                      ? 'bg-brand-50 text-brand-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    n.disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-slate-600',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => n.disabled && e.preventDefault()}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{n.label}</span>
                  {n.to === '/admin/submissions' && total > 0 && (
                    <Badge tone="blue">{total}</Badge>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-4">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
            <Link
              to="/"
              className="mt-1 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
              ← Customer site
            </Link>
          </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200/70 bg-white/85 px-4 backdrop-blur md:px-6">
          <Link to="/admin" className="md:hidden">
            <Logo />
          </Link>
          <div className="ml-auto flex w-full max-w-md items-center gap-2 md:ml-0">
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, address, reference…"
              iconLeft={<Search className="h-4 w-4" />}
              className="h-9 bg-slate-50/80 text-sm"
            />
          </div>
          <button
            onClick={signOut}
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 md:hidden cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>

        <main className="flex min-w-0 flex-1 flex-col">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}
