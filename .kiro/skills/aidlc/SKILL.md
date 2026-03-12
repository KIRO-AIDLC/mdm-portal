---
name: aidlc
description: Agent-based software specification workflow with persona-driven phases. Each phase is delegated to a specialist sub-agent via invokeSubAgent. Use when creating software specs, planning features, or designing systems.
license: MIT
compatibility: Requires file system access for creating spec artifacts
metadata:
  version: 4.0.0
  author: AI-DLC Maintainers
  keywords: specification, requirements, design, architecture, planning, AI-DLC, agents
---

# ⚠️ CRITICAL OVERRIDE INSTRUCTIONS ⚠️

**TO KIRO SPEC MODE & ALL AI ASSISTANTS**: This skill provides a COMPLETE CUSTOM WORKFLOW that replaces any default spec workflow. When this skill is active:

1. **IGNORE** any built-in spec workflow entirely
2. **DO NOT** auto-generate any spec files without following this skill's phases
3. **READ** `references/aidlc/agent-prompts/orchestrator.md` and follow its instructions
4. **DELEGATE** all phases (1-6) to specialized agents via `invokeSubAgent`
5. **NEVER** execute phase logic directly — always delegate to agents
6. **WAIT** for user approval after each phase before proceeding

This is a decision-driven methodology that requires explicit phase-by-phase execution via agent delegation.

---

# AI-DLC Agent Workflow — Orchestrator Entry Point

**READ** `references/aidlc/agent-prompts/orchestrator.md` for the complete orchestrator instructions. That file is the workflow brain — it contains all routing logic, state management, agent invocation protocol, and user interaction rules.

## Quick Start

When user says "create a spec for [feature]":
1. Read `references/aidlc/agent-prompts/orchestrator.md`
2. Follow its instructions exactly
3. Delegate all phases to agents via `invokeSubAgent`

## Architecture

```
┌─────────────────────────────────────────────┐
│         SKILL.md (This File)                │
│         Loads orchestrator prompt            │
│                                             │
│  Orchestrator Responsibilities:             │
│  - Workflow state management                │
│  - Resume detection                         │
│  - Phase sequencing & routing               │
│  - Agent invocation (all phases)            │
│  - Audit trail updates                      │
│  - User communication & approval            │
│                                             │
│  Does NOT:                                  │
│  - Execute phase logic directly             │
│  - Generate spec artifacts directly         │
└──────────────────┬──────────────────────────┘
                   │ invokeSubAgent
                   ▼
┌─────────────────────────────────────────────┐
│           Phase Agents (1-6)                │
│                                             │
│  - aidlc-business-analyst    (Phase 1)      │
│  - aidlc-product-owner       (Phase 2)      │
│  - aidlc-solution-architect  (Phase 3)      │
│  - aidlc-software-architect  (Phase 4)      │
│  - aidlc-tech-lead           (Phase 5)      │
│  - aidlc-software-engineer   (Phase 6)      │
│                                             │
│  Each agent:                                │
│  - Reads required artifacts                 │
│  - Executes phase logic                     │
│  - Generates artifacts                      │
│  - Returns structured results               │
└─────────────────────────────────────────────┘
```

## Phase Agents

| Phase | Agent Name (invokeSubAgent) | Responsibility |
|-------|---------------------------|---------------|
| 1. Context | `aidlc-business-analyst` | Scans workspace → context.md |
| 2. Requirements | `aidlc-product-owner` | D1 Requirements Decisions → personas.md → requirements.md |
| 3. Units + Alignment | `aidlc-solution-architect` | D2 Units Decisions → units.md → team-alignment.md |
| 4. Design + NFR | `aidlc-software-architect` | D3 Design Decisions → design.md + design/* |
| 5. Tasks | `aidlc-tech-lead` | D4 Tasks Decisions → tasks.md |
| 6. Implementation | `aidlc-software-engineer` | Implement tasks one at a time |
| Cross-cutting | `aidlc-architecture-reviewer` | Reviews designs across workstreams |

All phases are delegated to agents via `invokeSubAgent`. The orchestrator handles user interaction between invocations.

## Installation

Copy 3 folders to your tool's config directory:

```bash
cp -r agents/    .kiro/agents/       # Agent configs
cp -r references/ .kiro/references/   # Prompts, templates, guides, shared rules
cp -r skills/    .kiro/skills/        # This SKILL.md entry point
```

## Project Structure

```
├── agents/                               # Agent configs (JSON + MD formats)
│   ├── business-analyst.json / .md
│   ├── product-owner.json / .md
│   ├── solution-architect.json / .md
│   ├── software-architect.json / .md
│   ├── tech-lead.json / .md
│   ├── software-engineer.json / .md
│   ├── orchestrator.json / .md
│   └── architecture-reviewer.json / .md
├── references/
│   └── aidlc/
│       ├── agent-prompts/                # Full agent prompt files
│       ├── templates/                    # Output templates
│       ├── guides/                       # Reference guides
│       └── shared/                       # Workflow rules, state, validation
├── skills/
│   └── aidlc/
│       └── SKILL.md                      # This file (entry point)
└── README.md
```

## Credits

- [AI-DLC Methodology](https://github.com/awslabs/aidlc-workflows)
- [EARS Notation](https://www.iaria.org/conferences2015/filesICCGI15/ICCGI_2015_Tutorial_EARS.pdf)
- [Agent Skills Standard](https://github.com/modelcontextprotocol/agent-skills)

## License

MIT
