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
                v1.4 Production Systems
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              High-throughput asynchronous ingestion, PostgreSQL 16 performance engineering, PgBouncer connection multiplexing, and AI gateway circuit breaker architecture for mission-critical SaaS platforms.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Cluster Health: Nominal
              </span>
              <span>•</span>
              <span>NIST AI RMF &amp; OWASP LLM01 Governed</span>
              <span>•</span>
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
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Shakil Ahmed</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Former Engineering Team Lead at Legiit. Scaled core backend architecture to $1M ARR across 1,500+ businesses and 1,000,000+ transactions.
              </p>
              <div className="pt-1.5 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400">
                <span>Securiti Certified AI Architect</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] font-mono gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ScaleOps Core • SaaS Backend Reliability Infrastructure</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#pipeline" className="hover:text-[var(--color-text-primary)] transition-colors">
              Queue Ingestion
            </a>
            <a href="#database" className="hover:text-[var(--color-text-primary)] transition-colors">
              PostgreSQL Tuning
            </a>
            <a href="#resilience" className="hover:text-[var(--color-text-primary)] transition-colors">
              Connection Pool
            </a>
            <a href="#ai-gateway" className="hover:text-[var(--color-text-primary)] transition-colors">
              AI Microservice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
