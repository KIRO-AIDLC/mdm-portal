# Workflow Rules

All rules for the AI-DLC workflow: language, presentation, validation, feedback, and silent operations.

---

## 1. Language Rule

Detect user's language from their first message. Store as ISO 639-1 code in `.workflow-state.json`.

**FROM THIS POINT FORWARD**:
- Every chat message you send → user's language
- Every markdown file you generate → user's language
- Every question you ask → user's language
- Every label, header, description → user's language

**EXCEPTIONS** (keep in English/original):
- File paths, directory names, URLs
- Code examples, snippets, SQL queries
- API endpoint paths, HTTP methods
- Technology names (React, Node.js, PostgreSQL, AWS)
- Technical identifiers (variable names, function names, class names)
- Database schema definitions (table names, column names)
- Configuration keys (JSON, YAML)
- Story IDs (US-001), Task IDs (T-001), version numbers

**If unsure about language** → ask user to confirm.

**VIOLATION OF THIS RULE = WORKFLOW FAILURE.**

### Detection Priority
1. Explicit user specification ("Please use Thai" / "ใช้ภาษาไทย")
2. User's first message language (80%+ of text)
3. Conversation context (last 2-3 messages)
4. State file (if resuming)
5. Default: English

### Language Switching
User can change language anytime. When detected:
1. Update `.workflow-state.json` immediately
2. Confirm in new language
3. Offer to regenerate current phase
4. Continue in new language

---

## 2. Presentation Pattern

### Core Format

All phase presentations follow:

```
📍 [Phase Name]: [Sub-phase] ([X] of 6 phases)

[Summary of what was generated]

**[Key Metric 1]**: [Value]
**[Key Metric 2]**: [Value]

The [artifact type] is in `[file path]`.

---
🔲 **Your turn**:
- ✅ "proceed" — move to [next phase name]
- ✏️ "change [what]" — request edits to the [artifact]
```

### Decision Gate Format

```
📍 [Phase Name]: [Gate Name] ([X] of 6 phases)

I've generated the decisions file at `[path]`.

The decision topics covered:
- [Topic 1 name]
- [Topic 2 name]

---
🔲 **Your turn**:
- 📝 Open `[path]`, fill in your answers, then say "done"
- 🤖 "use recommendations" — I'll fill with recommended options for your review
```

### Progress Indicators

Always use: `📍 [Phase Name]: [Sub-phase] ([X] of 6 phases)`

Phase numbers: 1=Context, 2=Requirements, 3=Units, 4=Design, 5=Tasks, 6=Implementation

### Phase-Specific Metrics

**Phase 1**: Project Type, Technology Stack, Architecture, Feature Impact, Recommendations
**Phase 2 (D1 Requirements Decisions)**: Decision topic count
**Phase 2 (Personas)**: Persona count, names, descriptions
**Phase 2 (Requirements)**: Total Stories, Priority breakdown, Functional Areas, Key Entities
**Phase 3 (D2 Units Decisions)**: Decision topic count
**Phase 3 (Units)**: Unit count, names, story counts, dependencies, architecture pattern
**Phase 4 (D3 Design Decisions)**: Decision topic count
**Phase 4 (Design)**: Components, entities, endpoints, integrations, tech stack, NFR/PBT coverage
**Phase 5 (D4 Tasks Decisions)**: Decision topic count
**Phase 5 (Tasks)**: Total tasks/sub-tasks, phase breakdown, effort estimates, coverage
**Phase 6 (Start)**: Task ID/title, dependencies, effort, sub-tasks, progress (0%)
**Phase 6 (Complete)**: Task ID/title, files changed, test status, progress (X%), next task

---

## 3. File Path References

- Mention file paths in backticks: `` `{SPECS_DIR}/{feature}/context.md` ``
- DO NOT use markdown links for file paths
- See `path-resolution.md` for complete path variables

Quick reference:
- `SPECS_DIR`: `.kiro/specs` (Kiro) or `.aidlc/specs` (others)
- `WORKFLOW_DIR`: `.aidlc/workflow` (all tools)
- `TEMPLATES_DIR`: Tool-specific (see `path-resolution.md`)
- `STEERING_DIR`: `.kiro/steering` (Kiro), `.claude/rules` (Claude Code), `.cursor/rules` (Cursor), `.windsurf/rules` (Windsurf)

---

## 4. Template Usage

- **ALWAYS** read template files from `{TEMPLATES_DIR}` before generating artifacts
- Do NOT guess template structures
- Templates define the exact output format

---

## 5. Validation

Before presenting artifacts to user, validate:
- ✅ Completeness: All required sections present
- ✅ Consistency: Matches decision gate answers
- ✅ Traceability: References previous phase artifacts correctly
- ✅ Format: Follows template structure
- ✅ Quality: No placeholders, no TODOs, no incomplete sections
- ✅ Language: All narrative text in user's language

If validation fails: Fix issues and regenerate before presenting.

---

## 6. User Approval & Feedback

**Approval signals**: "looks good", "approved", "proceed", "yes", "continue", "next", "ok" (and language-specific equivalents)

**NOT approval signals**: "use recommendations", "use the recommended options", "go with defaults", "use Kiro's suggestions" — these are ANSWERS to decision gate questions, not approval to skip the confirmation step. After applying recommendations, you MUST still present a summary and wait for explicit approval before proceeding.

**If approved**: Proceed to next phase.

**If changes requested**:
1. Ask specifically what needs to change
2. Re-invoke the current phase agent with `step: {phase}-edit`, passing:
   - `edit_request`: User's change description
   - Artifact path(s) for the current phase
   - All original input paths (context, decisions, etc.)
3. Agent applies changes, re-validates, returns updated result
4. Present updated version to user
5. Repeat until user approves

**If rollback requested**:
1. Confirm which phase to return to
2. Mark subsequent phases as invalid in state file
3. Return to requested phase
4. Regenerate from that point forward

---

## 7. Silent Operations

**NEVER mention to user**:
- Updating `audit.md`
- Updating `.workflow-state.json`
- Updating steering files
- Reading phase instructions or templates
- Internal validation steps

Only present final results and ask for feedback.

### Audit Trail
Update `{WORKFLOW_DIR}/{feature}/audit.md` after each phase completion, decision gate, user approval, task completion. Append only, never delete entries. Include summary, details (decision, rationale, alternatives), and impact (affected files).

### Workflow State
Update `.workflow-state.json` at each phase transition. See `workflow-state.md` for state file structure and update points.

---

## 8. Example Presentations

These examples show the presentation pattern in action. In actual use, translate all text to user's language.

```
📍 Phase 1: Context Assessment (1 of 6 phases)

I've completed the context assessment at `{SPECS_DIR}/feature/context.md`.

- **Project type**: Greenfield
- **Stack**: N/A
- **Key finding**: New platform with no existing code
- **Recommendations**: Personas Yes, Units Yes, NFR Yes

---
🔲 **Your turn**:
- ✅ "proceed" — move to D1 Requirements Decisions
- ✏️ "change [what]" — request edits to context.md
```

```
📍 Phase 2: Requirements - Complete (2 of 6 phases)

I've created the requirements document at `{SPECS_DIR}/feature/requirements.md`.

- **Product Catalog**: 8 stories
- **Shopping Cart**: 5 stories
- **Total**: 13 user stories

---
🔲 **Your turn**:
- ✅ "proceed" — move to D2 Units Decisions (or D3 Design Decisions if simple)
- ✏️ "change [what]" — request edits to requirements.md
```

```
📍 Phase 4: Design - Complete (4 of 6 phases)

I've created the design documents at `{SPECS_DIR}/feature/design/`.

- **Architecture**: Microservices
- **Components**: 5 components
- **Entities**: 8 entities
- **Endpoints**: 15 endpoints

---
🔲 **Your turn**:
- ✅ "proceed" — move to D4 Tasks Decisions
- ✏️ "change [what]" — request edits to design documents
```

---

## 9. Design No-Assumptions Rule

When generating design files, ONLY use technical choices explicitly decided in D3.

**Do NOT assume**: Specific libraries beyond main framework, configuration values, specific cloud services beyond provider, directory structures, middleware/plugins, monitoring tools, build configs.

**You CAN include**: Direct consequences of decided technologies (Node.js → npm implied), industry standard practices (marked as "recommended"), architectural patterns from D2/D3, data models and API contracts from requirements.

**For missing decisions**: Use `[TBD - not decided in D3]` placeholders and list in "Open Questions" section.
