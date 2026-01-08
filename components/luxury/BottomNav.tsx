'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, ShoppingBag, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'feed', icon: Home, label: 'Feed', path: '/feed' },
  { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
  { id: 'products', icon: ShoppingBag, label: 'Products', path: '/commerce' },
  { id: 'shows', icon: Calendar, label: 'Shows', path: '/schedule' },
  { id: 'account', icon: User, label: 'Account', path: '/more' },
];

// Add My Shows link for breakers - can be accessed via /more or direct link

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Hide on admin, auth, and login/register pages
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/auth')
  ) {
    return null;
  }
  
  const isActive = (itemPath: string) => {
    // Special case: root path should also match feed
    if (pathname === '/' && itemPath === '/feed') {
      return true;
    }
    return pathname === itemPath || pathname?.startsWith(itemPath + '/');
  };
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50 safe-area-inset-bottom"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-16 md:h-20">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200',
                  'min-w-[60px] min-h-[60px] md:min-w-[80px]',
                  'active:scale-95',
                  active 
                    ? 'text-[var(--gold-primary)]' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={cn(
                  'w-5 h-5 md:w-6 md:h-6 transition-transform',
                  active && 'scale-110'
                )} />
                <span className={cn(
                  'text-[10px] sm:text-xs font-medium leading-tight',
                  active && 'font-semibold'
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

