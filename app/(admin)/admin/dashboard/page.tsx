'use client';
import { useState } from 'react';
import { MetricsCard } from '@/components/admin/MetricsCard';
import { ManageShowsTable } from '@/components/admin/ManageShowsTable';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { mockStreams, mockGames } from '@/lib/mock-data';
import { Stream } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Users, Radio, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { toast } from 'sonner';

const tabs = [
  { id: 'shows', label: 'Manage Shows' },
  { id: 'games', label: 'Manage Games' },
  { id: 'content', label: 'Content' },
  { id: 'analytics', label: 'Analytics' },
] as const;

type TabId = typeof tabs[number]['id'];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('shows');
  const [streams, setStreams] = useState(mockStreams);

  const handleEditStream = (stream: Stream) => {
    toast.info(`Editing ${stream.title}`);
  };

  const handleDeleteStream = (streamId: string) => {
    setStreams(streams.filter(s => s.id !== streamId));
    toast.success('Show deleted');
  };

  const handleCreateShow = () => {
    toast.info('Create show form coming soon');
  };

  const totalViewers = streams.reduce((sum: number, s: Stream) => sum + (s.viewers || 0), 0);
  const activeShows = streams.filter((s: Stream) => s.isLive).length;
  const revenue = 45230; // Mock
  const engagementRate = 12.5; // Mock

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Viewers"
          value={totalViewers.toLocaleString()}
          trend="up"
          trendValue="+12%"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricsCard
          title="Active Shows"
          value={activeShows}
          trend="up"
          trendValue="+2"
          icon={<Radio className="w-6 h-6" />}
        />
        <MetricsCard
          title="Revenue"
          value={formatCurrency(revenue)}
          trend="up"
          trendValue="+8%"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricsCard
          title="Engagement Rate"
          value={`${engagementRate}%`}
          trend="up"
          trendValue="+1.2%"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent min-h-[44px]',
              activeTab === tab.id
                ? 'text-[var(--gold-primary)] border-[var(--gold-primary)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'shows' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-foreground">Manage Shows</h2>
            <LuxuryButton variant="gold" shimmer onClick={handleCreateShow}>
              <Plus className="w-4 h-4" />
              Create New Show
            </LuxuryButton>
          </div>
          <LuxuryCard variant="elevated" className="p-6">
            <ManageShowsTable
              streams={streams}
              onEdit={handleEditStream}
              onDelete={handleDeleteStream}
            />
          </LuxuryCard>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground">Manage Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGames.map((game) => (
              <LuxuryCard key={game.id} variant="elevated" className="p-4">
                <h3 className="font-semibold text-foreground mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{game.type}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{game.participants} participants</span>
                  {game.prizePool && (
                    <span className="font-semibold text-[var(--gold-primary)]">
                      {formatCurrency(game.prizePool)}
                    </span>
                  )}
                </div>
              </LuxuryCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <LuxuryCard variant="elevated" className="p-12 text-center">
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">Content Management</h2>
          <p className="text-muted-foreground">Content management features coming soon</p>
        </LuxuryCard>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground">Analytics</h2>
          <LuxuryCard variant="elevated" className="p-12 text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground mb-4">Detailed analytics and charts coming soon</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold text-foreground">+24%</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">1,234</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-muted-foreground">Conversion</p>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
              </div>
            </div>
          </LuxuryCard>
        </div>
      )}
    </div>
  );
}

