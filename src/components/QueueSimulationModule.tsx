'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function QueueSimulationModule() {
  const [isSpiking, setIsSpiking] = useState(false);
  const [queueDepth, setQueueDepth] = useState(42);
  const [activeWorkers, setActiveWorkers] = useState(8);
  const [processedTotal, setProcessedTotal] = useState(14820);
  const [p99Latency, setP99Latency] = useState(18);
  const [errorRate, setErrorRate] = useState(0.0);

  // Background queue processing simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueDepth((prev) => {
        if (isSpiking) {
          // Rapidly drain spike down
          const drained = Math.max(25, prev - Math.floor(Math.random() * 250 + 150));
          if (drained <= 45) {
            setIsSpiking(false);
            setActiveWorkers(8);
            setP99Latency(18);
          }
          return drained;
        } else {
          // Normal ambient queue fluctuation
          return Math.max(10, Math.min(65, prev + Math.floor(Math.random() * 7 - 3)));
        }
      });

      setProcessedTotal((prev) => prev + (isSpiking ? 180 : 12));
    }, 400);

    return () => clearInterval(interval);
  }, [isSpiking]);

  const handleTriggerSpike = () => {
    setIsSpiking(true);
    setQueueDepth(2450);
    setActiveWorkers(24);
    setP99Latency(38);
    setErrorRate(0.0);
  };

  return (
    <div className="space-y-4">
      {/* Header with Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Distributed Queue Architecture
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">•</span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">Async Worker Fleet</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            High-Throughput Webhook Ingestion &amp; Worker Scaling
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Simulates 5,000 events/sec inbound traffic across Celery/Inngest workers with dynamic autoscaling and zero dropped payloads.
          </p>
        </div>

        <Button
          onClick={handleTriggerSpike}
          disabled={isSpiking}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs h-9 px-4 shadow-xs shrink-0"
        >
          {isSpiking ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              <span>Draining 2,450 Events...</span>
            </>
          ) : (
            <>
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              <span>Inject Traffic Spike (5,000 req/s)</span>
            </>
          )}
        </Button>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>QUEUE BACKLOG</span>
            <Activity className="h-3.5 w-3.5 text-indigo-500" />
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-text-primary)] flex items-baseline gap-1.5">
            <span>{queueDepth.toLocaleString()}</span>
            <span className="text-[11px] font-normal text-[var(--color-text-muted)]">msgs</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Autoscale Ready</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>ACTIVE WORKERS</span>
            <Cpu className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-text-primary)] flex items-baseline gap-1.5">
            <span>{activeWorkers}</span>
            <span className="text-[11px] font-normal text-[var(--color-text-muted)]">/ 32 max</span>
          </div>
          <div className="text-[11px] font-mono text-[var(--color-text-secondary)]">
            <span>{isSpiking ? 'Bursted (Cluster Scale)' : 'Baseline Active'}</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>P99 CONSUMER LAG</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-text-primary)] flex items-baseline gap-1.5">
            <span>{p99Latency}</span>
            <span className="text-[11px] font-normal text-[var(--color-text-muted)]">ms</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span>SLA: &lt;100ms guaranteed</span>
          </div>
        </Card>

        <Card className="p-3.5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>PROCESSED TOTAL</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-text-primary)] flex items-baseline gap-1.5">
            <span>{processedTotal.toLocaleString()}</span>
          </div>
          <div className="text-[11px] font-mono text-[var(--color-text-secondary)]">
            <span>0 dropped • 0 DLQ failures</span>
          </div>
        </Card>
      </div>

      {/* Interactive Architecture Flow Canvas */}
      <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
            Reliability Pipeline Stage Telemetry
          </span>
          <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
            HEALTH: 100% NOMINAL
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Stage 1: Ingestion Gateway */}
          <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">1. Fast Ingestion</span>
              <Badge variant="secondary" className="text-[10px] font-mono">FastAPI / Nginx</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Receives incoming webhooks, validates JSON schemas with Pydantic v2, and pushes to Redis queue in &lt;3ms.
            </p>
            <div className="pt-2 border-t border-[var(--color-border)]/60 text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
              Throughput: {isSpiking ? '5,120 req/s' : '480 req/s'}
            </div>
          </div>

          {/* Stage 2: Queue Broker */}
          <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">2. Durable Broker</span>
              <Badge variant="secondary" className="text-[10px] font-mono">Redis Streams</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Guarantees at-least-once delivery with consumer group acknowledgments and automatic dead-letter queue routing.
            </p>
            <div className="pt-2 border-t border-[var(--color-border)]/60 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              Backlog: {queueDepth} items
            </div>
          </div>

          {/* Stage 3: Async Workers */}
          <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">3. Async Workers</span>
              <Badge variant="secondary" className="text-[10px] font-mono">Celery / Inngest</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Executes heavy computational tasks, AI enrichment, and external API webhooks with exponential backoff retries.
            </p>
            <div className="pt-2 border-t border-[var(--color-border)]/60 text-[11px] font-mono text-blue-600 dark:text-blue-400">
              Concurrency: {activeWorkers} Workers
            </div>
          </div>

          {/* Stage 4: Database Sink */}
          <div className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">4. Storage Sink</span>
              <Badge variant="secondary" className="text-[10px] font-mono">PostgreSQL 16</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Bulk writes processed batches using multi-row upserts through PgBouncer connection pooling to avoid locking.
            </p>
            <div className="pt-2 border-t border-[var(--color-border)]/60 text-[11px] font-mono text-purple-600 dark:text-purple-400">
              Batching: 250 rows/tx
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
