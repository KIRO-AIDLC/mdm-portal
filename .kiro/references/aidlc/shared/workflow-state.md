# Workflow State Management

State file structure, resume detection, and state update points.

**See**: `path-resolution.md` for path variables and file locations.

---

## Resume Detection

**Execute at the start of every spec session.**

### Step 1: Check Directory Existence
- Check if `{WORKFLOW_DIR}` and `{SPECS_DIR}` exist
- **If neither exists**: Fresh project — skip resume, proceed to Phase 1
- **If at least one exists**: Continue to Step 2

### Step 2: Scan for State Files
Scan `{WORKFLOW_DIR}` for `.workflow-state.json` files.

### Step 3: Determine Context
- **1 file found**: Read and validate (Step 4)
- **Multiple files found**: Present list, ask user which to resume
- **0 files found**: Fallback file scanning (Step 5)

### Step 4: Validate State File
- Check referenced files exist
- Verify completed phases have artifacts
- Detect inconsistencies
- **Incremental Mode**: Show all units (in-progress + not-started)

### Step 5: Fallback File Scanning
If no state files but directories exist, detect state from artifacts:

1. `context.md` exists → Context complete
2. `decisions-requirements.md` filled → D1 complete
3. `personas.md` exists → Personas complete
4. `requirements.md` exists → Requirements complete
5. `decisions-units.md` filled → D2 complete
6. `units.md` exists → Units complete
7. `team-alignment.md` exists AND `mode` not determinable → Team alignment complete, incremental mode. Next: select-unit
8. `units.md` exists but NO `team-alignment.md` AND NO `decisions-design.md` → Units complete but design approach not yet chosen. Next: ask-design-approach
9. `decisions-design.md` filled → D3 complete
10. `design.md` exists → Design complete
11. `decisions-tasks.md` filled → D4 complete
12. `tasks.md` exists → Tasks complete
13. `tasks.md` has `[x]` → Implementation in progress

**Note on team alignment detection**: In fallback mode, the presence of `team-alignment.md` implies incremental mode was chosen and team alignment was completed. The absence of `team-alignment.md` with `units.md` present could mean either: (a) comprehensive mode was chosen (no team alignment needed), or (b) incremental mode was chosen but team alignment was skipped or not yet done. Check for unit-specific folders (`{SPECS_DIR}/{feature}-{unit}/`) to distinguish — if they exist, incremental mode is active.

### Step 6: Present Resume Prompt
Show what was found in user's language and ask to continue.

---

## State File Structure

Location: `{WORKFLOW_DIR}/{feature}/.workflow-state.json`

```json
{
  "feature": "feature-name",
  "language": "en",
  "type": "main",
  "currentPhase": "design",
  "completedPhases": ["context", "d1", "requirements", "d2", "units", "team-alignment"],
  "nextAction": "select-unit",
  "mode": "incremental",
  "units": [{"name": "unit-name", "status": "not-started"}],
  "implementation": {
    "totalTasks": 0,
    "completedTasks": 0,
    "currentTask": null
  },
  "lastUpdated": "2024-02-10T10:30:00Z"
}
```

**Note**: `mode` field is set to `null` initially and populated after units.md when user chooses incremental or comprehensive approach. The `"team-alignment"` phase is added to `completedPhases` when team alignment is generated or explicitly skipped (solo developer skip). If skipped, it is still recorded as completed to indicate the step was handled.

Unit state: `{WORKFLOW_DIR}/{feature}-{unit}/.workflow-state.json`

```json
{
  "feature": "feature-name",
  "language": "en",
  "unit": "unit-name",
  "type": "unit",
  "parentFeature": "feature-name",
  "currentPhase": "design",
  "completedPhases": ["d3"],
  "nextAction": "generate-tasks-decisions",
  "lastUpdated": "2024-02-10T11:00:00Z"
}
```

---

## State Update Points

1. After Context → `nextAction: "requirements-decisions"`
2. After D1 filled → `nextAction: "validate-d1-decisions"`
3. After D1 validated → `nextAction: "generate-requirements"`
4. After Requirements → `nextAction: "routing-decision"`
5. After D2 filled → `nextAction: "validate-d2-decisions"`
6. After D2 validated → `nextAction: "generate-units"`
7. After Units → `nextAction: "ask-design-approach"`
8. After Design Approach chosen:
   - If incremental → `nextAction: "team-alignment"`, set `mode: "incremental"`
   - If comprehensive → `nextAction: "design-decisions"`, set `mode: "comprehensive"`
9. After Team Alignment (incremental only):
   - If generated or skipped → `nextAction: "select-unit"`
10. After Unit Selected (incremental only) → `nextAction: "design-decisions"`, set `currentUnit`
11. After D3 filled → `nextAction: "validate-d3-decisions"`
12. After D3 validated → `nextAction: "generate-design"`
13. After Design → `nextAction: "tasks-decisions"`
14. After D4 filled → `nextAction: "validate-d4-decisions"`
15. After D4 validated → `nextAction: "generate-tasks"`
16. After Tasks → `nextAction: "complete"`
17. During Implementation → Update `implementation` object

---

## Next Action Mapping

| nextAction | What to do |
|------------|------------|
| requirements-decisions | Generate D1 |
| validate-d1-decisions | Validate D1 answers for conflicts |
| generate-requirements | Generate requirements.md |
| generate-personas | Generate personas.md |
| routing-decision | Analyze complexity, route to Phase 3 or 4 |
| units-decisions | Generate D2 |
| validate-d2-decisions | Validate D2 answers for conflicts |
| generate-units | Generate units.md |
| ask-design-approach | Ask user: incremental or comprehensive |
| team-alignment | Ask alignment questions, generate team-alignment.md (incremental only) |
| select-unit | Present units and ask which to work on (incremental only) |
| design-decisions | Generate D3 |
| validate-d3-decisions | Validate D3 answers for conflicts |
| generate-design | Generate design.md + design/* |
| tasks-decisions | Generate D4 |
| validate-d4-decisions | Validate D4 answers for conflicts |
| generate-tasks | Generate tasks.md |
| complete | Spec complete, offer implementation |
| implementing-task-{N} | Resume from task N |
| implementation-complete | All tasks done |
