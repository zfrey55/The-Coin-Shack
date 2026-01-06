'use client';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Calendar, Gamepad2, BarChart3 } from 'lucide-react';

const adminNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { id: 'shows', icon: Calendar, label: 'Shows', path: '/admin/shows' },
  { id: 'games', icon: Gamepad2, label: 'Games', path: '/admin/games' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="border-b border-border bg-card" aria-label="Admin navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 border-transparent min-h-[44px]',
                  isActive
                    ? 'text-[var(--gold-primary)] border-[var(--gold-primary)]'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

