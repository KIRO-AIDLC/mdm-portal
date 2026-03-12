# Decision Validation Pattern

This document describes how to validate user decisions for conflicts and inconsistencies after each decision gate.

## Validation Flow

After user fills a decision gate file:

1. **Read** the decision file and parse all answers
2. **Load** validation rules for this decision gate
3. **Check** each rule against the user's answers
4. **Collect** all detected conflicts
5. **If conflicts found**:
   - Present conflicts with severity and explanation
   - Ask clarifying questions
   - Wait for user responses
   - Update decision file with clarifications
   - Re-validate (repeat if needed)
6. **If no conflicts** or all resolved:
   - Summarize final choices
   - Proceed to artifact generation

## Validation Timing

| Decision Gate | Validation Point | Rules File Section |
|---------------|------------------|-------------------|
| D1 (Requirements) | After user fills decisions-requirements.md | D1 Validation Rules |
| D2 (Units) | After user fills decisions-units.md | D2 Validation Rules |
| D3 (Design) | After user fills decisions-design.md | D3 Validation Rules (most complex) |
| D4 (Tasks) | After user fills decisions-tasks.md | D4 Validation Rules |

## Conflict Severity Levels

### High Severity (🔴)
- **Impact**: Will cause implementation failure or major issues
- **Examples**: Incompatible technologies, architectural impossibilities
- **Action**: MUST be resolved before proceeding
- **User override**: Requires explicit justification

### Medium Severity (🟡)
- **Impact**: Will cause complexity, maintenance issues, or suboptimal performance
- **Examples**: Technology mismatches, over-engineering, under-engineering
- **Action**: SHOULD be resolved, but can proceed with acknowledgment
- **User override**: Allowed with brief rationale

### Low Severity (🟢)
- **Impact**: Minor inefficiencies or style inconsistencies
- **Examples**: Unconventional choices, missing optimizations
- **Action**: Informational only, suggest improvements
- **User override**: Always allowed

## Conflict Presentation Format

```markdown
⚠️ Decision Validation - Conflicts Detected

I've reviewed your decisions and found [X] potential conflicts:

## 🔴 Conflict 1: [Conflict Name] (High Severity)
**Issue**: [Clear description of the conflict]

**Why this matters**: [Explanation of impact]

**Your choices**:
- [Decision A]: [User's answer]
- [Decision B]: [User's answer]

**Resolution options**:
1. [Option 1 with brief pros/cons]
2. [Option 2 with brief pros/cons]
3. [Option 3 with brief pros/cons]
4. Keep current choices (requires justification)

**Question**: How would you like to resolve this? (1/2/3/4 or explain)

---

## 🟡 Conflict 2: [Conflict Name] (Medium Severity)
[Same structure as above]

---

Please answer the questions above, and I'll update the decision file accordingly.
```

## Validation Rules Structure

See `decision-validation-rules.md` for complete rule definitions.

Each rule has:
- **Trigger conditions**: When to check this rule
- **Conflict type**: Category of conflict
- **Severity**: High/Medium/Low
- **Detection logic**: How to identify the conflict
- **Clarifying questions**: What to ask the user
- **Resolution options**: Suggested solutions
- **Context factors**: Project context that affects severity

## Context-Aware Validation

Validation considers project context:

**From context.md**:
- Project type (greenfield/brownfield)
- Existing technology stack
- Team size
- Architecture constraints

**From requirements.md**:
- Number of user stories
- Complexity indicators
- Data entities count
- Integration points

**From units.md** (if applicable):
- Number of units
- Architecture pattern
- Team assignments

**From D1/D2/D3 answers**:
- Scope (MVP/Full product)
- Timeline constraints
- Team experience level

## Validation Process

### Step 1: Parse Decisions

Extract all answers from the decision file:
```
{
  "D3-1-Frontend-Framework": "React",
  "D3-2-Backend-Framework": "FastAPI",
  "D3-3-Database": "MongoDB",
  "D3-4-ORM": "Prisma",
  ...
}
```

### Step 2: Load Context

Read relevant context from previous phases:
- Team size from context.md
- Story count from requirements.md
- Architecture pattern from D2 (if exists)

### Step 3: Apply Rules

For each validation rule:
1. Check if trigger conditions match
2. If match, evaluate detection logic
3. If conflict detected, add to conflicts list
4. Adjust severity based on context

### Step 4: Present Conflicts

Group by severity (High → Medium → Low):
- Present each conflict with clear explanation
- Provide resolution options
- Ask clarifying questions

### Step 5: Process Responses

After user responds:
1. Parse their answers
2. Update decision file with:
   - Resolved choices
   - User justifications (if override)
   - Validation notes
3. Re-run validation on updated decisions
4. If new conflicts, repeat; otherwise proceed

## Decision File Updates

After validation, add a section to the decision file:

```markdown
---

## Validation Notes

**Validation Date**: [ISO timestamp]
**Conflicts Detected**: [X]
**Conflicts Resolved**: [Y]

### Resolved Conflicts
1. **[Conflict name]**: [Resolution chosen] - [User rationale if override]
2. **[Conflict name]**: [Resolution chosen]

### Acknowledged Trade-offs
- [Trade-off 1]: [User's acknowledgment]
- [Trade-off 2]: [User's acknowledgment]
```

## Validation State Tracking

Update `.workflow-state.json` during validation:

```json
{
  "currentPhase": "design",
  "nextAction": "validate-d3-decisions",
  "validation": {
    "inProgress": true,
    "conflictsDetected": 3,
    "conflictsResolved": 0,
    "iteration": 1
  }
}
```

After validation complete:

```json
{
  "currentPhase": "design",
  "nextAction": "generate-design",
  "validation": {
    "inProgress": false,
    "conflictsDetected": 3,
    "conflictsResolved": 3,
    "iteration": 2,
    "completedAt": "2024-03-06T10:30:00Z"
  }
}
```

## Validation Bypass

User can bypass validation with explicit command:
```
Skip validation and proceed
```

This should:
1. Log bypass in audit trail
2. Add warning note to decision file
3. Proceed to artifact generation

**Use sparingly**: Only when user has strong rationale or is prototyping.

## Multi-Phase Validation

Some conflicts span multiple decision gates:

**Example**: D2 architecture choice + D3 technology choices
- D2: Microservices architecture
- D3: Single shared database
- Conflict: Violates microservices principles

**Solution**: D3 validation checks D2 decisions when relevant.

## Validation Rules Maintenance

Rules are defined in `decision-validation-rules.md`:
- Organized by decision gate (D1, D2, D3, D4)
- Each rule is independent and testable
- Rules can reference context and previous decisions
- New rules can be added as patterns emerge

## Language Support

All validation messages, conflict descriptions, and questions must be in user's language (from `.workflow-state.json`).

**Exception**: Keep technology names, file paths, and code examples in English.
