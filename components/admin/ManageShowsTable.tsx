'use client';
import { Stream } from '@/lib/types';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { Edit, Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

interface ManageShowsTableProps {
  streams: Stream[];
  onEdit?: (stream: Stream) => void;
  onDelete?: (streamId: string) => void;
}

export function ManageShowsTable({ streams, onEdit, onDelete }: ManageShowsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Title</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Host</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Viewers</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream) => (
            <tr key={stream.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
              <td className="py-3 px-4">
                <div className="font-medium text-foreground">{stream.title}</div>
                {stream.startsAt && (
                  <div className="text-sm text-muted-foreground">
                    {formatDate(stream.startsAt)} {formatTime(stream.startsAt)}
                  </div>
                )}
              </td>
              <td className="py-3 px-4 text-foreground">{stream.hostName}</td>
              <td className="py-3 px-4">
                {stream.isLive ? (
                  <LuxuryBadge variant="live" size="sm" />
                ) : (
                  <span className="text-sm text-muted-foreground">Scheduled</span>
                )}
              </td>
              <td className="py-3 px-4 text-foreground">{stream.viewers || 0}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <LuxuryButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit?.(stream)}
                    aria-label={`Edit ${stream.title}`}
                  >
                    <Edit className="w-4 h-4" />
                  </LuxuryButton>
                  <LuxuryButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete?.(stream.id)}
                    aria-label={`Delete ${stream.title}`}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </LuxuryButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

