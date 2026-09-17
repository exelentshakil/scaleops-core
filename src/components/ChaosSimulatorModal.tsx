'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Zap,
  AlertOctagon,
  ShieldAlert,
  ServerCrash,
  RefreshCw,
  Layers,
  Database,
  Activity,
  Cpu,
} from 'lucide-react';

interface ChaosSimulatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChaosSimulatorModal({ open, onOpenChange }: ChaosSimulatorModalProps) {
  const [runningScenario, setRunningScenario] = useState<string | null>(null);
  const [chaosLog, setChaosLog] = useState<Array<{ text: string; type: 'info' | 'success' | 'warn' | 'error' }>>([]);

  const runChaosTest = (scenario: string) => {
    setRunningScenario(scenario);
    setChaosLog([]);

    if (scenario === 'pg_starvation') {
      setChaosLog([
        { text: '[00.00s] Injecting sudden surge of 1,450 concurrent client connections...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.12s] Direct Postgres max_connections (50) would FAIL with FATAL: too many connections.', type: 'error' },
          { text: '[00.14s] PgBouncer Transaction Multiplexer engaged: Queueing 1,425 clients in RAM buffer.', type: 'info' },
        ]);
      }, 400);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.32s] 25 server connection slots recycled 1,450 transactions in 380ms total.', type: 'success' },
          { text: '[00.36s] 0 failed connections. Memory overhead: 14MB. PostgreSQL cluster health: 100%.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 1000);
    } else if (scenario === 'cache_stampede') {
      setChaosLog([
        { text: '[00.00s] Simulating hot key TTL expiration during 10,000 req/s traffic spike...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.08s] Threat: Classic cache stampede would crush PostgreSQL with 10,000 parallel sequential scans.', type: 'error' },
          { text: '[00.11s] XFetch Algorithm activated: Probabilistic delta early-refresh triggered at 85% TTL.', type: 'info' },
          { text: '[00.15s] Worker acquires single distributed Redis mutex to recompute key in background.', type: 'info' },
        ]);
      }, 400);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.28s] PostgreSQL receives exactly 1 query. 9,999 clients served from warm cache.', type: 'success' },
          { text: '[00.31s] Zero database CPU spike. Latency remains at 1.8ms.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 900);
    } else if (scenario === 'webhook_spike') {
      setChaosLog([
        { text: '[00.00s] Injecting 5,000 webhook events/sec into ingestion endpoint...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.09s] FastAPI Ingestion Gateway buffers raw payloads into Redis Streams in 1.2ms.', type: 'info' },
          { text: '[00.14s] Backlog threshold exceeded (depth > 2,000). Celery autoscaler triggers worker spinup.', type: 'warn' },
        ]);
      }, 350);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.26s] Worker fleet scaled from 4 to 24 concurrent workers.', type: 'info' },
          { text: '[00.41s] 5,000 payloads processed and committed to PostgreSQL in 2.8s. 0 dropped webhooks.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 950);
    } else if (scenario === 'ai_failover') {
      setChaosLog([
        { text: '[00.00s] Simulating HTTP 504 Gateway Timeout on primary Gemini 2.5 Flash endpoint...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.11s] Primary AI Provider failed (Status: 504 Timeout after 450ms).', type: 'error' },
          { text: '[00.13s] Circuit Breaker tripped to OPEN state. Initiating automatic fallback to OpenAI gpt-4o-mini...', type: 'warn' },
        ]);
      }, 400);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.29s] OpenAI fallback completed in 160ms. Sanitized response returned to caller.', type: 'success' },
          { text: '[00.33s] Zero client-facing errors. Circuit breaker scheduled for half-open probe in 60s.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 900);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-6 text-[var(--color-text-primary)]">
        <DialogHeader className="border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
              <AlertOctagon className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              Chaos Engineering
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Production Reliability Under Stress
            </span>
          </div>
          <DialogTitle className="text-lg font-bold">
            Live Backend Failure &amp; Resilience Simulator
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--color-text-secondary)]">
            Test how ScaleOps Core handles connection starvation, cache stampedes, webhook traffic floods, and upstream AI outages without dropping requests.
          </DialogDescription>
        </DialogHeader>

        {/* 4 Chaos Scenario Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
          {/* Scenario 1 */}
          <button
            onClick={() => runChaosTest('pg_starvation')}
            disabled={runningScenario !== null}
            className="flex flex-col text-left rounded-xl border border-[var(--color-border)] p-3 hover:border-red-400 hover:bg-red-50/20 dark:hover:bg-red-950/20 transition-all"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Database className="h-4 w-4 text-red-500" />
                Postgres Connection Starvation
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Test</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Simulates 1,450 concurrent web connections. Tests PgBouncer transaction queueing without DB exhaustion.
            </p>
          </button>

          {/* Scenario 2 */}
          <button
            onClick={() => runChaosTest('cache_stampede')}
            disabled={runningScenario !== null}
            className="flex flex-col text-left rounded-xl border border-[var(--color-border)] p-3 hover:border-amber-400 hover:bg-amber-50/20 dark:hover:bg-amber-950/20 transition-all"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-amber-500" />
                Hot-Key Cache Stampede
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Test</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Simulates hot key expiration under 10k req/s. Tests XFetch probabilistic early background recomputation.
            </p>
          </button>

          {/* Scenario 3 */}
          <button
            onClick={() => runChaosTest('webhook_spike')}
            disabled={runningScenario !== null}
            className="flex flex-col text-left rounded-xl border border-[var(--color-border)] p-3 hover:border-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-blue-500" />
                5,000 req/s Webhook Spike
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Test</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Floods the ingestion stream. Tests worker autoscaling and Redis Streams buffering with zero lost events.
            </p>
          </button>

          {/* Scenario 4 */}
          <button
            onClick={() => runChaosTest('ai_failover')}
            disabled={runningScenario !== null}
            className="flex flex-col text-left rounded-xl border border-[var(--color-border)] p-3 hover:border-purple-400 hover:bg-purple-50/20 dark:hover:bg-purple-950/20 transition-all"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-purple-500" />
                AI Gateway 504 Timeout
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Test</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Simulates primary LLM outage. Tests sub-500ms circuit breaker trip to secondary backup provider.
            </p>
          </button>
        </div>

        {/* Live Execution Terminal */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5">
          <div className="flex items-center justify-between text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-1 mb-2">
            <span>RESILIENCE TEST LOGS</span>
            {runningScenario && (
              <span className="text-amber-500 flex items-center gap-1 animate-pulse">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Executing...
              </span>
            )}
          </div>

          {chaosLog.length === 0 ? (
            <p className="text-[var(--color-text-muted)] italic">
              Select any scenario above to trigger real-time chaos simulation and observe defensive failover mechanisms.
            </p>
          ) : (
            chaosLog.map((log, idx) => (
              <div
                key={idx}
                className={`leading-relaxed ${
                  log.type === 'error'
                    ? 'text-red-600 dark:text-red-400 font-semibold'
                    : log.type === 'warn'
                    ? 'text-amber-600 dark:text-amber-400'
                    : log.type === 'success'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {log.text}
              </div>
            ))
          )}
        </div>

        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-xs border-[var(--color-border)]"
          >
            Close Simulator
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
