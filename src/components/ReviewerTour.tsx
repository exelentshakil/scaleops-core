'use client';

import React, { useState } from 'react';
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Database,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Zap,
  Server,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewerTourProps {
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
}

export function ReviewerTour({ onNavigate, onOpenChaosModal }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: 'pipeline',
      badge: 'Step 1 • Concurrency',
      title: 'Queue Autoscaling & Ingestion',
      desc: 'Inject 5,000 webhook events/sec to verify Celery/Inngest worker concurrency, backoff retries, and zero dropped payloads.',
      actionLabel: 'Test Queue Scaling',
      icon: Activity,
    },
    {
      id: 'database',
      badge: 'Step 2 • SQL Profiling',
      title: 'PostgreSQL Indexing Lab',
      desc: 'Benchmark 112x query acceleration: converting 428ms disk-heavy sequential scans into 3.8ms composite B-Tree lookups.',
      actionLabel: 'Inspect Query Profiler',
      icon: Database,
    },
    {
      id: 'resilience',
      badge: 'Step 3 • Concurrency Guard',
      title: 'PgBouncer & Cache Stampedes',
      desc: 'Multiplex 1,450 concurrent web connections onto 25 Postgres slots, backed by XFetch probabilistic cache refreshing.',
      actionLabel: 'Inspect Connection Pool',
      icon: Layers,
    },
    {
      id: 'ai-gateway',
      badge: 'Step 4 • AI Microservice',
      title: 'AI Circuit Breaker & Guardrails',
      desc: 'Test real-time model failover (Gemini 2.5 ➔ OpenAI), inline PII anonymization, and OWASP LLM01 injection defense.',
      actionLabel: 'Test AI Gateway',
      icon: Cpu,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 sm:p-6 shadow-xs transition-all">
      {/* Top Banner Header with Problem-Solution Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
              <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Senior Backend Systems Verification
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Reliability-First Architecture
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate This SaaS Backend &amp; Core Infrastructure Cockpit
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl leading-relaxed">
            Built by Shakil Ahmed (former Lead Systems Engineer at Legiit, scaling an AI Command Center to $1M ARR across 1,500+ businesses). Demonstrates production engineering depth across high-throughput queues, PostgreSQL query tuning, connection pooling, and resilient AI gateways.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs font-medium border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] whitespace-nowrap shrink-0 shadow-xs"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand Briefing
              </>
            ) : (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse Briefing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Evaluation Paths */}
      {!isCollapsed && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 transition-all hover:border-slate-400 hover:bg-[var(--color-surface)] shadow-xs hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shrink-0 shadow-xs">
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1.5">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Contrast Command Console Summary Strip: Perfectly Balanced Mobile & Desktop */}
          <div className="rounded-xl bg-slate-950 text-white p-3.5 sm:p-4 shadow-card border border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
            
            {/* Header on mobile (full-width), inline prefix on desktop */}
            <div className="sm:hidden flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-mono font-bold text-indigo-300 uppercase tracking-wider text-[11px] whitespace-nowrap shrink-0">
                Engineering Standards
              </span>
            </div>

            {/* Content Area: 2-Column on Mobile (Pills Left + SLA Blurb Right), Inline Flow on Desktop */}
            <div className="flex items-stretch justify-between gap-3 sm:items-center sm:gap-3.5 flex-1 min-w-0">
              
              {/* Left Side: Desktop Header + Micro-Pills */}
              <div className="space-y-1.5 sm:space-y-0 sm:flex sm:items-center sm:gap-3 flex-1 min-w-0">
                {/* Desktop-only Header */}
                <div className="hidden sm:flex items-center gap-2.5 shrink-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-xs">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono font-bold text-indigo-300 uppercase tracking-wider text-[11px] whitespace-nowrap shrink-0">
                    Engineering Standards
                  </span>
                </div>

                {/* Standards Micro-Pills: Vertical Stack on Mobile, Inline Flow on Desktop */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 text-xs">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    Zero Micromanagement
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    Modular Tested PRs
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-[10px] sm:text-[11px] font-mono whitespace-nowrap w-fit">
                    Daily Async Notes
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-[10px] sm:text-[11px] font-mono font-semibold whitespace-nowrap w-fit">
                    Zero-Downtime Deploys
                  </span>
                </div>
              </div>

              {/* Right Side: Big Icon SLA Trust Blurb (Balances Mobile Void, Compact on Desktop) */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-b from-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xs shrink-0 w-28 sm:w-auto text-center self-stretch sm:self-auto sm:flex-row sm:gap-2">
                <div className="relative flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-1 sm:mb-0 shrink-0">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="space-y-0.5 sm:space-y-0 sm:text-left">
                  <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider leading-none">
                    Active SLA
                  </div>
                  <div className="text-xs sm:text-[11px] font-mono font-extrabold text-white leading-tight">
                    99.99%
                  </div>
                  <div className="text-[9px] font-mono text-emerald-300/80 leading-none sm:hidden">
                    Guaranteed
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button: Full-width on mobile, compact on desktop */}
            <Button
              size="sm"
              onClick={onOpenChaosModal}
              className="h-8 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs whitespace-nowrap shrink-0 border border-indigo-500/40 w-full sm:w-auto justify-center"
            >
              <Zap className="h-3.5 w-3.5 mr-1 text-indigo-200" />
              <span>Chaos Injection</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
