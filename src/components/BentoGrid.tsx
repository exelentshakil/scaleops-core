'use client';

import React from 'react';
import {
  Activity,
  Database,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  TrendingUp,
  Server,
  GitCommit,
  CheckCircle2,
} from 'lucide-react';

export function BentoGrid() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Ingestion & Webhook Stream Throughput */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Webhook Stream Ingestion
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Activity className="h-3 w-3 animate-pulse" />
              <span>99.99% Delivered</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              5,240 req/s
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              P99: 14.2ms
            </span>
          </div>

          {/* Inline SVG Sparkline */}
          <div className="mt-3 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 200 40">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,32 Q 25,24 50,26 T 100,16 T 150,18 T 200,8 L 200,40 L 0,40 Z"
                fill="url(#emeraldGrad)"
              />
              <path
                d="M 0,32 Q 25,24 50,26 T 100,16 T 150,18 T 200,8"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            Redis Streams buffer with Celery/Inngest autoscaled workers
          </p>
        </div>

        {/* Card 2: PostgreSQL Query Acceleration */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              PostgreSQL 16 Optimization
            </span>
            <div className="flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <TrendingUp className="h-3 w-3" />
              <span>112x Speedup</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              3.8 ms
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              down from 428ms
            </span>
          </div>

          {/* Comparative Execution Latency Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)] font-mono">Unindexed Seq Scan</span>
              <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">428 ms (14.2k disk reads)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[95%] bg-rose-500 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[var(--color-text-secondary)] font-mono">Covering B-Tree Index</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">3.8 ms (42 buffer hits)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[3%] bg-emerald-500 rounded-full" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Zero-downtime CREATE INDEX CONCURRENTLY migration
          </p>
        </div>

        {/* Card 3: PgBouncer Connection Multiplexing */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Connection Pool Defense
            </span>
            <div className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap shrink-0">
              <Layers className="h-3 w-3" />
              <span>58:1 Ratio</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              1,450 Clients
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ➔ 25 Postgres Slots
            </span>
          </div>

          {/* Segmented Pool Saturation Bar */}
          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <div className="w-[48%] bg-emerald-500" title="Active Querying (12)" />
            <div className="w-[32%] bg-indigo-500" title="Reserved/Idle (8)" />
            <div className="w-[20%] bg-slate-300 dark:bg-slate-700" title="Spare Headroom (5)" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>Active: 12</span>
            <span>Reserved: 8</span>
            <span>Headroom: 5</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Prevents connection starvation under concurrent API traffic
          </p>
        </div>

        {/* Card 4: Cache Stampede (XFetch) Protection */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Cache Stampede Defense
            </span>
            <div className="flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 whitespace-nowrap shrink-0">
              <Zap className="h-3 w-3" />
              <span>XFetch Active</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              0 Spike Events
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Hot Keys
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Probabilistic early compute refreshes keys before TTL drop</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Protects billing & analytics endpoints from concurrent cache misses
          </p>
        </div>

        {/* Card 5: AI Gateway Circuit Breaker */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              AI Microservice Gateway
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Cpu className="h-3 w-3" />
              <span>Multi-Provider</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              440 ms
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Auto-Failover &lt; 500ms
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-mono">
            <span>Primary: Gemini 2.5 Flash</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">99.8%</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
            <div className="h-full w-[99.8%] bg-emerald-500 rounded-full" />
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Inline PII scrubbing & OWASP LLM01 boundary enforcement
          </p>
        </div>

        {/* Card 6: CI/CD & Production Code Quality */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              CI/CD &amp; Testing Rigor
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <GitCommit className="h-3 w-3" />
              <span>Passing CI</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              100% Strict
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Type-Safe
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Automated schema migration dry-runs & rollback scripts</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Zero breaking changes on production deployments
          </p>
        </div>
      </div>
    </div>
  );
}
