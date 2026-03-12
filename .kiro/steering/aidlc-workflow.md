---
inclusion: always
---

# AI-DLC Workflow Active

This project uses the AI-DLC spec workflow.

## Spec Workflow Instructions

1. Read `.kiro/skills/aidlc/SKILL.md` and follow its instructions
2. Check `.aidlc/workflow/` for `.workflow-state.json` to detect current state
3. Resume from the `nextAction` specified in the state file
4. All communication must be in the language specified in the state file

## Spec Workflow Rules

- Wait for user approval after each phase before proceeding
- Validate decisions for conflicts after each decision gate
- Update audit.md and .workflow-state.json silently after each step
- Never assume technology choices not explicitly decided in decision gates

## Implementation Context

When implementing tasks from `tasks.md` (whether via the aidlc skill or directly), ALWAYS determine the correct context folder first, then read the design documents.

### Step 1: Determine Context Folder

Check the path of the task file being executed:
- If the task file is at `.kiro/specs/mdm-portal-<unit>/tasks.md` → this is a **unit workstream**. Set `CONTEXT_DIR = .kiro/specs/mdm-portal-<unit>` and `WORKFLOW_CONTEXT_DIR = .aidlc/workflow/mdm-portal-<unit>`
- If the task file is at `.kiro/specs/mdm-portal/tasks.md` → this is the **main feature**. Set `CONTEXT_DIR = .kiro/specs/mdm-portal` and `WORKFLOW_CONTEXT_DIR = .aidlc/workflow/mdm-portal`
- If unsure, check `.aidlc/workflow/` for `.workflow-state.json` files — the one with `"type": "unit"` and matching unit name indicates the active workstream

Also always read the main feature's shared artifacts:
- Team alignment: `.kiro/specs/mdm-portal/team-alignment.md` (if exists)
- Main context: `.kiro/specs/mdm-portal/context.md`

### Step 2: Read Design Documents

**Design Documents** (from CONTEXT_DIR — follow these precisely):
- Design overview: `CONTEXT_DIR/design.md`
- Components: `CONTEXT_DIR/design/components.md`
- Data model: `CONTEXT_DIR/design/data-model.md`
- API spec: `CONTEXT_DIR/design/api-spec.md`
- Integration: `CONTEXT_DIR/design/integration.md`
- Implementation details: `CONTEXT_DIR/design/implementation.md`

**Decisions** (from WORKFLOW_CONTEXT_DIR):
- Technology decisions: `WORKFLOW_CONTEXT_DIR/decisions-design.md`
- Task/testing decisions: `WORKFLOW_CONTEXT_DIR/decisions-tasks.md`

### Key Rules for Implementation

- Follow the technology stack and patterns from design decisions — do not deviate
- Follow the testing approach from task decisions (TDD, test-after, outside-in)
- In incremental mode, also respect `team-alignment.md` conventions from the main feature folder
- Write files section by section using fsWrite + fsAppend (never write large files in one call)
- Mark tasks complete after all tests pass: change `- [ ]` to `- [x]` in tasks.md

**For the full agent-based implementation workflow**, activate the aidlc skill:

    Use the aidlc skill to continue implementation for mdm-portal
