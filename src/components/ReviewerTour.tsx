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
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xs transition-all">
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

          {/* High-Contrast Command Console Summary Strip */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5 rounded-xl bg-slate-900 text-white p-3.5 sm:p-4 shadow-card border border-slate-800">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
                <span className="font-mono font-bold text-indigo-400 uppercase tracking-wider text-[11px] shrink-0">
                  Engineering Standards:
                </span>
                <span className="text-slate-200 font-medium whitespace-nowrap">Zero Micromanagement</span>
                <span className="text-slate-600 select-none">•</span>
                <span className="text-slate-200 font-medium whitespace-nowrap">Modular Tested PRs</span>
                <span className="text-slate-600 select-none">•</span>
                <span className="text-slate-200 font-medium whitespace-nowrap">Daily Async Notes</span>
                <span className="text-slate-600 select-none">•</span>
                <span className="text-emerald-400 font-medium whitespace-nowrap">Zero-Downtime Deploys</span>
              </div>
            </div>

            <Button
              size="sm"
              onClick={onOpenChaosModal}
              className="h-8 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs whitespace-nowrap shrink-0 border border-indigo-500/40"
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
