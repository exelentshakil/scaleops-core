#!/usr/bin/env python3
"""
30-Day Systems Reliability Blueprint & Architecture Brief Generator
Target: Canadian SaaS Senior Backend Developer ($20-$40/hr, Client avg $50/hr paid)
Track B: Staff Augmentation / Senior Hourly Engineering (ARCHITECTURE_BRIEF.pdf)
Author: Shakil Ahmed (Former Engineering Team Lead at Legiit, Securiti Certified AI Architect)
Engineered for perfect Single-Page Letter Portrait execution via Headless Chrome.
"""

import os
import re
import base64
import subprocess
import sys

def build_brief():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "architecture_brief.html")
    pdf_path = os.path.join(docs_dir, "ARCHITECTURE_BRIEF.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    headshot_b64 = ""
    if os.path.exists(headshot_file):
        with open(headshot_file, "rb") as f:
            headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    logo_b64 = ""
    if os.path.exists(logo_file):
        with open(logo_file, "rb") as f:
            logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>30-Day Systems Reliability Blueprint - Senior Backend Systems Engineer</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 5mm 7.5mm 5mm 7.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.28;
      font-size: 8.8px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 3.5px;
    }}

    /* 1. Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #4338ca;
      padding-bottom: 4px;
    }}
    .brand-left {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .brand-logo {{
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: linear-gradient(135deg, #4338ca, #312e81);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 13px;
      letter-spacing: -0.5px;
    }}
    .brand-text h1 {{
      margin: 0;
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
      text-transform: uppercase;
    }}
    .brand-text p {{
      margin: 0;
      font-size: 7.8px;
      color: #475569;
      font-weight: 600;
    }}
    .header-badges {{
      text-align: right;
    }}
    .role-badge {{
      display: inline-block;
      background: #eef2ff;
      color: #3730a3;
      border: 1px solid #c7d2fe;
      padding: 1.5px 6px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }}
    .doc-subtitle {{
      font-size: 7.5px;
      color: #64748b;
      margin-top: 1.5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}

    /* 2. Executive Profile & Engagement Strip */
    .profile-strip {{
      display: grid;
      grid-template-columns: 3.8fr 1.6fr 1.6fr 1.6fr;
      gap: 4.5px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 4px 6px;
    }}
    .profile-card {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .avatar-img {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #4338ca;
    }}
    .profile-meta h2 {{
      margin: 0;
      font-size: 9.5px;
      font-weight: 800;
      color: #0f172a;
    }}
    .profile-meta p {{
      margin: 0;
      font-size: 7.4px;
      color: #334155;
      line-height: 1.15;
    }}
    .stat-box {{
      border-left: 1px solid #e2e8f0;
      padding-left: 6px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}
    .stat-label {{
      font-size: 7px;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 700;
    }}
    .stat-value {{
      font-size: 9.5px;
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    .stat-sub {{
      font-size: 6.8px;
      color: #10b981;
      font-weight: 600;
    }}

    /* 3. Section Banner */
    .section-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1e1b4b;
      background: #eef2ff;
      border-left: 3px solid #4338ca;
      padding: 2px 5px;
      margin: 0 0 2px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .section-title span.tag {{
      font-size: 7px;
      font-weight: 600;
      color: #4338ca;
      text-transform: none;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}

    /* 4. 4-Week Technical Roadmap Table */
    .roadmap-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 7.8px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
    }}
    .roadmap-table th {{
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 4px;
      text-align: left;
      font-weight: 700;
      font-size: 7.3px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }}
    .roadmap-table td {{
      padding: 3px 4.5px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.22;
    }}
    .roadmap-table tr:nth-child(even) {{
      background: #f8fafc;
    }}
    .week-col {{
      font-weight: 800;
      color: #312e81;
      white-space: nowrap;
      width: 13%;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    .focus-col {{
      font-weight: 700;
      color: #0f172a;
      width: 25%;
    }}
    .actions-col {{
      color: #334155;
      width: 44%;
    }}
    .kpi-col {{
      font-weight: 700;
      color: #047857;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      width: 18%;
      white-space: nowrap;
    }}

    /* 5. Systems Architecture & Engineering Standards Grid */
    .arch-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
    }}
    .arch-card {{
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px 5px;
      background: #ffffff;
    }}
    .arch-card h4 {{
      margin: 0 0 2px 0;
      font-size: 8.2px;
      font-weight: 800;
      color: #1e1b4b;
      display: flex;
      align-items: center;
      gap: 3px;
    }}
    .arch-card p {{
      margin: 0;
      font-size: 7.2px;
      color: #475569;
      line-height: 1.2;
    }}
    .metric-pill {{
      display: inline-block;
      margin-top: 2.5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 7px;
      font-weight: 700;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 3.5px;
      border-radius: 3px;
      border: 1px solid #cbd5e1;
    }}

    /* 6. Operating Model & Engagement Terms */
    .terms-box {{
      display: grid;
      grid-template-columns: 1.8fr 1.2fr 1.4fr;
      gap: 5px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4.5px 6px;
      background: #f8fafc;
    }}
    .terms-item h4 {{
      margin: 0 0 1.5px 0;
      font-size: 7.8px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
    }}
    .terms-item p {{
      margin: 0;
      font-size: 7.2px;
      color: #334155;
      line-height: 1.2;
    }}

    /* 7. Verification & Signature Block */
    .sign-block {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      border-top: 1.5px solid #4338ca;
      padding-top: 4px;
      align-items: flex-end;
    }}
    .sign-col h5 {{
      margin: 0 0 1px 0;
      font-size: 7.2px;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 700;
    }}
    .sign-name {{
      font-size: 8.8px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }}
    .sign-title {{
      font-size: 7px;
      color: #475569;
      margin: 0;
    }}
    .sign-line {{
      border-bottom: 1px solid #cbd5e1;
      height: 10px;
      margin-bottom: 2px;
    }}
    .security-stamp {{
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 6.8px;
      color: #4338ca;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      margin-top: 1px;
    }}
  </style>
</head>
<body>
  <div class="page-container">

    <!-- 1. Executive Header -->
    <div class="header">
      <div class="brand-left">
        <div class="brand-logo">SO</div>
        <div class="brand-text">
          <h1>ScaleOps Core • 30-Day Systems Reliability Blueprint</h1>
          <p>Production Engineering • PostgreSQL 16 Tuning • Async Queues • Connection Pool Architecture</p>
        </div>
      </div>
      <div class="header-badges">
        <div class="role-badge">Senior Backend Systems Engineer</div>
        <div class="doc-subtitle">Role: Staff Augmentation (Hourly) • Client: Canadian SaaS Founder/CTO</div>
      </div>
    </div>

    <!-- 2. Senior Engineer Profile & Engagement Strip -->
    <div class="profile-strip">
      <div class="profile-card">
        {f'<img class="avatar-img" src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed">' if headshot_b64 else '<div class="avatar-img" style="background:#4338ca;"></div>'}
        <div class="profile-meta">
          <h2>Shakil Ahmed • Principal Systems Engineer</h2>
          <p>Former Engineering Team Lead at Legiit (scaled backend architecture to $1M ARR across 1,500+ businesses &amp; 1,000,000+ transactions). Securiti Certified AI Architect.</p>
        </div>
      </div>
      <div class="stat-box">
        <span class="stat-label">Hourly Rate</span>
        <span class="stat-value">$40.00 / hr</span>
        <span class="stat-sub">Client Avg: $50.00/hr</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Weekly Availability</span>
        <span class="stat-value">20–25 hrs / wk</span>
        <span class="stat-sub">EST / EST-Friendly</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Operating Model</span>
        <span class="stat-value">Zero Micromgmt</span>
        <span class="stat-sub">Async Standups &amp; CI</span>
      </div>
    </div>

    <!-- 3. Section: 30-Day Technical Execution Roadmap -->
    <div>
      <div class="section-title">
        <span>Phase 1 Execution: 30-Day Systems Reliability &amp; Performance Roadmap</span>
        <span class="tag">Zero Disruption to Active Users</span>
      </div>
      <table class="roadmap-table">
        <thead>
          <tr>
            <th class="week-col">Timeline</th>
            <th class="focus-col">Strategic Objective</th>
            <th class="actions-col">Concrete Engineering Deliverables</th>
            <th class="kpi-col">Target Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="week-col">Week 1</td>
            <td class="focus-col">Codebase Discovery &amp; Observability Baseline</td>
            <td class="actions-col">Full repository audit (FastAPI/Node), environment inventory, local Docker Compose setup, OpenTelemetry tracing, slow query logging (&gt;200ms), and GitHub Actions CI workflow enforcement.</td>
            <td class="kpi-col">100% CI automated; P99 baseline established</td>
          </tr>
          <tr>
            <td class="week-col">Week 2</td>
            <td class="focus-col">PostgreSQL 16 Profiling &amp; Index Optimization</td>
            <td class="actions-col">Run EXPLAIN (ANALYZE, BUFFERS) on top 5 slowest queries. Replace sequential table scans with composite covering B-Trees. Deploy via <code>CREATE INDEX CONCURRENTLY</code> with zero table locking.</td>
            <td class="kpi-col">112x speedup (428ms ➔ 3.8ms); 0 lockouts</td>
          </tr>
          <tr>
            <td class="week-col">Week 3</td>
            <td class="focus-col">Asynchronous Queues &amp; Ingestion Decoupling</td>
            <td class="actions-col">Decouple high-throughput webhooks and external API sync into Redis Streams &amp; Celery/Inngest workers. Implement exponential backoff retries with jitter and Dead-Letter Queue (DLQ) alerts.</td>
            <td class="kpi-col">5,000 req/s surge; 0 dropped payloads</td>
          </tr>
          <tr>
            <td class="week-col">Week 4</td>
            <td class="focus-col">Connection Pooling, Caching &amp; AI Microservices</td>
            <td class="actions-col">Deploy PgBouncer transaction pooling (multiplexing 1,450 web connections to 25 Postgres slots). Implement XFetch probabilistic early expiration in Redis. Deploy multi-provider AI circuit breaker.</td>
            <td class="kpi-col">0 connection starvation; &lt;500ms AI failover</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 4. Systems Architecture Pillars -->
    <div>
      <div class="section-title">
        <span>Architecture &amp; Resilience Standards Implemented in Live Cockpit</span>
        <span class="tag">Live Verification: scaleops-core.vercel.app</span>
      </div>
      <div class="arch-grid">
        <div class="arch-card">
          <h4>PostgreSQL 16 Buffer Optimization</h4>
          <p>Eliminates runaway AWS RDS IOPS costs by converting 14,200 disk buffer reads into 42 RAM buffer cache hits through selective partial and composite B-Tree indexes.</p>
          <span class="metric-pill">P99 Query: 3.8ms • Zero Table Locks</span>
        </div>
        <div class="arch-card">
          <h4>PgBouncer Connection Multiplexing</h4>
          <p>Prevents <code>FATAL: too many connections</code> under high concurrency by recycling lightweight transaction connections into a pooled 25-slot database backend.</p>
          <span class="metric-pill">58:1 Ratio • 14MB RAM Overhead</span>
        </div>
        <div class="arch-card">
          <h4>Redis XFetch Stampede Shield</h4>
          <p>Replaces dangerous hard-TTL key expiration with probabilistic early recomputation, ensuring exactly 1 worker refreshes hot keys while all clients read warm cache.</p>
          <span class="metric-pill">0 DB Spike Events • 92% Cache Hit Ratio</span>
        </div>
      </div>
    </div>

    <!-- 5. Staff Augmentation Operating Contract -->
    <div>
      <div class="section-title">
        <span>Staff Augmentation Operating Contract &amp; Autonomous Standards</span>
        <span class="tag">Upwork Hourly Contract Structure</span>
      </div>
      <div class="terms-box">
        <div class="terms-item">
          <h4>Zero Micromanagement Execution</h4>
          <p>Self-directed backlog prioritization, atomic Git branches, strict typing, passing lint/test suites, and detailed daily async standup summaries posted to Slack/ClickUp.</p>
        </div>
        <div class="terms-item">
          <h4>Communication &amp; Sync Cadence</h4>
          <p>Overlapping core hours in North American timezone (EST). 4-hour PR review SLA. Available for weekly sprint demos or technical architectural syncs as needed.</p>
        </div>
        <div class="terms-item">
          <h4>Transparent Hourly Billing</h4>
          <p>Tracked via Upwork Desktop App (or manual time if authorized). Detailed work notes per memo. Calibrated at $40.00/hr (aligned with client's $50/hr historical average).</p>
        </div>
      </div>
    </div>

    <!-- 6. Verification & Mutual Authorization Signatures -->
    <div class="sign-block">
      <div class="sign-col">
        <h5>Prepared By Senior Backend Systems Engineer</h5>
        <div class="sign-line"></div>
        <p class="sign-name">Shakil Ahmed</p>
        <p class="sign-title">Principal Systems Architect • Former Lead Systems Engineer at Legiit</p>
        <div class="security-stamp">
          <span>🛡️ Securiti Certified AI Architect • Verified Upwork Partner</span>
        </div>
      </div>
      <div class="sign-col">
        <h5>Accepted &amp; Authorized For Client Engagement</h5>
        <div class="sign-line"></div>
        <p class="sign-name">Hiring Executive / CTO</p>
        <p class="sign-title">SaaS Platform Core Infrastructure Engineering (Canada)</p>
        <div class="security-stamp">
          <span>Engagement Scope: 20–25 hrs/week @ $40.00/hr (Hourly Contract)</span>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
"""

    with open(html_path, "w") as f:
        f.write(html_content)
    print(f"Wrote HTML blueprint to: {html_path}")

    # Generate PDF via Google Chrome
    chrome_bins = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "google-chrome",
        "chromium",
    ]

    chrome_bin = None
    for b in chrome_bins:
        if os.path.exists(b):
            chrome_bin = b
            break

    if not chrome_bin:
        print("Chrome binary not found on standard paths.")
        return

    cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={pdf_path}",
        "--no-pdf-header-footer",
        html_path,
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Successfully compiled PDF to: {pdf_path}")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)

if __name__ == "__main__":
    build_brief()
