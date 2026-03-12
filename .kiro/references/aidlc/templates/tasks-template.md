# Tasks Template

**Path**: `{SPECS_DIR}/{feature}/tasks.md`
**See**: `{SHARED_DIR}/path-resolution.md` for paths, `{GUIDES_DIR}/task-breakdown-strategies.md` for strategies

**CRITICAL**: Use Kiro-compatible checkbox format with proper indentation.

```markdown
# Implementation Tasks

## Overview
Tasks organized by [strategy from D4 - e.g., "vertical slices"].

**Derived From**:
- Requirements: [X] user stories from `requirements.md`
- Design: [Y] components, [Z] entities, [A] endpoints from `design/` folder

**Strategy**: [Vertical Slice/Layer-by-Layer/Feature-by-Feature]
**Rationale**: [Why this strategy based on D4]

**See**: `{GUIDES_DIR}/task-breakdown-strategies.md` for strategy details

---

## Phase 1: [Name]

- [ ] 1. [Task Title - from component/feature/requirement]
  - **Description**: [What needs to be done]
  - **Dependencies**: [Other tasks or "None"]
  - **Related Requirements**: [US-XXX from requirements.md]
  - **Design Reference**: [Component/Entity/Endpoint from design docs]
  - [ ] 1.1 [Sub-task from design spec]
    - [Implementation detail]
    - [Testing requirement]
  - [ ] 1.2 [Sub-task]
    - [Implementation detail]

- [ ] 2. [Task Title]
  - **Description**: [What needs to be done]
  - **Dependencies**: Task 1
  - **Related Requirements**: [US-XXX]
  - **Design Reference**: [From design docs]
  - [ ] 2.1 [Sub-task]
    - [Implementation detail]
  - [ ] 2.2 [Sub-task]
    - [Implementation detail]

---

## Phase 2: [Name]

- [ ] 3. [Task Title]
  - **Description**: [What needs to be done]
  - **Dependencies**: Task 1, Task 2
  - **Related Requirements**: [US-XXX]
  - **Design Reference**: [From design docs]
  - [ ] 3.1 [Sub-task]
  - [ ] 3.2 [Sub-task]

---

## Task Summary

| Task | Title | Dependencies | Status |
|------|-------|--------------|--------|
| 1 | [Title] | None | [ ] |
| 2 | [Title] | 1 | [ ] |
| 3 | [Title] | 1, 2 | [ ] |

---

## Requirements Coverage

| Requirement | Implemented By | Status |
|-------------|----------------|--------|
| US-1 | Task 1, Task 3 | [ ] |
| US-2 | Task 2 | [ ] |

---

## Design Coverage

**Components**: [X] components → Tasks [list]
**Entities**: [Y] entities → Tasks [list]
**Endpoints**: [Z] endpoints → Tasks [list]
**Integrations**: [A] integrations → Tasks [list]

---

## Definition of Done

- [ ] Code written and follows standards
- [ ] Tests written and passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Acceptance criteria met

---

## Notes

**Parallel Work**: Tasks [X, Y, Z] can be done in parallel

**Technical Debt**: [Known debt to address]

**Future Enhancements**: [Deferred features]
```
