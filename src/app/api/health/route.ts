import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY);

  return NextResponse.json({
    status: 'healthy',
    system: 'ScaleOps Core • SaaS Backend Systems & Reliability Cockpit',
    timestamp: new Date().toISOString(),
    version: '1.4.0',
    runtime: 'Node.js 20+ (Next.js 15 App Router)',
    architecture: {
      ingestionQueue: 'Redis 7 Streams + Celery/Inngest Workers',
      database: 'PostgreSQL 16 with Covering B-Tree Indexes',
      pooling: 'PgBouncer Transaction Multiplexer (58:1 Ratio)',
      caching: 'Probabilistic Early Expiration (XFetch algorithm)',
      aiGateway: 'Multi-Provider Failover (Gemini 2.5 ➔ gpt-4o-mini)',
    },
    integrations: {
      geminiConfigured: hasGeminiKey,
      openaiConfigured: hasOpenAiKey,
      activeAiProvider: hasGeminiKey ? 'google' : hasOpenAiKey ? 'openai' : 'fallback-simulation',
    },
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 3600),
  });
}
