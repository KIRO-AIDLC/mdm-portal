# Design Template (Main Entry Point)

**Path Resolution**: This file is saved to `{SPECS_DIR}/{feature}/design.md`
- Kiro: `.kiro/specs/{feature}/design.md`
- Others: `.aidlc/specs/{feature}/design.md`

This is the main design document that provides a high-level overview with references to detailed specifications.

```markdown
# Design Document: [Feature Name]

## Overview
[2-3 paragraph executive summary of the solution]

## Architecture

### System Architecture
**Architecture Style**: [Monolithic / Modular Monolith / Microservices / Serverless / Hybrid]

**Rationale**: [Why this architecture was chosen based on requirements and D3 decisions]

### System Context Diagram
```
[ASCII diagram or description showing system boundaries and external dependencies]

┌─────────────┐
│   Users     │
└──────┬──────┘
       │
┌──────▼──────────────────────────────────┐
│         [System Name]                    │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │Service1│  │Service2│  │Service3│    │
│  └────────┘  └────────┘  └────────┘    │
└──────┬──────────────────────────────────┘
       │
┌──────▼──────┐
│  External   │
│  Services   │
└─────────────┘
```

### Key Design Decisions
1. **[Decision 1]**: [Brief rationale]
2. **[Decision 2]**: [Brief rationale]
3. **[Decision 3]**: [Brief rationale]

### Technology Stack
- **Frontend**: [Framework/library] (if web)
- **Mobile**: [Framework] (if mobile app)
- **Backend**: [Framework/runtime]
- **Database**: [Database technology]
- **Infrastructure**: [Cloud provider/platform]
- **Key Libraries**: [Major dependencies]

## Components

[High-level component overview - 1-2 paragraphs describing the major components and how they interact]

**Key Components:**
- **[Component 1]**: [One sentence description]
- **[Component 2]**: [One sentence description]
- **[Component 3]**: [One sentence description]

**For detailed component specifications, see:** `design/components.md`

## Data Model

[High-level data model overview - describe key entities and their relationships in 1-2 paragraphs]

**Key Entities:**
- **[Entity 1]**: [One sentence description]
- **[Entity 2]**: [One sentence description]
- **[Entity 3]**: [One sentence description]

**For detailed data model specifications, see:** `design/data-model.md`

## API Design

[High-level API approach - REST/GraphQL/gRPC, versioning strategy, authentication approach]

**Key Endpoints:**
- `POST /api/v1/[resource]` - [Brief description]
- `GET /api/v1/[resource]` - [Brief description]
- `PUT /api/v1/[resource]/{id}` - [Brief description]
- `DELETE /api/v1/[resource]/{id}` - [Brief description]

**For detailed API specifications, see:** `design/api-spec.md`

## Integration Points

[High-level integration overview - external services, inter-unit communication]

**External Integrations:**
- **[Service 1]**: [Purpose]
- **[Service 2]**: [Purpose]

**For detailed integration specifications, see:** `design/integration.md`

## Implementation Approach

[High-level implementation strategy - phases, priorities, development workflow]

**Implementation Phases:**
1. **Phase 1**: [Description]
2. **Phase 2**: [Description]
3. **Phase 3**: [Description]

**For detailed implementation specifications, see:** `design/implementation.md`

## Correctness Properties

[If PBT selected: High-level correctness properties that the system must maintain]

**Key Properties:**
1. **[Property 1]**: [Brief description]
2. **[Property 2]**: [Brief description]

**For detailed correctness specifications, see:** `design/correctness.md`

## Open Questions & Risks

### Open Questions
1. [Question that needs resolution]
2. [Question that needs resolution]

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [High/Medium/Low] | [How to mitigate] |

## References

### Detailed Specifications
- [Components](design/components.md) - Detailed component breakdown
- [Data Model](design/data-model.md) - Complete data model and schemas
- [API Specification](design/api-spec.md) - Full API documentation
- [Integration](design/integration.md) - Integration patterns and details
- [Implementation](design/implementation.md) - Implementation details and approach
- [Non-Functional Requirements](design/nfr.md) - Performance, security, scalability *(if applicable)*
- [Correctness Properties](design/correctness.md) - Correctness properties *(if applicable)*

### Related Documents
- [Requirements](requirements.md) - Functional requirements
- [Units of Work](units.md) - System decomposition *(if applicable)*
```

## Response Format

After generating design.md and detail files:

```
✅ Design generation complete!

**Generated files**:
- design.md (main overview with references)
- design/components.md ([X] components)
- design/data-model.md ([Y] entities)
- design/api-spec.md ([Z] endpoints)
- design/integration.md ([A] integrations)
- design/implementation.md (tech stack and build details)
[If PBT] - design/correctness.md ([B] properties)
[If NFR] - design/nfr.md (performance, security, scalability)

All files are in `{SPECS_DIR}/{feature}/design/`

(Actual path: `.kiro/specs/` for Kiro or `.aidlc/specs/` for other tools)

- **Architecture**: [pattern chosen]
- **Key components**: [2-3 main components]
- **Data storage**: [database choice]
- **[If NFR] Performance**: [key target]
- **[If NFR] Security**: [key approach]

Let me know if you'd like any changes, or say 'proceed' to move to tasks phase.
```
