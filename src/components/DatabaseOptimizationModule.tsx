'use client';

import React, { useState } from 'react';
import {
  Database,
  Zap,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Code2,
  Clock,
  HardDrive,
  Copy,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function DatabaseOptimizationModule() {
  const [selectedScenario, setSelectedScenario] = useState<'unindexed' | 'indexed'>('indexed');
  const [copied, setCopied] = useState(false);

  const copySql = (sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Database Engineering &amp; Indexing Lab
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">•</span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">PostgreSQL 16 Engine</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Query Profiling, Index Optimization &amp; N+1 Elimination
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Demonstrates real-world database performance tuning: transforming multi-second sequential scans into sub-5ms index lookups under high concurrent tenant load.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shrink-0">
          <button
            onClick={() => setSelectedScenario('unindexed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedScenario === 'unindexed'
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 shadow-2xs border border-rose-300 dark:border-rose-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Unindexed Seq Scan (428ms)
          </button>
          <button
            onClick={() => setSelectedScenario('indexed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedScenario === 'indexed'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-2xs border border-emerald-300 dark:border-emerald-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Optimized Composite Index (3.8ms)
          </button>
        </div>
      </div>

      {/* Benchmark Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Query Spec & Execution Plan */}
        <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Tenant Event Stream Query
            </span>
            <Badge
              variant="outline"
              className={
                selectedScenario === 'indexed'
                  ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/10 font-mono text-[11px]'
                  : 'border-rose-500/30 text-rose-600 bg-rose-500/10 font-mono text-[11px]'
              }
            >
              {selectedScenario === 'indexed' ? '112x SPEEDUP ACHIEVED' : 'BOTTLENECK DETECTED'}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span>SQL Statement</span>
              <button
                onClick={() =>
                  copySql(
                    selectedScenario === 'indexed'
                      ? "CREATE INDEX CONCURRENTLY idx_tenant_events_opt ON tenant_events (tenant_id, created_at DESC) INCLUDE (event_type, payload);"
                      : "SELECT * FROM tenant_events WHERE tenant_id = 't_991' ORDER BY created_at DESC LIMIT 50;"
                  )
                }
                className="hover:text-[var(--color-text-primary)] flex items-center gap-1"
              >
                <Copy className="h-3 w-3" />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
              {selectedScenario === 'indexed'
                ? `-- Production Indexing Migration (Zero-Downtime Lock)
CREATE INDEX CONCURRENTLY idx_tenant_events_opt
ON tenant_events (tenant_id, created_at DESC)
INCLUDE (event_type, payload);

-- Executed Query
SELECT event_type, payload, created_at
FROM tenant_events
WHERE tenant_id = 't_991'
ORDER BY created_at DESC
LIMIT 50;`
                : `-- Unoptimized Tenant Query (Missing Index)
SELECT *
FROM tenant_events
WHERE tenant_id = 't_991'
ORDER BY created_at DESC
LIMIT 50;`}
            </pre>
          </div>

          {/* Explain Analyze Output */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              EXPLAIN (ANALYZE, BUFFERS) Profile
            </span>
            <pre className="p-3 rounded-xl bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] font-mono text-[11px] leading-relaxed border border-[var(--color-border)] overflow-x-auto">
              {selectedScenario === 'indexed'
                ? `Limit  (cost=0.43..12.85 rows=50 width=88) (actual time=0.042..3.811 rows=50 loops=1)
  Buffers: shared hit=42 read=0
  ->  Index Scan using idx_tenant_events_opt on tenant_events
        Index Cond: (tenant_id = 't_991'::text)
Planning Time: 0.084 ms
Execution Time: 3.842 ms`
                : `Limit  (cost=18420.00..18420.12 rows=50 width=88) (actual time=412.18..428.45 rows=50 loops=1)
  Buffers: shared hit=1280 read=14200 (DISK I/O BOTTLENECK)
  ->  Sort  (cost=18420.00..18425.00 rows=20000 width=88)
        Sort Key: created_at DESC
        Sort Method: external merge Disk: 4820kB
        ->  Seq Scan on tenant_events
              Filter: (tenant_id = 't_991'::text)
              Rows Removed by Filter: 1,180,000
Planning Time: 0.210 ms
Execution Time: 428.66 ms`}
            </pre>
          </div>
        </Card>

        {/* Right Column: Key Performance Metrics & Engineering Takeaways */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span>LATENCY</span>
                <Clock className="h-3.5 w-3.5 text-indigo-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                {selectedScenario === 'indexed' ? '3.8 ms' : '428.6 ms'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                }`}
              >
                {selectedScenario === 'indexed' ? 'Sub-5ms Guaranteed' : 'Degrading Pool Capacity'}
              </div>
            </Card>

            <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span>DISK READS</span>
                <HardDrive className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                {selectedScenario === 'indexed' ? '0 blocks' : '14,200 blocks'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                }`}
              >
                {selectedScenario === 'indexed' ? '100% RAM Buffer Hit' : 'Physical Disk I/O Stall'}
              </div>
            </Card>
          </div>

          {/* Architectural Notes Card */}
          <Card className="p-4 bg-[var(--color-surface)] border-[var(--color-border)] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Senior Engineering Architecture Patterns Applied
            </span>
            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Covering Index (INCLUDE Clause):</strong> Eliminates heap table lookups by storing frequent payload fields directly in the B-Tree index leaf nodes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Zero-Downtime Deployment:</strong> Uses <code>CREATE INDEX CONCURRENTLY</code> to avoid write-locking the active production table during migration.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong>N+1 Prevention with DataLoader/Batching:</strong> Groups tenant detail lookups into single multi-key queries (<code>WHERE id IN (...)</code>), cutting database queries per request from 51 down to 2.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
