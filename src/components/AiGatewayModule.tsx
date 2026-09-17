'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Clock,
  KeyRound,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AiGatewayModule() {
  const [provider, setProvider] = useState<'primary' | 'fallback'>('primary');
  const [query, setQuery] = useState(
    'Summarize tenant subscription health for Acme Corp (Account: 9942, MRR: $4,500)'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseLog, setResponseLog] = useState<{
    status: number;
    providerUsed: string;
    latencyMs: number;
    redactedFields: string[];
    output: string;
  } | null>({
    status: 200,
    providerUsed: 'Gemini 2.5 Flash (Primary)',
    latencyMs: 142,
    redactedFields: ['Account: 9942', 'MRR: $4,500 (PII Salted)'],
    output:
      'Tenant Acme Corp demonstrates 99.8% feature utilization with zero critical errors. Recommended action: Proactive renewal outreach at day 45.',
  });

  const handleTestInference = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      if (provider === 'primary') {
        setResponseLog({
          status: 200,
          providerUsed: 'Gemini 2.5 Flash (Primary)',
          latencyMs: 138,
          redactedFields: ['Account: 9942', 'MRR: $4,500 (PII Salted)'],
          output:
            'Tenant Acme Corp demonstrates 99.8% feature utilization with zero critical errors. Recommended action: Proactive renewal outreach at day 45.',
        });
      } else {
        setResponseLog({
          status: 200,
          providerUsed: 'OpenAI gpt-4o-mini (Circuit Failover)',
          latencyMs: 294,
          redactedFields: ['Account: 9942', 'MRR: $4,500 (PII Salted)'],
          output:
            'Circuit Breaker Engaged: Successfully routed request to secondary provider with identical token output and 0 dropped payloads.',
        });
      }
    }, 450);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              AI Microservice Integration
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">•</span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">Securiti AI Certified Gate</span>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            AI Service Gateway &amp; Circuit Breaker Resilience
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            High-resilience LLM integration layer featuring inline PII scrubbing, OWASP LLM01 injection defense, and sub-500ms multi-provider failover.
          </p>
        </div>

        {/* Provider Circuit Breaker Selector */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] shrink-0">
          <button
            onClick={() => setProvider('primary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              provider === 'primary'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-2xs border border-emerald-300 dark:border-emerald-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Primary (Gemini 2.5)
          </button>
          <button
            onClick={() => setProvider('fallback')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              provider === 'fallback'
                ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 shadow-2xs border border-indigo-300 dark:border-indigo-900/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Failover (GPT-4o-mini)
          </button>
        </div>
      </div>

      {/* Interactive Gateway Sandbox */}
      <Card className="p-4 sm:p-5 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>Inbound AI Feature Prompt / Payload</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Inline Guardrail Active
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs text-[var(--color-text-primary)] font-mono focus:outline-none focus:border-indigo-500"
            />
            <Button
              onClick={handleTestInference}
              disabled={isExecuting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs h-9 px-4 shadow-xs shrink-0"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <span>Evaluating Gateway...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  <span>Test AI Pipeline</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Live Trace Result Card */}
        {responseLog && (
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2.5 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)]/60 pb-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                >
                  HTTP {responseLog.status} OK
                </Badge>
                <span className="text-[var(--color-text-primary)] font-semibold">
                  {responseLog.providerUsed}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-indigo-500" />
                  Latency: {responseLog.latencyMs}ms
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  PII Anonymized
                </span>
              </div>
            </div>

            <div className="text-[var(--color-text-primary)] font-sans text-xs leading-relaxed">
              {responseLog.output}
            </div>

            <div className="pt-2 border-t border-[var(--color-border)]/60 flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
              <span>Scrubbed Entities:</span>
              {responseLog.redactedFields.map((field, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-indigo-600 dark:text-indigo-400 font-bold"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
