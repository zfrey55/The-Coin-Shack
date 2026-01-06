import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { MetricsCard } from '@/components/admin/MetricsCard';
import { TrendingUp, Users, DollarSign, Radio } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics - Admin - The Coin Shack',
  description: 'Analytics dashboard',
};

export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Viewers"
          value="12,345"
          trend="up"
          trendValue="+12%"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricsCard
          title="Active Shows"
          value="8"
          trend="up"
          trendValue="+2"
          icon={<Radio className="w-6 h-6" />}
        />
        <MetricsCard
          title="Revenue"
          value={formatCurrency(45230)}
          trend="up"
          trendValue="+8%"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricsCard
          title="Engagement Rate"
          value="12.5%"
          trend="up"
          trendValue="+1.2%"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      <LuxuryCard variant="elevated" className="p-12 text-center">
        <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-display font-semibold text-foreground mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Detailed analytics and charts coming soon</p>
      </LuxuryCard>
    </div>
  );
}

