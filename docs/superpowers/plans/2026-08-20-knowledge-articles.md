# Knowledge Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a five-topic knowledge page containing six source-grounded frontend articles and twelve source-grounded AI articles, with accurate empty-topic and deep-article rendering.

**Architecture:** `data/knowledge-public.json` remains the public content source and `knowledge/index.html` remains the renderer. A temporary Python contract test validates topic boundaries, article structure, privacy constraints, and page behavior before and after implementation; no test artifact is committed.

**Tech Stack:** Static HTML/CSS/JavaScript, JSON, Python 3 contract tests, GitHub Pages.

---

### Task 1: Lock the public data contract

**Files:**
- Create temporarily: `/private/tmp/test_knowledge_contract.py`
- Modify: `data/knowledge-public.json`

- [ ] **Step 1: Write the failing contract test**

Create a standard-library Python test that asserts: topic IDs equal `frontend`, `health`, `psychology`, `relationship`, `ai`; every topic has a non-empty `intro`; there are six frontend and twelve AI entries; other topics have no fabricated entries; IDs are unique; each article has a lede and at least four sections; each article contains at least one boundary/误区 section and one conclusion/判断 section; serialized public JSON contains no local path, ChatGPT conversation URL, old topic IDs, “长期问题”, or known internal project names.

- [ ] **Step 2: Run the contract test and verify RED**

Run: `python3 /private/tmp/test_knowledge_contract.py`

Expected: FAIL because the current JSON has eight old topics, six short entries, no `intro` field, and old topic IDs.

- [ ] **Step 3: Replace the public data with the five-topic model and 18 articles**

Write `profile`, five ordered `topics`, and eighteen `featured` entries. Each article follows: question and concept boundary; mechanism; concrete example or counterexample; engineering consequence; limitations or misconception; conclusion. Use the approved source mapping from `docs/superpowers/specs/2026-08-20-knowledge-articles-design.md` and remove unused relationship-map data.

- [ ] **Step 4: Run the contract test and verify GREEN**

Run: `python3 /private/tmp/test_knowledge_contract.py`

Expected: `OK: knowledge data contract passed`.

### Task 2: Lock empty-topic and topic-introduction behavior

**Files:**
- Modify temporarily: `/private/tmp/test_knowledge_contract.py`
- Modify: `knowledge/index.html`

- [ ] **Step 1: Extend the test for renderer behavior**

Assert the HTML renders all topics rather than filtering to topics with articles, contains a `topicIntro` output, has an explicit empty-topic branch, does not replace an empty requested topic with the first populated topic, maps topic IDs to display names in article metadata, and handles `popstate` for browser navigation.

- [ ] **Step 2: Run the renderer test and verify RED**

Run: `python3 /private/tmp/test_knowledge_contract.py`

Expected: FAIL because the current renderer filters empty topics, falls back to the first populated topic, and exposes topic IDs in metadata.

- [ ] **Step 3: Implement minimal renderer changes**

Add a quiet topic introduction below the chip strip; render all five topic chips; render an empty sidebar and empty main article without changing the requested topic; display the topic name in metadata; keep invalid item IDs scoped to the selected topic; reuse `loadKnowledge()` for `popstate`; retain existing responsive layout and focus behavior.

- [ ] **Step 4: Run the renderer and data tests and verify GREEN**

Run: `python3 /private/tmp/test_knowledge_contract.py`

Expected: `OK: knowledge data contract passed`.

### Task 3: Validate content, markup, and repository scope

**Files:**
- Verify: `data/knowledge-public.json`
- Verify: `knowledge/index.html`

- [ ] **Step 1: Parse JSON independently**

Run: `python3 -m json.tool data/knowledge-public.json >/dev/null`

Expected: exit 0.

- [ ] **Step 2: Check privacy and obsolete concepts**

Run searches for `/Users/`, `chatgpt.com/c/`, internal project names, `长期问题`, and old topic IDs in the public JSON and renderer.

Expected: no public content leaks and no obsolete topic model.

- [ ] **Step 3: Check HTML/JS static invariants**

Verify `topicIntro`, five-topic rendering, empty state, escaped dynamic article content, load failure state, `popstate`, and no reintroduction of deleted old-module copy.

- [ ] **Step 4: Check diff scope and whitespace**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; only the plan plus `data/knowledge-public.json` and `knowledge/index.html` are uncommitted.

### Task 4: Commit, deploy, and verify GitHub Pages

**Files:**
- Commit: `docs/superpowers/plans/2026-08-20-knowledge-articles.md`
- Commit: `data/knowledge-public.json`
- Commit: `knowledge/index.html`

- [ ] **Step 1: Commit the implementation**

Run: `git add docs/superpowers/plans/2026-08-20-knowledge-articles.md data/knowledge-public.json knowledge/index.html && git commit -m "feat: publish deep knowledge articles"`

Expected: one commit containing the plan, data, and renderer.

- [ ] **Step 2: Push master**

Run: `git push origin master`

Expected: remote accepts the new commits.

- [ ] **Step 3: Check the Pages workflow**

Run: `gh run list -R wasaisai/wasaisai.github.io --limit 5 --json databaseId,displayTitle,status,conclusion,headSha,workflowName`

Expected: the workflow for the implementation commit reaches `completed/success`.

- [ ] **Step 4: Verify the live page and data**

Fetch `https://wasaisai.github.io/data/knowledge-public.json` and `https://wasaisai.github.io/knowledge/`; confirm valid JSON, five topic names, article titles, topic introduction hook, and no stale “长期问题” content.

