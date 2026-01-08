'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, ShoppingBag, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'feed', icon: Home, label: 'Feed', path: '/' },
  { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
  { id: 'products', icon: ShoppingBag, label: 'Products', path: '/commerce' },
  { id: 'shows', icon: Calendar, label: 'Shows', path: '/schedule' },
  { id: 'account', icon: User, label: 'Account', path: '/more' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname?.startsWith('/admin')) return null;
  
  const isActive = (itemPath: string) => {
    if (itemPath === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(itemPath) || false;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-xl bg-opacity-95 z-40" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px]',
                  active ? 'text-[var(--gold-primary)]' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={cn('w-6 h-6', active && 'scale-110')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

