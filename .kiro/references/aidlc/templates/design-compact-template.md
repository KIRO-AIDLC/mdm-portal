# Compact Design Template

**Path**: `{SPECS_DIR}/{feature}/design.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details
**Use when**: Simple projects (≤10 user stories, single domain)
**Language**: Write ALL content in user's language. Keep code, paths, and technical identifiers unchanged.

For complex projects (11+ stories, multiple domains), use the modular design templates instead.

```markdown
# Design: [Feature Name]

## Architecture Overview

**Pattern**: [From D3]
**Key Decisions**: [Summary of D3 choices]

---

## Components

### [Component 1 Name]
- **Purpose**: [What it does]
- **Technology**: [From D3]
- **Responsibilities**: [Key responsibilities]
- **Interfaces**: [What it exposes/consumes]

### [Component 2 Name]
- **Purpose**: [What it does]
- **Technology**: [From D3]
- **Responsibilities**: [Key responsibilities]
- **Interfaces**: [What it exposes/consumes]

---

## Data Model

### [Entity 1]
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| [field] | [type] | [constraints] | [description] |

**Relationships**: [Entity relationships]

### [Entity 2]
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| [field] | [type] | [constraints] | [description] |

---

## API Specification

### [Endpoint Group 1]

#### [METHOD] [path]
- **Description**: [What it does]
- **Request**: [Body/params]
- **Response**: [Success response]
- **Errors**: [Error cases]

#### [METHOD] [path]
- **Description**: [What it does]
- **Request**: [Body/params]
- **Response**: [Success response]
- **Errors**: [Error cases]

---

## Integration Points

| External System | Protocol | Purpose | Auth |
|----------------|----------|---------|------|
| [System] | [REST/gRPC/etc] | [Why] | [How] |

---

## Implementation Details

### Technology Stack
- **Language**: [From D3]
- **Framework**: [From D3]
- **Database**: [From D3]
- **Testing**: [From D3]

### Directory Structure
```
[Planned directory structure]
```

### Build & Deploy
- **Build**: [Build tool and process]
- **CI/CD**: [Pipeline]
- **Deploy**: [Strategy]

---

## Non-Functional Requirements
[If NFR questions answered in D3]

- **Performance**: [Targets]
- **Security**: [Approach]
- **Scalability**: [Strategy]

---

## Correctness Properties
[If PBT selected in D3]

| Property | Description | Input | Expected |
|----------|-------------|-------|----------|
| [Name] | [What it verifies] | [Input domain] | [Expected behavior] |

---

## Open Questions & Risks

| # | Question/Risk | Status | Impact |
|---|--------------|--------|--------|
| 1 | [TBD items from D3] | Open | [Impact] |

---

## Traceability

| Requirement | Component | API | Data |
|-------------|-----------|-----|------|
| US-001 | [Component] | [Endpoint] | [Entity] |
| US-002 | [Component] | [Endpoint] | [Entity] |
```
