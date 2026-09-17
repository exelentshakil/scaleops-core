'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Terminal,
  Activity,
  Trash2,
  Database,
  Layers,
  Cpu,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogEntry {
  id: string;
  timestamp: string;
  stage: 'Ingestion' | 'Database' | 'PgBouncer' | 'Cache' | 'AI Gateway';
  status: '200 OK' | 'Cached' | 'Queued' | 'Accelerated';
  details: string;
  durationMs: number;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log_01',
    timestamp: '16:14:02.118',
    stage: 'Database',
    status: 'Accelerated',
    details: 'Covering B-Tree Index scan on saas_events (tenant_id, status, created_at). 42 buffer hits, 0 disk I/O.',
    durationMs: 3.8,
  },
  {
    id: 'log_02',
    timestamp: '16:14:02.042',
    stage: 'PgBouncer',
    status: '200 OK',
    details: 'Transaction pool multiplexed client conn #1,248 onto server slot #14. Lock hold time: 3.2ms.',
    durationMs: 0.4,
  },
  {
    id: 'log_03',
    timestamp: '16:14:01.992',
    stage: 'Cache',
    status: 'Cached',
    details: 'Redis XFetch check on key "tenant:org_92:kpis" (TTL: 14s, delta: 2.1s). Probabilistic threshold passed; background worker refreshed key.',
    durationMs: 1.2,
  },
  {
    id: 'log_04',
    timestamp: '16:14:01.810',
    stage: 'Ingestion',
    status: 'Queued',
    details: 'Ingested 250 webhook batch to Redis Stream "stream:webhooks". Consumer group "celery_fleet" acknowledged 250 messages.',
    durationMs: 2.1,
  },
  {
    id: 'log_05',
    timestamp: '16:13:58.420',
    stage: 'AI Gateway',
    status: '200 OK',
    details: 'Gemini 2.5 Flash returned structured JSON extraction in 184ms. Inline PII filter anonymized 3 email tokens in 2.1ms.',
    durationMs: 186,
  },
  {
    id: 'log_06',
    timestamp: '16:13:42.110',
    stage: 'Database',
    status: '200 OK',
    details: 'VACUUM ANALYZE saas_events completed concurrently. Autovacuum freeze table threshold verified.',
    durationMs: 142,
  },
];

interface ExecutionLogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecutionLogDrawer({ open, onOpenChange }: ExecutionLogDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>('All');

  const filteredLogs = logs.filter((l) => filter === 'All' || l.stage === filter);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 text-[var(--color-text-primary)]">
        <SheetHeader className="border-b border-[var(--color-border)] pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <Terminal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                Live Systems Traces
              </span>
              <span className="text-xs text-emerald-600 font-mono font-bold">
                ● Connected
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setLogs([])}
              className="h-7 text-xs text-[var(--color-text-muted)] hover:text-red-600 px-2"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              <span>Clear</span>
            </Button>
          </div>
          <SheetTitle className="text-lg font-bold">
            Real-Time Backend Trace Logs
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
            Observability traces tracking Redis Stream ingestion, PostgreSQL 16 EXPLAIN queries, PgBouncer slot multiplexing, and AI Gateway failover.
          </SheetDescription>
        </SheetHeader>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-mono overflow-x-auto pb-1">
          {['All', 'Ingestion', 'Database', 'PgBouncer', 'Cache', 'AI Gateway'].map((stage) => (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                filter === stage
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Log Entries List */}
        <div className="space-y-2.5 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <p className="text-[var(--color-text-muted)] italic text-center py-8">
              No trace entries match the selected filter.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[var(--color-text-primary)]">
                      [{log.stage}]
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-xs font-semibold ${
                        log.status === 'Accelerated' || log.status === '200 OK'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : log.status === 'Cached'
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs">
                    <span>{log.durationMs}ms</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {log.details}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
