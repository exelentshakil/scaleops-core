'use client';

import React, { useState } from 'react';
import {
  Layers,
  ShieldAlert,
  Server,
  RefreshCw,
  Zap,
  CheckCircle2,
  HardDrive,
  Cpu,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function ResilienceModule() {
  const [stampedeMitigated, setStampedeMitigated] = useState(true);
  const [poolUtilization, setPoolUtilization] = useState(24); // percentage
  const [cacheHitRate, setCacheHitRate] = useState(96.4);

  const simulateCacheWipe = () => {
    setCacheHitRate(78.2);
    setPoolUtilization(65);
    setTimeout(() => {
      setCacheHitRate(96.4);
      setPoolUtilization(24);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              High-Availability &amp; Concurrency Guard
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">•</span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">PgBouncer &amp; Redis Mesh</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Connection Pooling &amp; Cache Stampede Defense
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Protects PostgreSQL from thread exhaustion and eliminates dogpiling / cache stampedes using probabilistic early recomputation (XFetch).
          </p>
        </div>

        <Button
          onClick={simulateCacheWipe}
          variant="outline"
          size="sm"
          className="h-9 text-xs font-medium border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
          <span>Simulate Hot Key Expiration</span>
        </Button>
      </div>

      {/* Two Pillar Grid: PgBouncer vs Redis Caching */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: PgBouncer Connection Pool */}
        <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                PgBouncer Connection Pooling
              </span>
            </div>
            <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
              TRANSACTION POOLING
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--color-text-muted)]">Active Server Connections:</span>
              <span className="font-bold text-[var(--color-text-primary)]">24 / 100 max</span>
            </div>
            <Progress value={poolUtilization} className="h-2 bg-[var(--color-panel-subtle)]" />
            <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)] font-mono">
              <span>Client Web Requests: 1,450 concurrent</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0 Queued / Blocked</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1.5">
            <div className="font-semibold text-[var(--color-text-primary)]">
              Why Direct Postgres Connections Fail:
            </div>
            <p>
              Each raw PostgreSQL connection forks a backend process consuming ~10MB RAM. 1,000 concurrent serverless lambdas directly hitting Postgres trigger <strong>FATAL: remaining connection slots reserved</strong>. PgBouncer multiplexes 1,450 incoming clients onto 25 persistent connections, keeping database memory flat at 240MB.
            </p>
          </div>
        </Card>

        {/* Pillar 2: Redis Multi-Tier & XFetch Stampede Guard */}
        <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                Redis Multi-Tier Cache Layer
              </span>
            </div>
            <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
              HIT RATE: {cacheHitRate}%
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--color-text-muted)]">Cache Hit Ratio:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{cacheHitRate}% Nominal</span>
            </div>
            <Progress value={cacheHitRate} className="h-2 bg-[var(--color-panel-subtle)]" />
            <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)] font-mono">
              <span>Eviction Policy: volatile-lru</span>
              <span>Memory: 1.2GB / 8GB</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1.5">
            <div className="font-semibold text-[var(--color-text-primary)]">
              Probabilistic Early Expiration (XFetch):
            </div>
            <p>
              When a viral tenant record expires, standard caches let 500 concurrent threads miss simultaneously, crushing the database (cache stampede). Our XFetch algorithm predicts expiration: <code>currentTime - (delta * beta * ln(rand())) &gt; expiry</code>, asynchronously refreshing the cache in the background while users get 100% hits.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
