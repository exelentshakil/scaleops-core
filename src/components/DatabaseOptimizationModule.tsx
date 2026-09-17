'use client';

import React, { useState } from 'react';
import {
  Database,
  Zap,
  CheckCircle2,
  Clock,
  HardDrive,
  Copy,
  Layers,
  Cpu,
  Activity,
  Check,
  TrendingDown,
  ShieldCheck,
  Server,
} from 'lucide-react';
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
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0 font-mono">
              <Database className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Database Engineering &amp; Indexing Lab
            </span>
            <span className="text-xs text-[var(--color-text-muted)] select-none">•</span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono whitespace-nowrap">PostgreSQL 16 Engine</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
            Query Profiling, Index Optimization &amp; N+1 Elimination
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 max-w-3xl leading-relaxed">
            Demonstrates real-world database performance tuning: transforming multi-second sequential scans into sub-5ms index lookups under high concurrent tenant load.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSelectedScenario('unindexed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              selectedScenario === 'unindexed'
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 shadow-2xs border border-rose-300 dark:border-rose-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Unindexed Seq Scan (428ms)
          </button>
          <button
            onClick={() => setSelectedScenario('indexed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              selectedScenario === 'indexed'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-2xs border border-emerald-300 dark:border-emerald-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Optimized Composite Index (3.8ms)
          </button>
        </div>
      </div>

      {/* Benchmark Comparison Grid: Perfectly Balanced 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Column: Query Spec & Execution Plan */}
        <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <Server className="h-3.5 w-3.5 text-indigo-500" />
              Tenant Event Stream Query
            </span>
            <Badge
              variant="outline"
              className={`font-mono text-[11px] whitespace-nowrap shrink-0 ${
                selectedScenario === 'indexed'
                  ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                  : 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10'
              }`}
            >
              {selectedScenario === 'indexed' ? '112x SPEEDUP ACHIEVED' : 'BOTTLENECK DETECTED'}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span className="font-medium">SQL Statement</span>
              <button
                onClick={() =>
                  copySql(
                    selectedScenario === 'indexed'
                      ? "CREATE INDEX CONCURRENTLY idx_tenant_events_opt ON tenant_events (tenant_id, created_at DESC) INCLUDE (event_type, payload);\n\nSELECT event_type, payload, created_at FROM tenant_events WHERE tenant_id = 't_991' ORDER BY created_at DESC LIMIT 50;"
                      : "SELECT * FROM tenant_events WHERE tenant_id = 't_991' ORDER BY created_at DESC LIMIT 50;"
                  )
                }
                className="hover:text-[var(--color-text-primary)] flex items-center gap-1 font-sans transition-colors cursor-pointer text-[11px]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner max-h-[190px]">
              <code>
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
              </code>
            </pre>
          </div>

          {/* Explain Analyze Output */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span className="font-medium">EXPLAIN (ANALYZE, BUFFERS) Profile</span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                {selectedScenario === 'indexed' ? 'Zero Heap Scans' : '1.18M Rows Read'}
              </span>
            </div>
            <pre className="p-3 rounded-xl bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] font-mono text-[11px] leading-relaxed border border-[var(--color-border)] overflow-x-auto max-h-[175px]">
              <code>
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
              </code>
            </pre>
          </div>
        </Card>

        {/* Right Column: High-Density Telemetry & Architecture Takeaways (Zero White Space) */}
        <div className="space-y-3.5 flex flex-col justify-start">
          {/* 4 Balanced KPI Cards (2x2 Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {/* KPI 1: Latency */}
            <Card className="p-3 sm:p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span className="font-medium">QUERY LATENCY</span>
                <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                {selectedScenario === 'indexed' ? '3.8 ms' : '428.6 ms'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold whitespace-nowrap truncate ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {selectedScenario === 'indexed' ? '112x Speedup (Sub-5ms SLA)' : 'Degrading Pool Capacity'}
              </div>
            </Card>

            {/* KPI 2: Disk I/O */}
            <Card className="p-3 sm:p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span className="font-medium">DISK I/O READS</span>
                <HardDrive className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                {selectedScenario === 'indexed' ? '0 blocks' : '14,200 blocks'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold whitespace-nowrap truncate ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {selectedScenario === 'indexed' ? '100% RAM Buffer Hit' : 'Physical Disk I/O Stall'}
              </div>
            </Card>

            {/* KPI 3: Buffer Hit Ratio */}
            <Card className="p-3 sm:p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span className="font-medium">BUFFER CACHE HIT</span>
                <Database className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                {selectedScenario === 'indexed' ? '100.0%' : '8.2%'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold whitespace-nowrap truncate ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {selectedScenario === 'indexed' ? '42 Shared Memory Buffers' : '14.2k Misses to NVMe'}
              </div>
            </Card>

            {/* KPI 4: CPU I/O Wait */}
            <Card className="p-3 sm:p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span className="font-medium">CPU I/O WAIT</span>
                <Cpu className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                {selectedScenario === 'indexed' ? '0.2%' : '84.8%'}
              </div>
              <div
                className={`text-[11px] font-mono font-semibold whitespace-nowrap truncate ${
                  selectedScenario === 'indexed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {selectedScenario === 'indexed' ? 'Instant Worker Return' : 'Worker Thread Stalled'}
              </div>
            </Card>
          </div>

          {/* Engine Execution & Resource Profile Telemetry Card */}
          <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--color-border-subtle)] pb-2">
              <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-indigo-500" />
                PostgreSQL 16 Engine Telemetry
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                99.1% Execution Slashed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
              <div>
                <span className="text-[var(--color-text-muted)] text-[11px] block">Access Mechanism:</span>
                <span className="font-semibold text-[var(--color-text-primary)] text-xs">
                  {selectedScenario === 'indexed' ? 'Index Scan (idx_tenant_events_opt)' : 'Seq Scan (Full Table Scan)'}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[11px] block">Memory Sort Allocation:</span>
                <span className="font-semibold text-[var(--color-text-primary)] text-xs">
                  {selectedScenario === 'indexed' ? '336 KB (0 Disk Spills)' : '4,820 KB Disk Temp File'}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[11px] block">Table Lock Mode:</span>
                <span className="font-semibold text-[var(--color-text-primary)] text-xs">
                  {selectedScenario === 'indexed' ? 'RowShare (Zero Lockout)' : 'AccessShare (Read Lock)'}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[11px] block">Throughput Ceiling:</span>
                <span className="font-semibold text-[var(--color-text-primary)] text-xs">
                  {selectedScenario === 'indexed' ? '~12,500 req/s pool capacity' : '~65 req/s before exhaustion'}
                </span>
              </div>
            </div>
          </Card>

          {/* Senior Engineering Architecture Patterns Card */}
          <Card className="p-3.5 sm:p-4 bg-[var(--color-surface)] border-[var(--color-border)] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Senior Architecture Patterns Applied
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono shrink-0">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                Production Standard
              </span>
            </div>

            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[var(--color-text-primary)] font-semibold">Covering Index (INCLUDE Clause):</strong> Leaf-level tuple inclusion of <code>event_type</code> and <code>payload</code> eliminates secondary table heap lookups entirely.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[var(--color-text-primary)] font-semibold">Zero-Downtime Deployment:</strong> Uses <code>CREATE INDEX CONCURRENTLY</code> to bypass exclusive table write-locks on active production tables.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[var(--color-text-primary)] font-semibold">N+1 Prevention with DataLoader/Batching:</strong> Groups tenant detail lookups into single multi-key queries (<code>WHERE id IN (...)</code>), cutting queries per request from 51 down to 2.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
