'use client';
import { motion } from 'framer-motion';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { useRouter } from 'next/navigation';

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md space-y-6"
      >
        <h1 className="text-5xl font-display font-bold text-foreground gold-shimmer">
          The Coin Shack
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the luxury live coin streaming and commerce platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LuxuryButton variant="gold" size="lg" shimmer onClick={() => router.push('/register')}>
            Get Started
          </LuxuryButton>
          <LuxuryButton variant="outline" size="lg" onClick={() => router.push('/login')}>
            Sign In
          </LuxuryButton>
        </div>
      </motion.div>
    </div>
  );
}

