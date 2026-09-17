'use client';

import React from 'react';
import {
  ShieldCheck,
  Server,
  Database,
  Layers,
  Cpu,
  Award,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Systems Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-black text-sm shadow-xs">
                <Server className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
                ScaleOps Core
              </span>
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                v1.6 Production Systems
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              High-throughput asynchronous ingestion, PostgreSQL 16 performance engineering, PgBouncer connection multiplexing, and AI gateway circuit breaker architecture for mission-critical SaaS platforms.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                Cluster Health: Nominal
              </span>
              <span className="text-[var(--color-border)] select-none">•</span>
              <span>NIST AI RMF &amp; OWASP LLM01</span>
              <span className="text-[var(--color-border)] select-none">•</span>
              <span>100% Client Codebase Ownership</span>
            </div>
          </div>

          {/* Architecture Stack */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Systems Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)] font-mono">
              <li>Python / FastAPI &amp; Node.js Services</li>
              <li>PostgreSQL 16 + Covering B-Tree Indexes</li>
              <li>PgBouncer Connection Pooling (58:1)</li>
              <li>Redis 7 Streams &amp; XFetch Stampede Shield</li>
              <li>Celery &amp; Inngest Distributed Workers</li>
              <li>Multi-Provider AI Gateway &amp; PII Filter</li>
            </ul>
          </div>

          {/* Principal Systems Architect Verification */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Principal Systems Architect
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Shakil Ahmed</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Former Engineering Team Lead at Legiit. Scaled core backend architecture to $1M ARR across 1,500+ businesses and 1,000,000+ transactions.
              </p>
              <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Securiti Certified AI Architect</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] font-mono gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-center md:text-left">
            <span>© {new Date().getFullYear()} ScaleOps Core</span>
            <span className="text-[var(--color-border)] select-none">•</span>
            <span>SaaS Backend Reliability Infrastructure</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <a href="#pipeline" className="hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              Queue Ingestion
            </a>
            <span className="text-[var(--color-border)] select-none hidden sm:inline">•</span>
            <a href="#database" className="hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              PostgreSQL Tuning
            </a>
            <span className="text-[var(--color-border)] select-none hidden sm:inline">•</span>
            <a href="#resilience" className="hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              Connection Pool
            </a>
            <span className="text-[var(--color-border)] select-none hidden sm:inline">•</span>
            <a href="#ai-gateway" className="hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              AI Microservice
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
