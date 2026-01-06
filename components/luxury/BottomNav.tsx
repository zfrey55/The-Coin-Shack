'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, MessageCircle, Calendar, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'chats', icon: MessageCircle, label: 'Chats', path: '/chats' },
  { id: 'schedule', icon: Calendar, label: 'Schedule', path: '/schedule' },
  { id: 'more', icon: MoreHorizontal, label: 'More', path: '/more' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname?.startsWith('/admin')) return null;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-xl bg-opacity-95 z-40" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px]',
                  isActive ? 'text-[var(--gold-primary)]' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('w-6 h-6', isActive && 'scale-110')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

