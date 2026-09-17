'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code2,
  FileText,
  ShieldCheck,
  Layers,
  Terminal,
  Server,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const BLUEPRINTS = {
  docker: {
    title: 'docker-compose.production.yml',
    badge: 'Docker • Local & Staging',
    desc: 'Full backend cluster with FastAPI, PostgreSQL 16, PgBouncer, Redis 7 Streams, Celery Workers, and Prometheus monitoring.',
    code: `version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
    environment:
      - DATABASE_URL=postgresql://app_user:secret@pgbouncer:6432/saas_db
      - REDIS_URL=redis://redis:6379/0
      - CELERY_BROKER_URL=redis://redis:6379/1
    depends_on:
      - pgbouncer
      - redis
    ports:
      - "8000:8000"
    restart: unless-stopped

  worker:
    build: .
    command: celery -A app.core.celery worker --loglevel=info --concurrency=8 -Q webhooks,high_priority
    environment:
      - DATABASE_URL=postgresql://app_user:secret@pgbouncer:6432/saas_db
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - redis
      - pgbouncer
    restart: unless-stopped

  pgbouncer:
    image: edoburu/pgbouncer:latest
    environment:
      - DB_USER=app_user
      - DB_PASSWORD=secret
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=saas_db
      - POOL_MODE=transaction
      - MAX_CLIENT_CONN=1500
      - DEFAULT_POOL_SIZE=25
      - RESERVE_POOL_SIZE=5
    ports:
      - "6432:6432"
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=saas_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    command: >
      postgres -c max_connections=50
               -c shared_buffers=512MB
               -c effective_cache_size=1536MB
               -c work_mem=16MB
               -c maintenance_work_mem=128MB

  redis:
    image: redis:7.2-alpine
    command: redis-server --appendonly yes --maxmemory 512mb --maxmemory-policy volatile-lru
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
  },
  pgbouncer: {
    title: 'pgbouncer.ini (Transaction Pooling)',
    badge: 'Postgres Connection Multiplexer',
    desc: 'Hardened transaction-mode connection pool config preventing connection starvation under 5,000 req/s bursts.',
    code: `[databases]
saas_db = host=postgres port=5432 dbname=saas_db auth_user=app_user

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt

# Transaction pooling multiplexes thousands of web requests into few DB connections
pool_mode = transaction
server_reset_query = DISCARD ALL

# Connection limits
max_client_conn = 1500
default_pool_size = 25
min_pool_size = 5
reserve_pool_size = 5
reserve_pool_timeout = 3.0
max_db_connections = 40

# Timeouts & Keepalive
server_idle_timeout = 600.0
server_connect_timeout = 15.0
server_login_retry = 15.0
query_timeout = 30.0
client_idle_timeout = 120.0
tcp_keepalive = 1
tcp_keepcnt = 5
tcp_keepidle = 30
tcp_keepintvl = 10`,
  },
  terraform: {
    title: 'aws-saas-cluster.tf (Production Infra)',
    badge: 'Terraform • AWS Production',
    desc: 'Production-ready IaC with ECS Fargate autoscaling, Aurora PostgreSQL Serverless v2, and ElastiCache Redis.',
    code: `terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
  }
}

# Aurora PostgreSQL Serverless v2 with Auto-scaling ACUs
resource "aws_rds_cluster" "saas_db" {
  cluster_identifier      = "saas-production-cluster"
  engine                  = "aurora-postgresql"
  engine_version          = "16.1"
  database_name           = "saas_core"
  master_username         = "scaleops_admin"
  manage_master_user_password = true

  serverlessv2_scaling_configuration {
    min_capacity = 0.5
    max_capacity = 8.0
  }

  storage_encrypted   = true
  deletion_protection = true
  skip_final_snapshot = false
}

# Redis 7 ElastiCache Multi-AZ Cluster
resource "aws_elasticache_replication_group" "cache" {
  replication_group_id          = "saas-redis-cluster"
  replication_group_description = "Redis 7 Streams & XFetch Cache"
  node_type                     = "cache.t4g.medium"
  num_cache_clusters            = 2
  parameter_group_name          = "default.redis7"
  port                          = 6379
  automatic_failover_enabled    = true
  at_rest_encryption_enabled    = true
  transit_encryption_enabled    = true
}`,
  },
};

export function BlueprintExporter() {
  const [selectedKey, setSelectedKey] = useState<'docker' | 'pgbouncer' | 'terraform'>('docker');
  const [copied, setCopied] = useState(false);

  const currentBlueprint = BLUEPRINTS[selectedKey];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentBlueprint.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentBlueprint.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = currentBlueprint.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Production Blueprints
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Ready-to-Deploy Codebase Artifacts • Zero Vendor Lock-in
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Systems Architecture &amp; Infrastructure as Code Blueprints
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Export hardened production templates for Docker Compose, PgBouncer connection multiplexing, and Terraform AWS Aurora/Redis clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs border-[var(--color-border)] text-[var(--color-text-primary)]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1 text-[var(--color-text-muted)]" />
                Copy Code
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleDownload}
            className="h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-[var(--color-border)] pb-2">
        <button
          onClick={() => setSelectedKey('docker')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
            selectedKey === 'docker'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
          }`}
        >
          docker-compose.yml
        </button>
        <button
          onClick={() => setSelectedKey('pgbouncer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
            selectedKey === 'pgbouncer'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
          }`}
        >
          pgbouncer.ini
        </button>
        <button
          onClick={() => setSelectedKey('terraform')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
            selectedKey === 'terraform'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
          }`}
        >
          aws-cluster.tf (Terraform)
        </button>
      </div>

      {/* Description & Code Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--color-text-primary)]">{currentBlueprint.title}</span>
            <span className="text-[var(--color-text-muted)] font-mono">• {currentBlueprint.badge}</span>
          </div>
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
            {currentBlueprint.desc}
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[420px] shadow-inner">
          <pre className="leading-relaxed whitespace-pre font-mono">
            <code>{currentBlueprint.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
