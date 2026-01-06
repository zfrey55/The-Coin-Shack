'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { useStore } from '@/lib/store';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        // Mock user for demo
        setUser({
          id: '1',
          name: 'Demo User',
          email,
          role: 'user',
        });
        toast.success('Signed in successfully');
        router.push('/');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LuxuryCard variant="elevated" texture className="w-full max-w-md p-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--input-background)] border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--input-background)] border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
              placeholder="••••••••"
            />
          </div>

          <LuxuryButton
            type="submit"
            variant="gold"
            className="w-full"
            shimmer
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </LuxuryButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-[var(--gold-primary)] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </LuxuryCard>
    </div>
  );
}

