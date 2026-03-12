# Decision Gate Pattern

This document describes the common pattern for all decision gates (D1, D2, D3, D4).

## Decision Gate Structure

All decision gates follow this structure:

1. **Generate decision file** with questions
2. **WAIT** for user to fill in answers
3. **VALIDATE** decisions for conflicts (see `decision-validation-pattern.md`)
4. **If conflicts found**: Present conflicts, ask clarifying questions, update decision file
5. **If no conflicts or resolved**: Summarize user's choices
6. **Proceed** to artifact generation

## File Location

`{WORKFLOW_DIR}/{feature}/decisions-{phase}.md`

For incremental mode units: `{WORKFLOW_DIR}/{feature}-{unit}/decisions-{phase}.md`

## Template

Use `{TEMPLATES_DIR}/decision-gate-template.md` with:
- Gate prefix: D1 Requirements Decisions, D2 Units Decisions, D3 Design Decisions, or D4 Tasks Decisions
- Completion signal: "{phase} decisions complete"

## Context Summary

Every decision gate MUST include a context summary with information from previous phases. This helps ground the questions in the actual project context.

**Format**:
```markdown
## Context Summary

Based on previous phases:

**From Context**:
- [Key information from context.md]

**From Requirements**:
- [Key information from requirements.md]

**From Units** (if applicable):
- [Key information from units.md]
```

## Question Generation Guidelines

**Question Count**: Generate as many questions as needed to fully cover the decision space for this phase. Prioritize completeness over brevity — every question should address a decision that, if left unanswered, would force assumptions during artifact generation. Avoid filler questions that don't influence the output.

1. **Be Specific**: Don't ask vague questions
   - ❌ "What database?"
   - ✅ "What database technology should store user data and orders?"

2. **Provide Context**: Explain why the choice matters
   - Include brief rationale for each option

3. **Offer Realistic Options**: 3-4 options per question
   - Include pros/cons or brief descriptions
   - Mark recommended options based on project context
   - Always include "Other (please specify): _______"

4. **Project-Specific**: Add questions unique to this project
   - Don't just use generic templates
   - Adapt to the actual requirements and context

5. **One Decision Per Question**: Don't combine multiple choices
   - Each question should have a single, clear decision point

6. **Ask About the Feature/System**: Not about documentation
   - ✅ "Which payment methods should be supported?"
   - ❌ "How detailed should requirements be?"

## Response Templates

### After Generating Decision File

```
I've generated the {phase} decisions file at `{WORKFLOW_DIR}/{feature}/decisions-{phase}.md`.

The decision topics covered:
- [Topic 1 name]
- [Topic 2 name]
- [Topic 3 name]

Please fill in your answers and let me know when you're done.
```

### After User Fills Decision File

**First, validate for conflicts** (see `decision-validation-pattern.md`):

If conflicts detected, present them and wait for resolution before summarizing.

If no conflicts or all resolved:

```
Here's a summary of your choices:

- **[Topic 1]**: [User's choice]
- **[Topic 2]**: [User's choice]
- **[Topic 3]**: [User's choice]

Do you confirm these choices? (yes/no/change)
```

**CRITICAL**: Even when the user selected all recommended options or said "use recommendations", you MUST present this summary and WAIT for explicit confirmation before proceeding to artifact generation. Do NOT treat "use recommendations" as both an answer AND an approval — it is ONLY an answer. A separate approval step is always required.

## Decision Gate Mapping

| Gate | Phase | Questions About | Validates | Generates |
|------|-------|-----------------|-----------|-----------|
| D1 | Requirements | Feature scope, users, functionality, data, integrations | Scope vs timeline, personas need | requirements.md (+ optional personas.md) |
| D2 | Units | Decomposition strategy, unit boundaries, dependencies | Over-decomposition, circular deps, architecture fit | units.md |
| D3 | Design | Technology stack, architecture, NFRs | Tech compatibility, architecture patterns, scale, security | design.md + design/* (including optional design/nfr.md) |
| D4 | Tasks | Implementation approach, task breakdown, testing strategy | Testing strategy, coordination plan | tasks.md |
