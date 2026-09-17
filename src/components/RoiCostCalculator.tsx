'use client';

import React, { useState } from 'react';
import {
  Calculator,
  TrendingDown,
  Server,
  Database,
  Layers,
  Zap,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RoiCostCalculator() {
  const [monthlyRequests, setMonthlyRequests] = useState<number>(25); // In millions
  const [dbInstanceTier, setDbInstanceTier] = useState<'oversized' | 'optimized'>('optimized');
  const [cacheEnabled, setCacheEnabled] = useState<boolean>(true);

  // Unoptimized infrastructure baseline
  // Without PgBouncer and without composite indexes, a SaaS processing 25M req/month
  // requires an expensive db.r6g.4xlarge ($1,840/mo), runaway ECS/Lambda concurrency ($920/mo),
  // and unthrottled external AI API retries ($650/mo) = ~$3,410/mo.
  const unoptimizedDbCost = Math.round(monthlyRequests * 72); // $1,800 at 25M
  const unoptimizedComputeCost = Math.round(monthlyRequests * 38); // $950 at 25M
  const unoptimizedAiCost = Math.round(monthlyRequests * 26); // $650 at 25M
  const totalUnoptimized = unoptimizedDbCost + unoptimizedComputeCost + unoptimizedAiCost;

  // Optimized infrastructure with ScaleOps Core patterns:
  // - PgBouncer allows downsizing to db.t4g.xlarge ($240/mo)
  // - Composite covering indexes reduce CPU wait from 85% to 12%
  // - Redis XFetch caching handles 92% of read queries ($140/mo)
  // - Celery batching eliminates redundant ECS concurrency ($310/mo)
  // - AI Gateway deduplication & token compression ($280/mo)
  const optimizedDbCost = Math.round(monthlyRequests * 11); // $275 at 25M
  const optimizedComputeCost = Math.round(monthlyRequests * 14); // $350 at 25M
  const optimizedAiCost = Math.round(monthlyRequests * 12); // $300 at 25M
  const totalOptimized = optimizedDbCost + optimizedComputeCost + optimizedAiCost;

  const monthlySavings = totalUnoptimized - totalOptimized;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Calculator className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Infrastructure Economics
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Cloud Cost Modeling • PostgreSQL &amp; Concurrency Right-Sizing
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Infrastructure Right-Sizing &amp; Cloud Cost Reduction Calculator
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            How composite indexes, PgBouncer connection multiplexing, and Redis XFetch caching eliminate runaway AWS RDS and serverless compute bills.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[var(--color-text-muted)] font-mono block">
            Annual Cloud Savings
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ${annualSavings.toLocaleString()}/yr
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Monthly Request Slider */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Monthly SaaS API Volume:
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                {monthlyRequests} Million Requests
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={monthlyRequests}
              onChange={(e) => setMonthlyRequests(Number(e.target.value))}
              className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
              <span>5M req/mo</span>
              <span>50M req/mo</span>
              <span>100M req/mo</span>
            </div>
          </div>

          {/* Database & Caching Toggles */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono block">
              Architectural Controls
            </span>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  PgBouncer + Index Optimization
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Allows 4x smaller RDS instance size
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  Redis XFetch Cache Defense
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  92% database read query offloading
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                ENABLED
              </span>
            </div>
          </div>

          {/* Infrastructure ROI Payback Time */}
          <div className="rounded-xl bg-slate-900 text-white p-3.5 text-xs space-y-1.5 border border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Infrastructure Optimization Payback: &lt; 30 Days</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              By slashing database CPU wait times from 85% to 14% and offloading 92% of read traffic via Redis XFetch, this architecture eliminates runaway AWS RDS instance sizing and cloud compute waste immediately upon deployment.
            </p>
          </div>
        </div>

        {/* Cost Comparison Visualizer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Monthly Infrastructure Spend Comparison
            </span>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <TrendingDown className="h-3.5 w-3.5" />
              <span>-${monthlySavings.toLocaleString()}/mo Net Reduction</span>
            </div>
          </div>

          {/* Unoptimized Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)] font-medium">
                Unoptimized Architecture (Oversized RDS + Runaway Concurrency):
              </span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                ${totalUnoptimized.toLocaleString()}/mo
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
              <span>RDS: ${unoptimizedDbCost}/mo</span>
              <span>Compute/Workers: ${unoptimizedComputeCost}/mo</span>
              <span>AI API Retries: ${unoptimizedAiCost}/mo</span>
            </div>
          </div>

          {/* Optimized Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-primary)] font-bold">
                ScaleOps Core Architecture (PgBouncer + Composite B-Trees + XFetch):
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ${totalOptimized.toLocaleString()}/mo
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((totalOptimized / totalUnoptimized) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-emerald-700 dark:text-emerald-300 font-mono">
              <span>RDS: ${optimizedDbCost}/mo</span>
              <span>Compute/Workers: ${optimizedComputeCost}/mo</span>
              <span>AI Gateway: ${optimizedAiCost}/mo</span>
            </div>
          </div>

          {/* Key Deliverables Summary */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-border)] text-center">
            <div className="rounded-lg bg-[var(--color-surface)] p-2 border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono block">CPU Saturation</span>
              <span className="text-xs font-bold text-emerald-600 font-mono">85% ➔ 14%</span>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] p-2 border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono block">P99 DB Latency</span>
              <span className="text-xs font-bold text-emerald-600 font-mono">428ms ➔ 3.8ms</span>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] p-2 border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono block">Max Concurrency</span>
              <span className="text-xs font-bold text-indigo-600 font-mono">5,000 req/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
