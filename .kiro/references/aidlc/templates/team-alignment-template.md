# Team Alignment Template

**Path**: `{SPECS_DIR}/{feature}/team-alignment.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details
**Condition**: Only generated in incremental mode when user does not skip
**Language**: Write ALL content in user's language. Keep technical terms, file paths, and code unchanged.

## Questions to Ask

Present these questions inline (not as a separate decision gate file). Adapt based on project context.

### Always Ask

```
1. **Team Structure**: How many teams/developers will work on this?
   - 1) Solo developer (I'll work on units sequentially)
   - 2) Small team (2-4 devs, informal coordination)
   - 3) Multiple teams (separate teams per unit)

2. **Repository Strategy**: How should the codebase be organized?
   - 1) Monorepo — all units in one repository, shared tooling
   - 2) Multi-repo — separate repository per unit, independent deployment
   - 3) Hybrid — related units share repos, others separate
   - 4) Unsure — recommend based on our units

3. **Shared Foundations**: What should be standardized across all units?
   - 1) Everything — API patterns, code style, testing, project structure
   - 2) Interfaces only — API contracts and data formats, teams choose their own internals
   - 3) Minimal — just integration contracts, teams are fully autonomous
```

### Conditional: Ask When Architecture is Microservices or Distributed

Check D2 decisions or `units.md` for architecture pattern. If microservices, distributed, or multiple backend services:

```
4. **API Architecture**: How should clients communicate with backend services?
   - 1) API Gateway — single entry point, routes to services, handles cross-cutting concerns
   - 2) BFF (Backend for Frontend) — dedicated backend per frontend type (web, mobile, admin)
   - 3) Direct — clients call services directly, each service handles its own concerns
   - 4) Hybrid — API Gateway for external, direct for service-to-service
   - 5) Unsure — recommend based on our units
```

### Solo Developer Shortcut

If user answers "Solo developer" to question 1:
- Auto-generate a minimal alignment doc (shared conventions and project structure only)
- Or offer to skip: "Since you're working solo, I can carry conventions forward into each unit's design. Generate alignment doc or skip? (generate/skip)"
- If skip: Set state to skip team alignment, proceed to unit selection

## Template

```markdown
# Team Alignment

## Overview
Shared agreements for incremental development across [X] units.
This document is the source of truth for cross-unit conventions and must be
read before starting any unit's design phase (D3).

---

## Team Assignments

| Unit | Owner/Team | Priority | Sequence |
|------|-----------|----------|----------|
| [Unit 1] | [Team/Person] | [High/Medium/Low] | [1st - rationale] |
| [Unit 2] | [Team/Person] | [Priority] | [2nd - rationale] |

**Parallel Work**: [Which units can be developed in parallel and why]

---

## Repository Structure

**Strategy**: [Monorepo / Multi-repo / Hybrid]
**Rationale**: [Why this strategy fits the team and project]

[If Monorepo]:
```
project-root/
├── apps/
│   ├── [app-1]/              # [Unit or frontend]
│   └── [app-2]/              # [Unit or service]
├── packages/
│   ├── shared-types/         # Types shared across units
│   ├── [shared-lib]/         # [Shared library purpose]
│   └── config/               # Shared linting, formatting, TS config
├── infrastructure/           # IaC (shared)
└── [monorepo-config]         # turbo.json / nx.json / pnpm-workspace.yaml
```

[If Multi-repo]:
```
Repositories:
- [unit-1-repo]/              # [Purpose]
- [unit-2-repo]/              # [Purpose]
- [shared-lib-repo]/          # Published to registry, used by all units
```

[If Hybrid]:
```
[Describe which units share repos and which are separate, with rationale]
```

**Ownership Rules**:
- [Shared packages/libs] — [Who reviews, approval process]
- [Unit-specific code] — [Owned by assigned team]
- [Infrastructure] — [Who owns, who reviews]

---

## API Architecture

[Only if microservices/distributed architecture]

**Pattern**: [API Gateway / BFF / Direct / Hybrid]
**Rationale**: [Why this pattern fits]

[If API Gateway]:
- **Gateway responsibility**: Routing, authentication, rate limiting, request transformation
- **Service APIs**: Internal-only, no direct external access
- **Gateway ownership**: [Team/person responsible]

[If BFF]:
- **BFF services**: [List BFF per frontend type]
- **Backend APIs**: Internal service-to-service
- **BFF ownership**: [Owned by frontend team or separate]

[If Direct]:
- **Each service handles**: Authentication, CORS, rate limiting independently
- **Service discovery**: [Method — DNS, service mesh, load balancer]

[If Hybrid]:
- **External traffic**: Through API Gateway
- **Service-to-service**: Direct communication
- **Gateway ownership**: [Team/person]

---

## Cross-Unit Conventions

### API Contracts
- **Style**: [REST / GraphQL / gRPC]
- **Spec format**: [OpenAPI 3.0 / GraphQL schema / Proto files]
- **Versioning**: [URL-based / Header-based]
- **Error format**: [Standardized format across all units]
  ```json
  {
    "error": {
      "code": "[ERROR_CODE]",
      "message": "...",
      "requestId": "uuid"
    }
  }
  ```
- **Authentication**: [Shared approach — JWT / OAuth / API keys]
- **Pagination**: [Cursor-based / Offset-based, consistent format]

### Code Conventions
- **Language**: [Shared language and version]
- **Naming**: [File naming, class naming, function naming patterns]
- **Testing**: [Shared test framework and approach]
- **Linting/Formatting**: [Shared config location and tools]

### Data Conventions
- **IDs**: [UUID v4 / ULID / auto-increment]
- **Timestamps**: [ISO 8601 UTC / Unix epoch]
- **Soft deletes**: [Yes with deletedAt / No hard deletes]

---

## Integration Contracts

High-level interface agreements between units. Full API specs are defined
during each unit's design phase but must conform to these contracts.

### [Unit A] → [Unit B]

**Endpoints** (sketch):
```
[METHOD] /api/v1/[resource]     → [Purpose]
[METHOD] /api/v1/[resource]/:id → [Purpose]
```

**Key data shape**:
```typescript
interface [EntityName] {
  id: string;
  [key fields the consuming unit expects]
}
```

**Events published** (if event-driven):
- `[domain].[entity].[action]` — [When triggered]

---

### [Unit B] → [Unit C]

[Same structure as above]

---

## Sync Schedule

| Activity | Frequency | Participants | Purpose |
|----------|-----------|-------------|---------|
| Integration check | [Weekly/Bi-weekly] | [Teams] | Review contract changes, resolve conflicts |
| Design review | Per unit completion | [Teams] | Validate design against shared agreements |
| Integration testing | [Frequency] | [Teams] | Test cross-unit flows end-to-end |
| Shared code changes | As needed | [PR review process] | Changes to shared packages/libs |

**Escalation**: If a unit's design needs to change a shared convention or
integration contract, it must be discussed at the next sync before proceeding.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Contract drift between units | Integration failures | [Spec as source of truth, generated clients] |
| Shared code conflicts | Blocked development | [Versioning strategy, review process] |
| [Project-specific risk] | [Impact] | [Mitigation] |

---

## References

- Units: `units.md` — unit boundaries and dependencies
- Requirements: `requirements.md` — story list per unit
```

## Content Adaptation Rules

**Solo developer**: Generate minimal version — only Repository Structure, Cross-Unit Conventions, and a simplified Integration Contracts section. Skip Team Assignments, Sync Schedule, and Risks.

**Small team**: Generate full version but with lighter Sync Schedule (informal check-ins rather than formal meetings).

**Multiple teams**: Generate full version with all sections.

**Monorepo**: Emphasize shared packages, ownership rules, and monorepo tooling.

**Multi-repo**: Emphasize published shared libraries, API contract versioning, and independent deployment.

**API Gateway/BFF**: Include full API Architecture section with gateway/BFF ownership and routing details.

**Direct communication**: Include service discovery and per-service cross-cutting concern handling.
