#!/usr/bin/env python3
"""Build the public knowledge-map JSON from a private local source file.

The source file is intentionally kept outside the GitHub Pages repo so private
ChatGPT exports and personal notes are not committed by accident.
"""
from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
PRIVATE_ROOT = Path.home() / "Documents" / "我的IP知识库"
SOURCE = PRIVATE_ROOT / "20-公开发布" / "knowledge-public.json"
TARGET = REPO_ROOT / "data" / "knowledge-public.json"

REQUIRED_KEYS = {"profile", "topics", "links", "timeline", "rules"}


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing public source: {SOURCE}")

    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    missing = REQUIRED_KEYS - set(data)
    if missing:
        raise SystemExit(f"Missing required key(s): {', '.join(sorted(missing))}")

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {TARGET}")


if __name__ == "__main__":
    main()
