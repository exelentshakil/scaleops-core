#!/usr/bin/env python3
"""
Wrapper linking build_architecture_brief.py directly to the canonical build_estimate_html.py engine.
Guarantees 100% adherence to the 6 direct flex children rule, zero middle void, and canonical template.
"""
from build_estimate_html import build_estimate

if __name__ == "__main__":
    build_estimate()
