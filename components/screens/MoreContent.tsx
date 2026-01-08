'use client';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { APP_NAME, APP_VERSION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  User,
  Bell,
  Settings,
  Shield,
  HelpCircle,
  Moon,
  Sun,
  LogIn,
  LogOut,
  Crown,
  Calendar,
} from 'lucide-react';

// Map user IDs to host IDs (breakers: Rari, Mike, Dom, Manu)
const USER_TO_HOST_MAP: Record<string, string> = {
  '1': '1', // Rari
  '2': '2', // Mike
  '3': '3', // Dom
  '4': '4', // Manu
};

const menuItems = [
  { id: 'profile', icon: User, label: 'Edit Profile', path: '/profile' },
  { id: 'my-shows', icon: Calendar, label: 'My Shows', path: '/my-shows', requiresBreaker: true },
  { id: 'notifications', icon: Bell, label: 'Notifications', path: '/notifications' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  { id: 'privacy', icon: Shield, label: 'Privacy', path: '/privacy' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', path: '/help' },
] as const;

export function MoreContent() {
  const { user, theme, toggleTheme, setUser } = useStore();
  const router = useRouter();
  const isLoggedIn = !!user;
  const isVip = useStore((state: { isVip: () => boolean }) => state.isVip());

  const handleSignOut = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">More</h1>

      {isLoggedIn ? (
        <>
          {/* User Profile Card */}
          <LuxuryCard variant="elevated" texture className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-foreground truncate">{user.name}</h2>
                  {isVip && <LuxuryBadge variant="vip" />}
                </div>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
              </div>
            </div>
          </LuxuryCard>

          {/* Theme Toggle */}
          <LuxuryCard variant="bordered" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-foreground" />
                )}
                <span className="font-medium text-foreground">Theme</span>
              </div>
              <button
                onClick={toggleTheme}
                className={cn(
                  'relative w-14 h-8 rounded-full transition-colors min-h-[44px] min-w-[56px]',
                  theme === 'dark' ? 'bg-[var(--gold-primary)]' : 'bg-muted'
                )}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span
                  className={cn(
                    'absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform',
                    theme === 'dark' && 'translate-x-6'
                  )}
                />
              </button>
            </div>
          </LuxuryCard>

          {/* VIP Upgrade Card */}
          {!isVip && (
            <LuxuryCard variant="gold" texture className="p-6 gold-shimmer">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-[var(--gold-primary)] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Upgrade to VIP</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get exclusive access to premium streams, early access to auctions, and special discounts.
                  </p>
                  <LuxuryButton variant="gold" shimmer>
                    Upgrade Now
                  </LuxuryButton>
                </div>
              </div>
            </LuxuryCard>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              // Check if item requires breaker access
              if (item.requiresBreaker) {
                const isBreaker = user && USER_TO_HOST_MAP[user.id];
                if (!isBreaker) return null; // Hide if not a breaker
              }
              
              const Icon = item.icon;
              return (
                <LuxuryCard
                  key={item.id}
                  variant="bordered"
                  onClick={() => router.push(item.path)}
                  className="p-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-foreground" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                </LuxuryCard>
              );
            })}
          </div>

          {/* Sign Out */}
          <LuxuryButton
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </LuxuryButton>
        </>
      ) : (
        <>
          {/* Guest View */}
          <LuxuryCard variant="elevated" texture className="p-12 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
              Sign In to Continue
            </h2>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to access all features
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LuxuryButton variant="gold" shimmer onClick={() => router.push('/register')}>
                <LogIn className="w-4 h-4" />
                Sign Up
              </LuxuryButton>
              <LuxuryButton variant="outline" onClick={() => router.push('/login')}>
                Sign In
              </LuxuryButton>
            </div>
          </LuxuryCard>

          {/* Theme Toggle for Guests */}
          <LuxuryCard variant="bordered" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-foreground" />
                )}
                <span className="font-medium text-foreground">Theme</span>
              </div>
              <button
                onClick={toggleTheme}
                className={cn(
                  'relative w-14 h-8 rounded-full transition-colors min-h-[44px] min-w-[56px]',
                  theme === 'dark' ? 'bg-[var(--gold-primary)]' : 'bg-muted'
                )}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span
                  className={cn(
                    'absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform',
                    theme === 'dark' && 'translate-x-6'
                  )}
                />
              </button>
            </div>
          </LuxuryCard>
        </>
      )}

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">
          {APP_NAME} v{APP_VERSION}
        </p>
      </div>
    </div>
  );
}

